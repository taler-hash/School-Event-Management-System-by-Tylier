<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Students;

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
}
