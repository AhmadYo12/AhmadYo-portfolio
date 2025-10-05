import React, { useState, useEffect } from 'react';

const DatePicker = ({ isOpen, onClose, onApply, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedRange, setSelectedRange] = useState('اليوم');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const months = [
    'كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران',
    'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'
  ];

  const years = Array.from({length: 12}, (_, i) => 2014 + i);

  const dayHeaders = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];

  const rangeOptions = [
    { label: 'اليوم', value: 'today' },
    { label: 'آخر ٧ أيام', value: 'last7days' },
    { label: 'آخر ١٤ يومًا', value: 'last14days' },
    { label: 'هذا الشهر', value: 'thisMonth' },
    { label: 'الشهر الماضي', value: 'lastMonth' },
    { label: 'مخصص', value: 'custom' }
  ];

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
    }
  }, [initialDate]);

  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(prevYear, prevMonth, daysInPrevMonth - i)
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(nextYear, nextMonth, day)
      });
    }
    
    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setSelectedRange('مخصص');
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range.label);
    const today = new Date();
    
    switch (range.value) {
      case 'today':
        setSelectedDate(today);
        break;
      case 'last7days':
        setSelectedDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000));
        break;
      case 'last14days':
        setSelectedDate(new Date(today.getTime() - 13 * 24 * 60 * 60 * 1000));
        break;
      case 'thisMonth':
        setSelectedDate(new Date(today.getFullYear(), today.getMonth(), 1));
        break;
      case 'lastMonth':
        setSelectedDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
        break;
      default:
        break;
    }
  };

  const handleApply = () => {
    onApply(selectedDate, selectedRange);
    onClose();
  };

  const isDateSelected = (date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const CustomDropdown = ({ value, options, onChange, isOpen, onToggle, type }) => (
    <div className="custom-dropdown" data-type={type}>
      <div className="dropdown-button" onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}>
        <span>{type === 'month' ? months[value] : value}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-grid">
            {options.map((option, index) => (
              <div
                key={index}
                className={`dropdown-item ${(type === 'month' ? index : option) === value ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(type === 'month' ? index : option);
                  onToggle();
                }}
              >
                {type === 'month' ? option : option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  const days = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="date-picker-overlay" onClick={() => {
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
      onClose();
    }}>
      <div className="date-picker-container" onClick={(e) => e.stopPropagation()}>
        <div className="date-picker-left">
          <div className="date-picker-header">
            <CustomDropdown
              value={currentYear}
              options={years}
              onChange={setCurrentYear}
              isOpen={showYearDropdown}
              onToggle={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowMonthDropdown(false);
              }}
              type="year"
            />
            <CustomDropdown
              value={currentMonth}
              options={months}
              onChange={setCurrentMonth}
              isOpen={showMonthDropdown}
              onToggle={() => {
                setShowMonthDropdown(!showMonthDropdown);
                setShowYearDropdown(false);
              }}
              type="month"
            />
          </div>
          
          <div className="calendar-grid">
            {dayHeaders.map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {days.map((dayObj, index) => (
              <div
                key={index}
                className={`calendar-day ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${isDateSelected(dayObj.date) ? 'selected' : ''}`}
                onClick={() => handleDayClick(dayObj.date)}
              >
                {dayObj.day}
              </div>
            ))}
          </div>
          
          <button className="date-picker-apply" onClick={handleApply}>
            تطبيق
          </button>
        </div>
        
        <div className="date-picker-right">
          <div className="predefined-ranges">
            {rangeOptions.map(range => (
              <div
                key={range.value}
                className={`range-option ${selectedRange === range.label ? 'selected' : ''}`}
                onClick={() => handleRangeSelect(range)}
              >
                {range.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;