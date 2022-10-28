<?php

namespace App\Repositories;

use App\Models\Post;
use App\Models\User;
use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Traits\SortBy;
use Illuminate\Http\Request;

class PostRepository implements PostRepositoryInterface
{
    use SortBy;

    public function getAllPosts()
    {
        // $author = User::with('posts')->get();
        // return $author;
        return Post::with('users')->orderBy('created_at', 'desc')->get();
        // return Post::orderBy('created_at', 'desc')->get();
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

     public function getPost(int $id): Post | User
     {
         return Post::find($id);
     }
}
