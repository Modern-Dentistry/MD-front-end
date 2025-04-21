import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays, startOfWeek, addWeeks, subWeeks, getDay } from "date-fns";
import { az } from "date-fns/locale";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import "../assets/style/employee-schedule.css";
import SidebarMenu from "../components/SidebarMenu.jsx";

import CustomSelect from "../components/CustomSelect.jsx"; 

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
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const scheduleRef = useRef(null);
  // Select dropdown üçün state-lər əlavə edək
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Tarix ilə bağlı iş saatları üçün data modelini dəyişdirək
  const [employees, setEmployees] = useState([
  {
    id: 1,
    name: "Rüstəm Məmmədov",
    position: "Diş həkimi",
    schedule: [
      // Konkret tarixlər əlavə edirik (yyyy-MM-dd formatı)
      { date: '2025-03-25', startTime: '09:00', endTime: '14:00' },
      { date: '2025-03-25', startTime: '09:00', endTime: '14:00' },
      { date: '2025-03-25', startTime: '10:00', endTime: '13:00' },
      { date: '2025-03-26', startTime: '09:00', endTime: '17:00' },
      { date: '2025-03-25', startTime: '10:00', endTime: '12:00' },

      { date: '2025-03-28', startTime: '10:00', endTime: '16:00' },
      { date: '2025-04-01', startTime: '09:00', endTime: '15:00' },
      { date: '2025-04-03', startTime: '10:30', endTime: '17:30' },
    ]
  },
  {
    id: 2,
    name: "Aysel Hüseynova",
    position: "Ortodont",
    schedule: [
      { date: '2025-03-25', startTime: '11:00', endTime: '18:00' },
      { date: '2025-03-27', startTime: '09:00', endTime: '14:00' },
      { date: '2025-03-29', startTime: '09:00', endTime: '13:00' },
      { date: '2025-04-02', startTime: '13:30', endTime: '18:00' },
      { date: '2025-04-04', startTime: '09:00', endTime: '14:30' },
    ]
  },
  {
    id: 3,
    name: "Fərid Qafarov",
    position: "Cərrah",
    schedule: [
      { date: '2025-03-26', startTime: '09:00', endTime: '13:00' },
      { date: '2025-03-28', startTime: '14:00', endTime: '18:00' },
      { date: '2025-03-30', startTime: '10:00', endTime: '15:00' },
      { date: '2025-04-02', startTime: '09:00', endTime: '12:30' },
      { date: '2025-04-05', startTime: '10:00', endTime: '16:00' },
    ]
  },
  ]);

    // Həkimlər üçün options(APİ-dən gələcək)
    const doctorOptions = employees.map(emp => ({
      value: emp.id,
      label: emp.name
    }));
    
    // Otaqlar üçün options (APİ-dən gələcək)
    const roomOptions = [
      { value: '1', label: 'Otaq 1' },
      { value: '2', label: 'Otaq 2' },
      { value: '3', label: 'Otaq 3' },
      { value: '4', label: 'Otaq 4' },
      { value: '5', label: 'Otaq 5' },
    ];

    // Həkim seçimi dəyişdikdə
    const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
    setSelectedDoctorId(selectedOption ? selectedOption.value : null);
    console.log("Seçilmiş həkim:", selectedOption);
    // Burada seçilmiş həkimə görə filtrasiya və ya digər əməliyyatlar edilə bilər
  };
    // Otaq seçimi dəyişdikdə
    const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    console.log("Seçilmiş otaq:", selectedOption);
    // Burada seçilmiş otağa görə filtrasiya və ya digər əməliyyatlar edilə bilər
  };

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
// Tarixə əsaslanan işçi bloklarını hazırlamaq üçün funksiya - üst-üstə düşmələri həll edən yeni versiya
// Tarixə əsaslanan işçi bloklarını hazırlamaq üçün funksiya - tam üst-üstə düşmələri həll edən versiya
const prepareEmployeeBlocks = () => {
  const allBlocks = [];
  let blockIdCounter = 0; // Unikal ID-lər üçün sayğac
  
  // Hər gün üçün
  weekDates.forEach((date, dayIndex) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Bu günün tarixinə uyğun bütün cədvəlləri toplayaq
    const daySchedules = [];
    
    // Bütün işçilərin bu gün üçün olan cədvəllərini toplayaq
    employees.forEach(emp => {
      // İşçinin bu tarixdəki bütün məşğulluq saatlarını əlavə edək
      emp.schedule
        .filter(s => s.date === formattedDate)
        .forEach(schedule => {
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
          
          daySchedules.push({
            id: `block-${blockIdCounter++}`, // Unikal ID əlavə edirik
            employeeId: emp.id, // İşçi ID-sini saxlayırıq
            employee: emp,
            dayIndex,
            date: formattedDate,
            startIndex,
            endIndex,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            timeRange: [startIndex, endIndex],
            displayName: `${emp.name} (${schedule.startTime} - ${schedule.endTime})`
          });
        });
    });
    
    // Blokları zaman üzrə sıralayaq (erkən başlayan əvvəl)
    daySchedules.sort((a, b) => {
      // Əvvəlcə başlama vaxtına görə
      if (a.startIndex !== b.startIndex) {
        return a.startIndex - b.startIndex;
      }
      // Eyni başlama vaxtı varsa, bitiş vaxtına görə (daha uzun aralıq əvvəl)
      return b.endIndex - a.endIndex;
    });
    
    // Sütunları təyin etmək üçün əlavə funksiya
    const assignColumns = (schedules) => {
      // Hər sütunun son bitiş vaxtını izləmək üçün
      const columns = [];
      
      schedules.forEach(schedule => {
        // Hansı sütunda yerləşdirə biləcəyimizi tap
        let columnIndex = 0;
        
        for (let i = 0; i < columns.length; i++) {
          // Əgər bu sütunda sona çatmış blok varsa və yeni blok bu sütuna sığırsa
          if (schedule.startIndex >= columns[i]) {
            columnIndex = i;
            break;
          }
          columnIndex = i + 1; // Yeni sütun lazım olacaq
        }
        
        // Sütun təyin et
        schedule.column = columnIndex;
        
        // Bu sütunun son bitiş vaxtını yenilə
        columns[columnIndex] = schedule.endIndex;
      });
      
      // Ümumi sütun sayını təyin et
      const totalColumns = columns.length;
      
      // Hər blok üçün en və soldan məsafə hesabla
 // Hər blok üçün en və soldan məsafə hesabla - dinamik enlikli versiya
// Hər blok üçün en və soldan məsafə hesabla - dinamik enlikli versiya
schedules.forEach((schedule, idx) => {
  schedule.parallelCount = totalColumns;
  schedule.parallelIndex = schedule.column;
  
  // Blokların enliklərini fərqli hesablayaq - daha kiçik enliklər
  const baseWidth = 100 / totalColumns;
  
  // Artan parallelIndex ilə enin kiçilməsi - daha sonra əlavə olunanlar daha kiçik
  const column = schedule.column;
  schedule.width = baseWidth * (totalColumns - column); // Sütun indeksinə görə azalan en
  
  // Z-index əlavə edək - daha kiçik bloklar (daha sonrakı sütunlar) daha üstdə görünsün
  schedule.zIndex = column + 2; // +2 əlavə edirik ki, bütün işçi blokları normal z-indexdən (1) çox olsun
});
      
      return schedules;
    };
    
    // Sütun təyinatları hazırla
    const organizedSchedules = assignColumns(daySchedules);
    
    // Blokları nəticə massivinə əlavə et
    allBlocks.push(...organizedSchedules);
  });
  
  return allBlocks;
};

