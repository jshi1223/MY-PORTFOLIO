<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'name', 'email', 'company', 'budget', 'timeline', 'project_type', 'description',
    ];
}
