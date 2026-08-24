<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            // Queryable columns…
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('client');
            $table->unsignedSmallInteger('year');
            $table->string('category', 40);
            $table->boolean('featured')->default(false);
            // …and the verbatim content object, so API responses match the
            // frontend's TypeScript contracts exactly.
            $table->json('data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
