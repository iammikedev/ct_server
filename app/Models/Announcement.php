<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use OwenIt\Auditing\Contracts\Auditable;

class Announcement extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

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

    public function generateTags(): array {
        return ['Announcement'];
    }
}
