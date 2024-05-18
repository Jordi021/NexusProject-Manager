<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Analyst;
use App\Models\Task;
use Inertia\Inertia;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::tasksForUser();

        return Inertia::render('ToDo', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, $status)
    {
        // Validar el estado recibido en la URL
        $validatedStatus = $status === 'En progreso' || $status === 'Finalizado' ? $status : 'En progreso';

        // Encontrar y actualizar la tarea
        $task = Task::findOrFail($id);
        $task->status = $validatedStatus;
        $task->save();

        // Redirigir a la página de índice de tareas
        return redirect()->route('to-do.index');
    }
}
