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
            'RawLog' => RawLog::select("*")->paginate(10),
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

            case("Announcement"):
                $data = 
                Announcement::select("*")
                ->where('header','like', '%'.$searchString.'%')
                ->orWhere('courses','like', '%'.$searchString.'%')
                ->orWhere('created_by','like', '%'.$searchString.'%')
                ->paginate(10);
            break;

            case("Rawlogs"):
                $data = 
                Rawlog::select('*')
                ->where('event_id','like', '%'.$searchString.'%')
                ->orWhere('student_id','like', '%'.$searchString.'%')
                ->orWhere('entrance_voucher','like', '%'.$searchString.'%')
                ->orWhere('exit_voucher','like', '%'.$searchString.'%')
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
        dd($request->all());
        $request->validate([
            'StartTime' => 'required',
            'EndTime' => 'required | after:StartTime',
            'startDate' => 'required | after:today',
        ],
        [
            'Date.after' => 'The Date needs to be later than now.'
        ]
        );
        

    }
}
