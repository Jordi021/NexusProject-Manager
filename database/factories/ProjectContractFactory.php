<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectContract>
 */
class ProjectContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => Customer::factory(), 
            'problem' => $this->faker->sentence(),
            'requirements' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['approved', 'rejected', 'pending']),
        ];
    }
}
