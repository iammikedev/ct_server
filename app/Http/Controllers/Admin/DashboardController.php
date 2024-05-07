<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Establishment;
use App\Models\User;
use App\Models\ScanUser;
use App\Models\ScanEstablishment;
use App\Models\Announcement;

class DashboardController extends Controller
{
    public function index() { 
        $establishment_count = Establishment::count();
        $user_count = User::role('User')->count();
        $scan_user_count = ScanUser::count();
        $scan_establishment_count = ScanEstablishment::count();
        $latest_announcement = Announcement::whereDate('publish_at', '<=', now())->orderBy('publish_at', 'desc')->first();

        return Inertia::render('Dashboard', compact('establishment_count', 'user_count', 'scan_user_count', 'scan_establishment_count', 'latest_announcement'));
    }
}
