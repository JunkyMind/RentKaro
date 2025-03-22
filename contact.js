// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            let isValid = true;
            
            // Simple validation
            if (!name || name.length < 2) {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('name');
            }
            
            if (!email || !validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('email');
            }
            
            if (phone && !validatePhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearError('phone');
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            } else {
                clearError('subject');
            }
            
            if (!message || message.length < 10) {
                showError('message', 'Please enter a message (at least 10 characters)');
                isValid = false;
            } else {
                clearError('message');
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For demonstration, we'll show a success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate a form submission with a delay
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.padding = '15px';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginTop = '20px';
                    successMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
                    
                    // Insert the success message after the form
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Reset the button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Scroll to the success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Remove the success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validatePhone(phone) {
        // Simple validation for demonstration purposes
        // In a real application, you might want to use a more sophisticated validation
        // that accounts for international formats
        return phone.length >= 10 && /^[\d\s\+\-\(\)]+$/.test(phone);
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        let errorElement = input.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#dc3545';
            errorElement.style.fontSize = '14px';
            errorElement.style.marginTop = '5px';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#dc3545';
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
}); 