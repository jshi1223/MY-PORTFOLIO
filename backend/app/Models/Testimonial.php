<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name', 'company', 'project_slug', 'sort', 'data',
    ];

    protected $casts = [
        'sort' => 'integer',
        'data' => 'array',
    ];
}
