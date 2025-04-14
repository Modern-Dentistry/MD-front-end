import React, { createContext, useContext } from 'react';

// Məlumatlar
const roomOptions = [
  { value: '1', label: 'Otaq 1' },
  { value: '2', label: 'Otaq 2' },
  { value: '3', label: 'Otaq 3' },
  { value: '4', label: 'Otaq 4' },
  { value: '5', label: 'Otaq 5' },
];

const employees = [
  {
    id: 1,
    name: "Rüstəm Məmmədov",
    position: "Diş həkimi",
    schedule: [
      { date: '2025-03-25', startTime: '09:00', endTime: '14:00', room: '1' },
      { date: '2025-03-26', startTime: '10:00', endTime: '17:00', room: '2' },
      { date: '2025-03-27', startTime: '09:00', endTime: '13:00', room: '3' },
      { date: '2025-03-28', startTime: '14:00', endTime: '18:00', room: '1' },
      { date: '2025-03-29', startTime: '09:00', endTime: '15:00', room: '2' }
    ]
  },
  // ... digər employees məlumatları
];

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  return (
    <AppointmentContext.Provider value={{ roomOptions, employees }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
}; 