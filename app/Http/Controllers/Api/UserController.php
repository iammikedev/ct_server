<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('user_profile')->role('User')->orderBy('created_at', 'DESC')->get();

        return Inertia::render('User/Index', compact('users'));
    }
}
