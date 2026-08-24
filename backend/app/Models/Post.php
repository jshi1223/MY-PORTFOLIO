<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'slug', 'title', 'category', 'date', 'data',
    ];

    protected $casts = [
        'date' => 'date',
        'data' => 'array',
    ];
}
