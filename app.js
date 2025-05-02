/**
 * Main application file that initializes all components
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize calendar
  initCalendar();
  
  // Initialize time slots
  initTimeSlots();
  
  // Initialize registration
  initRegistration();
  
  // Update time slots when navigating to the time slot view
  document.getElementById('step-2').addEventListener('click', () => {
    if (selectedDate) {
      updateTimeSlots();
      navigateToStep(2);
    }
  });
  
  // Navigate to registration when clicking on step 3
  document.getElementById('step-3').addEventListener('click', () => {
    if (selectedDate && selectedTime) {
      navigateToStep(3);
    }
  });
  
  // Create folder structure
  createFolderStructure();
});

// Event listeners for date selection in time slot view
function addTimeSlotEventListeners() {
  // Update available time slots when a date is selected
  document.addEventListener('dateSelected', () => {
    updateTimeSlots();
  });
}

// Create folders if they don't exist
function createFolderStructure() {
  // This is just for show in a web environment
  // In a real file system, you would create directories here
  console.log('Application initialized with folder structure:');
  console.log('/css - Contains all styling files');
  console.log('/js - Contains all JavaScript functionality');
}

// Expose booking data for easy inspection in console
window.getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings')) || [];
};