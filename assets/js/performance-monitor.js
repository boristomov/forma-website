// Simple performance monitoring (silent)
(function () {
    'use strict';

    // Monitor page load performance
    window.addEventListener('load', function () {
        setTimeout(function () {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    // Performance data available but not logged
                    // Can be accessed via window.performance if needed for debugging
                }
            }

            // Monitor image loading
            const images = document.querySelectorAll('img');
            let loadedImages = 0;
            const totalImages = images.length;

            images.forEach(function (img) {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', function () {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            // All images loaded (no console log)
                        }
                    });
                }
            });
        }, 1000);
    });

    // Monitor lazy loading performance
    if ('IntersectionObserver' in window) {
        let lazyImagesLoaded = 0;
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    lazyImagesLoaded++;
                    // Lazy image loaded (no console log)
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function (img) {
            observer.observe(img);
        });
    }
})();
