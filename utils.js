/**
 * Utility functions for the booking application
 */

// Format date to display format
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Format time to display format (12-hour format)
function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Check if date is today
function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

// Check if date is in the past
function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Navigate between booking steps
function navigateToStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll('.booking-step').forEach(step => {
    step.classList.remove('active');
  });
  
  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    if (index + 1 < stepNumber) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (index + 1 === stepNumber) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });
  
  // Show current step
  let stepId;
  switch (stepNumber) {
    case 1:
      stepId = 'calendar-view';
      break;
    case 2:
      stepId = 'timeslot-view';
      break;
    case 3:
      stepId = 'registration-view';
      break;
    case 4:
      stepId = 'confirmation-view';
      break;
  }
  
  document.getElementById(stepId).classList.add('active');
  
  // Smooth scroll to top of the step
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Store booking data in localStorage
function storeBookingData(bookingData) {
  // Get existing bookings
  const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
  // Add new booking
  existingBookings.push(bookingData);
  
  // Save back to localStorage
  localStorage.setItem('bookings', JSON.stringify(existingBookings));
}

// Check if a slot is already booked
function isSlotBooked(date, time) {
  // Get existing bookings
  const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
  // Convert date to string format for comparison
  const dateStr = date.toDateString();
  
  // Check if there's a booking with the same date and time
  return existingBookings.some(booking => 
    booking.date === dateStr && booking.time === time
  );
}