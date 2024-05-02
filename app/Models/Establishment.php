<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Establishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'establishment_code',
        'first_name',
        'middle_name',
        'last_name',
        'email_address',
        'contact_number',
        'establishment_name',
        'address',
        'baranggay',
        'city',
        'lng',
        'lat'
    ];

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