const employeeBlocks = prepareEmployeeBlocks();

  // Tarixə əsaslanan işçi məşğulluq yoxlaması
const isEmployeeWorking = (employeeSchedule, date, time, checkFullBlock = false) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const schedule = employeeSchedule.find(s => s.date === formattedDate);
  
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
// Tarixə əsaslanan işçi blokunun təyini
const isEmployeeBlock = (employeeId, date, timeIndex) => {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return false;
  
  const formattedDate = format(date, 'yyyy-MM-dd');
  const schedule = employee.schedule.find(s => s.date === formattedDate);
  if (!schedule) return false;
  
  const time = WORK_HOURS[timeIndex];
  const startTimeIndex = WORK_HOURS.indexOf(schedule.startTime);
  
  // Əgər bu ilk dəfə görünürsə, ya da üst xanada eyni işçi yoxdursa
  return isEmployeeWorking(employee.schedule, date, time) &&
        (timeIndex === 0 || !isEmployeeWorking(employee.schedule, date, WORK_HOURS[timeIndex - 1]) || 
          timeIndex === startTimeIndex);
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
    // Tarix dəyişdikdə iş saatlarını yeniləmək üçün effect
useEffect(() => {
  // Tarix dəyişdiyində employee blockları yenidən hazırlayırıq
  const updatedBlocks = prepareEmployeeBlocks();
  // Burada bir state əlavə edə bilərik ki yenilənmiş blokları saxlaya bilək
  // setEmployeeBlocks(updatedBlocks); 
}, [selectedWeekStart]);
    
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

  // Kənara klik edəndə seçimi ləğv etmək üçün useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Əgər klik olunan element employee-full-block deyilsə və ya onun içindəki element deyilsə
      const clickedBlock = event.target.closest('.employee-full-block');
      if (!clickedBlock) {
        setSelectedBlockId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Blok klik hadisəsini idarə etmək üçün funksiya
  const handleBlockClick = (blockId, event) => {
    event.stopPropagation(); // Event-in yuxarı qalxmasının qarşısını alırıq
    setSelectedBlockId(selectedBlockId === blockId ? null : blockId);
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

  return (
    <div className="employee-schedule-container">
      {/* Yuxarı hissə - Header */}
      <div className="schedule-header">
       <div className="search-and-selects">
        {/* Həkimlər və otaqlar  */}
          <div className="select-options-container">
            <CustomSelect
              options={doctorOptions}
              onChange={handleDoctorChange}
              placeholder="Həkim seç"
              value={selectedDoctor}
              isClearable={true}
              isSearchable={true}
              className="doctor-select"
            />
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
          {/* Həkimlər və otaqlar End */}
       </div>
        
        <div className="date-and-navigation">
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
      </div>
      
      {/* Əsas məzmun - Kalendar görünüşü */}
      <div className="schedule-out" ref={scheduleRef}>
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
          
          {/* Günlər və iş saatları - yeni üsulla */}
          {weekDates.map((date, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="time-blocks-container">
                {/* Hər saat üçün xanalar */}
                {WORK_HOURS.map((time, timeIndex) => (
                  <div 
                    key={timeIndex} 
                    className={`schedule-cell ${selectedDoctorId && isDoctorWorking(selectedDoctorId, date, time) ? 'doctor-working' : ''}`}
                  ></div>
                ))}
                
                {/* İşçi blokları üst-üstə yerləşdiriləcək */}
                {employeeBlocks
                  .filter(block => block.dayIndex === dayIndex)
                  .map((block, blockIndex) => {
                    const topPosition = block.startIndex * 60;
                    const height = (block.endIndex - block.startIndex) * 60;
                    const width = block.width || 100;
                    const leftOffset = block.leftOffset || 0;
                    const colorIndex = block.parallelIndex % 5;
                    const isCompact = width < 33 || height < 60;
                    const isSelected = selectedBlockId === block.id;
                    
                    return (
                      <div
                        key={block.id}
                        className={`employee-full-block employee-color-${colorIndex} ${isCompact ? 'compact' : ''} ${isSelected ? 'selected' : ''}`}
                        style={{
                          top: `${topPosition}px`,
                          height: `${height}px`,
                          width: `${width}%`,
                          zIndex: isSelected ? 1000 : block.zIndex
                        }}
                        title={block.displayName}
                        onClick={(e) => handleBlockClick(block.id, e)}
                      >
                        {!isCompact ? (
                          <>
                            <div className="block-time">{block.startTime} - {block.endTime}</div>
                            <div className="employee-name">{block.employee.name}</div>
                          </>
                        ) : (
                          <div className="compact-content">{block.employee.name.split(' ')[0]}</div>
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
      {employees.map((doctor) => (
        <div 
          key={doctor.id} 
          className={`doctor-card ${selectedDoctorId === doctor.id ? 'selected' : ''}`}
          onClick={() => handleDoctorCardClick(doctor.id)}
        >
          <div className="doctor-image-container">
            <img src="/images/doctor-placeholder.png" alt={doctor.name} className="doctor-image" />
          </div>
          <div className="doctor-info">
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-position">{doctor.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeSchedule;