<?php

declare(strict_types=1);

namespace App\Services\User;

use Illuminate\Http\Request;

/**
 * Class ProfileService.
 */
class ProfileService
{
    public function uploadAvatar(Request $request): ?string
    {
        return ($request->hasFile('avatar'))
            ? $request->file('avatar')->store('avatars')
           : null;
    }
}
