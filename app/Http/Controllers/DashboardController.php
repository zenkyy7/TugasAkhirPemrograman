<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $endDate = Carbon::now();
        $startDate = $endDate->copy()->subDays(7);
        if ($request->user()->role === 'admin') {
            $chirpCounts = Chirp::whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();
            $reportCounts = Report::whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();

            return Inertia::render('Dashboard', [
                'users' => User::all()->count(),
                'chirps' => Chirp::all()->count(),
                'reports' => Report::all()->count(),
                'weekly' => [
                    'chirps' => $chirpCounts,
                    'reports' => $reportCounts,
                ]
            ]);
        }
        return Inertia::render('Dashboard');
    }

    public function get_data(Request $request)
    {
        $filter = $request->query('filter');
        if ($filter == 'Day') {
            return Response::json(
                [
                    'users' => User::whereDate('created_at', Carbon::now())->count(),
                    'chirps' => Chirp::whereDate('created_at', Carbon::now())->count(),
                    'reports' => Report::whereDate('created_at', Carbon::now())->count(),
                ]
            );
        }
        if ($filter == 'Week') {
            return Response::json(
                [
                    'users' => User::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
                    'chirps' => Chirp::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
                    'reports' => Report::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
                ]
            );
        }
        if ($filter == 'Monthly') {
            return Response::json(
                [
                    'users' => User::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                    'chirps' => Chirp::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                    'reports' => Report::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
                ]
            );
        }
        if ($filter) {
            // NO ERROR HANDLING, THANKS - dot-1x
            $date = Carbon::parse($filter);
            return Response::json(
                [
                    'users' => User::whereDate('created_at', $date)->get()->count(),
                    'chirps' => Chirp::whereDate('created_at', $date)->get()->count(),
                    'reports' => Report::whereDate('created_at', $date)->get()->count(),
                ]
            );
        }
        return Response::json(
            [
                'users' => User::all()->count(),
                'chirps' => Chirp::all()->count(),
                'reports' => Report::all()->count(),
            ]
        );
    }
}
