// Auto-updating Copyright Year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
}

// Update copyright year every hour (in case page is open during New Year's transition)
function startCopyrightYearUpdater() {
    updateCopyrightYear(); // Update immediately
    setInterval(updateCopyrightYear, 60 * 60 * 1000); // Update every hour
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-updating copyright year
    startCopyrightYearUpdater();
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }
});


// Form Validation Functions
function validateEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

function validatePhone(phone) {
    if (!phone) return false;
    const phoneRegex = /^[0-9+\-\s()]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateDateOfBirth(date) {
    if (!date) return false;
    
    const today = new Date();
    const birthDate = new Date(date);
    
    // Check if date is valid
    if (isNaN(birthDate.getTime())) return false;
    
    // Check if date is not in the future
    if (birthDate > today) return false;
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 15 && age <= 25;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Admission Form Validation
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Validate Full Name
        const fullName = document.getElementById('fullName').value.trim();
        if (!validateName(fullName)) {
            showError('fullName', 'Please enter a valid full name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate Email
        const email = document.getElementById('email').value.trim();
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        const phone = document.getElementById('phone').value.trim();
        if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }
        
        // Validate Date of Birth
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        if (!dateOfBirth) {
            showError('dateOfBirth', 'Please select your date of birth');
            isValid = false;
        } else if (!validateDateOfBirth(dateOfBirth)) {
            showError('dateOfBirth', 'Age must be between 15 and 25 years');
            isValid = false;
        }
        
        // Validate JHS Attended
        const jhsAttended = document.getElementById('jhsAttended').value.trim();
        if (!validateName(jhsAttended)) {
            showError('jhsAttended', 'Please enter the name of your Junior High School');
            isValid = false;
        }
        
        // Validate BECE Results
        const beceResults = document.getElementById('beceResults').value.trim();
        if (!beceResults) {
            showError('beceResults', 'Please enter your BECE aggregate results');
            isValid = false;
        } else if (!/^[0-9]{1,2}$/.test(beceResults) || parseInt(beceResults) < 6 || parseInt(beceResults) > 30) {
            showError('beceResults', 'Please enter a valid BECE aggregate (6-30)');
            isValid = false;
        }
        
        // Validate Programme
        const programme = document.getElementById('programme').value;
        if (!programme) {
            showError('programme', 'Please select a programme of interest');
            isValid = false;
        }
        
        // Validate Guardian's Name
        const guardianName = document.getElementById('guardianName').value.trim();
        if (!validateName(guardianName)) {
            showError('guardianName', 'Please enter guardian\'s full name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate Guardian's Contact
        const guardianContact = document.getElementById('guardianContact').value.trim();
        if (!validatePhone(guardianContact)) {
            showError('guardianContact', 'Please enter a valid guardian contact number');
            isValid = false;
        }
        
        // Validate Residential Address
        const residentialAddress = document.getElementById('residentialAddress').value.trim();
        if (residentialAddress.length < 10) {
            showError('residentialAddress', 'Please enter a complete residential address (at least 10 characters)');
            isValid = false;
        }
        
        // Validate Terms
        const termsConditions = document.getElementById('termsConditions');
        if (!termsConditions.checked) {
            showError('termsConditions', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Collect form data for backend submission
            const formData = new FormData(admissionForm);
            // Backend Integration Required: Submit form data to API
            submitAdmissionForm(formData);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Real-time validation
    const formFields = admissionForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            switch (fieldId) {
                case 'fullName':
                case 'guardianName':
                case 'jhsAttended':
                    if (value && !validateName(value)) {
                        showError(fieldId, 'Please enter a valid name (at least 2 characters)');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'email':
                    if (value && !validateEmail(value)) {
                        showError(fieldId, 'Please enter a valid email address');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'phone':
                case 'guardianContact':
                    if (value && !validatePhone(value)) {
                        showError(fieldId, 'Please enter a valid phone number');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'dateOfBirth':
                    if (value && !validateDateOfBirth(value)) {
                        showError(fieldId, 'Age must be between 15 and 25 years');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'beceResults':
                    if (value && (!/^[0-9]{1,2}$/.test(value) || parseInt(value) < 6 || parseInt(value) > 30)) {
                        showError(fieldId, 'Please enter a valid BECE aggregate (6-30)');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'programme':
                    if (!value) {
                        showError(fieldId, 'Please select a programme');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'residentialAddress':
                    if (value && value.length < 10) {
                        showError(fieldId, 'Please enter a complete residential address');
                    } else {
                        clearError(fieldId);
                    }
                    break;
            }
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        const errorElements = contactForm.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Validate Contact Name
        const contactName = document.getElementById('contactName').value.trim();
        if (!validateName(contactName)) {
            showError('contactName', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate Contact Email
        const contactEmail = document.getElementById('contactEmail').value.trim();
        if (!validateEmail(contactEmail)) {
            showError('contactEmail', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Subject
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        // Validate Message
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        if (isValid) {
            // Collect form data for backend submission
            const formData = new FormData(contactForm);
            // Backend Integration Required: Submit form data to API
            submitContactForm(formData);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Real-time validation for contact form
    const contactFields = contactForm.querySelectorAll('input, select, textarea');
    contactFields.forEach(field => {
        field.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            switch (fieldId) {
                case 'contactName':
                    if (value && !validateName(value)) {
                        showError(fieldId, 'Please enter a valid name (at least 2 characters)');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'contactEmail':
                    if (value && !validateEmail(value)) {
                        showError(fieldId, 'Please enter a valid email address');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'subject':
                    if (!value) {
                        showError(fieldId, 'Please select a subject');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'message':
                    if (value && value.length < 10) {
                        showError(fieldId, 'Please enter a longer message');
                    } else {
                        clearError(fieldId);
                    }
                    break;
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
function addLoadingAnimation(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Add click animation to cards
document.querySelectorAll('.programme-card, .contact-card, .vm-card, .info-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // Add keyboard support for cards
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Make cards focusable
    card.setAttribute('tabindex', '0');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.vm-card, .programme-card, .contact-card, .info-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});


// Form field formatting
document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            this.value = value;
        });
    });
    
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                
                // Re-enable after 3 seconds (in case of network issues)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Submit';
                }, 3000);
            }
        });
    });
    
    // Store original button text
    document.querySelectorAll('.submit-btn').forEach(btn => {
        btn.setAttribute('data-original-text', btn.textContent);
    });
});

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add back to top button
// Add back to top button with accessibility
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.setAttribute('title', 'Back to top');
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑'; // Add the arrow icon
    // CSS styling is now handled by .back-to-top class
    
    backToTopButton.addEventListener('click', scrollToTop);
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--secondary-blue)';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-blue)';
        this.style.transform = 'scale(1)';
    });
});

// SHS 1 Form Validation
const shs1Form = document.getElementById('shs1Form');
if (shs1Form) {
    shs1Form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous errors
        const errorElements = document.querySelectorAll('#shs1Form .error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Validate Full Name
        const shs1FullName = document.getElementById('shs1FullName').value.trim();
        if (!validateName(shs1FullName)) {
            showError('shs1FullName', 'Please enter a valid full name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate Email
        const shs1Email = document.getElementById('shs1Email').value.trim();
        if (!validateEmail(shs1Email)) {
            showError('shs1Email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        const shs1Phone = document.getElementById('shs1Phone').value.trim();
        if (!validatePhone(shs1Phone)) {
            showError('shs1Phone', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }
        
        // Validate Date of Birth
        const shs1DateOfBirth = document.getElementById('shs1DateOfBirth').value;
        if (!shs1DateOfBirth) {
            showError('shs1DateOfBirth', 'Please select your date of birth');
            isValid = false;
        } else if (!validateDateOfBirth(shs1DateOfBirth)) {
            showError('shs1DateOfBirth', 'Age must be between 15 and 25 years');
            isValid = false;
        }
        
        // Validate Gender
        const shs1Gender = document.getElementById('shs1Gender').value;
        if (!shs1Gender) {
            showError('shs1Gender', 'Please select your gender');
            isValid = false;
        }
        
        // Validate JHS Name
        const shs1JhsName = document.getElementById('shs1JhsName').value.trim();
        if (!validateName(shs1JhsName)) {
            showError('shs1JhsName', 'Please enter your Junior High School name');
            isValid = false;
        }
        
        // Validate JHS Location
        const shs1JhsLocation = document.getElementById('shs1JhsLocation').value.trim();
        if (!validateName(shs1JhsLocation)) {
            showError('shs1JhsLocation', 'Please enter your JHS location');
            isValid = false;
        }
        
        // Validate BECE Index Number
        const shs1BeceIndex = document.getElementById('shs1BeceIndex').value.trim();
        if (!shs1BeceIndex) {
            showError('shs1BeceIndex', 'Please enter your BECE index number');
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(shs1BeceIndex)) {
            showError('shs1BeceIndex', 'Please enter a valid 10-digit BECE index number');
            isValid = false;
        }
        
        // Validate BECE Aggregate
        const shs1BeceAggregate = document.getElementById('shs1BeceAggregate').value;
        if (!shs1BeceAggregate) {
            showError('shs1BeceAggregate', 'Please enter your BECE aggregate');
            isValid = false;
        } else if (parseInt(shs1BeceAggregate) < 6 || parseInt(shs1BeceAggregate) > 30) {
            showError('shs1BeceAggregate', 'Please enter a valid BECE aggregate (6-30)');
            isValid = false;
        }
        
        // Validate Programme
        const shs1Programme = document.getElementById('shs1Programme').value;
        if (!shs1Programme) {
            showError('shs1Programme', 'Please select a programme of interest');
            isValid = false;
        }
        
        // Validate Guardian Name
        const shs1GuardianName = document.getElementById('shs1GuardianName').value.trim();
        if (!validateName(shs1GuardianName)) {
            showError('shs1GuardianName', 'Please enter guardian\'s full name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate Guardian Relationship
        const shs1GuardianRelation = document.getElementById('shs1GuardianRelation').value;
        if (!shs1GuardianRelation) {
            showError('shs1GuardianRelation', 'Please select guardian\'s relationship');
            isValid = false;
        }
        
        // Validate Guardian Phone
        const shs1GuardianPhone = document.getElementById('shs1GuardianPhone').value.trim();
        if (!validatePhone(shs1GuardianPhone)) {
            showError('shs1GuardianPhone', 'Please enter a valid guardian phone number');
            isValid = false;
        }
        
        // Validate Guardian Email (optional but if provided, must be valid)
        const shs1GuardianEmail = document.getElementById('shs1GuardianEmail').value.trim();
        if (shs1GuardianEmail && !validateEmail(shs1GuardianEmail)) {
            showError('shs1GuardianEmail', 'Please enter a valid guardian email address');
            isValid = false;
        }
        
        // Validate Address
        const shs1Address = document.getElementById('shs1Address').value.trim();
        if (shs1Address.length < 10) {
            showError('shs1Address', 'Please enter a complete residential address (at least 10 characters)');
            isValid = false;
        }
        
        // Validate Region
        const shs1Region = document.getElementById('shs1Region').value;
        if (!shs1Region) {
            showError('shs1Region', 'Please select your region');
            isValid = false;
        }
        
        // Validate District
        const shs1District = document.getElementById('shs1District').value.trim();
        if (!validateName(shs1District)) {
            showError('shs1District', 'Please enter your district');
            isValid = false;
        }
        
        // Validate Terms
        const shs1Terms = document.getElementById('shs1Terms');
        if (!shs1Terms.checked) {
            showError('shs1Terms', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Collect form data for backend submission
            const formData = new FormData(shs1Form);
            // Backend Integration Required: Submit form data to API
            submitSHS1Form(formData);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('#shs1Form .error-message[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Real-time validation for SHS 1 form
    const shs1FormFields = shs1Form.querySelectorAll('input, select, textarea');
    shs1FormFields.forEach(field => {
        field.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            switch (fieldId) {
                case 'shs1FullName':
                case 'shs1JhsName':
                case 'shs1JhsLocation':
                case 'shs1GuardianName':
                case 'shs1District':
                    if (value && !validateName(value)) {
                        showError(fieldId, 'Please enter a valid name (at least 2 characters)');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1Email':
                case 'shs1GuardianEmail':
                    if (value && !validateEmail(value)) {
                        showError(fieldId, 'Please enter a valid email address');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1Phone':
                case 'shs1GuardianPhone':
                    if (value && !validatePhone(value)) {
                        showError(fieldId, 'Please enter a valid phone number');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1DateOfBirth':
                    if (value && !validateDateOfBirth(value)) {
                        showError(fieldId, 'Age must be between 15 and 25 years');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1BeceIndex':
                    if (value && !/^[0-9]{10}$/.test(value)) {
                        showError(fieldId, 'Please enter a valid 10-digit BECE index number');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1BeceAggregate':
                    if (value && (parseInt(value) < 6 || parseInt(value) > 30)) {
                        showError(fieldId, 'Please enter a valid BECE aggregate (6-30)');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1Gender':
                case 'shs1Programme':
                case 'shs1GuardianRelation':
                case 'shs1Region':
                    if (!value) {
                        showError(fieldId, 'Please make a selection');
                    } else {
                        clearError(fieldId);
                    }
                    break;
                case 'shs1Address':
                    if (value && value.length < 10) {
                        showError(fieldId, 'Please enter a complete address');
                    } else {
                        clearError(fieldId);
                    }
                    break;
            }
        });
    });
}

// Backend Integration Functions
// =============================

/**
 * Submit admission form data to backend API
 * @param {FormData} formData - Form data to submit
 */
async function submitAdmissionForm(formData) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('#admissionForm .submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Backend Integration Required: Replace with actual API endpoint
        const response = await fetch('/api/admissions', {
            method: 'POST',
            body: formData,
            headers: {
                // CSRF token will be added here by backend
                // 'X-CSRFToken': getCsrfToken(),
            }
        });

        if (response.ok) {
            const result = await response.json();
            showSuccessMessage('Application submitted successfully! We will contact you soon.');
            document.getElementById('admissionForm').reset();
        } else {
            const error = await response.json();
            showErrorMessage(error.message || 'Failed to submit application. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        const submitBtn = document.querySelector('#admissionForm .submit-btn');
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
    }
}

/**
 * Submit SHS 1 form data to backend API
 * @param {FormData} formData - Form data to submit
 */
async function submitSHS1Form(formData) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('#shs1Form .shs1-submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Backend Integration Required: Replace with actual API endpoint
        const response = await fetch('/api/shs1-admissions', {
            method: 'POST',
            body: formData,
            headers: {
                // CSRF token will be added here by backend
                // 'X-CSRFToken': getCsrfToken(),
            }
        });

        if (response.ok) {
            const result = await response.json();
            showSuccessMessage('SHS 1 Application submitted successfully! We will contact you soon.');
            document.getElementById('shs1Form').reset();
        } else {
            const error = await response.json();
            showErrorMessage(error.message || 'Failed to submit SHS 1 application. Please try again.');
        }
    } catch (error) {
        console.error('SHS 1 Form submission error:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        const submitBtn = document.querySelector('#shs1Form .shs1-submit-btn');
        submitBtn.querySelector('.btn-text').textContent = 'Submit SHS 1 Application';
        submitBtn.disabled = false;
    }
}

/**
 * Submit contact form data to backend API
 * @param {FormData} formData - Form data to submit
 */
async function submitContactForm(formData) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('#contactForm .submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Backend Integration Required: Replace with actual API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
            headers: {
                // CSRF token will be added here by backend
                // 'X-CSRFToken': getCsrfToken(),
            }
        });

        if (response.ok) {
            const result = await response.json();
            showSuccessMessage('Message sent successfully! We will get back to you soon.');
            document.getElementById('contactForm').reset();
        } else {
            const error = await response.json();
            showErrorMessage(error.message || 'Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        const submitBtn = document.querySelector('#contactForm .submit-btn');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

/**
 * Unified message system for success and error messages
 * @param {string} message - Message to display
 * @param {string} type - Message type: 'success' or 'error'
 */
function showMessage(message, type = 'success') {
    const messageId = `${type}-message`;
    const backgroundColor = type === 'success' ? '#10b981' : '#ef4444';
    
    // Remove any existing messages
    const existingMessage = document.getElementById(messageId);
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.id = messageId;
    messageElement.className = `${type}-message`;
    messageElement.style.cssText = `
        background-color: ${backgroundColor};
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
        text-align: center;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    messageElement.textContent = message;
    
    // Insert after form
    const form = document.querySelector('#admissionForm, #contactForm, #shs1Form');
    if (form) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (messageElement && messageElement.parentNode) {
            messageElement.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => messageElement.remove(), 300);
        }
    }, 5000);
}

/**
 * Show success message to user
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    showMessage(message, 'error');
}

/**
 * Get CSRF token from backend (to be implemented by backend developer)
 * @returns {string} CSRF token
 */
function getCsrfToken() {
    // Backend Integration Required: Implement CSRF token retrieval
    // This could be from a meta tag, cookie, or API endpoint
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || '';
}

// =============================
// DYNAMIC DATA LOADING SYSTEM
// =============================

/**
 * Configuration for API endpoints and error messages
 * Centralized configuration for easy maintenance and updates
 */
const API_CONFIG = {
    endpoints: {
        admissionRequirements: '/api/admissions/requirements',
        applicationProcess: '/api/admissions/process',
        importantDates: '/api/admissions/dates',
        contacts: '/api/contacts',
        visitingHours: '/api/visiting-hours',
        quickContact: '/api/quick-contact',
        footerContact: '/api/footer-contact'
    },
    errorMessages: {
        admissionRequirements: 'Unable to load admission requirements. Please refresh the page.',
        applicationProcess: 'Unable to load application process. Please refresh the page.',
        importantDates: 'Unable to load important dates. Please refresh the page.',
        contacts: 'Unable to load contact information. Please refresh the page.',
        visitingHours: 'Unable to load visiting hours. Please refresh the page.',
        quickContact: 'Unable to load quick contact options. Please refresh the page.',
        footerContact: 'Unable to load footer contact information. Please refresh the page.',
        network: 'Network error. Please check your connection and try again.',
        server: 'Server error. Please try again later.',
        timeout: 'Request timed out. Please try again.'
    },
    timeout: 10000, // 10 seconds timeout
    retryAttempts: 2
};

/**
 * Enhanced fetch function with timeout, retry logic, and comprehensive error handling
 * @param {string} endpoint - API endpoint URL
 * @param {Object} options - Fetch options
 * @param {number} retryCount - Current retry attempt (internal use)
 * @returns {Promise<Object>} Parsed JSON response
 */
async function fetchData(endpoint, options = {}, retryCount = 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
                'Accept': 'application/json',
                ...options.headers
            },
            signal: controller.signal,
            ...options
        });

        clearTimeout(timeoutId);

        // Handle different HTTP status codes with specific error messages
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || getHttpErrorMessage(response.status);
            throw new Error(`${response.status}: ${errorMessage}`);
        }

        // Validate response content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format. Expected JSON.');
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid response data structure.');
        }

        return data;

    } catch (error) {
        clearTimeout(timeoutId);

        // Handle specific error types
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }

        // Retry logic for network errors
        if (retryCount < API_CONFIG.retryAttempts && isRetryableError(error)) {
            console.warn(`Retrying request to ${endpoint} (attempt ${retryCount + 1})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
            return fetchData(endpoint, options, retryCount + 1);
        }

        // Log error for debugging (only in development)
        if (process.env.NODE_ENV === 'development') {
            console.error(`Error fetching data from ${endpoint}:`, error);
        }

        throw error;
    }
}

/**
 * Get user-friendly error message for HTTP status codes
 * @param {number} status - HTTP status code
 * @returns {string} User-friendly error message
 */
function getHttpErrorMessage(status) {
    const errorMessages = {
        400: 'Invalid request. Please check your input.',
        401: 'Authentication required. Please log in.',
        403: 'Access denied. You do not have permission.',
        404: 'Data not found. The requested information is unavailable.',
        429: 'Too many requests. Please wait a moment and try again.',
        500: 'Server error. Please try again later.',
        502: 'Service temporarily unavailable. Please try again later.',
        503: 'Service temporarily unavailable. Please try again later.'
    };
    return errorMessages[status] || 'An unexpected error occurred. Please try again.';
}

/**
 * Check if an error is retryable
 * @param {Error} error - Error object
 * @returns {boolean} True if error is retryable
 */
function isRetryableError(error) {
    const retryableErrors = ['NetworkError', 'TypeError', 'Request timeout'];
    return retryableErrors.some(errorType => 
        error.message.includes(errorType) || error.name === errorType
    );
}

/**
 * Enhanced error display with retry functionality and better UX
 * @param {string} containerId - ID of container to show error in
 * @param {string} errorType - Type of error for specific messaging
 * @param {Function} retryFunction - Function to retry the failed operation
 */
function showDataError(containerId, errorType, retryFunction = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const errorMessage = API_CONFIG.errorMessages[errorType] || API_CONFIG.errorMessages.network;
    
    const retryButton = retryFunction ? `
        <button class="retry-button" onclick="retryDataLoad('${containerId}', ${retryFunction.name})">
            🔄 Try Again
        </button>
    ` : '';

    container.innerHTML = `
        <div class="error-message">
            <div class="error-icon">⚠️</div>
            <p class="error-text">${errorMessage}</p>
            ${retryButton}
        </div>
    `;
}

/**
 * Show loading state with better visual feedback
 * @param {string} containerId - ID of container to show loading in
 * @param {string} message - Loading message to display
 */
function showLoadingState(containerId, message = 'Loading...') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <p class="loading-text">${message}</p>
        </div>
    `;
}

/**
 * Retry function for failed data loads
 * @param {string} containerId - ID of container to retry loading for
 * @param {string} functionName - Name of the function to retry
 */
async function retryDataLoad(containerId, functionName) {
    const retryFunctions = {
        'loadAdmissionRequirements': loadAdmissionRequirements,
        'loadApplicationProcess': loadApplicationProcess,
        'loadImportantDates': loadImportantDates,
        'loadContactInfo': () => loadContactInfo(containerId),
        'loadVisitingHours': loadVisitingHours,
        'loadQuickContact': loadQuickContact,
        'loadFooterContactInfo': loadFooterContactInfo
    };

    const retryFunction = retryFunctions[functionName];
    if (retryFunction) {
        showLoadingState(containerId, 'Retrying...');
        await retryFunction();
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Validate and sanitize contact data
 * @param {Object} contact - Contact object to validate
 * @returns {Object} Validated and sanitized contact object
 */
function validateContactData(contact) {
    if (!contact || typeof contact !== 'object') {
        return null;
    }

    return {
        type: contact.type || 'default',
        icon: contact.icon || '📞',
        title: escapeHtml(contact.title || 'Contact'),
        name: contact.name ? escapeHtml(contact.name) : null,
        email: contact.email ? escapeHtml(contact.email) : null,
        phone: contact.phone ? escapeHtml(contact.phone) : null,
        phone2: contact.phone2 ? escapeHtml(contact.phone2) : null,
        description: escapeHtml(contact.description || '')
    };
}

/**
 * Load admission requirements from API with enhanced error handling and validation
 * Validates data structure and provides fallback content if needed
 */
async function loadAdmissionRequirements() {
    const containerId = 'admission-requirements';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    try {
        showLoadingState(containerId, 'Loading admission requirements...');
        
        const data = await fetchData(API_CONFIG.endpoints.admissionRequirements);
        
        // Validate data structure
        if (!data || !Array.isArray(data.requirements) || data.requirements.length === 0) {
            throw new Error('Invalid or empty requirements data');
        }

        // Sanitize and render requirements list
        const requirementsList = data.requirements
            .filter(req => req && typeof req === 'string' && req.trim().length > 0)
            .map(req => `<li>${escapeHtml(req.trim())}</li>`)
            .join('');
        
        if (requirementsList) {
            container.innerHTML = `<ul>${requirementsList}</ul>`;
        } else {
            throw new Error('No valid requirements found');
        }

    } catch (error) {
        showDataError(containerId, 'admissionRequirements', loadAdmissionRequirements);
    }
}

/**
 * Load application process from API with enhanced error handling and validation
 * Validates data structure and provides fallback content if needed
 */
async function loadApplicationProcess() {
    const containerId = 'application-process';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    try {
        showLoadingState(containerId, 'Loading application process...');
        
        const data = await fetchData(API_CONFIG.endpoints.applicationProcess);
        
        // Validate data structure
        if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
            throw new Error('Invalid or empty process steps data');
        }

        // Sanitize and render process steps
        const processList = data.steps
            .filter(step => step && typeof step === 'string' && step.trim().length > 0)
            .map((step, index) => `<li>${escapeHtml(step.trim())}</li>`)
            .join('');
        
        if (processList) {
            container.innerHTML = `<ol>${processList}</ol>`;
        } else {
            throw new Error('No valid process steps found');
        }

    } catch (error) {
        showDataError(containerId, 'applicationProcess', loadApplicationProcess);
    }
}

/**
 * Load important dates from API with enhanced error handling and validation
 * Validates data structure and provides fallback content if needed
 */
async function loadImportantDates() {
    const containerId = 'important-dates';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    try {
        showLoadingState(containerId, 'Loading important dates...');
        
        const data = await fetchData(API_CONFIG.endpoints.importantDates);
        
        // Validate data structure
        if (!data || !Array.isArray(data.dates) || data.dates.length === 0) {
            throw new Error('Invalid or empty dates data');
        }

        // Sanitize and render dates list
        const datesList = data.dates
            .filter(date => date && date.title && date.date)
            .map(date => `<li><strong>${escapeHtml(date.title)}:</strong> ${escapeHtml(date.date)}</li>`)
            .join('');
        
        if (datesList) {
            container.innerHTML = `<ul>${datesList}</ul>`;
        } else {
            throw new Error('No valid dates found');
        }

    } catch (error) {
        showDataError(containerId, 'importantDates', loadImportantDates);
    }
}

/**
 * Load contact information from API with enhanced error handling and validation
 * Hybrid system: API data with hardcoded fallback
 * @param {string} containerId - ID of container to populate
 */
async function loadContactInfo(containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) return;

    // Check if we already have fallback content displayed
    const hasFallbackContent = container.querySelector('[data-fallback="true"]');
    
    try {
        // Only show loading if we don't have fallback content
        if (!hasFallbackContent) {
            showLoadingState(containerId, 'Loading contact information...');
        }
        
        const data = await fetchData(API_CONFIG.endpoints.contacts);
        
        // Validate data structure
        if (!data || !Array.isArray(data.contacts) || data.contacts.length === 0) {
            throw new Error('Invalid or empty contacts data');
        }

        // Validate and sanitize contact data
        const validContacts = data.contacts
            .map(validateContactData)
            .filter(contact => contact !== null);

        if (validContacts.length === 0) {
            throw new Error('No valid contacts found');
        }

        // Render contact cards with proper sanitization
        const contactCards = validContacts.map(contact => `
            <div class="contact-card ${contact.type}">
                <div class="contact-icon">${contact.icon}</div>
                <h3>${contact.title}</h3>
                <div class="contact-details">
                    ${contact.name ? `<p><strong>Name:</strong> ${contact.name}</p>` : ''}
                    ${contact.email ? `<p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>` : ''}
                    ${contact.phone ? `<p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>` : ''}
                    ${contact.phone2 ? `<p><strong>Phone:</strong> <a href="tel:${contact.phone2}">${contact.phone2}</a></p>` : ''}
                </div>
                <p class="contact-description">${contact.description}</p>
            </div>
        `).join('');
        
        // Replace content with API data
        container.innerHTML = contactCards;

    } catch (error) {
        // If we have fallback content, just log the error silently
        if (hasFallbackContent) {
            console.warn('API contact data unavailable, using fallback content:', error.message);
            return;
        }
        
        // Otherwise show error with retry option
        showDataError(containerId, 'contacts', () => loadContactInfo(containerId));
    }
}

/**
 * Load visiting hours from API with enhanced error handling and validation
 */
async function loadVisitingHours() {
    const containerId = 'visiting-hours';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    try {
        showLoadingState(containerId, 'Loading visiting hours...');
        
        const data = await fetchData(API_CONFIG.endpoints.visitingHours);
        
        // Validate data structure
        if (!data || !Array.isArray(data.hours) || data.hours.length === 0) {
            throw new Error('Invalid or empty visiting hours data');
        }

        // Sanitize and render visiting hours
        const hoursList = data.hours
            .filter(hour => hour && hour.day && hour.time)
            .map(hour => `<p><strong>${escapeHtml(hour.day)}:</strong> ${escapeHtml(hour.time)}</p>`)
            .join('');
        
        if (hoursList) {
            container.innerHTML = `
                <h4>Visiting Hours</h4>
                ${hoursList}
            `;
        } else {
            throw new Error('No valid visiting hours found');
        }

    } catch (error) {
        showDataError(containerId, 'visitingHours', loadVisitingHours);
    }
}

/**
 * Load quick contact options from API with enhanced error handling and validation
 * Includes hardcoded "Apply for Admission" link as requested
 */
async function loadQuickContact() {
    const containerId = 'quick-contact-grid';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    try {
        showLoadingState(containerId, 'Loading quick contact options...');
        
        const data = await fetchData(API_CONFIG.endpoints.quickContact);
        
        // Validate data structure
        if (!data || !Array.isArray(data.quickContacts) || data.quickContacts.length === 0) {
            throw new Error('Invalid or empty quick contacts data');
        }

        // Sanitize and render quick contact items
        const quickContactItems = data.quickContacts
            .filter(item => item && item.link && item.title && item.description)
            .map(item => `
                <a href="${escapeHtml(item.link)}" class="quick-contact-item">
                    <div class="quick-icon">${item.icon || '📞'}</div>
                    <h4>${escapeHtml(item.title)}</h4>
                    <p>${escapeHtml(item.description)}</p>
                </a>
            `).join('');
        
        // Always include the hardcoded "Apply for Admission" link
        const admissionLink = `
            <a href="admissions.html" class="quick-contact-item">
                <div class="quick-icon">📝</div>
                <h4>Apply for Admission</h4>
                <p>Start your application</p>
            </a>
        `;
        
        container.innerHTML = quickContactItems + admissionLink;

    } catch (error) {
        showDataError(containerId, 'quickContact', loadQuickContact);
    }
}

/**
 * Load footer contact information from API with enhanced error handling and validation
 * Hybrid system: API data with hardcoded fallback
 */
async function loadFooterContactInfo() {
    const containerId = 'footer-contact-info';
    const container = document.getElementById(containerId);
    
    if (!container) return;

    // Check if we already have fallback content (not loading placeholder)
    const hasFallbackContent = container.innerHTML.includes('gdafwshs@gmail.com');
    
    try {
        // Only show loading if we don't have fallback content
        if (!hasFallbackContent) {
            showLoadingState(containerId, 'Loading footer contact information...');
        }
        
        const data = await fetchData(API_CONFIG.endpoints.footerContact);
        
        // Validate data structure
        if (!data || !data.footerContact || typeof data.footerContact !== 'object') {
            throw new Error('Invalid footer contact data');
        }

        const contact = data.footerContact;
        const contactInfo = `
            ${contact.email ? `<p>Email: ${escapeHtml(contact.email)}</p>` : ''}
            ${contact.phone ? `<p>Phone: ${escapeHtml(contact.phone)}</p>` : ''}
            ${contact.address ? `<p>Address: ${escapeHtml(contact.address)}</p>` : ''}
        `;
        
        container.innerHTML = contactInfo;

    } catch (error) {
        // If we have fallback content, just log the error silently
        if (hasFallbackContent) {
            console.warn('API footer contact data unavailable, using fallback content:', error.message);
            return;
        }
        
        // Otherwise show error with retry option
        showDataError(containerId, 'footerContact', loadFooterContactInfo);
    }
}

/**
 * Performance-optimized data loading system with batch processing and error recovery
 * Loads data in parallel where possible and provides fallback mechanisms
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for data loading with performance optimizations
    const dataLoaders = [
        // Admission page data (load in parallel)
        {
            condition: () => document.getElementById('admission-requirements'),
            loader: loadAdmissionRequirements,
            priority: 'high'
        },
        {
            condition: () => document.getElementById('application-process'),
            loader: loadApplicationProcess,
            priority: 'high'
        },
        {
            condition: () => document.getElementById('important-dates'),
            loader: loadImportantDates,
            priority: 'high'
        },
        {
            condition: () => document.getElementById('admissions-contact-grid'),
            loader: () => loadContactInfo('admissions-contact-grid'),
            priority: 'medium'
        },
        
        // Contact page data (load in parallel)
        {
            condition: () => document.getElementById('contact-info-grid'),
            loader: () => loadContactInfo('contact-info-grid'),
            priority: 'high'
        },
        {
            condition: () => document.getElementById('visiting-hours'),
            loader: loadVisitingHours,
            priority: 'medium'
        },
        {
            condition: () => document.getElementById('quick-contact-grid'),
            loader: loadQuickContact,
            priority: 'medium'
        },
        
        // Footer data (load last, lowest priority)
        {
            condition: () => document.getElementById('footer-contact-info'),
            loader: loadFooterContactInfo,
            priority: 'low'
        }
    ];

    // Batch load data by priority for optimal performance
    const highPriorityLoaders = dataLoaders.filter(loader => loader.priority === 'high');
    const mediumPriorityLoaders = dataLoaders.filter(loader => loader.priority === 'medium');
    const lowPriorityLoaders = dataLoaders.filter(loader => loader.priority === 'low');

    // Load high priority data immediately
    loadDataBatch(highPriorityLoaders);

    // Load medium priority data after a short delay
    setTimeout(() => {
        loadDataBatch(mediumPriorityLoaders);
    }, 100);

    // Load low priority data after a longer delay
    setTimeout(() => {
        loadDataBatch(lowPriorityLoaders);
    }, 500);
});

/**
 * Load a batch of data loaders in parallel with error handling
 * @param {Array} loaders - Array of loader objects with condition and loader function
 */
async function loadDataBatch(loaders) {
    // Filter loaders that should run based on DOM conditions
    const activeLoaders = loaders.filter(loader => loader.condition());
    
    if (activeLoaders.length === 0) return;

    // Create promises for all active loaders
    const promises = activeLoaders.map(async (loader) => {
        try {
            await loader.loader();
        } catch (error) {
            // Error handling is done within each loader function
            // This catch block is for any unexpected errors
            console.warn('Unexpected error in data loader:', error);
        }
    });

    // Wait for all promises to complete (or fail)
    await Promise.allSettled(promises);
}

/**
 * Utility function to check if the page is visible (for performance optimization)
 * Pauses data loading when page is not visible
 */
function isPageVisible() {
    return !document.hidden && document.visibilityState === 'visible';
}

/**
 * Pause/resume data loading based on page visibility
 * This helps save bandwidth and processing power when the page is not visible
 */
document.addEventListener('visibilitychange', function() {
    if (isPageVisible()) {
        // Page became visible - could trigger any pending data loads
        console.log('Page visible - resuming data operations');
    } else {
        // Page became hidden - could pause any ongoing operations
        console.log('Page hidden - pausing data operations');
    }
});
