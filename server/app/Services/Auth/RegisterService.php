<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Class registerService.
 */
class registerService
{
    public function createUser(Request $request): User
    {
        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $user;
    }

        public function uploadAvatar(Request $request): ?string
        {
            return ($request->hasFile('avatar'))
                ? $request->file('avatar')->store('avatars')
                : null;
        }
}
