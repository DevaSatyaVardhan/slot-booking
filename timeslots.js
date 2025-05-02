/**
 * Time slots functionality for the booking application
 */

// Time slots state
let selectedTime = null;

// Back button
const backToCalendarButton = document.getElementById('back-to-calendar');

// Initialize time slots
function initTimeSlots() {
  // Set up back button
  backToCalendarButton.addEventListener('click', () => {
    navigateToStep(1);
  });
  
  // Set up time slot selection
  const timeSlotButtons = document.querySelectorAll('.timeslot-btn');
  timeSlotButtons.forEach(button => {
    button.addEventListener('click', selectTimeSlot);
  });
}

// Handle time slot selection
function selectTimeSlot(event) {
  // Don't allow selection if already booked
  if (event.target.classList.contains('booked')) {
    return;
  }
  
  // Remove selected class from previously selected time slot
  document.querySelectorAll('.timeslot-btn.selected').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Add selected class to clicked time slot
  event.target.classList.add('selected');
  
  // Update selected time
  selectedTime = event.target.getAttribute('data-time');
  
  // Update appointment info display
  updateAppointmentInfo();
  
  // Navigate to registration
  navigateToStep(3);
}

// Update time slots based on selected date
function updateTimeSlots() {
  if (!selectedDate) return;
  
  const timeSlotButtons = document.querySelectorAll('.timeslot-btn');
  
  timeSlotButtons.forEach(button => {
    const time = button.getAttribute('data-time');
    
    // Check if this slot is already booked
    if (isSlotBooked(selectedDate, time)) {
      button.classList.add('booked');
    } else {
      button.classList.remove('booked');
    }
    
    // Reset selection
    button.classList.remove('selected');
  });
  
  // Reset selected time
  selectedTime = null;
}

// Update appointment info in registration view
function updateAppointmentInfo() {
  if (selectedDate && selectedTime) {
    document.getElementById('appointment-info').textContent = 
      `Appointment: ${formatDate(selectedDate)} at ${formatTime(selectedTime)}`;
  }
}