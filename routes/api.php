<?php

use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\AuthenticationController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('blogs','API\BlogController');

Route::post('/create-account',[AuthenticationController::class,'createAccount']);
Route::post('/signin',[AuthenticationController::class,'login']);
Route::get('/singleblog/{slug}',[BlogController::class,'SinglePostshow']);



//Route::put('/blog/{slug}',[BlogController::class,'update']);



Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::get('/profile',function(Request $request){
        return auth()->user(); 
    });
    Route::post('/sign-out',[AuthenticationController::class,'logout']);
});

