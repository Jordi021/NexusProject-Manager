<?php

namespace Database\Seeders;

use App\Models\Analyst;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ProjectContract;
use App\Models\Customer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersAndRolesSeeder::class);
        Customer::factory()->count(15)->create();
        ProjectContract::factory()->count(20)->create();
        User::factory(10)->create();
        Analyst::syncWithUsers();
    }
}
