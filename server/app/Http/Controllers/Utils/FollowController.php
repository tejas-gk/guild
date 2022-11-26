<?php

declare(strict_types=1);

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Controller;
use App\Models\Follow;

class FollowController extends Controller
{
    public function follow($id)
    {
        $follow = Follow::where('follower_id', auth()->user()->id)->where('followed_id', $id)->first();
        if ($follow == null) {
            $follow = new Follow();
            $follow->follower_id = auth()->user()->id;
            $follow->followed_id = $id;
            $follow->save();

            return response()->json(['message' => 'Follow created']);
        }
        $follow->delete();

        return response()->json(['message' => 'Follow deleted']);
    }

    public function isFollowing($id)
    {
        $follow = Follow::where('follower_id', auth()->user()->id)->where('followed_id', $id)->first();
        if ($follow == null) {
            return response()->json(['message' => 'Not following']);
        }

        return response()->json(['message' => 'Following', 'idi' => 1]);
    }

    public function getFollowersCount($id)
    {
        $followers = Follow::where('followed_id', $id)
            ->with('follower:id,name')
            ->get();

        return response()->json(['followerCount' => $followers->count(), 'followers' => $followers]);
    }

    public function getFollowingsCount($id)
    {
        $followings = Follow::where('follower_id', $id)
            ->with('followed:id,name')
            ->get();

        return response()->json(['following' => $followings->count(), 'followings' => $followings]);
    }
}
