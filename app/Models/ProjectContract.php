<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectContract extends Model
{
    use HasFactory;

    
    protected $table = 'projects_contracts';

    protected $fillable = [
        'client_name',
        'problem',
        'requirements',
        'status',
    ];
}
