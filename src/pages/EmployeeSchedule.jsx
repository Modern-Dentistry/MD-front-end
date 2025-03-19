import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks, getDay } from "date-fns";
import { az } from "date-fns/locale";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import "../assets/style/employee-schedule.css";
import Sidebar from "../components/Sidebar.jsx"

const WORK_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00'
];

// Həftə günlərinin qısaldılmış adları
const WEEKDAYS_SHORT = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

function EmployeeSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [employees] = useState([
    {
      id: 1,
      name: "Rüstəm Məmmədov",
      position: "Diş həkimi",
      schedule: [
        { day: 1, startTime: '09:00', endTime: '14:00' }, // Bazar ertəsi
        { day: 2, startTime: '09:00', endTime: '17:00' }, // Çərşənbə axşamı
        { day: 4, startTime: '10:00', endTime: '16:00' }, // Cümə axşamı
      ]
    },
    {
      id: 2,
      name: "Aysel Hüseynova",
      position: "Ortodont",
      schedule: [
        { day: 1, startTime: '14:00', endTime: '18:00' }, // Bazar ertəsi
        { day: 3, startTime: '09:00', endTime: '14:00' }, // Çərşənbə
        { day: 5, startTime: '09:00', endTime: '13:00' }, // Cümə
      ]
    },
    {
      id: 3,
      name: "Fərid Qafarov",
      position: "Cərrah",
      schedule: [
        { day: 2, startTime: '09:00', endTime: '13:00' }, // Çərşənbə axşamı
        { day: 4, startTime: '14:00', endTime: '18:00' }, // Cümə axşamı
        { day: 6, startTime: '10:00', endTime: '15:00' }, // Şənbə
      ]
    },
  ]);

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
  
  // Tarix seçimi üçün kalendar toggle
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  // Kalendarda tarix seçimi
  const selectDate = (date) => {
    const newWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    setSelectedWeekStart(newWeekStart);
    setShowCalendar(false);
  };

  // Komponentdə render-dən öncə işçi qruplarını hazırlayaq
const prepareEmployeeBlocks = () => {
  const allBlocks = [];
  
  // Hər gün üçün
  weekDates.forEach((date, dayIndex) => {
    // Günün aktiv işçilərini tapaq
    const dayEmployees = employees.filter(emp => 
      emp.schedule.some(s => s.day === dayIndex + 1)
    );
    
    // Hər işçi üçün
    dayEmployees.forEach(emp => {
      const schedule = emp.schedule.find(s => s.day === dayIndex + 1);
      if (schedule) {
        // İş saatlarını indekslərə çevirək
        const startIndex = WORK_HOURS.indexOf(schedule.startTime);
        const endTimeHours = Number(schedule.endTime.split(':')[0]);
        const endTimeMinutes = Number(schedule.endTime.split(':')[1]);
        
        // Bitişdə olan saatı tapaq
        let endIndex = -1;
        for (let i = 0; i < WORK_HOURS.length; i++) {
          const timeHours = Number(WORK_HOURS[i].split(':')[0]);
          const timeMinutes = Number(WORK_HOURS[i].split(':')[1]);
          const timeValue = timeHours * 60 + timeMinutes;
          const endTimeValue = endTimeHours * 60 + endTimeMinutes;
          
          if (timeValue >= endTimeValue) {
            endIndex = i;
            break;
          }
        }
        if (endIndex === -1) endIndex = WORK_HOURS.length;
        
        // Blok əlavə edək
        allBlocks.push({
          id: emp.id,
          employee: emp,
          dayIndex,
          startIndex,
          endIndex,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          displayName: `${emp.name} (${schedule.startTime} - ${schedule.endTime})`
        });
      }
    });
  });
  
  return allBlocks;
};

