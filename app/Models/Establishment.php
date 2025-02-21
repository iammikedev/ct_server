<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use OwenIt\Auditing\Contracts\Auditable;
 
class Establishment extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

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

    public function generateTags(): array {
        return ['Establishment'];
    }

    /**
     * Get all of the scans for the Establishment
     */
    public function scans()
    {
        return $this->hasMany(ScanEstablishment::class);
    }
}
