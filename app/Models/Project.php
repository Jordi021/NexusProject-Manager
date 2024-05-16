<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'start_date', 'end_date', 'progress', 'status', 'contract_id', 'task_id'];

    protected $dates = ['start_date', 'end_date'];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function task() {
        return $this->hasMany(Task::class);
    }
}

