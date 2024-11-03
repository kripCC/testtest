import React from 'react';
import { formatDate, formatTime } from '../lib/utils';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

type Booking = {
  id: string;
  house: string;
  date: Date;
  shiftType: string;
  startTime: Date;
  dropTime: Date;
  status: 'completed' | 'ongoing' | 'cancelled';
};

const mockBookings: Booking[] = [
  {
    id: '1',
    house: 'House A',
    date: new Date('2024-03-15'),
    shiftType: 'morning',
    startTime: new Date('2024-03-15T09:00:00'),
    dropTime: new Date('2024-03-15T17:00:00'),
    status: 'completed',
  },
  {
    id: '2',
    house: 'House B',
    date: new Date('2024-03-16'),
    shiftType: 'afternoon',
    startTime: new Date('2024-03-16T13:00:00'),
    dropTime: new Date('2024-03-16T21:00:00'),
    status: 'ongoing',
  },
];

export function BookingHistory() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'ongoing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {mockBookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(booking.status)}
                      <p className="ml-2 text-sm font-medium text-gray-900">{booking.house}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {formatDate(booking.date)}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {formatTime(booking.startTime)} - {formatTime(booking.dropTime)}
                      </p>
                    </div>
                    {booking.status === 'ongoing' && (
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => {
                            // Handle cancellation
                            console.log('Cancelling booking:', booking.id);
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}