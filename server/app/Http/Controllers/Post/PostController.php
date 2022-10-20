<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
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
        $post = $this->postRepository->store($request, $request->id);

        return response()->json($post);
    }

    public function destroy($id): JsonResponse
    {
        $this->postRepository->deletePost($id);

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
