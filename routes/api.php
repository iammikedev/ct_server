
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\ScanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('/profile', UserProfileController::class)->only(['index', 'update']);
    Route::apiResource('/scan', ScanController::class)->only(['store', 'index']);
    Route::apiResource('/stats', App\Http\Controllers\Api\StatsController::class)->only(['index']);
});

require __DIR__ . '/auth.php';
