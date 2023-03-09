<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class createController extends Controller
{
    public function create(Request $request){

        $request->validate([
            'studentId'=>'required',
            'username'=>'required',   
            'course'=>'required',
            'year'=>'required',
            'email'=>'required| email',
            'password' => 'min:6|required_with:retypePassword|same:retypePassword',
            'retypePassword' => 'min:6'
        ],
        [
            'username.required'=>'Username Required',
            'password.required'=>'Password Required',
        
        ]);

        return response()->json("sample");
    }
}
