<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;

class adminController extends Controller
{
    public function logout(){
        if(Session::has('name')){
            Session::forget(['name','type']);
            return redirect('/login');
        }
    }
}
