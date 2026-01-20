// ========================================
// Bluebirds Homestay - Interactive Features
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
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
        checkInInput.addEventListener('change', function () {
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
        bookingForm.addEventListener('submit', function (e) {
            // Get form values
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;
            const phone = document.getElementById('phone').value;

            // Validate required fields
            if (!checkIn || !checkOut || !phone) {
                e.preventDefault();
                alert('Please fill in all required fields (Check-in Date, Check-out Date, and Phone Number)');
                return;
            }

            // Validate phone number (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                e.preventDefault();
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Validate check-out is after check-in
            if (new Date(checkOut) <= new Date(checkIn)) {
                e.preventDefault();
                alert('Check-out date must be after check-in date');
                return;
            }

            // Split check-in date into components for Google Forms
            const checkInDate = new Date(checkIn);
            document.getElementById('checkInYear').value = checkInDate.getFullYear();
            document.getElementById('checkInMonth').value = checkInDate.getMonth() + 1; // Months are 0-indexed
            document.getElementById('checkInDay').value = checkInDate.getDate();

            // Split check-out date into components for Google Forms
            const checkOutDate = new Date(checkOut);
            document.getElementById('checkOutYear').value = checkOutDate.getFullYear();
            document.getElementById('checkOutMonth').value = checkOutDate.getMonth() + 1;
            document.getElementById('checkOutDay').value = checkOutDate.getDate();

            // Show success modal and reset form after a short delay
            // (The delay ensures the form starts submitting before the fields are cleared)
            setTimeout(() => {
                if (successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                bookingForm.reset();
            }, 500);
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
        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================
    // Room Data Rendering
    // ========================================
    const roomsDynamicGrid = document.getElementById('roomsDynamicGrid');

    function renderRoomGrid() {
        if (!roomsDynamicGrid || typeof roomManager === 'undefined') return;

        const rooms = roomManager.getAllRooms();
        if (!rooms || Object.keys(rooms).length === 0) {
            roomsDynamicGrid.innerHTML = '<p class="text-center" style="color: var(--light-secondary); grid-column: 1/-1;">No room data found. Please sync from Admin Dashboard.</p>';
            return;
        }

        roomsDynamicGrid.innerHTML = '';
        Object.keys(rooms).forEach(id => {
            const room = rooms[id];
            const card = document.createElement('div');
            console.log(`Rendering Room Card ${id}:`, { size: room.size, bedSize: room.bedSize });
            
            const mainImg = room.images?.[0]?.src || '';
            const hasRealImage = mainImg && !mainImg.includes('placeholder');

            card.innerHTML = `
                <div class="room-image">
                    ${hasRealImage ?
                    `<img src="${mainImg}" alt="${room.name}">` :
                    `<div style="width: 100%; height: 280px; background: var(--gradient-dark); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
                            <span style="font-size: 3rem;">🛏️</span>
                            <span style="font-weight: 600;">${room.name}</span>
                        </div>`
                }
                    <div class="room-number">Room ${id}</div>
                </div>
                <div class="room-details">
                    <h3 class="room-name">${room.name}</h3>
                    
                    <div class="room-dimensions" style="display: flex !important; visibility: visible !important; opacity: 1 !important; background: rgba(0,0,0,0.2) !important; padding: 10px !important; border-radius: 8px !important;">
                        <div class="dimension-item">
                            <span class="dimension-label" style="font-size: 0.7rem !important; color: #aaa !important;">ROOM SIZE</span>
                            <span class="dimension-value" style="display: block !important; font-size: 1.1rem !important; color: #fff !important; font-weight: bold !important;">${room.size || '14 × 16 ft'}</span>
                        </div>
                        <div class="dimension-item">
                            <span class="dimension-label" style="font-size: 0.7rem !important; color: #aaa !important;">BED SIZE</span>
                            <span class="dimension-value" style="display: block !important; font-size: 1.1rem !important; color: #fff !important; font-weight: bold !important;">${room.bedSize || '6 × 7 ft'}</span>
                        </div>
                    </div>

                    <div class="amenities">
                        ${(room.amenities || []).map(item => `
                            <div class="amenity-item">
                                <span class="amenity-icon">${getAmenityIcon(item)}</span>
                                <span>${item}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="room-price">
                        <div class="price-label">Room Rate</div>
                        <div class="price-amount">₹${room.price}<span class="price-period">/day</span></div>
                    </div>
                </div>
            `;

            // Add click listener for gallery
            card.addEventListener('click', () => openGallery(id));
            roomsDynamicGrid.appendChild(card);
        });
    }

    function getAmenityIcon(amenity) {
        const icons = {
            'Air Conditioning': '❄️',
            'King Size Bed': '🛏️',
            'Private Bathroom': '🚿',
            'Hot Water': '💧',
            '64" Smart TV': '📺',
            'Music System': '🎵',
            'Multiple Beds': '🛏️',
            'Shared Bathroom': '🚿'
        };
        return icons[amenity] || '✨';
    }

    async function initRoomGrid() {
        if (!roomsDynamicGrid) return;

        // Show loading state
        roomsDynamicGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                <div class="sync-loader" style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: var(--accent-light); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                <p style="color: var(--light-secondary);">Refreshing latest room details...</p>
            </div>
            <style>
                @keyframes spin { to { transform: rotate(360deg); } }
            </style>
        `;

        if (typeof roomManager !== 'undefined') {
            await roomManager.init();
            renderRoomGrid();
        }
    }

    initRoomGrid();

    // ========================================
    // Room Gallery Modal with Dynamic Data
    // ========================================

    const galleryModal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');
    const galleryClose = document.getElementById('galleryClose');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryRoomTitle = document.getElementById('galleryRoomTitle');
    const galleryCounter = document.getElementById('galleryCounter');
    const galleryCategory = document.getElementById('galleryCategory');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const roomCards = document.querySelectorAll('.room-card');

    let currentRoom = null;
    let currentImageIndex = 0;
    let currentGallery = [];

    // Open gallery when clicking room card
    if (roomCards.length > 0) {
        roomCards.forEach(card => {
            card.addEventListener('click', function () {
                const roomNumber = this.getAttribute('data-room');
                openGallery(roomNumber);
            });
        });
    }

    function openGallery(roomNumber) {
        currentRoom = roomNumber;
        const rooms = roomManager.getAllRooms();
        currentGallery = rooms[roomNumber]?.images || [];
        currentImageIndex = 0;

        if (currentGallery.length > 0) {
            updateGalleryDisplay();
            createThumbnails();
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function updateGalleryDisplay() {
        if (currentGallery.length === 0) return;

        const currentImage = currentGallery[currentImageIndex];

        // Update main image
        if (currentImage.isPlaceholder) {
            // Create a placeholder div for missing images
            galleryImage.style.display = 'none';
            const existingPlaceholder = document.querySelector('.gallery-placeholder');
            if (existingPlaceholder) existingPlaceholder.remove();

            const placeholder = document.createElement('div');
            placeholder.className = 'gallery-placeholder';
            placeholder.style.cssText = 'width: 100%; height: 70vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; color: rgba(255, 255, 255, 0.7); border-radius: 12px;';
            placeholder.innerHTML = `
                <span style="font-size: 4rem;">📷</span>
                <span style="font-size: 1.2rem; font-weight: 600;">${currentImage.category}</span>
                <span style="font-size: 0.9rem;">Image Coming Soon - Replace with Your Photo</span>
            `;
            galleryImage.parentElement.appendChild(placeholder);
        } else {
            const existingPlaceholder = document.querySelector('.gallery-placeholder');
            if (existingPlaceholder) existingPlaceholder.remove();
            galleryImage.style.display = 'block';
            galleryImage.src = currentImage.src;
            galleryImage.alt = currentImage.alt;
        }

        // Update room title
        galleryRoomTitle.textContent = `Room ${currentRoom}`;

        // Update counter
        galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;

        // Update category
        galleryCategory.textContent = currentImage.category;

        // Update navigation buttons
        if (galleryPrev) {
            galleryPrev.classList.toggle('disabled', currentImageIndex === 0);
        }
        if (galleryNext) {
            galleryNext.classList.toggle('disabled', currentImageIndex === currentGallery.length - 1);
        }

        // Update thumbnails
        updateThumbnailsActive();
    }

    function createThumbnails() {
        if (!galleryThumbnails) return;

        galleryThumbnails.innerHTML = '';
        currentGallery.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                updateGalleryDisplay();
            });

            if (image.isPlaceholder) {
                thumb.innerHTML = `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0f172a, #1e293b); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📷</div>`;
            } else {
                thumb.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            }

            galleryThumbnails.appendChild(thumb);
        });
    }

    function updateThumbnailsActive() {
        const thumbs = galleryThumbnails.querySelectorAll('.gallery-thumb');
        thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    // Navigation
    if (galleryPrev) {
        galleryPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateGalleryDisplay();
            }
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentImageIndex < currentGallery.length - 1) {
                currentImageIndex++;
                updateGalleryDisplay();
            }
        });
    }

    // Close gallery
    function closeGallery() {
        if (galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
            const existingPlaceholder = document.querySelector('.gallery-placeholder');
            if (existingPlaceholder) existingPlaceholder.remove();
            galleryImage.style.display = 'block';
        }
    }

    if (galleryClose) {
        galleryClose.addEventListener('click', closeGallery);
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (galleryModal && galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowLeft') {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateGalleryDisplay();
                }
            } else if (e.key === 'ArrowRight') {
                if (currentImageIndex < currentGallery.length - 1) {
                    currentImageIndex++;
                    updateGalleryDisplay();
                }
            }
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

    const observer = new IntersectionObserver(function (entries) {
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
        phoneInput.addEventListener('input', function (e) {
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
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    console.log('Bluebirds Homestay website loaded successfully! 🏨');
});
