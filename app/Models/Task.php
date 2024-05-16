<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mockery\Matcher\Any;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'content', 'status'];


    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function analyst() {
        return $this->belongsTo(Analyst::class);
    }
}
