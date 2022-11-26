<?php

declare(strict_types=1);

namespace App\Http\Controllers\Utils;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function index()
    {
        $votes = Vote::with('user:id,name')->get();

        return response()->json($votes);
    }

    public function upvote(Request $request)
    {
        $vote = Vote::where('user_id', auth()->user()->id)->where('post_id', $request->post_id)->first();
        if ($vote == null) {
            $vote = new Vote();
            $vote->user_id = auth()->user()->id;
            $vote->post_id = $request->post_id;
            $vote->vote = 1;
            $vote->save();

            return response()->json(['message' => 'Vote created']);
        } elseif ($vote->vote == 0) {
            $vote->vote = 1;
            $vote->save();

            return response()->json(['message' => 'Vote', $vote]);
        }
        $vote->delete();

        return response()->json(['message' => 'Vote deleted']);
    }

    public function downvote(Request $request)
    {
        $vote = Vote::where('user_id', auth()->user()->id)->where('post_id', $request->post_id)->first();
        if ($vote == null) {
            $vote = new Vote();
            $vote->user_id = auth()->user()->id;
            $vote->post_id = $request->post_id;
            $vote->vote = -1;
            $vote->save();

            return response()->json(['message' => 'Vote created']);
        } elseif ($vote->vote == 1) {
            $vote->vote = 0;
            $vote->save();

            return response()->json(['message' => 'Vote', $vote]);
        }
        $vote->delete();

        return response()->json(['message' => 'Vote deleted']);
    }

    public function getVoteCount(int|string $id)
    {
        $post = Post::find($id);
        $votes = $post->votes;
        $upvotes = 0;
        $downvotes = 0;
        foreach ($votes as $vote) {
            if ($vote->vote == 1) {
                $upvotes++;
            } elseif ($vote->vote == -1) {
                $downvotes++;
            }
        }

        return response()->json(['upvotes' => $upvotes, 'downvotes' => $downvotes]);
    }
}
