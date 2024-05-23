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
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ToDoController;

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

    Route::post("/close/{id}/", [ProjectContractController::class, "handleClose"])->name("close");

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

        Route::post('/analyst', [ProjectController::class, 'storeAnalyst'])->name('analysts.store');

        Route::get("/tasks", [TaskController::class, "index"])->name("tasks.index");
        Route::post("/tasks", [TaskController::class, "store"])->name("tasks.store");
        Route::patch("/tasks/{id}", [TaskController::class, "update"])->name("tasks.update");
        Route::delete("/tasks/{id}", [TaskController::class, "destroy"])->name("tasks.destroy");
    }
);

Route::middleware(["auth", RoleMiddleware::class . ":analista"])->group(
    function () {
        Route::get("/to-do", [ToDoController::class, "index"])->name("to-do.index");
        Route::patch("/to-do/{id}/{status}", [ToDoController::class, "update"])->name("to-do.update");
    }
);

Route::get("/about", function () {
    $userID = Auth::getUser()->id;
    $user = User::findOrFail($userID);
    $role = $user->getRoleNames()->first();
    return Inertia::render("About", ["role" => $role]);
})->name("about");


require __DIR__ . '/auth.php';
