<?php

namespace App\Models;
use App\Models\Students;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawLog extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $connection = 'mysql';
    protected $table = 'rawlog';
    protected $fillable = ['event_id','student_id','entrance_voucher','exit_voucher'];

    public function students()
    {
        return $this->belongsTo(Students::class, 'student_id', 'student_id');
    }

}
