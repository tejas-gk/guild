<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Http\Request;

class PostRepository implements PostRepositoryInterface
{
    public function getAllPosts()
    {
        return Post::all();
    }

     public function store(Request $request, int $id = null): Post
     {
         $post = Post::updateOrCreate(
             ['id' => $id],
             [
                 'post' => $request->post,
                 'user_id' => auth()->user()->id,
             ]
         );

         return $post;
     }

     public function deletePost(int $id): bool
     {
         $post = Post::find($id);
         $post->delete();

         return true;
     }
}
