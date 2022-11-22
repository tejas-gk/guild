<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $with = ['posts'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function follows()
    {
        return $this->hasMany(Follow::class);
    }

    public function followed()
    {
        return $this->hasMany(Follow::class, 'followed_id');
    }

    public function guilds()
    {
        return $this->belongsToMany(Guild::class);
    }
    
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function followees()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_id');
    }

    public function sendPasswordResetNotification($token)
    {
        $url ='http://localhost:3000/password-reset/'.$token;
        $this->notify(new ResetPasswordNotification($url));
    }

}
