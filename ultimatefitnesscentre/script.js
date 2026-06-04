// Ultimate Fitness Centre Newtown - Interactivity Script

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars-staggered', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars-staggered');
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars-staggered');
            });
        });
    }

    // 2. Navigation Active Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Reviews Carousel
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentReviewIndex = 0;
    let reviewInterval;

    function showReview(index) {
        reviews.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentReviewIndex = index;
    }

    function nextReview() {
        let nextIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(nextIndex);
    }

    function startReviewTimer() {
        reviewInterval = setInterval(nextReview, 6000);
    }

    function resetReviewTimer() {
        clearInterval(reviewInterval);
        startReviewTimer();
    }

    if (reviews.length > 0 && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                showReview(targetIndex);
                resetReviewTimer();
            });
        });

        startReviewTimer();
    }

    // 4. Custom Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentImgIndex = 0;
    const imagesSrcs = Array.from(galleryItems).map(item => item.getAttribute('data-src'));

    function openLightbox(index) {
        currentImgIndex = index;
        lightboxImg.src = imagesSrcs[currentImgIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling background
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    function prevImage() {
        currentImgIndex = (currentImgIndex - 1 + imagesSrcs.length) % imagesSrcs.length;
        lightboxImg.src = imagesSrcs[currentImgIndex];
    }

    function nextImage() {
        currentImgIndex = (currentImgIndex + 1) % imagesSrcs.length;
        lightboxImg.src = imagesSrcs[currentImgIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    // Close lightbox on clicking backdrop
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });

    // 5. Lead Form Submission Handler (Mock)
    const leadForm = document.getElementById('lead-form');
    const formSuccess = document.getElementById('form-success');

    if (leadForm && formSuccess) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract input values
            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            const goal = document.getElementById('form-goal').value;

            // Log details (mocking lead capture)
            console.log('Lead Captured:', { name, phone, goal, timestamp: new Date() });

            // Animate transition to success block
            leadForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            formSuccess.style.opacity = '0';
            setTimeout(() => {
                formSuccess.style.opacity = '1';
                formSuccess.style.transition = 'opacity 0.5s ease';
            }, 50);
        });
    }
});
