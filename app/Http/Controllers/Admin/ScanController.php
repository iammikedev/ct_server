<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ScanUser;

class ScanController extends Controller
{
    public function index() { 
        $scans = ScanUser::with('user', 'host')->orderBy('created_at', 'DESC')->get();
        return Inertia::render('Scan/Index', compact('scans'));
    }
}
