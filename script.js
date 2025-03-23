document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const body = document.body;
    
    // Create loading screen element if it doesn't exist
    if (!document.querySelector('.loading-screen')) {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        
        const loadingContent = document.createElement('div');
        loadingContent.className = 'loading-content';
        
        const loadingLogo = document.createElement('div');
        loadingLogo.className = 'loading-logo';
        
        const loadingLogoPart1 = document.createElement('span');
        loadingLogoPart1.className = 'loading-logo-part1';
        loadingLogoPart1.textContent = 'Rent';
        
        const loadingLogoPart2 = document.createElement('span');
        loadingLogoPart2.className = 'loading-logo-part2';
        loadingLogoPart2.textContent = 'Karo';
        
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        
        loadingLogo.appendChild(loadingLogoPart1);
        loadingLogo.appendChild(loadingLogoPart2);
        loadingContent.appendChild(loadingLogo);
        loadingContent.appendChild(loadingSpinner);
        loadingScreen.appendChild(loadingContent);
        
        // Add it to the beginning of the body
        body.insertBefore(loadingScreen, body.firstChild);
        
        // Hide content during loading
        body.style.overflow = 'hidden';
        
        // Hide loading screen after animation finishes
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            body.style.overflow = '';
            
            // Add fade-in class to main elements for smooth transition
            document.querySelector('header').classList.add('fade-in');
            if (document.querySelector('.hero')) {
                document.querySelector('.hero').classList.add('fade-in');
            }
            
            // Remove loading screen after transition
            setTimeout(function() {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    }
    
    // Modern Indian Home Sample Images
    const modernIndianHomes = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Modern villa
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Contemporary home
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Elegant interior
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Modern apartment
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Stylish home
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Modern living space
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Contemporary design
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'  // Premium housing
    ];
    
    // Replace property images with modern Indian homes
    const propertyImages = document.querySelectorAll('.property-img img');
    if (propertyImages.length > 0) {
        propertyImages.forEach((img, index) => {
            // Use modulo to cycle through available images if there are more property cards than images
            const imageIndex = index % modernIndianHomes.length;
            img.src = modernIndianHomes[imageIndex];
            img.alt = "Modern Indian Home";
            
            // Add proper loading and error handling
            img.onerror = function() {
                // Fallback image if the Unsplash image fails to load
                this.src = 'https://via.placeholder.com/300x200/f1f0e9/0d4715?text=RentKaro+Property';
            };
            
            // Add a loading style
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '0';
            img.onload = function() {
                this.style.opacity = '1';
            };
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navigation.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Add hover animations to buttons
    const addBounceEffect = (elements) => {
        if (!elements) return;
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.classList.add('bounce');
            });
            
            element.addEventListener('mouseleave', function() {
                this.classList.remove('bounce');
            });
        });
    };
    
    // Add bounce effect to buttons
    addBounceEffect(document.querySelectorAll('.search-btn, .see-more-btn, .premium-btn, .refer-btn, .service-btn'));
    
    // Property Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show all properties if 'all' is selected, otherwise filter
            if (filter === 'all') {
                propertyCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                propertyCards.forEach(card => {
                    // Logic would be expanded in a real application to check property type
                    // For now, just showing a basic filter
                    if (card.classList.contains(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Sort Properties
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortOption = this.value;
            const propertyGrid = document.querySelector('.property-grid');
            let propertiesArray = Array.from(propertyCards);
            
            // Sort properties based on the selected option
            if (sortOption === 'price-low') {
                propertiesArray.sort((a, b) => {
                    const priceA = getPriceValue(a);
                    const priceB = getPriceValue(b);
                    return priceA - priceB;
                });
            } else if (sortOption === 'price-high') {
                propertiesArray.sort((a, b) => {
                    const priceA = getPriceValue(a);
                    const priceB = getPriceValue(b);
                    return priceB - priceA;
                });
            } else if (sortOption === 'distance') {
                // Distance sorting would require actual distance data
                // This is just a placeholder for the concept
                propertiesArray.sort((a, b) => {
                    // Simulated distance calculation
                    return Math.random() - 0.5;
                });
            }
            
            // Re-append sorted properties to the grid
            propertiesArray.forEach(property => {
                propertyGrid.appendChild(property);
            });
        });
    }
    
    // Helper function to extract price value from property card
    function getPriceValue(propertyCard) {
        const priceElement = propertyCard.querySelector('.property-price');
        if (priceElement) {
            // Extract number from string (e.g., "₹8,000/month" -> 8000)
            const priceText = priceElement.textContent;
            const priceMatch = priceText.match(/₹([\d,]+)/);
            if (priceMatch && priceMatch[1]) {
                return parseInt(priceMatch[1].replace(/,/g, ''));
            }
        }
        return 0;
    }
    
    // Like Button Functionality
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                // Change to filled heart
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#E91E63';
            } else {
                // Change back to outline heart
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#888';
            }
        });
    });
    
    // Form Validation
    const searchForm = document.querySelector('.search-box form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation - could be expanded
            const propertyType = document.getElementById('property-type').value;
            const gender = document.getElementById('gender').value;
            
            if (!propertyType && !gender) {
                alert('Please select at least one search criteria');
                return false;
            }
            
            // In a real application, this would submit the form or trigger a search
            alert('Search functionality would be implemented in a real application.');
        });
    }
    
    // Simulated Loading Effect for Properties
    function simulateLoading() {
        const propertyGrid = document.querySelector('.property-grid');
        
        if (propertyGrid) {
            propertyGrid.classList.add('loading');
            
            setTimeout(() => {
                propertyGrid.classList.remove('loading');
            }, 1000);
        }
    }
    
    // Add property card animations
    function setupPropertyCardAnimations() {
        const propertyCards = document.querySelectorAll('.property-card');
        
        propertyCards.forEach((card, index) => {
            // Staggered animation on page load
            card.style.animation = `fadeInUp ${0.3 + (index * 0.1)}s ease forwards`;
            card.style.opacity = '0';
            
            // Add hover animations
            card.addEventListener('mouseenter', function() {
                this.querySelector('.property-img img').style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.property-img img').style.transform = 'scale(1)';
            });
        });
    }
    
    // Replace main gallery images on property detail page if present
    const mainPropertyImage = document.getElementById('main-property-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail');
    
    if (mainPropertyImage && thumbnailImages.length > 0) {
        // Set the main image to the first one in our collection
        mainPropertyImage.src = modernIndianHomes[0];
        
        // Update thumbnail images too
        thumbnailImages.forEach((thumbnail, index) => {
            // Use modulo to cycle through images if needed
            const imageIndex = index % modernIndianHomes.length;
            thumbnail.src = modernIndianHomes[imageIndex];
            
            // Update the onclick handler to use our new image sources
            thumbnail.onclick = function() {
                changeImage(this, modernIndianHomes[imageIndex]);
            };
        });
    }
    
    // Setup property card animations after loading screen is hidden
    setTimeout(setupPropertyCardAnimations, 1500);
    
    // Mobile-specific behaviors
    function setupMobileSpecificBehaviors() {
        if (window.innerWidth <= 768) {
            // Add any mobile-specific behaviors here
            
            // Example: Close mobile menu when a link is clicked
            const navLinks = document.querySelectorAll('nav ul li a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navigation.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }
    }
    
    // Call setup functions
    setupMobileSpecificBehaviors();
    
    // Window resize handling
    window.addEventListener('resize', function() {
        setupMobileSpecificBehaviors();
    });
}); 