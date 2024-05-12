<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectContract extends Model
{
    use HasFactory;


    protected $table = 'projects_contracts';

    protected $fillable = [
        'customer_id',
        'problem',
        'requirements',
        'status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
