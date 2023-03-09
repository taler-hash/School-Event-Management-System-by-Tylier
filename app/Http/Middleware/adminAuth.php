<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class adminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        dd(session('name'));
        if(!$request->session()->missing('name') )
        {
            if(session('data') === 'admin')
            {
                return $next($request);
            }
        }
        else
        {
            return redirect('/login');
        }
        
       
    }
}
