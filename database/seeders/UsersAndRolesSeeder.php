<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UsersAndRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['gerente', 'analista', 'jefe', 'desarrollador'];

        foreach ($roles as $roleName) {
            Role::create(['name' => $roleName]);
        }

        $usersData = [
            [
                'name' => 'Gerente',
                'role' => 'gerente',
            ],
            [
                'name' => 'Analista',
                'role' => 'analista',
            ],
            [
                'name' => 'Jefe',
                'role' => 'jefe',
            ],
            [
                'name' => 'Desarrollador',
                'role' => 'desarrollador',
            ]
        ];

        foreach ($usersData as $userData) {
            $userData = User::create([
                'name' => $userData["name"],
                'email' => strtolower($userData["name"]) . '@gmail.com',
                'password' => bcrypt('password'),
            ]);
            // $user = User::where("name", $userData["name"])->first();
            // $userRole = Role::where("name", $userData["role"])->first();
            // $user->assignRole($userRole);
        }

        foreach ($usersData as $userData) {
            $user = User::where("name", $userData["name"])->first();
            $userRole = Role::where("name", $userData["role"])->first();
            $user->assignRole($userRole);
        }
    }
}
