<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Profile;
use App\Models\User;
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
    public function updateProfile(Request $request)
    {
        $user = User::find($request->id);
        $profile = Profile::where('user_id', $request->id)->first();
        if ($request->name) {
            $user->name = $request->name;
        }
        if ($request->email) {
            $user->email = $request->email;
        }
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        if ($request->bio) {
            $profile->bio = $request->bio;
        }
        if ($request->banner) {
            $profile->banner = $request->banner;
        }
        if ($request->readme) {
            $profile->readme = $request->readme;
        }
        $user->save();
        $profile->save();
        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function getProfileByUser(Request $request)
    {
        $user = User::where('name', $request->name)->first();
        $profile = Profile::where('user_id', $user->id)->first();
        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function storeProfile(Request $request,int $id)
    {
        $user = User::find($request->id);
        $profile = Profile::updateOrCreate(
            ['user_id'=> $id],
            [
                'reputation' => 0,
                'bio' => $request->bio,
                'banner' => $request->banner,
                'readme' => $request->readme,
            ]
        );
        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

}
