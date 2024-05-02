<?php

namespace App\Http\Requests\Establishment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreEstablishmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string',
            'middle_name' => 'string|nullable',
            'last_name' => 'required|string',
            'email_address' => 'required|string|email',
            'contact_number' => 'required|string|min:10|max:10',
            'establishment_name' => 'required|string',
            'address' => 'required|string',
            'baranggay' => 'required|string',
            'city' => 'required|string',
            'lat' => 'required|decimal:2,6',
            'lng' => 'required|decimal:3,6',
        ];
    }
}
