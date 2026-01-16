// ========================================
// Bluebirds Homestay - Interactive Features
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // Booking Form Handling
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    
    // Set minimum dates for check-in and check-out
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        checkInInput.setAttribute('min', today);
        checkOutInput.setAttribute('min', today);
        
        // Update check-out min date when check-in changes
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const minCheckOut = nextDay.toISOString().split('T')[0];
            checkOutInput.setAttribute('min', minCheckOut);
            
            // Clear check-out if it's before the new minimum
            if (checkOutInput.value && checkOutInput.value <= this.value) {
                checkOutInput.value = '';
            }
        });
    }
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;
            const phone = document.getElementById('phone').value;
            const guestName = document.getElementById('guestName').value;
            const numRooms = document.getElementById('numRooms').value;
            
            // Validate required fields
            if (!checkIn || !checkOut || !phone) {
                alert('Please fill in all required fields (Check-in Date, Check-out Date, and Phone Number)');
                return;
            }
            
            // Validate phone number (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Validate check-out is after check-in
            if (new Date(checkOut) <= new Date(checkIn)) {
                alert('Check-out date must be after check-in date');
                return;
            }
            
            // All validations passed - show success modal
            console.log('Booking Details:', {
                checkIn,
                checkOut,
                phone,
                guestName: guestName || 'Not provided',
                numRooms: numRooms || '1'
            });
            
            // Show modal
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Close modal functionality
    function closeModal() {
        if (successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ========================================
    // Room Gallery Modal
    // ========================================
    const galleryModal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');
    const galleryClose = document.getElementById('galleryClose');
    const roomCards = document.querySelectorAll('.room-card');
    
    // Open gallery when clicking room card
    if (roomCards.length > 0) {
        roomCards.forEach(card => {
            card.addEventListener('click', function() {
                const roomImage = this.querySelector('.room-image img');
                if (roomImage && galleryModal && galleryImage) {
                    galleryImage.src = roomImage.src;
                    galleryImage.alt = roomImage.alt;
                    galleryModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Close gallery
    function closeGallery() {
        if (galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (galleryClose) {
        galleryClose.addEventListener('click', closeGallery);
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });
    }
    
    // Close gallery with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
            closeGallery();
        }
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Scroll Animation for Elements
    // ========================================
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
    
    // Observe room cards
    document.querySelectorAll('.room-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ========================================
    // Phone Number Formatting (Optional Enhancement)
    // ========================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }
    
    // ========================================
    // Form Visual Feedback
    // ========================================
    const formInputs = document.querySelectorAll('.booking-form input, .booking-form select');
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Bluebirds Homestay website loaded successfully! 🏨');
});
