<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Announcement;
use App\Models\Students;
use App\Models\RawLog;
use Storage;

class studentController extends Controller
{
    public function fetchEvents(Request $request){
        $user = Students::select("course")->where("student_id",$request->studentId)->first();
        $events = Event::select('*')->where('courses', 'LIKE','%'.$user->course.'%')->orderBy('event_id', 'desc')->get();
        $voucher = Rawlog::with('students')->get();
        return response()->json(['eventData'=>$events, 'vouchers'=>$voucher]);
    }

    public function fetchAnnouncements(Request $request){
        $user = Students::select("course")->where("student_id",$request->studentId)->first();
        $announcements = Announcement::select('*')->where('courses', 'LIKE','%'.$user->course.'%')->orderBy('announcement_id', 'desc')->get();
        return response()->json($announcements);
    }

    public function entranceVoucher(Request $request){
        $vouchers = Storage::disk('vouchers')->get("{$request->eventId}_$request->createdBy.json");
        $json = json_decode($vouchers, true);
        $entranceVoucher = Rawlog::where('entrance_voucher', $request->entranceVoucher)->doesntExist();
        foreach($json[0]['voucherIn'] as $key=>$voucher)
        {
            if($voucher['voucher'] === $request->entranceVoucher)
            {
                
                if($entranceVoucher)
                {
                    $rawlog = new RawLog();
                    $rawlog->event_id = $request->eventId;
                    $rawlog->student_id = $request->studentId;
                    $rawlog->entrance_voucher = $request->entranceVoucher;
                    $rawlog->save();
                    return response()->json("success");
                    break;
                }
                else
                {
                    return response()->json("already used");
                    break;
                }
                
            }
        }
        return response()->json("not found");

    }
    
    public function exitVoucher(Request $request){
        $vouchers = Storage::disk('vouchers')->get("{$request->eventId}_$request->createdBy.json");
        $json = json_decode($vouchers, true);
        $exitVoucher = Rawlog::where('exit_voucher', $request->exitVoucher)->doesntExist();
        foreach($json[0]['voucherOut'] as $key=>$voucher)
        {
            if($voucher['voucher'] === $request->exitVoucher)
            {
                if($exitVoucher)
                {
                     Rawlog::where('student_id',$request->studentId)
                     ->where('event_id',$request->eventId)
                     ->update(['exit_voucher' => $request->exitVoucher]);
                    return response()->json("success");
                    break;
                }
                else
                {
                    return response()->json("already used");
                    break;
                }
                
            }
        }
        return response()->json("not found");

    }
}
