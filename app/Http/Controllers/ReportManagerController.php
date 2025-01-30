<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ReportManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Report/Index", ['reports' => Report::with('reporter')->with('reported')->latest()->get()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        Gate::authorize('is-admin', Auth::user());
        $report->delete();
        return redirect(route('dashboard.admin.report.index'));
    }

    /**
     * delete the reported content.
     */
    public function update(Report $report)
    {
        Gate::authorize('is-admin', Auth::user());
        $reported = $report->reported();
        if ($report->reported_type == User::class) {
            $reported->update([
                'status' => 'banned'
            ]);
        } else {
            $reported->delete();
        }
        return redirect(route('dashboard.admin.report.index'));
    }
}
