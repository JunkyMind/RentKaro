document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navigation.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
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