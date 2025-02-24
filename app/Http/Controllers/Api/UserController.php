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

    public function show($id)
    {
        $user = User::with('user_profile', 'scan_establishments', 'user_status')->findOrFail($id);
        $scan_establishments = $user->scan_establishments()->with('establishment')->paginate(10);
        $scan_user = $user->scan_user()->with('user')->paginate(10);

        return Inertia::render('User/View', compact('user', 'scan_establishments', 'scan_user'));
    }
}
