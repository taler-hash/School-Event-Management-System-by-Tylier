<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

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
}
