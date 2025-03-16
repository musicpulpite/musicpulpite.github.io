document.addEventListener('DOMContentLoaded', function() {
  // Create a container for the GitHub preview iframe
  const previewContainer = document.createElement('div');
  previewContainer.className = 'github-preview-container';
  document.body.appendChild(previewContainer);
  
  // Get all project links
  const projectLinks = document.querySelectorAll('.links a[data-href]');
  
  // Track if preview is currently shown
  let isPreviewVisible = false;
  let activeLink = null;
  let hideTimeout = null;
  
  // Add event listeners to each project link
  projectLinks.forEach(link => {
    // When user hovers over a project link
    link.addEventListener('mouseenter', function(e) {
      // Clear any pending hide operations
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      
      // Get the GitHub repo URL from the data attribute
      const repoUrl = this.getAttribute('data-href');
      if (!repoUrl) return;
      
      // Mark this link as active
      activeLink = this;
      
      // Show the preview container
      previewContainer.innerHTML = `
        <div class="preview-header">
          <span>${this.textContent} on GitHub</span>
          <small>Click to visit</small>
        </div>
        <iframe src="${repoUrl}" frameborder="0" style="width:100%; height:calc(100% - 36px);"></iframe>
      `;
      
      // Show the preview with animation
      previewContainer.style.display = 'block';
      setTimeout(() => {
        previewContainer.style.opacity = '1';
        previewContainer.style.transform = 'translateX(0)';
      }, 10);
      
      isPreviewVisible = true;
      
      // Debug log
      console.log("Preview container visible:", {
        display: previewContainer.style.display,
        opacity: previewContainer.style.opacity,
        width: previewContainer.offsetWidth,
        height: previewContainer.offsetHeight,
        element: previewContainer
      });
    });
    
    // When user leaves a project link
    link.addEventListener('mouseleave', function() {
      // Set a timeout to hide the preview (allows moving mouse to preview)
      hideTimeout = setTimeout(() => {
        if (activeLink === this) {
          hidePreview();
        }
      }, 300);
    });
  });
  
  // Handle mouse events on the preview container itself
  previewContainer.addEventListener('mouseenter', function() {
    // Clear any pending hide operations when mouse enters preview
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  });
  
  previewContainer.addEventListener('mouseleave', function() {
    // Hide preview when mouse leaves it
    hidePreview();
  });
  
  // Make the preview clickable to navigate to the repo
  previewContainer.addEventListener('click', function() {
    if (activeLink) {
      window.open(activeLink.href, '_blank');
    }
  });
  
  // Function to hide the preview
  function hidePreview() {
    previewContainer.style.opacity = '0';
    previewContainer.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
      previewContainer.style.display = 'none';
      isPreviewVisible = false;
      activeLink = null;
    }, 300); // Match transition duration
  }
});
