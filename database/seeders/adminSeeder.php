<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;

class adminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(!Admin::select('*')->first())
        {
            $admin = new Admin();
            $admin->username ='ctuadmin';
            $admin->password = 'ctuadmin123';
            $admin->type = 'admin';
            $admin->position = 'admin';
            $admin->save();

            $admin = new Admin();
            $admin->username ='ctuteacher';
            $admin->password = 'ctuteacher123';
            $admin->type = 'manager';
            $admin->position = 'teacher';
            $admin->save();

            $admin = new Admin();
            $admin->username ='ctussg';
            $admin->password = 'ctussg123';
            $admin->type = 'manager';
            $admin->position = 'ssg';
            $admin->save();
        }
    }
}
