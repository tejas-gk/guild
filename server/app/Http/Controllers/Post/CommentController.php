<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
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
      $posts = $this->postRepository->getAllPosts();

      return response()->json($posts);
  }

    public function store(Request $request)
    {
        $post = $this->postRepository->createPost($request);

        return response()->json($post);
    }
}
