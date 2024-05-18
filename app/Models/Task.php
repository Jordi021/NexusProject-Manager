<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mockery\Matcher\Any;

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
}
