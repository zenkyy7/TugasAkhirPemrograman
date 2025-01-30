<?php

namespace App\Listeners;

use App\Events\ReportCreated;
use App\Models\User;
use App\Notifications\NewReport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendReportAdmin implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ReportCreated $event): void
    {
        Log::info('New report was created', [
            'report_id' => $event->report->id,
            'reporter_id' => $event->report->reporter_id,
            'reported_type' => $event->report->reported_type,
            'reported_id' => $event->report->reported_id,
        ]);
        foreach (User::where('role', 'admin')->cursor() as $user) {
            $user->notify(new NewReport($event->report));
        }
    }
}
