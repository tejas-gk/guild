<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TwoFA;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class TwoFaController extends Controller
{
    public function twoFactorAuthentication(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ( ! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $recoverCode = $this->generateRecoveryCode();
        $twoFA = new TwoFA();
        $code = random_int(100000, 999999);
        $twoFA->user_id = $user->id;
        $twoFA->two_factor_code = $code;
        $twoFA->two_factor_expires_at = now()->addMinutes(5);
        $twoFA->recovery_code = $recoverCode;
        $twoFA->save();
        // dd($recoverCode);
        //  send email
        Mail::to($user->email)->send(new \App\Mail\TwoFactorAuthentication($twoFA, $recoverCode));

        return response()->json([
            'message' => 'Two factor authentication code sent on your email id',
            'recovery_code' => $recoverCode,
        ]);
    }

    public function verifyTwoFactorAuthentication(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ( ! $user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
            ], 404);
        }
        $twoFA = TwoFA::where('user_id', $user->id)->where('two_factor_code', $request->code)->first();
        if ( ! $twoFA) {
            return response()->json([
                'message' => 'Invalid two factor authentication code.',
            ], 404);
        }
        if (now()->gt($twoFA->two_factor_expires_at)) {
            return response()->json([
                'message' => 'Two factor authentication code expired.',
            ], 404);
        }
        $twoFA->delete();

        return response()->json([
            'message' => 'Two factor authentication code verified successfully!',
        ]);
    }

    public function generateRecoveryCode()
    {
        $recoverCode = Str::random(10);
        for ($i = 0; $i < 4; $i++) {
            $recoverCode = substr_replace($recoverCode, '-', rand(0, strlen($recoverCode)), 0);
            $recoveryCode[$i] = $recoverCode;
        }
        $toString = implode('', $recoveryCode);

        return serialize($toString);
    }
}
