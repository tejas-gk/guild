<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guild extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'bio',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }

    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function guilders()
    {
        return $this->hasMany('App\Models\User');
    }
}
