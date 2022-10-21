<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TwoFactorAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || ! $request->user()->two_factor_secret) {
            return $next($request);
        }
        if ($request->user()->two_factor_recovery_codes) {
            return $next($request);
        }
        if ($request->is('two-factor/*')) {
            return $next($request);
        }
        if ($request->is('logout')) {
            return $next($request);
        }
        return redirect()->route('two-factor.login');
    }
}
