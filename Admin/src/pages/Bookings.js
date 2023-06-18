import { useEffect, useState } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('/api/bookings');
      setBookings(response.data.bookings);
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.delete(`/api/booking/${id}`);
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
      } else {
        alert('Unable to cancel booking.');
      }
    } catch (error) {
      alert('Unable to cancel booking. Please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">ID</th>
            {/* <th className="py-2 px-4 text-left">User ID</th> */}
            <th className="py-2 px-4 text-left">User name</th>
            {/* <th className="py-2 px-4 text-left">Stade ID</th> */}
            <th className="py-2 px-4 text-left">Stade Name</th>
            <th className="py-2 px-4 text-left">Stade Image</th>
            <th className="py-2 px-4 text-left">Check-in Time</th>
            <th className="py-2 px-4 text-left">Check-out Time</th>
            <th className="py-2 px-4 text-left"> Date</th>
        
            <th className="py-2 px-4 text-left">Total Price</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-4">{booking.id}</td>
              {/* <td className="py-2 px-4">{booking.user_id}</td> */}
              <td className="py-2 px-4">{booking.user_name}</td>
              {/* <td className="py-2 px-4">{booking.stade_id}</td> */}
              <td className="py-2 px-4">{booking.stade_name}</td>
              <td className="py-2 px-4"><img src={`http://127.0.0.1:8000/storage/stades/image/${booking.stade_image}`} alt="Stade" /></td>
              <td className="py-2 px-4">{booking.checkin_time}</td>
              <td className="py-2 px-4">{booking.checkout_time}</td>
              <td className="py-2 px-4">{booking.date}</td>
    
              <td className="py-2 px-4">{booking.totalprice}</td>
              <td className="py-2 px-4">{booking.status}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
