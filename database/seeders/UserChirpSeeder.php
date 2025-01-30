<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Chirp;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserChirpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define the start and end dates
        $startDate = Carbon::create(2025, 1, 1);
        $endDate = Carbon::create(2025, 1, 7);

        // Create 10 users
        User::factory(10)->create()->each(function ($user) use ($startDate, $endDate) {
            // Set a random account creation date
            $user->created_at = $this->randomDate($startDate, $endDate);
            $user->save();

            // Create random chirps (between 1 and 10) for each user
            $chirpCount = rand(1, 10);
            for ($i = 0; $i < $chirpCount; $i++) {
                Chirp::create([
                    'user_id' => $user->id,
                    'message' => fake()->sentence(),
                    'created_at' => $this->randomDate($startDate, $endDate),
                ]);
            }
        });
    }

    /**
     * Generate a random date between two dates.
     *
     * @param Carbon $start
     * @param Carbon $end
     * @return Carbon
     */
    private function randomDate($start, $end)
    {
        return Carbon::createFromTimestamp(rand($start->timestamp, $end->timestamp));
    }
}
