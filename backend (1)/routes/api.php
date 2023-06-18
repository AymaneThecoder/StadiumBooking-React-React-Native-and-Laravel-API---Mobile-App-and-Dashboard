<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\BookingController;













//add to cart
Route::post('cart', [CartController::class, 'addtocart']);

// Route::resource('products',  App\Http\Controllers\API\ProductController::class);



//API route for register new user
Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
//API route for login user
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

//Protecting Routes
Route::group(['middleware' => ['auth:sanctum','isAPIAdmin']], function () {
    Route::get('/checkingAuthenticated', function(){
        return response()->json(['message'=>'You Are in','status'=>200],200); 
    });
});


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    // API route for logout user
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);

});


// Route::resource('products',App\Http\Controllers\API\ProductController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/users', [App\Http\Controllers\API\AuthController::class, 'Allusers']);
Route::delete('/users/{id}', [App\Http\Controllers\API\AuthController::class, 'destroy']);
//add new user
Route::post('/users', [App\Http\Controllers\API\AuthController::class, 'store']);
Route::post('/users/{id}', [App\Http\Controllers\API\AuthController::class, 'updateuser']);
Route::get('/users/{id}', [App\Http\Controllers\API\AuthController::class, 'showuser']);



Route::get('/stades', [App\Http\Controllers\API\StadeController::class, 'index']);
Route::post('/stades', [App\Http\Controllers\API\StadeController::class, 'store']);
Route::get('/stades/{stade}', [App\Http\Controllers\API\StadeController::class, 'show']);
Route::post('/stades/{stade}', [App\Http\Controllers\API\StadeController::class, 'update']);
Route::delete('/stades/{stade}', [App\Http\Controllers\API\StadeController::class, 'destroy']);
Route::delete('/getTotalStade', [App\Http\Controllers\API\StadeController::class, 'getTotalStade']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/booking', [BookingController::class, 'bookStade']);
    Route::delete('/booking/{id}', [BookingController::class, 'cancelBooking']);
    Route::post('/booking/{id}', [BookingController::class, 'updateBooking']);
    Route::get('/bookings', [BookingController::class, 'showBookings']);
    Route::get('/available-stades', [BookingController::class, 'getAvailableStade']);

});