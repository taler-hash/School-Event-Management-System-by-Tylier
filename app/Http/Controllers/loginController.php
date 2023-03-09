<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use DB;
use Session;
class loginController extends Controller
{
    public function login(Request $request){
        $checkTableadmin = DB::table('admin')
        ->where('username', $request->username)
        ->where('password', $request->password)->get();
        if($checkTableadmin->isNotEmpty() && $checkTableadmin->pluck('type')->implode(', ') === 'admin')
        {
            session(['name'=> $request->username ,'data'=> $checkTableadmin->pluck('type')->implode(', ')]);
            return response()->json("admin");
        }
        else
        {
            $checkTablemanager = DB::table('admin')
            ->where('username', $request->username)
            ->where('password', $request->password)->get();

            $checkTableusers = DB::table('users')
            ->where('student_id', $request->username)
            ->where('password', $request->password)->get();

            if($checkTablemanager->isNotEmpty() && $checkTableadmin->pluck('type')->implode(', ') === 'manager')
            {
                session(['name'=> $request->username ,'data'=> $checkTablemanager->pluck('type')->implode(', ')]);
                return response()->json("manager");
            }
            if($checkTableusers->isNotEmpty())
            {
                session(['name'=> $request->username ,'data'=> 'student']);
                return response()->json("student");
            }
            return response()->json("fail");
        }
        
    }
}
