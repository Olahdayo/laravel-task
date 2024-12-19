<?php

use App\Http\Controllers\TrainingController;
use App\Models\TrainingCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('trainees', TrainingController::class);

// http://localhost:8000/api/trainees