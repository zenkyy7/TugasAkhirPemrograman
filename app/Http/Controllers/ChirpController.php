<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Chirp;
use App\Models\Report;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Chirps/Index', [
            'chirps' => Chirp::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov|max:10240',
        ]);

        $chirp = $request->user()->chirps()->create([
            'message' => $validated['message']
        ]);

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('chirp-media', $filename, 'public');

            $chirp->update([
                'media_path' => $path,
                'media_type' => $file->getMimeType()
            ]);
        }

        return redirect(route('chirps.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {
        Gate::authorize('update', $chirp);

        $validated = $request->validate([
            'message' => 'required|string',
        ]);


        $chirp->update($validated);

        return redirect(route('chirps.index'));
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chirp $chirp): RedirectResponse
    {
        Gate::authorize('delete', $chirp);

        // Delete media jika ada
        if ($chirp->media_path) {
            Storage::disk('public')->delete($chirp->media_path);
        }

        $chirp->delete();

        return redirect(route('chirps.index'));
    }

    public function report(Request $request, Chirp $chirp)
    {
        $validated = $request->validate(
            [
                'detail' => 'required|string',
                'reason' => 'required|string|max:256',
            ]
        );
        $request->user()->reports()->create(
            [
                'reason' => $validated['reason'],
                'detail' => $validated['detail'],
                'reported_id' => $chirp->id,
                'reported_type' => Chirp::class,
            ]
        );
        return redirect(route('chirps.index'));
    }
}
