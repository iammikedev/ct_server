<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserStatus\StoreUserStatusRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\UserStatus;
use App\Models\ScanEstablishment;
use Carbon\Carbon;
use App\Models\User;

class UserStatusController extends Controller
{
    public function store(StoreUserStatusRequest $request) {
        try {
            $validated = $request->validated();
    
            if ($request->status === 'NORMAL') {
                throw new \Exception('User is already in NORMAL status');
            }
    
            DB::beginTransaction();
    
            $userStatus = UserStatus::create($validated);
            $this->updateUserProfileStatus([$request->user_id], $request->status);
    
            if (in_array($request->status, ['SYMPTOMATIC', 'ASYMPTOMATIC'])) {
                $this->traceAndUpdateContacts($userStatus);
            }
    
            DB::commit();
    
            return back()->with('message', [
                'title' => 'Health Declaration Updated',
                'description' => "The user's Health Declaration has been successfully changed",
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => $e->getMessage()]);
        }
    }
    
    private function traceAndUpdateContacts(UserStatus $userStatus) {
        $dateRange = [
            $userStatus->created_at->clone()->subDays(10)->toDateString(),
            $userStatus->created_at->toDateString()
        ];
    
        $potentialContacts = $this->getPotentialContacts($userStatus->user_id, $dateRange);
    
        if (!empty($potentialContacts)) {
            $this->updateUserProfileStatus($potentialContacts, 'UNDER_INVESTIGATION');
            $this->bulkInsertUserStatuses($potentialContacts, 'UNDER_INVESTIGATION');
        }
    }
    
    private function getPotentialContacts(int $infectedUserId, array $dateRange): array {
        return UserProfile::whereIn('user_id', function ($query) use ($infectedUserId, $dateRange) {
                $query->select('user_id')->from('scan_establishments')
                    ->whereNot('user_id', $infectedUserId)
                    ->whereBetween('created_at', $dateRange)
                    ->union(
                        DB::table('scan_users')
                            ->select('user_id')
                            ->whereNot('user_id', $infectedUserId)
                            ->whereBetween('created_at', $dateRange)
                    );
            })
            ->whereIn('status', ['NORMAL', 'UNDER_INVESTIGATION', 'RECOVERED'])
            ->pluck('user_id')
            ->unique()
            ->toArray();
    }
    
    private function updateUserProfileStatus(array $userIds, string $status) {
        if (!empty($userIds)) {
            UserProfile::whereIn('user_id', $userIds)->update(['status' => $status]);
        }
    }
    
    private function bulkInsertUserStatuses(array $userIds, string $status) {
        if (!empty($userIds)) {
            $userStatuses = collect($userIds)->map(fn($id) => [
                'user_id' => $id,
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now()
            ])->toArray();
    
            UserStatus::insert($userStatuses);
        }
    }
}
