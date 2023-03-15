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
            'Events' => Event::select("*")->get(),
            'Announcement' => Announcement::select("*")->get(),
            'RawLog' => RawLog::select("*")->get(),
            'Admin' => Admin::select("*")->get(),
            'Students' => Students::select("*")->get(),
            'Courses' => Course::select("*")->get()
        ]);
    }
}
