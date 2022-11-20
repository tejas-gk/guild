<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_the_user_is_registered()
    {
        $response = $this->post('/api/register', [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => fake()->password(),
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_logged_in()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_logged_out()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
        $response = $this->post('/api/logout', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_forgot_password()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/forgot-password', [
            'email' => $user->email,
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_reset_password()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/reset-password', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_verify_email()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response=$this->get('/api/verify-email/'.$user->id.'/'.$user->email_verification_token);
        $response->assertStatus(200);
    }

    public function test_the_user_is_verify_email_link()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->get('/api/email/verify/'.$user->id.'/'.$user->hash);
        $response->assertStatus(200);
    }

    public function test_the_user_is_two_factor_auth()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/two-factor-authentication', [
            'email' => $user->email,
        ]);
        $response->assertStatus(200);
    }

    public function test_the_user_is_two_factor_auth_verify()
    {
        $user = User::factory()->create();
        $hasUser = $user ? true : false;
        $this->assertTrue($hasUser);
        $response = $this->post('/api/two-factor-authentication', [
            'email' => $user->email,
        ]);
        $response->assertStatus(200);
        $response = $this->post('/api/two-factor-authentication-verify', [
            'email' => $user->email,
            'code' => $user->code,
        ]);
        $response->assertStatus(200);
    }
}
