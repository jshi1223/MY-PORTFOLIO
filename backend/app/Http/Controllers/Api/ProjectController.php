<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()->orderBy('id')->get()->pluck('data');

        return response()->json($projects);
    }

    public function show(string $slug)
    {
        $project = Project::query()->where('slug', $slug)->first();

        if (! $project) {
            return response()->json(['message' => 'Project not found.'], 404);
        }

        return response()->json($project->data);
    }
}
