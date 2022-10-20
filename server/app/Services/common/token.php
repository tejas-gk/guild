<?php

namespace App\Services\common;

/**
 * Class token.
 */
class token
{
    public function createToken($user)
    {
        $token = $user->createToken('auth_token')->plainTextToken;

        return $token;
    }
}
