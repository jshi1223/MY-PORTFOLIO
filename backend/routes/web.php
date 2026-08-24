<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'SHI STUDIO API',
        'status' => 'ok',
        'endpoints' => [
            'GET /api/projects',
            'GET /api/projects/{slug}',
            'GET /api/testimonials',
            'GET /api/posts',
            'GET /api/posts/{slug}',
            'POST /api/inquiries',
        ],
    ]);
});
