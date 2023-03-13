<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Students;
use App\Models\RawLog;
use Storage;

class studentController extends Controller
{
    public function fetchEvents(Request $request){
        $user = Students::select("course")->where("student_id",$request->studentId)->first();
        $events = Event::select('*')->where('courses', 'LIKE','%'.$user->course.'%')->orderBy('event_id', 'desc')->get();
        return response()->json($events);
    }
    public function entranceVoucher(Request $request){
        $vouchers = Storage::disk('vouchers')->get("{$request->eventId}_$request->createdBy.json");
        $json = json_decode($vouchers, true);
        foreach($json[0]['voucherIn'] as $key=>$voucher)
        {
            if($voucher['voucher'] === $request->entranceVoucher)
            {
                $rawlog = new RawLog();
                $rawlog->event_id = $request->eventId;
                $rawlog->student_id = $request->studentId;
                $rawlog->entrance_voucher = $request->entranceVoucher;
                $rawlog->save();
                $voucher[0]['voucherIn'][$key]['isUsed'] = 'true';
                return response()->json($voucher[0]['voucherIn'][$key]['isUsed'] = 'true');
                break;
            }
        }
        dd("not found");

    }
}
