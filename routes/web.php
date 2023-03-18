<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
use App\Http\Controllers\createController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\managerController;
use App\Http\Controllers\studentController; 
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

        //Events
            Route::post('/events',[managerController::class,'events']);
            Route::post('/newEvent',[managerController::class, 'newEvent']);
            Route::post('/deleteEvent',[managerController::class,'deleteEvent']);
            Route::post('/storeVouchers',[managerController::class,'storeVouchers']);
            Route::post('/fetchVouchers',[managerController::class,'fetchVouchers']);
            Route::get('/fetchVouchedStudents',[managerController::class,'vouchedStudents']);

        //Announcement
            Route::post('/announcement',[managerController::class,'announcement']);
            Route::post('/newAnnouncement',[managerController::class,'newAnnouncement']);
            Route::post('/deleteAnnouncement',[managerController::class,'deleteAnnouncement']);
    
    //Student
        Route::get('/students/events',[studentController::class,'fetchEvents']);
        Route::post('/students/announcements',[studentController::class,'fetchAnnouncements']);
        Route::post('/students/entranceVoucher',[studentController::class,'entranceVoucher']);
        Route::post('/students/exitVoucher',[studentController::class,'exitVoucher']);

    //Admin
    Route::get('/admin/fetchAll',[adminController::class,'fetchAll']);
    Route::get('/admin/searchData',[adminController::class,'searchData']);
    Route::post('/admin/editTime',[adminController::class,'editTime']);
    Route::post('/admin/editAdmin',[adminController::class,'editAdmin']);
    Route::post('/admin/addUser',[adminController::class,'addUser']);
    Route::post('/admin/deleteUser',[adminController::class,'deleteUser']);
    Route::post('/admin/editStudent',[adminController::class,'editStudent']);
    Route::post('/admin/deleteStudent',[adminController::class,'deleteStudent']);
    Route::post('/admin/addCourse',[adminController::class,'addCourse']);
    Route::post('/admin/deleteCourse',[adminController::class,'deleteCourse']);
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