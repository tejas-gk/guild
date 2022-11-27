<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $isUpvoteOrDownvote = $this->faker->boolean;
        return [
            'user_id' => \App\Models\User::factory(),
            'post_id' => \App\Models\Post::factory(),
             ($isUpvoteOrDownvote ? 'upvote' : 'downvote') => $isUpvoteOrDownvote,
             
        ];
    }
}
