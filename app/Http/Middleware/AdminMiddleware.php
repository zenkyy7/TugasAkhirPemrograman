<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user has the 'admin' role
        if ($request->user()->role === 'admin') {
            return $next($request); // Allow access
        }

        // Redirect or deny access if not admin
        return redirect(route('chirps.index'))->with('error', 'Access denied. Admins only.');
    }
}
