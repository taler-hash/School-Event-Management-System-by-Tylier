<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use DB;
use Session;
class loginController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'Username' => 'required ',
            'Password' => 'required'
        ]);
        $checkTableadmin = DB::table('admin')
        ->where('username', $request->Username)
        ->where('password', $request->Password)->get();
        if($checkTableadmin->isNotEmpty() && $checkTableadmin->pluck('type')->implode(', ') === 'admin')
        {
            session(['name'=> $request->Username ,'data'=> $checkTableadmin->pluck('type')->implode(', ')]);
            return response()->json("admin");
        }
        else
        {
            $checkTablemanager = DB::table('admin')
            ->where('username', $request->Username)
            ->where('password', $request->Password)->get();

            $checkTableusers = DB::table('users')
            ->where('student_id', $request->Username)
            ->where('password', $request->Password)
            ->where('status', 'active')->get();

            if($checkTablemanager->isNotEmpty() && $checkTableadmin->pluck('type')->implode(', ') === 'manager')
            {
                session(['name'=> $request->Username ,'data'=> $checkTablemanager->pluck('type')->implode(', ')]);
                return response()->json("manager");
            }
            if($checkTableusers->isNotEmpty())
            {
                session(['name'=> $request->Username ,'data'=> 'student']);
                return response()->json("student");
            }
            return response()->json("fail");
        }
        
    }
}
