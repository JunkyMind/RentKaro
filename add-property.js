document.addEventListener('DOMContentLoaded', function() {
    // Image Preview Functionality
    const imageInputs = document.querySelectorAll('.image-input');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const preview = this.parentElement.querySelector('.image-preview');
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Create image element
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                // Clear previous preview
                preview.innerHTML = '';
                preview.appendChild(img);
                preview.classList.add('active');
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.className = 'remove-image-btn';
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                    preview.innerHTML = '';
                    preview.classList.remove('active');
                });
                
                preview.appendChild(removeBtn);
            };
            
            reader.readAsDataURL(file);
        });
    });
    
    // Add More Images Functionality
    const addMoreBtn = document.getElementById('add-more-images');
    const imageContainer = document.querySelector('.image-upload-container');
    let imageCount = document.querySelectorAll('.image-upload-item').length;
    
    addMoreBtn.addEventListener('click', function() {
        if (imageCount >= 8) {
            alert('You can upload a maximum of 8 images.');
            return;
        }
        
        imageCount++;
        
        const newImageItem = document.createElement('div');
        newImageItem.className = 'image-upload-item';
        
        newImageItem.innerHTML = `
            <input type="file" id="image-${imageCount}" name="images" accept="image/*" class="image-input">
            <label for="image-${imageCount}" class="image-label">
                <i class="fas fa-plus"></i>
                <span>Add Image</span>
            </label>
            <div class="image-preview"></div>
        `;
        
        imageContainer.appendChild(newImageItem);
        
        // Add event listener to the new input
        const newInput = newImageItem.querySelector('.image-input');
        newInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const preview = this.parentElement.querySelector('.image-preview');
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Create image element
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                // Clear previous preview
                preview.innerHTML = '';
                preview.appendChild(img);
                preview.classList.add('active');
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.className = 'remove-image-btn';
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    newInput.value = '';
                    preview.innerHTML = '';
                    preview.classList.remove('active');
                });
                
                preview.appendChild(removeBtn);
            };
            
            reader.readAsDataURL(file);
        });
        
        if (imageCount === 8) {
            addMoreBtn.disabled = true;
            addMoreBtn.classList.add('disabled');
        }
    });
    
    // Form Validation and Submission
    const propertyForm = document.getElementById('add-property-form');
    
    if (propertyForm) {
        propertyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, here you would send the form data to the server
            // For now, just show a success message
            alert('Your property has been successfully listed! Our team will review and publish it soon.');
            
            // Reset form after submission
            this.reset();
            
            // Reset image previews
            document.querySelectorAll('.image-preview').forEach(preview => {
                preview.innerHTML = '';
                preview.classList.remove('active');
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Add CSS for the remove image button
    const style = document.createElement('style');
    style.textContent = `
        .remove-image-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 24px;
            height: 24px;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 3;
        }
        
        .remove-image-btn i {
            color: #f44336;
            font-size: 14px;
        }
        
        .error {
            border-color: #f44336 !important;
        }
        
        .disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}); 