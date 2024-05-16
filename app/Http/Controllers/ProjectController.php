<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('Project', [
            "projects" => $projects
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'progress' => 'required|integer',
            'status' => 'required|in:iniciado,en_desarrollo,cancelado,finalizado',
            'contract_id' => 'required|exists:contracts,id',
            'task_id' => 'nullable|exists:tasks,id',
        ]);

        Project::create($request->all());

        return to_route('projects.index');
    }

    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'progress' => 'required|integer',
            'status' => 'required|in:iniciado,en_desarrollo,cancelado,finalizado',
            'contract_id' => 'required|exists:contracts,id',
            'task_id' => 'nullable|exists:tasks,id',
        ]);

        $project->update($request->all());

        return redirect()->route('projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index');
    }
}
