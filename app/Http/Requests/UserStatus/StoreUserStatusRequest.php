<?php

namespace App\Http\Requests\UserStatus;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreUserStatusRequest extends FormRequest
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
            'status' => 'required|string|in:NORMAL,SYMPTOMATIC,ASYMPTOMATIC,RECOVERED,DECEASED',
            'user_id' => 'required|integer|exists:users,id',
        ];
    }
}
