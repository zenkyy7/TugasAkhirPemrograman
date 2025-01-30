<?php

namespace App\Models;

use App\Events\ReportCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'reporter_id', // int
        'reason', // string
        'detail', // string
        'reported_id', // int
        'reported_type', // string
    ];

    protected $dispatchesEvents = [
        'created' => ReportCreated::class,
    ];

    /**
     * Get the reporter (user who made the report).
     */
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get the reported content (polymorphic relation).
     */
    public function reported()
    {
        return $this->morphTo();
    }
}
