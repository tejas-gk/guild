<?php

namespace Tests\Feature;

use Tests\TestCase;

class PostTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_if_user_can_post()
    {
        $response = $this->post('/api/post', [
            'post' => 'This is a test post',

        ]);
        $response->assertStatus(200);
    }
}
