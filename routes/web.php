<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProjectContractController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource("/comment", CommentController::class)->only(["index", "store"])->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/projects-contracts', [ProjectContractController::class, 'index'])->name('projects-contracts.index');
    Route::post('/projects-contracts', [ProjectContractController::class, 'store'])->name('projects-contracts.store');
    // Route::delete('/projects-contracts/{id}', [ProjectContractController::class, 'destroy'])->name('projects-contracts.destroy');
    Route::post('/approve/{id}', [ProjectContractController::class, 'handleApprove'])->name('approve');
    Route::post('/archive/{id}', [ProjectContractController::class, 'handleArchive'])->name('archive');
});


require __DIR__.'/auth.php';
