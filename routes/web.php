<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\EstablishmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() { 
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Establishment
    Route::resource('establishment', EstablishmentController::class);

    //User
    Route::resource('user', \App\Http\Controllers\Api\UserController::class);

    //Announcement
    Route::resource('announcement', \App\Http\Controllers\Admin\AnnouncementController::class);

    //Scans
    Route::resource('scan', \App\Http\Controllers\Admin\ScanController::class);
});

require __DIR__.'/auth.php';
