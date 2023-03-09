<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class userController extends Controller
{
    public function logout(){
        if(Session::has('name')){
            dd(session('name'));
            Session::forget(['name','type']);
            return redirect('/login');
        }
    }
}
