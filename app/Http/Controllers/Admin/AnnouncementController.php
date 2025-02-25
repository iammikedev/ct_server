<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use App\Http\Requests\Announcement\StoreAnnouncementRequest;
use App\Http\Requests\Announcement\UpdateAnnouncementRequest;
use App\Models\Announcement;
use Carbon\Carbon; 

class AnnouncementController extends Controller
{
    public function index() { 
        $announcements = Announcement::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Announcement/Index', compact('announcements'));
    }

    public function store(StoreAnnouncementRequest $request) {
        try {
            $validated = $request->validated();

            $validated['publish_at'] = Carbon::parse($validated['publish_at'])->addHours(8);

            Announcement::create($validated);

            back()->with('message', [
                'title' => 'Announcement successfully created!',
                'description' => 'Your message is now live and ready to inform your audience.'
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return back()->withErrors([
                'message' => 'Something went wrong'
            ]);
        }
    }

    public function update(UpdateAnnouncementRequest $request, Announcement $announcement) { 
        try {
            $validated = $request->validated();

            $announcement->update($validated);

            back()->with('message', [
                'title' => 'Announcement successfully updated!',
                'description' => 'Your message is now live and ready to inform your audience.'
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return back()->withErrors([
                'message' => 'Something went wrong'
            ]);
        }
    }
}
