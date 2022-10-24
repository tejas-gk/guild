<?php

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vote;
use App\Models\Post;
class VoteController extends Controller
{
    public function index()
    {
        $votes = Vote::with('user:id,name')->get();

        return response()->json($votes);
    }
    public function upvote(Request $request)
    {
        $vote = Vote::where('user_id',auth()->user()->id)->where('post_id', $request->post_id)->first();
        if($vote==NULL){
            $vote = new Vote();
            $vote->user_id = auth()->user()->id;
            $vote->post_id = $request->post_id;
            $vote->vote=1;
            $vote->save();
            return response()->json(['message' => 'Vote created']);
        }

        else if($vote->vote == 0){
            $vote->vote=1;
            $vote->save();
            return response()->json(['message' => 'Vote',$vote]);
        }
            $vote->delete();
            return response()->json(['message' => 'Vote deleted']);

    }

    public function downvote(Request $request){
        $vote = Vote::where('user_id',auth()->user()->id)->where('post_id', $request->post_id)->first();
        if($vote==NULL){
            $vote = new Vote();
            $vote->user_id = auth()->user()->id;
            $vote->post_id = $request->post_id;
            $vote->vote=-1;
            $vote->save();
            return response()->json(['message' => 'Vote created']);
        }
        else if($vote->vote == 1){
            $vote->vote=0;
            $vote->save();
            return response()->json(['message' => 'Vote',$vote]);
        }
            $vote->delete();
            return response()->json(['message' => 'Vote deleted']);      
    }

    public function getVoteCount($id){
        $votes = Vote::where('post_id', $id)->get();
        $upvotes = 0;
        $downvotes = 0;
        foreach($votes as $vote){
            if($vote->vote == 1){
                $upvotes++;
            }
            else if($vote->vote == -1){
                $downvotes++;
            }
        }
        return response()->json(['message' => $upvotes-$downvotes]);
    }
    

}
