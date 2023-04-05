<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Models\Event;
use App\Models\Announcement;
use App\Models\RawLog;
use App\Models\Admin;
use App\Models\Students;
use App\Models\Course;

class adminController extends Controller
{
    public function logout(){
        if(Session::has('name')){
            Session::forget(['name','type']);
            return redirect('/login');
        }
    }

    public function fetchAll(){
        return response()->json([
            'Events' => Event::select("*")->paginate(10),
            'Announcement' => Announcement::select("*")->paginate(10),
            'RawLog' => RawLog::with(['students'])->paginate(10),
            'Admin' => Admin::select("*")->paginate(10),
            'Students' => Students::select("*")->paginate(10),
            'Courses' => Course::select("*")->paginate(10)
        ]);
    }
    public function searchData(Request $request){
        $Type = $request->Type;
        $searchString = $request->searchString;
        
        switch($Type){
            case('Events'):
                $data = 
                Event::select('*')
                ->where('header','like', '%'.$searchString.'%')
                ->orWhere('courses','like', '%'.$searchString.'%')
                ->orWhere('created_by','like', '%'.$searchString.'%')
                ->paginate(10);
            break;

            case("Announcements"):
                $data = 
                Announcement::select("*")
                ->where('header','like', '%'.$searchString.'%')
                ->orWhere('courses','like', '%'.$searchString.'%')
                ->orWhere('created_by','like', '%'.$searchString.'%')
                ->paginate(10);
            break;

            case("Rawlogs"):
                $data = 
                Rawlog::with('students')
                ->where('event_id','like', '%'.$searchString.'%')
                ->orWhere('student_id','like', '%'.$searchString.'%')
                ->orWhere('entrance_voucher','like', '%'.$searchString.'%')
                ->orWhere('exit_voucher','like', '%'.$searchString.'%')
                ->paginate(10);
            break;
            case("Admin"):
                $data = 
                Admin::with('students')
                ->where('username','like', '%'.$searchString.'%')
                ->orWhere('type','like', '%'.$searchString.'%')
                ->orWhere('position','like', '%'.$searchString.'%')
                ->paginate(10);
            break;
            case("Students"):
                $data = 
                Students::select('*')
                ->where('student_id','like', '%'.$searchString.'%')
                ->orWhere('fullname','like', '%'.$searchString.'%')
                ->orWhere('course','like', '%'.$searchString.'%')
                ->orWhere('year','like', '%'.$searchString.'%')
                ->orWhere('email','like', '%'.$searchString.'%')
                ->orWhere('status','like', '%'.$searchString.'%')
                ->paginate(10);
            break;
            case("Course"):
                $data = 
                Course  ::select("*")
                ->paginate(10);
            break;

            default:
                $data="Error";
        };

        return response()->json([
            'data' => $data,
            'type' => $Type
        ]);
    }

    public function editTime(Request $request){
        $request->validate([
            'StartTime' => 'required',
            'EndTime' => 'required | after:StartTime',
            'StartDate' => 'required | after:yesterday',
        ],
        [
            'StartDate.after' => 'The Date must be greater than or equal today.'
        ]
        );

        Event::where('event_id',$request->EventId)
        ->update([
            'start_date' => $request->StartDate,
            'start_time' => $request->StartTime,
            'end_time' => $request->EndTime
        ]);
        
        return response()->json("success");

    }

    public function addStudentToVouch(Request $request)
    {
        $request->validate([
            'EventId' => 'required|exists:events,event_id',
            'StudentId' => 'required|exists:users,student_id',
            'Entrance' => 'required'
        ],
        [
            'EventId.exists' => 'Event ID is not existed',
            'StudentId.exists' => 'Student ID is not existed'
        ]);

        if(!is_null(Rawlog::where('event_id', $request->EventId)->where('student_id', $request->StudentId)->first()))
        {
            return response()->json('existed in Rawlog');
        }

        $rawlog = new Rawlog();

        $rawlog->event_id = $request->EventId;
        $rawlog->student_id = $request->StudentId;
        $rawlog->entrance_voucher = $request->Entrance;
        $rawlog->exit_voucher = $request->exitVoucher;
        $rawlog->save();

        return response()->json("success");
    }

    public function editStudentToVouch(Request $request)
    {
        Rawlog::where('event_id', $request->eventId)
        ->where('student_id', $request->studentId)
        ->update(['exit_voucher' => $request->exitVoucher]);

        return response()->json("success");
    }
    
    public function editAdmin(Request $request){
       
        $admin = Admin::where('admin_id', $request->adminId);

        if($request->Username != null)
        {
            $admin->update([ 'username' => $request->Username]);
        }
        else if($request->Type != null)
        {
            $admin->update([ 'type' => $request->Type]);
        }
        else if($request->Position != null)
        {
            $admin->update([ 'position' => $request->Position]);
        }
        else if($request->Password != null)
        {
            $request->validate([
                'Password' => 'min:6'
            ]);
            $admin->update([ 'password' => $request->Password]);
        };

        return response()->json("success");
    }
    
    public function addUser(Request $request){
        $request->validate([
            'Username' => 'required',
            'Type' => 'required',
            'Position' => 'required',
            'Password' => 'required | min:6'
        ]);

         Admin::create([
            'username' => $request->Username,
            'type' => $request->Type,
            'position' => $request->Position,
            'password' => $request->Password
         ]);

         return response()->json("success");
    }

    public function deleteUser(Request $request){

        Admin::where('admin_id', $request->adminId)->delete();

        return response()->json("success");
    }

    public function editStudent(Request $request){

        $request->validate([
            'Fullname' => 'required',
            'Course' => 'required',
            'Year' => 'required| numeric',
            'Email' => 'required | email',
            'Status' => 'required'
        ]);

        
       Students::where('student_id', $request->id)->update([
        'fullname' => $request->Fullname,
        'course' => $request->Course,
        'year' => $request->Year,
        'email' => $request->Email,
        'status' => $request->Status,
       ]);
       if($request->Password != null)
       {
           $request->validate([
              'Password' => 'required | min:6' 
           ]);
           Students::where('student_id', $request->id)->update([
            'password' => $request->Password
           ]);
       }

        return response()->json("success");

        


    }

    public function deleteStudent (Request $request){

        Students::where('student_id', $request->studentId)->delete();

        return response()->json("success");
    }

    public function addCourse (Request $request){

        $request->validate([
            'Course' => 'required| unique:course,course'
        ]);

        $course = new Course;
        $course->course = strtoupper($request->Course);
        $course->save();

        return response()->json("success");
    }

    public function deleteCourse (Request $request){

        Course::where('course_id',$request->courseId)->delete();
        return response()->json("success");
    }
}
