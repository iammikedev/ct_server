<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\UserStatus;

class StatsController extends Controller
{
    public function index()
    {
        $infectedStatuses = ['SYMPTOMATIC', 'ASYMPTOMATIC'];
        
        $counts = [
            'active_cases' => UserProfile::whereIn('status', $infectedStatuses)->count(),
            'total_recoveries' => UserProfile::where('status', 'RECOVERED')->count(),
            'total_deaths' => UserProfile::where('status', 'DECEASED')->count(),
            'total_cases' => UserStatus::selectRaw("
            COUNT(DISTINCT CONCAT(YEAR(created_at), MONTH(created_at), user_id)) as active_count")
            ->whereIn('status', ['SYMPTOMATIC', 'ASYMPTOMATIC'])
            ->whereYear('created_at', now()->year)
            ->first()
            ->active_count
        ];
        return response()->json($counts);
    }
}
