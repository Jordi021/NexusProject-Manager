<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectContractController;
use App\Http\Controllers\CustomerController;
use Spatie\Permission\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    $userID = Auth::getUser()->id;
    $user = User::findOrFail($userID);
    $role = $user->getRoleNames()->first();

    return Inertia::render('Welcome', [
        "role" => $role, 'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->middleware(['auth', 'verified'])->name('welcome');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', RoleMiddleware::class . ':gerente'])->group(function () {
    Route::get('/projects-contracts', [ProjectContractController::class, 'index'])->name('projects-contracts.index');
    Route::post('/projects-contracts', [ProjectContractController::class, 'store'])->name('projects-contracts.store');
    Route::delete('/projects-contracts/{id}', [ProjectContractController::class, 'destroy'])->name('projects-contracts.destroy');
    Route::post('/approve/{id}', [ProjectContractController::class, 'handleApprove'])->name('approve');
    Route::post('/archive/{id}', [ProjectContractController::class, 'handleArchive'])->name('archive');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::patch("/customers/{id}", [CustomerController::class, "update"])->name("customers.update");
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
});


Route::middleware(["auth", RoleMiddleware::class . ":jefe"])->group(
    function () {
        Route::get("/projects", [ProjectController::class, "index"])->name("projects.index");
        Route::post("/projects", [ProjectController::class, "store"])->name("projects.store");
        Route::patch("/projects/{id}", [ProjectController::class, "update"])->name("projects.update");
        Route::delete("/projects/{id}", [ProjectController::class, "destroy"])->name("projects.destroy");

        Route::get("/tasks", [ProjectController::class, "index"])->name("projects.index");
        Route::post("/projects", [ProjectController::class, "store"])->name("projects.store");
        Route::patch("/projects/{id}", [ProjectController::class, "update"])->name("projects.update");
        Route::delete("/projects/{id}", [ProjectController::class, "destroy"])->name("projects.destroy");
    }
);


require __DIR__ . '/auth.php';
