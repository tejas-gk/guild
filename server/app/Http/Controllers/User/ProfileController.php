<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use App\Services\User\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = User::find($request->id);
        $profile = Profile::where('user_id', $request->id)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function update(Request $request, ProfileService $profiler)
    {
        $updateProfile = new Profile();
        $avatar = $profiler->uploadAvatar($request);
        $profile = $updateProfile->updateOrCreate(
            ['user_id' => auth()->user()->id],
            [
                'bio' => $request->bio,
                'banner' => $request->banner,
                'readme' => $request->readme,
            ],
        );
        // upload avatar
        $user = new User();
        $user->updateOrCreate(
            ['id' => auth()->user()->id],
            [
                'name' => $request->name,
                'password' => Hash::make($request->password),
            ]
        );

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
            'user'=>$user,
        ]);
    }

    public function show(Request $request, int $id)
    {
        $user = User::find($id);
        $profile = Profile::where('user_id', $id)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }
}
