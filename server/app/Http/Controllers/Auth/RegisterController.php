<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\RegisterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(RegisterService $registerService, Request $request): JsonResponse
    {
        $user = $registerService->createUser($request);
        $avatar = $registerService->uploadAvatar($request);
        $token = $user->createToken('auth_token', ['user', 'post', 'groups'])->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
