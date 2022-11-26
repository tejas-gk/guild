<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TwoFactorAuthenticationController extends Controller
{
    public function twoFactorAuthentication(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ( ! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $user->sendTwoFactorAuthenticationNotification($request->token);

        return response()->json([
            'message' => 'We have e-mailed your two factor authentication link!',
        ]);
    }
}
