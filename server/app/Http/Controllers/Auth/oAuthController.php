<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class oAuthController extends Controller
{
    public function oAuth(Request $request)
    {
        $query = http_build_query([
            'client_id' => 2,
            'redirect_uri' => 'http://localhost:8000/callback',
            'response_type' => 'code',
            'scope' => '',
        ]);

        return redirect('http://localhost:8000/oauth/authorize?'.$query);
    }
}
