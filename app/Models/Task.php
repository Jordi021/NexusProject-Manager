<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mockery\Matcher\Any;
use Illuminate\Support\Facades\Auth;
use App\Models\Analyst;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['description', 'content', 'status', 'project_id', 'analyst_id'];


    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function analyst()
    {
        return $this->belongsTo(Analyst::class);
    }

    public static function tasksForUser()
    {

        $user = Auth::user();

        $analyst = Analyst::where('user_id', $user->id)->first();

        $tasks = self::where('analyst_id', $analyst->id)->with('project')->get();

        $formattedTasks = $tasks->map(function ($task) {
            return [
                'id' => $task->id,
                'project_name' => $task->project->name,
                'description' => $task->description,
                'content' => $task->content,
                'status' => $task->status,
            ];
        });

        return $formattedTasks;
    }
}
