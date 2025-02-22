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
use App\Models\UserProfile;
use App\Models\UserStatus;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index() { 
        $infectedStatuses = ['SYMPTOMATIC', 'ASYMPTOMATIC'];
        $year = request('year') ?? now()->year;

        $counts = [
            'active_count' => UserProfile::whereIn('status', $infectedStatuses)->count(),
            'recovered_count' => UserProfile::where('status', 'RECOVERED')->count(),
            'deceased_count' => UserProfile::where('status', 'DECEASED')->count(),
            'establishment_count' => Establishment::whereYear('created_at', $year)->count(),
            'user_count' => User::role('User')->whereYear('created_at', $year)->count(),
            'scan_user_count' => ScanUser::whereYear('created_at', $year)->count(),
            'scan_establishment_count' => ScanEstablishment::whereYear('created_at', $year)->count(),
        ];

        $latestAnnouncement = Announcement::whereDate('publish_at', '<=', now())
            ->latest('publish_at')
            ->first();

        $stats = UserStatus::selectRaw("
                YEAR(created_at) as year, 
                MONTH(created_at) as month, 
                SUM(DISTINCT CASE WHEN status IN (?, ?) THEN 1 ELSE 0 END) as active_cases,
                SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as recoveries,
                SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as deaths
            ", ['SYMPTOMATIC', 'ASYMPTOMATIC', 'RECOVERED', 'DECEASED'])
            ->whereYear('created_at', $year)
            ->groupBy('year', 'month')
            ->orderBy('month')
            ->get()
            ->toArray();

        return Inertia::render('Dashboard', array_merge($counts, [
            'latest_announcement' => $latestAnnouncement,
            'stats' => $stats
        ]));
    }
}
