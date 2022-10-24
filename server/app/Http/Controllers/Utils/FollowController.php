<?php

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Follow;
class FollowController extends Controller
{
    public function follow($id){
        $follow = Follow::where('follower_id',auth()->user()->id)->where('followed_id', $id)->first();
        if($follow==NULL){
            $follow = new Follow();
            $follow->follower_id = auth()->user()->id;
            $follow->followed_id = $id;
            $follow->save();
            return response()->json(['message' => 'Follow created']);
        }
        $follow->delete();
        return response()->json(['message' => 'Follow deleted']);
    }

    public function isFollowing($id){
        $follow = Follow::where('follower_id',auth()->user()->id)->where('followed_id', $id)->first();
        if($follow==NULL){
            return response()->json(['message' => 'Not following']);
        }
        return response()->json(['message' => 'Following']);
    }
    public function getFollowersCount($id){
        $followers = Follow::where('followed_id', $id)
        ->with('follower:id,name')
        ->get();
        return response()->json(['message' => $followers->count(),'followers' => $followers]);
    }
    public function getFollowingsCount($id){
        $followings = Follow::where('follower_id', $id)
        ->with('followed:id,name')
        ->get();
        return response()->json(['message' => $followings->count(),'followings'=>$followings]);
    }
}
