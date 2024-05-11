<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = ['project_contract_id'];

    public function projectContract()
    {
        return $this->belongsTo(ProjectContract::class);
    }
}
