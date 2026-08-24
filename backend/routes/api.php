<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TestimonialController;

/*
|--------------------------------------------------------------------------
| API Routes — SHI STUDIO
|--------------------------------------------------------------------------
| Read-only content endpoints (seeded from /shared/content.json) plus a
| public inquiry endpoint for the contact form.
*/

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

Route::post('/inquiries', [InquiryController::class, 'store'])
    ->middleware('throttle:10,1');
