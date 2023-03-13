<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rawlog', function (Blueprint $table) {
            $table->increments('rawlog_id');
            $table->string('event_id', '300');
            $table->string('student_id', '300');
            $table->string('entrance_voucher', '300');
            $table->string('exit_voucher', '300')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rawlog');
    }
};
