// Lightweight lazy loading implementation
(function () {
    'use strict';

    // Configuration
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;

                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy');
                        img.classList.add('lazy-loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, config);

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

        // Observe all lazy background images
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(element => {
            imageObserver.observe(element);
        });

        // Handle background images
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgSrc = element.dataset.bg;

                    if (bgSrc) {
                        element.style.backgroundImage = `url('${bgSrc}')`;
                        element.classList.remove('lazy-bg');
                        element.classList.add('lazy-bg-loaded');
                        observer.unobserve(element);
                    }
                }
            });
        }, config);

        lazyBackgrounds.forEach(element => {
            bgObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
        });

        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(element => {
            const bgSrc = element.dataset.bg;
            if (bgSrc) {
                element.style.backgroundImage = `url('${bgSrc}')`;
                element.classList.remove('lazy-bg');
                element.classList.add('lazy-bg-loaded');
            }
        });
    }
})();
