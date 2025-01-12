<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use OwenIt\Auditing\Models\Audit;

class AuditLogController extends Controller
{
    public function index() { 
       $logs = Audit::with('user')->get();

        return Inertia::render('AuditLog/Index', [
            'logs' => $logs
        ]);
    }
}
