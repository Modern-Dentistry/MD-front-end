import React, { useState, useEffect, useRef } from 'react';
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks, getDay } from "date-fns";
import { az } from "date-fns/locale";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import CustomSelect from "../components/CustomSelect.jsx";
import DrCard from "../components/DrCard.jsx";
import "../assets/style/appointments.css";
import "../assets/style/appointment-left-side.css";
import { useNavigate } from 'react-router-dom';

// Otaqlar üçün options (APİ-dən gələcək)
const roomOptions = [
  { value: '1', label: 'Otaq 1' },
  { value: '2', label: 'Otaq 2' },
  { value: '3', label: 'Otaq 3' },
  { value: '4', label: 'Otaq 4' },
  { value: '5', label: 'Otaq 5' },
];

// Həkimlər məlumatları (APİ-dən gələcək)
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
  {
    id: 2,
    name: "Aysel Hüseynova",
    position: "Ortodont",
    schedule: [
      { date: '2025-03-25', startTime: '11:00', endTime: '18:00', room: '2' },
      { date: '2025-03-26', startTime: '09:00', endTime: '14:00', room: '3' },
      { date: '2025-03-27', startTime: '13:00', endTime: '18:00', room: '1' },
      { date: '2025-03-28', startTime: '09:00', endTime: '13:00', room: '2' },
      { date: '2025-03-29', startTime: '14:00', endTime: '18:00', room: '3' }
    ]
  },
  {
    id: 3,
    name: "Fərid Qafarov",
    position: "Cərrah",
    schedule: [
      { date: '2025-03-25', startTime: '09:00', endTime: '13:00', room: '3' },
      { date: '2025-03-26', startTime: '14:00', endTime: '18:00', room: '1' },
      { date: '2025-03-27', startTime: '09:00', endTime: '15:00', room: '2' },
      { date: '2025-03-28', startTime: '10:00', endTime: '16:00', room: '3' },
      { date: '2025-03-29', startTime: '09:00', endTime: '12:00', room: '1' }
    ]
  },
];

// Həftə günlərinin qısaldılmış adları
const WEEKDAYS_SHORT = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

// İş saatları
const WORK_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00'
];

