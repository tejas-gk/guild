<?php

declare(strict_types=1);

namespace App\Http\Controllers\Guild;

use App\Http\Controllers\Controller;
use App\Models\Guild;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    public function index()
    {
        $guilds = Guild::with('users:id,name')->get();

        return response()->json($guilds);
    }

    public function store(Request $request)
    {
        $guild = new Guild();
        $guild->name = $request->name;
        $guild->save();

        return response()->json($guild);
    }

    public function show($id)
    {
        $guild = Guild::whereId($id)->with('users:id,name')->first();

        return response()->json($guild);
    }
}
