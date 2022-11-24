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
    public function update(Request $request)
    {
      $updateProfile=new Profile();
    $profile=$updateProfile->updateOrCreate(
            ['user_id' => auth()->user()->id],
            [
                'bio' => $request->bio,
            'banner' => $request->banner,
            'readme'=>$request->readme,
            
        ],);
        $user=new User();
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
        ]);

    }

    public function show(Request $request,int $id){
        $user=User::find($id);
        $profile=Profile::where('user_id',$id)->first();
        return response()->json([
            'user'=>$user,
            'profile'=>$profile,
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
