<?php

declare(strict_types=1);

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
