import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Minus, Calendar, Clock, Search } from 'lucide-react';

const bookingSchema = z.object({
  house: z.string().min(1, 'Please select a house'),
  dropTime: z.string().min(1, 'Drop time is required'),
  dropDate: z.string().min(1, 'Drop date is required'),
  searches: z.array(z.object({
    shifts: z.array(z.object({
      date: z.string().min(1, 'Date is required'),
      shiftType: z.enum(['morning', 'afternoon', 'night'], { required_error: 'Shift type is required' }),
      startTime: z.string().min(1, 'Start time is required'),
    })).min(1, 'At least one shift is required'),
  })).min(1, 'At least one search is required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const houses = [
  { id: '1', name: 'House A' },
  { id: '2', name: 'House B' },
  { id: '3', name: 'House C' },
];

export function BookingForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { register, control, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      searches: [{ shifts: [{}] }],
    },
  });

  const { fields: searchFields, append: appendSearch, remove: removeSearch } = useFieldArray({
    control,
    name: 'searches',
  });

  const onSubmit = (data: BookingFormData) => {
    setShowConfirmation(true);
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select House</label>
          <select
            {...register('house')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a house...</option>
            {houses.map((house) => (
              <option key={house.id} value={house.id}>
                {house.name}
              </option>
            ))}
          </select>
          {errors.house && (
            <p className="mt-2 text-sm text-red-600">{errors.house.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 inline mr-2" />
              Drop Date
            </label>
            <input
              type="date"
              {...register('dropDate')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.dropDate && (
              <p className="mt-2 text-sm text-red-600">{errors.dropDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 inline mr-2" />
              Drop Time
            </label>
            <input
              type="time"
              {...register('dropTime')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.dropTime && (
              <p className="mt-2 text-sm text-red-600">{errors.dropTime.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Searches</h3>
            <button
              type="button"
              onClick={() => appendSearch({ shifts: [{}] })}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Add Search
            </button>
          </div>

          {searchFields.map((searchField, searchIndex) => {
            const shiftsArray = useFieldArray({
              control,
              name: `searches.${searchIndex}.shifts`,
            });

            return (
              <div key={searchField.id} className="p-6 bg-gray-50 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium text-gray-700">Search {searchIndex + 1}</h4>
                  {searchFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSearch(searchIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium text-gray-700">Shifts</h5>
                    <button
                      type="button"
                      onClick={() => shiftsArray.append({})}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Shift
                    </button>
                  </div>

                  {shiftsArray.fields.map((shiftField, shiftIndex) => (
                    <div key={shiftField.id} className="p-4 bg-white rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h6 className="text-sm font-medium text-gray-700">Shift {shiftIndex + 1}</h6>
                        {shiftsArray.fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => shiftsArray.remove(shiftIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Date
                          </label>
                          <input
                            type="date"
                            {...register(`searches.${searchIndex}.shifts.${shiftIndex}.date`)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.date && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.date?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Shift Type</label>
                          <select
                            {...register(`searches.${searchIndex}.shifts.${shiftIndex}.shiftType`)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select shift type...</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="night">Night</option>
                          </select>
                          {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.shiftType && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.shiftType?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Start Time
                          </label>
                          <input
                            type="time"
                            {...register(`searches.${searchIndex}.shifts.${shiftIndex}.startTime`)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.startTime && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.searches?.[searchIndex]?.shifts?.[shiftIndex]?.startTime?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Review Booking
          </button>
        </div>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Booking</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please review your booking details before confirming.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  // Handle confirmation
                  setShowConfirmation(false);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}