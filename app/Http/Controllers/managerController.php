<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Students;
use App\Models\Event;
use App\Models\Announcement;
use Storage;
use App\Models\RawLog;
Use \Carbon\Carbon;

class managerController extends Controller
{
    public function logout(){
        if(Session::has('name')){
            Session::forget(['name','type']);
            return redirect('/login');
        }
    }

    public function course(){
        $course = Course::select("course")->get();
        return response()->json($course);
    }

    public function students(){
        $students = Students::select('student_id','fullname','course','year')->where('status','active')->get();
        return response()->json($students);
    }

    //Events
    public function events(Request $request){
        $events = Event::select('*')->where('created_by', $request->createdBy)->orderBy('event_id', 'desc')->get();
        return response()->json($events);
    }

    public function newEvent(Request $request){
        $request->validate([
            'Picture' => '|image |mimes:jpeg,png,jpg,gif,svg|max:2048',
            'Header' => 'required | unique:events,header',
            'Description' => 'required',
            'Courses' => 'required',
            'Date' => 'required | after:today',
            'StartTime' => 'required',
            'EndTime' => 'required | after:StartTime'
        ],
        [
            'Header.required' => 'The Header field is required',
            'Description.required' => 'The Description field is required',
            'Courses.required' => 'The Course field is required',
            'StartTime.required' => 'The StartTime field is required',
            'EndTime.required' => 'The EndTime field is required',
            'Date.after' => 'The Date needs to be later than now.'
        ]);

        $picture = $request->file('Picture');
        $filename = time() . '.' . $picture->getClientOriginalExtension();
        
        $event = new Event();
            $event->picture = $filename;
            $event->header =  $request->input('Header');
            $event->description = $request->input('Description');
            $event->total_students = $request->input('TotalStudents');
            $event->courses =  collect($request->input('Courses'))->implode(",");
            $event->created_by = $request->input('managerName');
            $event->start_date = $request->input('Date');
            $event->start_time = $request->input('StartTime');
            $event->end_time = $request->input('EndTime');
            $event->created_Date = Carbon::now()->format('Y-m-d');
            $event->save();
            $picture->move(public_path('images/'.$request->input('managerName')), $filename);
        return response()->json("success");
    }

    public function deleteEvent(Request $request){
        
        $imageDir = public_path('images/'.$request->creator.'/'.$request->image);
        if(file_exists($imageDir))
        {
            Event::where('event_id',$request->eventId)->delete();
            RawLog::where('event_id', $request->eventId)->delete();
            Storage::disk("vouchers")->delete("{$request->eventId}_$request->creator.json");
            unlink($imageDir);
            return response()->json("success");
        }
        
    }

    public function storeVouchers(Request $request){
        if(Storage::disk('vouchers')->exists("{$request->eventId}_$request->creator.json"))
        {
            return response()->json("alreadycreated");
        }
        else
        {
            Storage::disk('vouchers')->put("{$request->eventId}_$request->creator.json", json_encode($request->vouchers));
            return response()->json("success");
        }
        
    }

    public function fetchVouchers(Request $request){
        if(Storage::disk('vouchers')->missing("{$request->eventId}_$request->creator.json"))
        {
            return response()->json("missing");
        }
        {
            $results = Storage::disk('vouchers')->get("{$request->eventId}_$request->creator.json");
            return response()->json(json_decode ($results));
        }
       
    }

    public function vouchedStudents(Request $request){
        $searchString = $request->searchString;
        $data = RawLog::with("students:student_id,fullname,course,year")
        ->where('event_id', $request->eventId)
        ->where(function($query) use ($request) {
            $query->where('student_id','like', '%'.$request->searchString.'%')
                    ->orWhere('entrance_voucher','like', '%'.$request->searchString.'%')
                    ->orWhere('exit_voucher','like', '%'.$request->searchString.'%')
                  ->orWhereHas('students', function($q) use ($request){
                      $q->where('fullname','like', '%'.$request->searchString.'%');
                  });
        })
        
        ->paginate(10);
        return response()->json($data);
    }

    //Announcement
    public function announcement(Request $request){
        $announcement = Announcement::select('*')->where('created_by', $request->createdBy)->orderBy('announcement_id', 'desc')->get();
        return response()->json($announcement);
    }

    public function newAnnouncement(Request $request){
        $announcement = new Announcement();
            $announcement->header = $request->Header;
            $announcement->description = $request->Description;
            $announcement->created_by = $request->Creator;
            $announcement->courses = collect($request->courses)->implode(",");
            $announcement->date_created = Carbon::now()->format('Y-m-d');
            $announcement->save();
            return response()->json("success");
    }

    public function deleteAnnouncement(Request $request){
        Announcement::where('announcement_id',$request->announcementId)->delete();
        return response()->json("success");
    }

}
