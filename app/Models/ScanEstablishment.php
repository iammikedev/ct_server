<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScanEstablishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'establishment_id'
    ];

    protected $hidden = [
        'establishment_id',
        'user_id'
    ];

    /**
     * Get the establishment that owns the ScanEstablishment
     */
    public function establishment()
    {
        return $this->belongsTo(Establishment::class, 'establishment_id');
    }

    /**
     * Get the user that owns the ScanEstablishment
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
