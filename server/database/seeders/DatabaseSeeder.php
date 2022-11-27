<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Post::factory(10)->create();
        \App\Models\Comment::factory(10)->create();


        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        \App\Models\Comment::factory(10)->create([
            'user_id' => 1,
            'post_id' => 1,
        ]);
        \App\Models\Profile::create([
            'user_id' => 1,
            'reputation' => 0,
            'bio' => 'This is a test user.',
            'banner' => null,
            'readme' => '
                # Test User
                * hey there*
            ',
        ]);
    }
}
