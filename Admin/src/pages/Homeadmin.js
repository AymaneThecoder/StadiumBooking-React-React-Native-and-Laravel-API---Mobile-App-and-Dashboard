import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaDollarSign, FaRegCalendarAlt } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';
import { AiOutlineDollarCircle, AiOutlineUser } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { GiCalendar, GiMoneyStack } from 'react-icons/gi';

function Homeadmin() {
  const [bookings, setBookings] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [roomBookingData, setRoomBookingData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('/api/bookings');
      const data = response.data;
      setBookings(data.bookings);
      setTotalUsers(data.total_users);
      setTotalIncome(data.total_income);
      setMonthlyRevenueData(data.monthly_revenue_data);
      setRoomBookingData(data.stade_booking_data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-500 text-white py-4 px-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaUsers className="mr-2 text-xl" />
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p>Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaDollarSign className="mr-2 text-xl" />
            <div>
              <p className="text-2xl font-bold">{totalIncome}</p>
              <p>Total Income</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-2 text-xl" />
            <div>
              <p className="text-2xl font-bold">{monthlyRevenueData.length}</p>
              <p>Months of Revenue Data</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500 text-white py-4 px-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <BiFootball className="mr-2 text-xl" />
            <div>
              <p className="text-2xl font-bold">{roomBookingData.length}</p>
              <p>Stade with Bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Monthly Revenue Data</h2>
        <ul className="list-disc pl-8">
          {monthlyRevenueData.map((item) => (
            <li key={item.month} className="mb-4 flex items-center">
              <RiBarChartFill className="text-blue-500 text-lg mr-2" />
              <span className="font-bold mr-2">{item.month}:</span>
              <span className="flex items-center">
                <AiOutlineDollarCircle className="text-green-500 text-base mr-1" />
                {item.revenue}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p className="font-bold text-lg flex items-center">
                  <AiOutlineUser className="mr-2" />
                  {booking.user_name}
                </p>
                <div className="flex space-x-4 mt-2">
                  <div>
                    <p className="font-bold flex items-center">
                      <BiFootball className="mr-2" />
                      Stade Name:
                    </p>
                    <p>{booking.stade_name}</p>
                  </div>
                  <div>
                    <p className="font-bold flex items-center">
                      <GiCalendar className="mr-2" />
                      Date:
                    </p>
                    <p>{booking.date}</p>
                  </div>
                  <div>
                    <p className="font-bold flex items-center">
                      <GiCalendar className="mr-2" />
                      Check-in Time:
                    </p>
                    <p>{booking.checkin_time}</p>
                  </div>
                  <div>
                    <p className="font-bold flex items-center">
                      <GiCalendar className="mr-2" />
                      Check-out Time:
                    </p>
                    <p>{booking.checkout_time}</p>
                  </div>
                  <div>
                    <p className="font-bold flex items-center">
                      <GiMoneyStack className="mr-2" />
                      Total Price:
                    </p>
                    <p>{booking.totalprice}</p>
                  </div>
                </div>
                <hr className="my-4" />
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Homeadmin;
