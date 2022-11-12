<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Services\Auth\RegisterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(RegisterService $registerService, Request $request): JsonResponse
    {
        $validateUser=Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validateUser->fails()) {
            return response()->json([
                'message' => 'Validation Error.',
                'errors' => $validateUser->errors()
            ], 422);
        }

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
