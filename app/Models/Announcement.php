<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'publish_at',
        'is_important',
        'is_active'
    ];

    public function getCreatedAtAttribute($value) { 
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
