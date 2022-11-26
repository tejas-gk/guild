<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(int $id, Request $request)
    {
        $user = \App\Models\User::findOrFail($id);

        return response()->json($user);
    }

    public function update(int $id, Request $request)
    {
        $user = \App\Models\User::findOrFail($id);
        $user->update($request->all());

        return response()->json($user);
    }

    public function suggestUsers(Request $request)
    {
        $users = \App\Models\User::where('name', 'like', '%'.$request->name.'%')
            ->take(5)
            ->get();
        /*
         $suggestions=User::whereNotIn('id',Auth::user()->following()->pluck('id'))
         ->inRandomOrder()
         ->take(5)
         ->get();
        */
        return response()->json(['suggestions' => $users]);
    }
}
