<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postRepository; //even private will do

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index(): JsonResponse
    {
        $posts = $this->postRepository->getAllPosts();

        return response()->json(['posts' => $posts]);
    }

    public function store(Request $request): JsonResponse
    {
        $post = Post::where('id', $request->post_id)->first();
        $comment=\App\Models\Comment::create([
            'user_id' => auth()->user()->id,
            'comment' => $request->comment,
            'post_id' => $request->post_id,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json(['comment' => $comment,'post'=>$post]);
    }

    public function destroy($id): JsonResponse
    {
        $this->postRepository->deletePost($id);

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function show($id): JsonResponse
    {
        $post = Post::whereId($id)
        ->with('users:id,name', 'comments.replies', 'users:id,name', 'comments.user:id,name', 'comments.replies.user:id,name','votes')
        ->first();

        return response()->json($post);
    }
}
