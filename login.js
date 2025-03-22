// Login and Registration Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });
        
        registerTab.addEventListener('click', function() {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            if (type === 'text') {
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    // Password strength meter
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.querySelector('.strength-level');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password strength
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]+/)) strength += 1;
            if (password.match(/[A-Z]+/)) strength += 1;
            if (password.match(/[0-9]+/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
            
            // Update strength bar
            switch(strength) {
                case 0:
                case 1:
                    strengthBar.style.width = '20%';
                    strengthBar.style.backgroundColor = '#ff4d4d';
                    strengthText.textContent = 'Weak';
                    break;
                case 2:
                    strengthBar.style.width = '40%';
                    strengthBar.style.backgroundColor = '#ffa64d';
                    strengthText.textContent = 'Fair';
                    break;
                case 3:
                    strengthBar.style.width = '60%';
                    strengthBar.style.backgroundColor = '#ffff4d';
                    strengthText.textContent = 'Good';
                    break;
                case 4:
                    strengthBar.style.width = '80%';
                    strengthBar.style.backgroundColor = '#4dff4d';
                    strengthText.textContent = 'Strong';
                    break;
                case 5:
                    strengthBar.style.width = '100%';
                    strengthBar.style.backgroundColor = '#22bb33';
                    strengthText.textContent = 'Very Strong';
                    break;
                default:
                    break;
            }
        });
    }
    
    // Form validation - Login
    const loginFormElement = document.querySelector('#login-form form');
    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            let isValid = true;
            
            // Simple validation
            if (!email || !validateEmail(email)) {
                showError('login-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('login-email');
            }
            
            if (!password) {
                showError('login-password', 'Please enter your password');
                isValid = false;
            } else {
                clearError('login-password');
            }
            
            if (isValid) {
                // Simulate login - In a real app, this would be an AJAX request to a server
                showSuccessMessage('login-form', 'Login successful! Redirecting...');
                
                // Redirect after a delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Form validation - Registration
    const registerFormElement = document.querySelector('#register-form form');
    
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const userType = document.querySelector('input[name="user-type"]:checked')?.value;
            const termsAgreed = document.getElementById('terms-checkbox').checked;
            
            let isValid = true;
            
            // Validation
            if (!fullName) {
                showError('register-name', 'Please enter your full name');
                isValid = false;
            } else {
                clearError('register-name');
            }
            
            if (!email || !validateEmail(email)) {
                showError('register-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('register-email');
            }
            
            if (!password || password.length < 8) {
                showError('register-password', 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError('register-password');
            }
            
            if (password !== confirmPassword) {
                showError('register-confirm-password', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('register-confirm-password');
            }
            
            if (!userType) {
                showError('user-type-options', 'Please select a user type');
                isValid = false;
            } else {
                clearError('user-type-options');
            }
            
            if (!termsAgreed) {
                showError('terms-checkbox', 'You must agree to the terms and conditions');
                isValid = false;
            } else {
                clearError('terms-checkbox');
            }
            
            if (isValid) {
                // Simulate registration - In a real app, this would be an AJAX request to a server
                showSuccessMessage('register-form', 'Registration successful! Please check your email to verify your account.');
                
                // Redirect after a delay
                setTimeout(() => {
                    // Switch to login tab
                    loginTab.click();
                    
                    // Clear the registration form
                    registerFormElement.reset();
                }, 3000);
            }
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        let errorElement = input.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff4d4d';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#ff4d4d';
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function showSuccessMessage(formId, message) {
        const form = document.getElementById(formId);
        let successElement = form.querySelector('.success-message');
        
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'success-message';
            successElement.style.backgroundColor = '#d4edda';
            successElement.style.color = '#155724';
            successElement.style.padding = '15px';
            successElement.style.borderRadius = '5px';
            successElement.style.marginTop = '20px';
            successElement.style.textAlign = 'center';
            form.appendChild(successElement);
        }
        
        successElement.textContent = message;
    }
}); 