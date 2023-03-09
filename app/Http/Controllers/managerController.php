<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class managerController extends Controller
{
    public function logout(){
        if(Session::has('name')){
            Session::forget(['name','type']);
            return redirect('/login');
        }
    }
}
