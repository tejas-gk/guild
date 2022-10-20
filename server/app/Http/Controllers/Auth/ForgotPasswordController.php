<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $user->sendPasswordResetNotification($request->token);

        return response()->json([
            'message' => 'We have e-mailed your password reset link!',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password reset successfully!',
        ]);
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

    public function twoFactorAuthentication(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }

        $code = random_int(100000, 999999);
        $user->two_factor_code = $code;
        $user->save();
        //  send email
        Mail::to($user->email)->send(new \App\Mail\TwoFactorAuthentication($code));

        return response()->json([
            'message' => 'Two factor authentication code sent on your email id',
        ]);
    }
}
