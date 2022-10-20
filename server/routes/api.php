<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', function () {
    return \App\Models\User::all();
});
Route::get('/current-user', [LoginController::class, 'currentUser'])->middleware('auth:sanctum');
Route::post('post', [App\Http\Controllers\Post\PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('post', [App\Http\Controllers\Post\PostController::class, 'index'])->middleware('auth:sanctum');
Route::post('forgot-password', [ForgotPasswordController::class, 'forgotPassword'])->name('password.reset');
Route::get('forgot-password/{token}', [ForgotPasswordController::class, 'resetPassword']);
// Route::post('reset-password', [ForgotPasswordController::class, 'resetPassword'])->name('password.update');

Route::post('verify-email', [ForgotPasswordController::class, 'verifyEmail'])->middleware('auth:sanctum');
Route::get('email/verify/{id}/{hash}', [ForgotPasswordController::class, 'verifyEmailLink'])->name('verification.verify')->middleware('auth:sanctum');
Route::post('two-factor-authentication', [ForgotPasswordController::class, 'twoFactorAuthentication'])->middleware('auth:sanctum');
