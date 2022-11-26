<?php

declare(strict_types=1);

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface PostRepositoryInterface
{
    public function getAllPosts();

    public function store(Request $request, int $id);

    public function deletePost(int $id);

    public function getPost(int $id);
}
