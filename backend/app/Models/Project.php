<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Content rows carry their verbatim source object in `data` so API
 * responses always match the frontend's TypeScript contracts.
 */
class Project extends Model
{
    protected $fillable = [
        'slug', 'title', 'client', 'year', 'category', 'featured', 'data',
    ];

    protected $casts = [
        'year' => 'integer',
        'featured' => 'boolean',
        'data' => 'array',
    ];
}
