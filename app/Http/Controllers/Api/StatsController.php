<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'active_cases' => 100,
            'total_cases' => 200,
            'total_deaths' => 300,
            'total_recoveries' => 300,
        ]);
    }
}
