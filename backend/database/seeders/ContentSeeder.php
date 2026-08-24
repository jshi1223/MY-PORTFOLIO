<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Seeds all portfolio content from the shared content.json file
 * (single source of truth shared with the React frontend).
 *
 * Idempotent: safe to run repeatedly via `php artisan migrate:fresh --seed`.
 */
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $content = $this->readContent();

        foreach ($content['projects'] ?? [] as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                [
                    'title' => $project['title'],
                    'client' => $project['client'],
                    'year' => $project['year'],
                    'category' => $project['category'],
                    'featured' => (bool) ($project['featured'] ?? false),
                    'data' => $project,
                ],
            );
        }

        Testimonial::query()->delete();
        foreach ($content['testimonials'] ?? [] as $index => $t) {
            Testimonial::create([
                'name' => $t['name'],
                'company' => $t['company'],
                'project_slug' => $t['projectSlug'] ?? null,
                'sort' => $index,
                'data' => $t,
            ]);
        }

        foreach ($content['posts'] ?? [] as $post) {
            Post::updateOrCreate(
                ['slug' => $post['slug']],
                [
                    'title' => $post['title'],
                    'category' => $post['category'],
                    'date' => $post['date'],
                    'data' => $post,
                ],
            );
        }
    }

    /**
     * Locate shared/content.json — inside this monorepo it lives one level up
     * from backend/. Override with CONTENT_JSON_PATH in .env for deployments.
     */
    private function readContent(): array
    {
        $candidates = array_filter([
            env('CONTENT_JSON_PATH'),
            dirname(__DIR__, 2).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'shared'.DIRECTORY_SEPARATOR.'content.json',
        ]);

        foreach ($candidates as $path) {
            if (is_string($path) && is_file($path)) {
                return json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
            }
        }

        throw new RuntimeException(
            'shared/content.json not found. Set CONTENT_JSON_PATH in .env or place the file at ../shared/content.json.'
        );
    }
}