// SimpleCalendar komponenti
const SimpleCalendar = ({ onSelectDate, onClose }) => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const calendarRef = useRef(null);
  
  // Kənara klik edəndə kalendarı bağlamaq üçün useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Kalendar ayının ilk gününü hesablama
  const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
  const startDayOfMonth = getDay(firstDay);
  
  // Cari ayın günlərinin sayını hesablama
  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
  
  // Əvvəlki və sonrakı ay düymələri
  const prevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };
  
  // Gün seçimi
  const handleDateSelect = (day) => {
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    onSelectDate(selectedDate);
  };
  
  // Kalendar başlığı - Ay və İl
  const calendarHeader = format(calendarDate, 'MMMM yyyy', { locale: az });
  
  // Kalendar günlərini hazırlama
  const days = [];
  for (let i = 0; i < startDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = new Date().getDate() === i && 
                     new Date().getMonth() === calendarDate.getMonth() && 
                     new Date().getFullYear() === calendarDate.getFullYear();

    days.push(
      <div 
        key={i} 
        className={`calendar-day ${isToday ? 'today' : ''}`}
        onClick={() => handleDateSelect(i)}
      >
        {i}
      </div>
    );
  }
  
  return (
    <div className="simple-calendar" ref={calendarRef}>
      <div className="calendar-header">
        <button onClick={prevMonth}><IoIosArrowBack /></button>
        <div>{calendarHeader}</div>
        <button onClick={nextMonth}><IoIosArrowForward /></button>
      </div>
      <div className="calendar-weekdays">
        {WEEKDAYS_SHORT.map((day, index) => (
          <div key={index} className="weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {days}
      </div>
    </div>
  );
};

const Appointments = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  // Kənara klik edəndə kalendarı bağlamaq üçün useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    setSelectedDoctorId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Həkimləri axtarışa görə filter et
  const filteredDoctors = employees.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Həftəlik tarix aralığını hesablama
  const weekDates = [...Array(7)].map((_, i) => addDays(selectedWeekStart, i));
  
  // Ekranda görüntüləyəcəyimiz tarix aralığı mətni
  const dateRangeText = `${format(weekDates[0], 'd MMMM', { locale: az })} - ${format(weekDates[6], 'd MMMM', { locale: az })}`;
  
  // Əvvəlki həftəyə keçmə
  const goToPreviousWeek = () => {
    const newWeekStart = subWeeks(selectedWeekStart, 1);
    setSelectedWeekStart(newWeekStart);
  };
  
  // Növbəti həftəyə keçmə
  const goToNextWeek = () => {
    const newWeekStart = addWeeks(selectedWeekStart, 1);
    setSelectedWeekStart(newWeekStart);
  };
  
  // Kalendar toggle
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  // Kalendarda tarix seçimi
  const selectDate = (date) => {
    const newWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    setSelectedWeekStart(newWeekStart);
    setShowCalendar(false);
  };

  // Həkim kartına klik hadisəsi
  const handleDoctorCardClick = (doctorId) => {
    setSelectedDoctorId(selectedDoctorId === doctorId ? null : doctorId);
  };

  // Həkimin iş saatlarını yoxlamaq üçün funksiya
  const isDoctorWorking = (doctorId, date, time) => {
    const doctor = employees.find(emp => emp.id === doctorId);
    if (!doctor) return false;

    const formattedDate = format(date, 'yyyy-MM-dd');
    const schedule = doctor.schedule.find(s => s.date === formattedDate);
    if (!schedule) return false;

    // Əgər otaq seçilibsə, yalnız seçilmiş otaqda olan həkimləri göstər
    if (selectedRoom && schedule.room !== selectedRoom.value) {
      return false;
    }

    const timeHours = Number(time.split(':')[0]);
    const timeMinutes = Number(time.split(':')[1]);
    const timeValue = timeHours * 60 + timeMinutes;

    const startTimeHours = Number(schedule.startTime.split(':')[0]);
    const startTimeMinutes = Number(schedule.startTime.split(':')[1]);
    const startTimeValue = startTimeHours * 60 + startTimeMinutes;

    const endTimeHours = Number(schedule.endTime.split(':')[0]);
    const endTimeMinutes = Number(schedule.endTime.split(':')[1]);
    const endTimeValue = endTimeHours * 60 + endTimeMinutes;

    return timeValue >= startTimeValue && timeValue < endTimeValue;
  };

  // Həkimin otaq nömrəsini almaq üçün funksiya
  const getDoctorRoom = (doctorId, date) => {
    const doctor = employees.find(emp => emp.id === doctorId);
    if (!doctor) return null;

    const formattedDate = format(date, 'yyyy-MM-dd');
    const schedule = doctor.schedule.find(s => s.date === formattedDate);
    return schedule ? schedule.room : null;
  };

  // Otaqda işləyən həkimləri tapmaq üçün funksiya
  const getWorkingDoctorsInRoom = (date, time) => {
    if (!selectedRoom) return [];
    
    return employees.filter(doctor => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const schedule = doctor.schedule.find(s => s.date === formattedDate);
      
      if (!schedule || schedule.room !== selectedRoom.value) return false;

      const timeHours = Number(time.split(':')[0]);
      const timeMinutes = Number(time.split(':')[1]);
      const timeValue = timeHours * 60 + timeMinutes;

      const startTimeHours = Number(schedule.startTime.split(':')[0]);
      const startTimeMinutes = Number(schedule.startTime.split(':')[1]);
      const startTimeValue = startTimeHours * 60 + startTimeMinutes;

      const endTimeHours = Number(schedule.endTime.split(':')[0]);
      const endTimeMinutes = Number(schedule.endTime.split(':')[1]);
      const endTimeValue = endTimeHours * 60 + endTimeMinutes;

      return timeValue >= startTimeValue && timeValue < endTimeValue;
    });
  };

  return (
    <div className="appointments-container">
      {/* LEFT SİDE  */}
      <div className="left-side">
        <div className="select-options-container">
          <CustomSelect
            options={roomOptions}
            onChange={handleRoomChange}
            placeholder="Otaq seç"
            value={selectedRoom}
            isClearable={true}
            isSearchable={true}
            className="room-select"
          />
        </div>

        {/* search input  */}
        <input
          type="text"
          className="search-input"
          placeholder="Həkim axtar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Doctors Components (DrCard)  */}
        <div className="doctors-container">
          {filteredDoctors.map(doctor => (
            <div 
              key={doctor.id} 
              className={`doctor-card ${selectedDoctorId === doctor.id ? 'selected' : ''}`}
              onClick={() => handleDoctorCardClick(doctor.id)}
            >
              <div className="doctor-image-container">
                <img 
                  src="/images/doctor-placeholder.png" 
                  alt={doctor.name} 
                  className="doctor-image" 
                />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-position">{doctor.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (Calendar) */}
      <div className="right-side">
        <div className="schedule-header">
          <div className="date-and-navigation">
            <div className="date-display">
              <div className="current-month">{format(currentDate, 'MMMM yyyy', { locale: az })}</div>
              <div className="date-range">{dateRangeText}</div>
            </div>
            
            <div className="navigation-controls">
              <button className="calendar-button" onClick={toggleCalendar}>
                <FiCalendar />
              </button>
              <button className="nav-button" onClick={goToPreviousWeek}>
                <IoIosArrowBack />
              </button>
              <button className="nav-button" onClick={goToNextWeek}>
                <IoIosArrowForward />
              </button>
              <button onClick={() => navigate('/add-appointment')}>
                Yeni randevu əlavə et
              </button>
              
              {/* Açılan Kalendar */}
              {showCalendar && (
                <div className="calendar-dropdown">
                  <SimpleCalendar 
                    onSelectDate={selectDate} 
                    onClose={() => setShowCalendar(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="schedule-content">
          <div className="schedule-grid">
            {/* İlk sətr - Həftə günləri və tarixlər */}
            <div className="time-column time-header">
              <div className="time-cell"></div>
            </div>
            
            {weekDates.map((date, index) => (
              <div key={index} className="day-column day-header">
                <div className="day-cell">
                  <div className="day-name">{WEEKDAYS_SHORT[index]}</div>
                  <div className={`day-date ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'active' : ''}`}>
                    {format(date, 'd')}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Saat sütunu */}
            <div className="time-column">
              {WORK_HOURS.map((time, index) => (
                <div key={index} className="time-cell">{time}</div>
              ))}
            </div>
            
            {/* Günlər və iş saatları */}
            {weekDates.map((date, dayIndex) => (
              <div key={dayIndex} className="day-column">
                <div className="time-blocks-container">
                  {/* Hər saat üçün xanalar */}
                  {WORK_HOURS.map((time, timeIndex) => {
                    const isWorking = selectedDoctorId 
                      ? isDoctorWorking(selectedDoctorId, date, time)
                      : getWorkingDoctorsInRoom(date, time).length > 0;
                    
                    const workingDoctors = getWorkingDoctorsInRoom(date, time);
                    const doctor = selectedDoctorId 
                      ? employees.find(emp => emp.id === selectedDoctorId)
                      : workingDoctors[0];
                    
                    const room = isWorking ? getDoctorRoom(doctor.id, date) : null;
                    
                    // Həkimin bu gün üçün iş saatını tap
                    const schedule = doctor && doctor.schedule.find(s => s.date === format(date, 'yyyy-MM-dd'));
                    
                    // Əgər bu saat həkimin iş saatının başlanğıcıdırsa
                    const isStartTime = schedule && time === schedule.startTime;
                    
                    return (
                      <div 
                        key={timeIndex} 
                        className={`schedule-cell ${isWorking ? 'doctor-working' : ''}`}
                      >
                        {isWorking && isStartTime && (
                          <div className="schedule-info">
                            <div className="doctor-schedule-name">{doctor.name}</div>
                            <div className="doctor-schedule-room">Otaq {room}</div>
                            <div className="doctor-schedule-time">{schedule.startTime} - {schedule.endTime}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;