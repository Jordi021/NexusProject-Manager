<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('progress')->default(0);
            $table->enum('status', ['Iniciado', 'En Desarrollo', 'Cancelado', 'Finalizado'])->default('Iniciado');
            $table->foreignId('contract_id')->constrained('contracts')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('analysts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->text('content');
            $table->enum('status', ['En progreso', 'Finalizado']);
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('analyst_id')->constrained('analysts')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects_and_tasks_tables');
    }
};
