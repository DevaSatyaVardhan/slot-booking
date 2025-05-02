/**
 * Registration form functionality for the booking application
 */

// Form elements
const registrationForm = document.getElementById('registration-form');
const backToTimeslotButton = document.getElementById('back-to-timeslot');
const newBookingButton = document.getElementById('new-booking');

// Initialize registration form
function initRegistration() {
  // Set up back button
  backToTimeslotButton.addEventListener('click', () => {
    navigateToStep(2);
  });
  
  // Set up form submission
  registrationForm.addEventListener('submit', handleFormSubmit);
  
  // Set up new booking button
  newBookingButton.addEventListener('click', () => {
    // Reset selections
    selectedDate = null;
    selectedTime = null;
    
    // Reset form
    registrationForm.reset();
    
    // Go back to first step
    navigateToStep(1);
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Get form data
  const formData = {
    fullName: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    reason: document.getElementById('reason').value,
    date: selectedDate.toDateString(),
    time: selectedTime,
    createdAt: new Date().toISOString()
  };
  
  // Store booking data
  storeBookingData(formData);
  
  // Show confirmation
  showConfirmation(formData);
  
  // Navigate to confirmation view
  navigateToStep(4);
}

// Validate registration form
function validateForm() {
  let isValid = true;
  const requiredFields = ['full-name', 'email', 'phone', 'reason'];
  
  // Remove existing error messages
  document.querySelectorAll('.error-message').forEach(msg => {
    msg.classList.remove('visible');
  });
  
  // Check required fields
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      
      // Add error message
      let errorElement = field.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }
      
      errorElement.textContent = 'This field is required';
      errorElement.classList.add('visible');
    } else {
      field.classList.remove('error');
    }
  });
  
  // Validate email format
  const emailField = document.getElementById('email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailField.value && !emailPattern.test(emailField.value)) {
    isValid = false;
    emailField.classList.add('error');
    
    let errorElement = emailField.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      emailField.parentNode.insertBefore(errorElement, emailField.nextSibling);
    }
    
    errorElement.textContent = 'Please enter a valid email address';
    errorElement.classList.add('visible');
  }
  
  // Validate phone format (basic validation)
  const phoneField = document.getElementById('phone');
  const phonePattern = /^\d{10,15}$/;
  
  if (phoneField.value && !phonePattern.test(phoneField.value.replace(/[\s()-]/g, ''))) {
    isValid = false;
    phoneField.classList.add('error');
    
    let errorElement = phoneField.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      phoneField.parentNode.insertBefore(errorElement, phoneField.nextSibling);
    }
    
    errorElement.textContent = 'Please enter a valid phone number';
    errorElement.classList.add('visible');
  }
  
  return isValid;
}

// Show booking confirmation
function showConfirmation(bookingData) {
  const confirmationDetails = document.getElementById('confirmation-details');
  
  confirmationDetails.innerHTML = `
    <p><strong>Name:</strong> ${bookingData.fullName}</p>
    <p><strong>Date:</strong> ${formatDate(new Date(bookingData.date))}</p>
    <p><strong>Time:</strong> ${formatTime(bookingData.time)}</p>
    <p><strong>Email:</strong> ${bookingData.email}</p>
    <p><strong>Phone:</strong> ${bookingData.phone}</p>
  `;
}