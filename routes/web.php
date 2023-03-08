<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//View Routes
Route::get('/login', function () {
    return view('login');
});

Route::get('/admin/dashboard', function () {
    return view('/admin/index');
});

//Api Routes
Route::post('/api/login',[loginController::class,'login']);