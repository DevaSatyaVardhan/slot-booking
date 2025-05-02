/**
 * Calendar functionality for the booking application
 */

// Calendar state
let currentDate = new Date();
let selectedDate = null;

// DOM elements
const calendarDates = document.getElementById('calendar-dates');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

// Initialize calendar
function initCalendar() {
  renderCalendar();
  
  // Event listeners for navigation
  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
  
  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
}

// Render calendar for current month
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Update header
  currentMonthElement.textContent = new Date(year, month, 1)
    .toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Clear existing dates
  calendarDates.innerHTML = '';
  
  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get days from previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  // Add days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    addDateToCalendar(date, 'other-month disabled');
  }
  
  // Add days for current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    let classes = '';
    
    if (isPastDate(date)) {
      classes = 'disabled';
    }
    
    if (isToday(date)) {
      classes += ' today';
    }
    
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      classes += ' selected';
    }
    
    addDateToCalendar(date, classes);
  }
  
  // Add days from next month to fill the grid
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const nextMonthDays = totalCells - (firstDay + daysInMonth);
  
  for (let day = 1; day <= nextMonthDays; day++) {
    const date = new Date(year, month + 1, day);
    addDateToCalendar(date, 'other-month disabled');
  }
}

// Add a date to the calendar grid
function addDateToCalendar(date, classes) {
  const day = date.getDate();
  const dateElement = document.createElement('div');
  dateElement.classList.add('date');
  
  // Add additional classes
  if (classes) {
    classes.split(' ').forEach(cls => {
      if (cls) dateElement.classList.add(cls);
    });
  }
  
  dateElement.textContent = day;
  
  // Add select date functionality if not disabled
  if (!dateElement.classList.contains('disabled')) {
    dateElement.addEventListener('click', () => {
      // Remove selected class from all dates
      document.querySelectorAll('.date.selected').forEach(date => {
        date.classList.remove('selected');
      });
      
      // Add selected class to clicked date
      dateElement.classList.add('selected');
      
      // Update selected date
      selectedDate = date;
      
      // Navigate to time slot selection
      updateSelectedDateDisplay();
      navigateToStep(2);
    });
  }
  
  calendarDates.appendChild(dateElement);
}

// Update the selected date display in time slot view
function updateSelectedDateDisplay() {
  if (selectedDate) {
    document.getElementById('selected-date-display').textContent = 
      `Selected Date: ${formatDate(selectedDate)}`;
  }
}