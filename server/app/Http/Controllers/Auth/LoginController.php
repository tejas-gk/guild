<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Auth\LoginService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(LoginService $loginService, Request $request)
    {
        $loginUser = $loginService->login($request);

        return $loginUser;
    }

     public function logout()
     {
         auth()->guard('web')->logout();

         return response()->json([
             'message' => 'Logged out',
         ]);
     }

     public function refresh()
     {
         return $this->respondWithToken(auth()->refresh());
     }

     public function me(Request $request)
     {
         $token = $request->bearerToken();
         // dd($token);

         $token = $request->user()->where('id',

         )->first();
         dd($token);
         $loggedUser = User::whereHas('tokens', function ($query) use ($token) {
             $query->where('token', $token);
         })->first();
         dd($loggedUser);
     }

     protected function respondWithToken($token)
     {
         return response()->json([
             'access_token' => $token,
             'token_type' => 'bearer',
             'expires_in' => auth()->factory()->getTTL() * 60,
         ]);
     }

     public function currentUser(Request $request)
     {
         $user = auth()->user();

         return response()->json($user);
     }
}
