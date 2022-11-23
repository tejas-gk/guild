<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'reputation',
        'bio',
        'banner',
        'readme',
        'github',
        'twitter',
        'linkedin',
    ];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
