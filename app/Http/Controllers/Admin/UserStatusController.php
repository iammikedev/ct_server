<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserStatus\StoreUserStatusRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\UserStatus;

class UserStatusController extends Controller
{
    public function store(StoreUserStatusRequest $request) {
        try {
            $validated = $request->validated();

            DB::beginTransaction();

            if($request->status == 'NORMAL') {
                throw new \Exception('User is already in NORMAL status');
            }

            $userStatus = UserStatus::create($validated);
            UserProfile::where('user_id', $validated['user_id'])->update(['status' => $validated['status']]);
            DB::commit();
            
            back()->with('message', [
                'title' => 'Health Declaration Updated',
                'description' => "The user's Health Declaration has been successfully changed",
            ]);
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
