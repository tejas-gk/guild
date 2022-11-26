<?php

declare(strict_types=1);

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

  public function index()
  {
      $comment = Comment::with('post', 'user')->get();

      return response()->json($comment);
  }

    public function store(Request $request)
    {
        $comment = new Comment();
        $comment->user_id = auth()->user()->id;
        $comment->comment = $request->comment;
        $comment->post_id = $request->post_id;
        $comment->parent_id = $request->parent_id;
        $comment->save();

        return response()->json($comment);
    }

    public function show($id)
    {
        $comment = Comment::whereId($id)->with('post', 'user:id,name', 'replies', 'user')->first();

        return response()->json($comment);
    }
}
