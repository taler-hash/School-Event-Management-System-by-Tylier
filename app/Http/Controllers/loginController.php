<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use DB;
class loginController extends Controller
{
    public function login(Request $request){
        $checkDbadmin = DB::table('admin')
        ->where('username', $request->username)
        ->where('password', $request->password)->first();
        if($checkDbadmin)
        {
            $request->session()->put('LoginId', $request->username);
            return response()->json("success");
        }
        else
        {
            
        }
        
    }
}
