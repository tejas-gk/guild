<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\TwoFaController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Utils\VoteController;
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
Route::get('posts/{id}', [PostController::class, 'show']);
Route::get('/current-user', [LoginController::class, 'currentUser'])->middleware('auth:sanctum');
Route::post('post', [App\Http\Controllers\Post\PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('posts', [App\Http\Controllers\Post\PostController::class, 'index'])->middleware('auth:sanctum');
Route::post('forgot-password', [ForgotPasswordController::class, 'forgotPassword'])->name('password.reset');
Route::delete('delete-post/{id}', [App\Http\Controllers\Post\PostController::class, 'destroy'])->middleware('auth:sanctum');
// Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('reset-password', [ForgotPasswordController::class, 'resetPassword']);

Route::post('verify-email', [ForgotPasswordController::class, 'verifyEmail'])->middleware('auth:sanctum');
Route::get('email/verify/{id}/{hash}', [ForgotPasswordController::class, 'verifyEmailLink'])->name('verification.verify')->middleware('auth:sanctum');
Route::post('two-factor-authentication', [TwoFaController::class, 'twoFactorAuthentication'])->middleware('auth:sanctum');

Route::get('/sign-in/github', function () {
    return Socialite::driver('github')->redirect();
})->name('gh')->middleware('web');

Route::get('/sign-in/github/redirect', function () {
    $user = Socialite::driver('github')->stateless()->user();
    // dd($user);
    $user = \App\Models\User::firstOrCreate([
        'email' => $user->getEmail(),
    ], [
        'name' => $user->getName(),
        'password' => bcrypt('password'),
        'email_verified_at' => now(),
    ]);

    return redirect('http://localhost:8000');
})->middleware(['web']);

Route::post('verify-email', [VerifyEmailController::class, 'verifyEmail'])->middleware('auth:sanctum');
Route::get('email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');
Route::post('resend-verify-email', [VerifyEmailController::class, 'resend'])->middleware('auth:sanctum');

Route::get('comment', [App\Http\Controllers\Post\CommentController::class, 'index'])->middleware('auth:sanctum');
Route::post('comment', [App\Http\Controllers\Post\CommentController::class, 'store'])->middleware('auth:sanctum');
Route::get('comment/{id}', [App\Http\Controllers\Post\CommentController::class, 'show'])->middleware('auth:sanctum');

Route::apiResource('guilds', App\Http\Controllers\Guild\GuildController::class)->middleware('auth:sanctum');

Route::post('upvote/{id}', [VoteController::class, 'upvote'])->middleware('auth:sanctum');
Route::post('downvote/{id}', [VoteController::class, 'downvote'])->middleware('auth:sanctum');
Route::post('follow/{id}', [App\Http\Controllers\Utils\FollowController::class, 'follow'])->middleware('auth:sanctum');
Route::get('vote/{id}', [VoteController::class, 'getVoteCount'])->middleware('auth:sanctum');
Route::get('follower/{id}', [App\Http\Controllers\Utils\FollowController::class, 'getFollowersCount'])->middleware('auth:sanctum');
Route::get('following/{id}', [App\Http\Controllers\Utils\FollowController::class, 'getFollowingsCount'])->middleware('auth:sanctum');
Route::get('is-following/{id}', [App\Http\Controllers\Utils\FollowController::class, 'isFollowing'])->middleware('auth:sanctum');
Route::get('user/{id}', [App\Http\Controllers\User\UserController::class, 'show']);
Route::get('suggest-users', [App\Http\Controllers\User\UserController::class, 'suggestUsers']);
Route::post('update-profile', [App\Http\Controllers\User\ProfileController::class, 'update'])->middleware('auth:sanctum');
Route::get('profile/{id}', [App\Http\Controllers\User\ProfileController::class, 'show']);
