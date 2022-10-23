<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\TwoFaController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Post\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('sanctum/csrf-cookie', function (Request $request) {
    return response()->json(['status' => 'success']);
});

Route::post('register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', function () {
    return \App\Models\User::all();
});
Route::get('post/{id}', [PostController::class, 'show']);
Route::get('/current-user', [LoginController::class, 'currentUser'])->middleware('auth:sanctum');
Route::post('post', [App\Http\Controllers\Post\PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('post', [App\Http\Controllers\Post\PostController::class, 'index'])->middleware('auth:sanctum');
Route::post('forgot-password', [ForgotPasswordController::class, 'forgotPassword'])->name('password.reset');
// Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('reset-password', [ForgotPasswordController::class, 'resetPassword']);

Route::post('verify-email', [ForgotPasswordController::class, 'verifyEmail'])->middleware('auth:sanctum');
Route::get('email/verify/{id}/{hash}', [ForgotPasswordController::class, 'verifyEmailLink'])->name('verification.verify')->middleware('auth:sanctum');
Route::post('two-factor-authentication', [TwoFaController::class, 'twoFactorAuthentication'])->middleware('auth:sanctum');

Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/callback', function () {
    $user = Socialite::driver('github')->user();
});

Route::post('verify-email', [VerifyEmailController::class, 'verifyEmail'])->middleware('auth:sanctum');
Route::get('email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');
Route::post('resend-verify-email', [VerifyEmailController::class, 'resend'])->middleware('auth:sanctum');

Route::get('comment', [App\Http\Controllers\Post\CommentController::class, 'index'])->middleware('auth:sanctum');
Route::post('comment', [App\Http\Controllers\Post\CommentController::class, 'store'])->middleware('auth:sanctum');
Route::get('comment/{id}', [App\Http\Controllers\Post\CommentController::class, 'show'])->middleware('auth:sanctum');
