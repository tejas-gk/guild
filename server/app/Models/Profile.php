<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Avatar\Facade as Avatar;
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
        'avatar',
    ];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    // public function getAvatarAttribute($value)
    // {
    //     if ($value) {
    //         return $value;
    //     }
    //     return Avatar::create($this->user->name)->toBase64();
    // }

}
