<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stade;
use App\Models\Booking;

class BookingController extends Controller
{
    public function getTotalIncome()
    {
        $totalIncome = Booking::sum('totalprice');
        return $totalIncome;
    }

    public function getTotalUsers()
    {
        $totalUsers = Booking::distinct('user_id')->count('user_id');
        return $totalUsers;
    }

    public function showBookings()
    {
        $user = auth()->user();

        if ($user->role_as === 1) { // Admin
            $bookings = Booking::all();
        } else { // User
            $bookings = Booking::where('user_id', $user->id)->get();
        }

        $totalUsers = $this->getTotalUsers();
        $totalIncome = $this->getTotalIncome();

        // Chart Data
        $monthlyRevenueData = Booking::selectRaw('sum(totalprice) as revenue, DATE_FORMAT(created_at, "%Y-%m") as month')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $stadeBookingData = Booking::selectRaw('count(*) as bookings, stade_name')
            ->groupBy('stade_name')
            ->orderBy('bookings', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'status' => 200,
            'role' => $user->role_as === 1 ? 'admin' : 'user',
            'bookings' => $bookings,
            'total_users' => (int)$totalUsers,
            'total_income' => (float)$totalIncome,
            'monthly_revenue_data' => $monthlyRevenueData,
            'stade_booking_data' => $stadeBookingData,
        ]);
    }

    public function bookStade(Request $request)
    {
        if (auth('sanctum')->check()) {
            // User is authenticated
            $user = auth('sanctum')->user();
            $user_id = $user->id;
            $user_name = $user->name;
            $stade_id = $request->input('stade_id');
            $date = $request->input('date');
            $checkin_time = $request->input('checkin_time');
            $checkout_time = $request->input('checkout_time');
            $totalprice = $request->input('totalprice');
            $status = $request->input('status');
    
            if (empty($checkin_time) || empty($checkout_time) || empty($totalprice)) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Required input data is missing.'
                ]);
            }
    
            if ($checkout_time <= $checkin_time) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Checkout time cannot be earlier than or equal to checkin time.'
                ]);
            }
    
            // Validate if the chosen date is in the past
            $currentDate = date('Y-m-d');
            if ($date < $currentDate) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cannot book a stade for a past date.'
                ]);
            }
    
            $stade = Stade::find($stade_id);
            if ($stade) {
                // Check if there is already a booking for this stade in the given date and time range
                $existingBooking = Booking::where('stade_id', $stade_id)
                    ->where(function ($query) use ($date, $checkin_time, $checkout_time) {
                        $query->where('date', $date)
                            ->where(function ($q) use ($checkin_time, $checkout_time) {
                                $q->where('checkin_time', '<', $checkout_time)
                                    ->where('checkout_time', '>', $checkin_time);
                            });
                    })
                    ->orWhere(function ($query) use ($date, $checkin_time, $checkout_time) {
                        $query->where('date', $date)
                            ->where(function ($q) use ($checkin_time, $checkout_time) {
                                $q->where('checkin_time', '<=', $checkin_time)
                                    ->where('checkout_time', '>=', $checkout_time);
                            });
                    })
                    ->first();
    
                if ($existingBooking) {
                    return response()->json([
                        'status' => 409,
                        'message' => 'Oops! This stade is already booked for the specified date and time range. Please choose different dates or times.'
                    ]);
                }
    
                $booking = new Booking();
                $booking->user_id = $user_id;
                $booking->user_name = $user_name;
                $booking->stade_id = $stade_id;
                $booking->stade_name = $stade->title; // Update to use the stade's title
                $booking->stade_image = $stade->image; // Update to use the stade's image
                $booking->date = $date;
                $booking->checkin_time = $checkin_time;
                $booking->checkout_time = $checkout_time;
                $booking->totalprice = $totalprice;
                $booking->status = $status;
    
                $booking->save();
    
                return response()->json([
                    'status' => 201,
                    'message' => 'Stade booked successfully!'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Stade not found',
                ]);
            }
        } else {
            // User is not authenticated
            return response()->json([
                'status' => 401,
                'message' => 'You need to be logged in to book a stade.'
            ]);
        }
    }
    
        
    
    
    


    public function cancelBooking(Request $request, $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json([
                'status' => 404,
                'message' => 'Booking not found.'
            ]);
        }

        // Only the user who created the booking or an admin can cancel it
        $user = auth()->user();
        if ($user->id !== $booking->user_id && $user->role_as !== 1) {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized'
            ]);
        }

        $booking->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Booking cancelled successfully!'
        ]);
    }

    
}
