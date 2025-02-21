<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Establishment;
use App\Models\ScanEstablishment;
use App\Http\Requests\Establishment\StoreEstablishmentRequest;
use Illuminate\Support\Str;

class EstablishmentController extends Controller
{
    public function index() {
        $establishments = Establishment::latest()->paginate(10);
        return Inertia::render('Establishment/Index', [
            'establishments' => $establishments
        ]);
    }

    public function show($id) {
        $establishment = Establishment::with('scans')->findOrFail($id); 
        $scans = $establishment->scans()->with('user')->paginate(10);

        // Fetch both daily and monthly scan counts in a single query
        $scanStats = $establishment->scans()
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as period, COUNT(*) as count, "monthly" as type')
            ->groupBy('period')
            ->unionAll(
                $establishment->scans()
                    ->selectRaw('DATE(created_at) as period, COUNT(*) as count, "daily" as type')
                    ->groupBy('period')
            )
            ->get();

        // Separate the results into monthly and daily groups
        $monthlyScans = $scanStats->where('type', 'monthly')->values();
        $dailyScans = $scanStats->where('type', 'daily')->values();

        // Compute averages
        $avgMonthlyScans = $monthlyScans->avg('count');
        $avgDailyScans = $dailyScans->avg('count');

        return Inertia::render('Establishment/View', [
            'establishment' => $establishment,
            'scans' => $scans,
            'avg_monthly_scans' => $avgMonthlyScans,
            'avg_daily_scans' => $avgDailyScans,
        ]);
    }

    public function store(StoreEstablishmentRequest $request) {
        try {
            $validated = $request->validated();

            //Generate establishment code
            $id = Establishment::latest()->first()->id ?? 1;
            $validated['establishment_code'] = 'EST-' . $id . '-'. Str::upper(Str::random(15));

            //Store final data
            Establishment::create($validated);

            back()->with('message', [
                'title' => 'Establishment successfully added',
                'description' => 'Added new establishment'
            ]);
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Something went wrong'
            ]);
        }
    }

    public function update(StoreEstablishmentRequest $request, Establishment $establishment) {
        try {
            $validated = $request->validated();

            $establishment->update($validated);

            back()->with('message', [
                'title' => 'Establishment successfully updated',
                'description' => 'Updated establishment'
            ]);
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Something went wrong'
            ]);
        }
    }
}