const employeeBlocks = prepareEmployeeBlocks();

  // İşçinin həmin gün iş vaxtında olub-olmadığını yoxlama funksiyasında bir kiçik dəyişiklik
  // isEmployeeWorking funksiyasına əlavə bir parametr əlavə edək
  const isEmployeeWorking = (employeeSchedule, dayIndex, time, checkFullBlock = false) => {
    const schedule = employeeSchedule.find(s => s.day === dayIndex);
    if (!schedule) return false;
    
    const timeHours = Number(time.split(':')[0]);
    const timeMinutes = Number(time.split(':')[1]);
    const timeValue = timeHours * 60 + timeMinutes;
    
    const startTimeHours = Number(schedule.startTime.split(':')[0]);
    const startTimeMinutes = Number(schedule.startTime.split(':')[1]);
    const startTimeValue = startTimeHours * 60 + startTimeMinutes;
    
    const endTimeHours = Number(schedule.endTime.split(':')[0]);
    const endTimeMinutes = Number(schedule.endTime.split(':')[1]);
    const endTimeValue = endTimeHours * 60 + endTimeMinutes;
    
    // Tam blok yoxlanırsa əlavə yoxlama
    if (checkFullBlock) {
      // Next time-slot
      const nextTimeIndex = WORK_HOURS.indexOf(time) + 1;
      if (nextTimeIndex < WORK_HOURS.length) {
        const nextTime = WORK_HOURS[nextTimeIndex];
        const nextTimeHours = Number(nextTime.split(':')[0]);
        const nextTimeMinutes = Number(nextTime.split(':')[1]);
        const nextTimeValue = nextTimeHours * 60 + nextTimeMinutes;
        
        // Əgər həm bu time slot, həm də növbəti time slot iş vaxtındadırsa, onda tam blok
        return timeValue >= startTimeValue && nextTimeValue <= endTimeValue;
      }
    }
    
    return timeValue >= startTimeValue && timeValue < endTimeValue;
  };

  // İşçinin adını və saatını formatla
  const getEmployeeDisplayName = (employee, dayIndex) => {
    const schedule = employee.schedule.find(s => s.day === dayIndex);
    if (!schedule) return "";
    return `${employee.name} (${schedule.startTime} - ${schedule.endTime})`;
  };

  // Sadə Kalendar Komponenti
  const SimpleCalendar = ({ onSelectDate }) => {
    const [calendarDate, setCalendarDate] = useState(new Date());
    
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

    // Əlavə funksiya - işçinin bu günün xüsusi blokunda olduğunu təyin etmək üçün
    const isEmployeeBlock = (employeeId, dayIndex, timeIndex) => {
      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) return false;
      
      const schedule = employee.schedule.find(s => s.day === dayIndex);
      if (!schedule) return false;
      
      const time = WORK_HOURS[timeIndex];
      const startTimeIndex = WORK_HOURS.indexOf(schedule.startTime);
      
      // Əgər bu ilk dəfə görünürsə, ya da üst xanada eyni işçi yoxdursa
      return isEmployeeWorking(employee.schedule, dayIndex, time) &&
            (timeIndex === 0 || !isEmployeeWorking(employee.schedule, dayIndex, WORK_HOURS[timeIndex - 1]) || 
              timeIndex === startTimeIndex);
    };
    
    return (
      <div className="simple-calendar">
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

  return (
    <div className="employee-schedule-container">
      {/* Yuxarı hissə - Header */}
      <div className="schedule-header">
        <div className="search-container">
          <HiMiniMagnifyingGlass className="search-icon" />
          <input 
            type="text" 
            placeholder="Axtarış" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="date-display">
          <div className="current-month">{format(currentDate, 'MMMM yyyy', { locale: az })}</div>
          <div className="date-range">{dateRangeText}</div>
        </div>
        
        <div className="navigation-controls">
          <button className="nav-button" onClick={goToPreviousWeek}>
            <IoIosArrowBack />
          </button>
          <button className="nav-button" onClick={goToNextWeek}>
            <IoIosArrowForward />
          </button>
          <button className="calendar-button" onClick={toggleCalendar}>
            <FiCalendar />
          </button>
          
          {/* Açılan Kalendar */}
          {showCalendar && (
            <div className="calendar-dropdown">
              <SimpleCalendar onSelectDate={selectDate} />
            </div>
          )}
        </div>
      </div>
      
      {/* Əsas məzmun - Kalendar görünüşü */}
      <div className="schedule-out">
      <div className="schedule-content">
        <div className="schedule-grid">
          {/* İlk sətr - Həftə günləri və tarixlər */}
          <div className="time-column time-header">
            <div className="time-cell"></div> {/* Boş hücrə sol yuxarı küncün */}
          </div>
          
          {weekDates.map((date, index) => (
            <div key={index} className="day-column day-header">
              <div className="day-cell">
                <div className="day-name">{WEEKDAYS_SHORT[index]}</div>
                <div className="day-date">{format(date, 'd')}</div>
              </div>
            </div>
          ))}
          
          {/* Saat sütunu */}
          <div className="time-column">
            {WORK_HOURS.map((time, index) => (
              <div key={index} className="time-cell">{time}</div>
            ))}
          </div>
          
          {/* Günlər və iş saatları - yeni üsulla */}
          {weekDates.map((date, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="time-blocks-container">
                {/* Hər saat üçün xanalar */}
                {WORK_HOURS.map((time, timeIndex) => (
                  <div key={timeIndex} className="schedule-cell"></div>
                ))}
                
                {/* İşçi blokları üst-üstə yerləşdiriləcək */}
                {employeeBlocks
                  .filter(block => block.dayIndex === dayIndex)
                  .map((block, blockIndex) => {
                    const topPosition = block.startIndex * 60; // Hər cell 60px
                    const height = (block.endIndex - block.startIndex) * 60;
                    
                    return (
                      <div
                        key={blockIndex}
                        className={`employee-full-block employee-${blockIndex % 2}`}
                        style={{
                          top: `${topPosition}px`,
                          height: `${height}px`
                        }}
                        title={block.displayName}
                      >
                        {block.displayName}
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
}

export default EmployeeSchedule;