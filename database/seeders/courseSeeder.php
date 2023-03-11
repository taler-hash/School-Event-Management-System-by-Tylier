<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use DB;

class courseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('course')->insert([
            ['course'=> 'BSIT'],
            ['course'=> 'BSED'],
            ['course'=> 'BaPolsci'],
            ['course'=> 'BEED'],
            ['course'=> 'BSHM'],
            ['course'=> 'BSHRM'],
        ]);
    }
}
