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
        Schema::create('events', function (Blueprint $table) {
            $table->increments('event_id');
            $table->string('picture', '300');
            $table->string('header', '300');
            $table->string('description', '300');
            $table->string('total_students', '300');
            $table->string('courses', '300');
            $table->string('created_by', '300');
            $table->string('start_date', '300');
            $table->string('start_time', '300');
            $table->string('end_time', '300');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
