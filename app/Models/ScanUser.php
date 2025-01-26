<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon; 

class ScanUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'scanned_user_id',
    ]; 

    protected $hidden = [
        'user_id', 
        'scanned_user_id'
    ];

    /**
     * Get the user that owns the ScanUser
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'scanned_user_id');
    }

    public function host() { 
        return $this->belongsTo(User::class, 'user_id');
    }
}
