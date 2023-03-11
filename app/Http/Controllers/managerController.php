<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Students;
use App\Models\Event;
use Carbon\Carbon;

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
        $students = Students::select('student_id','fullname','course','year')->get();
        return response()->json($students);
    }
    public function newEvent(Request $request){
        $request->validate([
            'Picture' => '|image |mimes:jpeg,png,jpg,gif,svg|max:2048',
            'Header' => 'required',
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
        $picture->move(public_path('images/'.$request->input('managerName')), $filename);
        
        $event = new Event();
            $event->picture = $filename;
            $event->header =  $request->input('Header');
            $event->description = $request->input('Description');
            $event->total_students = $request->input('TotalStudents');
            $event->courses =  collect($request->input('Courses'))->implode(",");
            $event->start_date = $request->input('managerName');
            $event->start_date = $request->input('Date');
            $event->start_time = $request->input('StartTime');
            $event->end_time = $request->input('EndTime');
            $event->save();
        return response()->json("success");
    }
}
