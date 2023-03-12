<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class createController extends Controller
{
    public function create(Request $request){
        $request->validate([
            'Studentid'=>'required | unique:users,student_id',
            'Username'=>'required | unique:users,fullname',     
            'Course'=>'required',
            'Year'=>'required',
            'Email'=>'required| email | unique:users,email',
            'Password' => 'min:6|required_with:Retypepassword|same:Retypepassword',
            'Retypeassword' => 'min:6'
        ],
        [
            'Username.required'=>'Username Required',
            'Password.required'=>'Password Required',
            'Password.same' =>'The password must be the same in Retype Password'
        
        ]);
        DB::table('users')->insert([
            'student_id' => $request->Studentid,
            'fullname' => strtoupper($request->Username),
            'course' => $request->Course,
            'year' => $request->Year,
            'email' => $request->Email,
            'password' => $request->Password,
            'status' => 'active'
        ]);
        return response()->json("sample");
    }
}
