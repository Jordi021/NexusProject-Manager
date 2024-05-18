<?php

namespace App\Http\Controllers;

use App\Models\Analyst;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();
        $analysts = Analyst::getAnalystsAndUserNames();
        $projects = Project::all();
        return Inertia::render('Task', [
            'tasks' => $tasks,
            "analysts" => $analysts,
            "projects" => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|in:En progreso,Finalizado',
            'project_id' => 'required|exists:projects,id',
            'analyst_id' => 'required|exists:analysts,id',
        ]);

        Task::create($request->all());

        return redirect()->route('tasks.index');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|in:En progreso,Finalizado',
            'project_id' => 'required|exists:projects,id',
            'analyst_id' => 'required|exists:analysts,id',
        ]);

        Task::findOrFail($id)->update($validatedData);

        return redirect()->route('tasks.index');
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
        return redirect()->route('tasks.index');
    }
}
