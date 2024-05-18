<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analyst extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    public static function syncWithUsers()
    {
        $analystUserIds = User::role('analista')->pluck('id')->all();

        $existingAnalysts = Analyst::pluck('user_id')->all();

        $analystsToAdd = array_diff($analystUserIds, $existingAnalysts);

        // Asegurémonos de no eliminar los analistas existentes que no están en la lista de usuarios con el rol de "analista"
        $analystsToKeep = array_intersect($existingAnalysts, $analystUserIds);

        // Eliminar analistas que no están en la lista de usuarios con el rol de "analista"
        Analyst::whereIn('user_id', array_diff($existingAnalysts, $analystUserIds))->delete();

        // Agregar nuevos analistas
        foreach ($analystsToAdd as $userId) {
            Analyst::create(['user_id' => $userId]);
        }
    }

    public static function getAnalystsAndUserNames()
    {

        $analysts = static::with('user')->get();

        $analystsAndUserNames = $analysts->map(function ($analyst) {
            return [
                'analyst_id' => $analyst->id,
                'user_name' => $analyst->user->name
            ];
        });

        return $analystsAndUserNames;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function task()
    {
        return $this->hasMany(Task::class);
    }
}
