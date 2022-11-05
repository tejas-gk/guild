<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
     public function show(int $id,Request $request){
        $user = \App\Models\User::findOrFail($id);
        return response()->json($user);
     }
}
