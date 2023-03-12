<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
use App\Http\Controllers\createController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\managerController;
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
Route::get('/', function () {
    return redirect('/login');
});


//Api Routes
//Login
Route::prefix('api')->group(function(){
    Route::post('/login',[loginController::class,'login']);
    Route::post('/create',[createController::class,'create']);
    

    //Manager
    Route::get('/course',[managerController::class,'course']);
    Route::get('/students',[managerController::class,'students']);
    Route::post('/newEvent',[managerController::class, 'newEvent']);
    Route::post('/events',[managerController::class,'events']);
    Route::post('/deleteEvent',[managerController::class,'deleteEvent']);
});

//Admin
Route::prefix('admin')->middleware('adminAuth')->group(function(){
    Route::get('/dashboard', function () {
        return view('/admin/index');
    });
});

//Manager
Route::prefix('manager')->middleware('managerAuth')->group(function(){
    Route::get('/dashboard', function () {
        return view('/manager/index');
    });
});

//Student
Route::prefix('student')->middleware('studentAuth')->group(function(){
    Route::get('/dashboard', function () {
        return view('/student/index');
    });
});

Route::post('/api/logout',[adminController::class,'logout']);