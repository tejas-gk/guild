<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'followed_id',
    ];
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    public function followed()
    {
        return $this->belongsTo('App\Models\User');
    }
    public function follower()
    {
        return $this->belongsTo('App\Models\User');
    }
    
}
