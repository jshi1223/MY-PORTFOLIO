<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::query()->orderBy('date', 'desc')->get()->pluck('data');

        return response()->json($posts);
    }

    public function show(string $slug)
    {
        $post = Post::query()->where('slug', $slug)->first();

        if (! $post) {
            return response()->json(['message' => 'Post not found.'], 404);
        }

        return response()->json($post->data);
    }
}
