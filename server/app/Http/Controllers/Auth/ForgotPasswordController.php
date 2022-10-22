<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        // $user = User::where('email', $request->email)->first();
        // if (! $user) {
        //     return response()->json([
        //         'message' => 'We can\'t find a user with that e-mail address.',
        //     ], 404);
        // }
        // $user->sendPasswordResetNotification($request->token);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        if ($status == Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Reset password link sent on your email id.',
            ], 200);
        }

        return response()->json([
            'message' => 'Unable to send password reset link.',
        ], 500);
    }

    public function resetPassword(Request $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                ])->save();
                $user->setRememberToken(Str::random(60));
                // event(new PasswordReset($user));
            }
        );
        if ($status == Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password reset successfully.',
            ], 200);
        }

        return response()->json([
            'message' => 'Unable to reset password.',
        ], 500);
    }

    public function verifyEmail(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $user->markEmailAsVerified();

        return response()->json([
            'message' => 'Email verified successfully!',
        ]);
    }

    public function resendEmail(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Email verification link sent on your email id',
        ]);
    }

    public function verifyEmailLink($id, $hash)
    {
        $user = User::findOrFail($id);
        if (! $user || ! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json([
                'message' => 'Email verification link is invalid.',
            ], 404);
        }
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email is already verified.',
            ]);
        }
        $user->markEmailAsVerified();

        return response()->json([
            'message' => 'Email verified successfully!',
        ]);
    }
}
