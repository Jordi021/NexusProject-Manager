<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivedContract extends Model
{
    use HasFactory;

    protected $fillable = ['project_contract_id', 'archived_at'];

    public function projectContract()
    {
        return $this->belongsTo(ProjectContract::class);
    }
}
