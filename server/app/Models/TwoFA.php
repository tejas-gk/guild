<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TwoFA extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'two_factor_code',
        'two_factor_expires_at',
    ];
}
