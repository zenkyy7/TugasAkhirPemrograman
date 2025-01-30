<?php


use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ChirpManagerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportManagerController;
use App\Http\Controllers\UserManagerController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::post("/chirps/{chirp}/report", [ChirpController::class, 'report'])
    ->middleware(['auth', 'verified'])
    ->name("chirps.report");

Route::post("/user/{user}/report", [ProfileController::class, 'report'])
    ->middleware(['auth', 'verified'])
    ->name("user.report");

Route::resource('dashboard', DashboardController::class)
    ->only(['index'])
    ->middleware(['auth', 'verified', AdminMiddleware::class])
    ->name('index', 'dashboard');

Route::get('/dashboard/totaldata', [DashboardController::class, 'get_data'])
    ->middleware(['auth', 'verified', AdminMiddleware::class])
    ->name('dashboard.getdata');

Route::get('/dashboard/weeklydata', [DashboardController::class, 'get_weekly'])
    ->middleware(['auth', 'verified', AdminMiddleware::class])
    ->name('dashboard.getweekly');

Route::prefix('dashboard/admin')
    ->name("dashboard.admin.")
    ->middleware(['auth', 'verified', AdminMiddleware::class])
    ->group(function () {
        Route::resource('users', UserManagerController::class)
            ->only(['index', 'update', 'destroy']);
        Route::resource('chirps', ChirpManagerController::class)
            ->only(['index', 'destroy', 'update']);
        Route::resource('report', ReportManagerController::class)
            ->only(['index', 'destroy', 'update']);
    });

require __DIR__ . '/auth.php';
