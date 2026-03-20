/**
 * Berlucchi Sustainability Report - Interactive Experience
 * "Quiet Luxury" Animation System
 * 
 * Principles:
 * - Slow, intentional, refined (400-700ms durations)
 * - cubic-bezier(0.25, 0.1, 0.25, 1) easing
 * - No bounce, no elastic, no aggressive motion
 * - Everything serves the content
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollReveals();
    initKPICounters();
    initTimelineAnimation();
    initGovernanceAnimation();
    initParallax();
    initSmoothScroll();
    initMobileMenu();
});

/**
 * NAVIGATION SYSTEM
 * Scroll-spy, header compression, progress indicator
 */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Header compression on scroll
                if (currentScroll > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                // Update scroll progress bar
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (currentScroll / docHeight) * 100;
                scrollProgress.style.width = `${progress}%`;
                
                // Scroll Spy - Active Section Highlight
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 200;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * SCROLL-DRIVEN REVEALS
 * Intersection Observer with staggered timing
 */
function initScrollReveals() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add small stagger based on element's delay class or position
                const delay = entry.target.classList.contains('delay-100') ? 100 :
                             entry.target.classList.contains('delay-200') ? 200 :
                             entry.target.classList.contains('delay-300') ? 300 :
                             entry.target.classList.contains('delay-400') ? 400 :
                             entry.target.classList.contains('delay-500') ? 500 : 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                }, delay);
                
                // Unobserve after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal-element').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 700ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)';
        revealObserver.observe(el);
    });
}

/**
 * KPI COUNTER ANIMATION
 * Count-up effect triggered on viewport entry
 * Main KPI (59.6M€) has subtle glow pulse
 */
function initKPICounters() {
    const kpiSection = document.getElementById('dati');
    const kpiValues = document.querySelectorAll('.kpi-value');
    let animated = false;
    
    const countUp = (element, target, duration = 2000, decimals = 0, suffix = '') => {
        const start = 0;
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Refined easing (ease-out-cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeProgress;
            
            if (decimals > 0) {
                element.textContent = current.toFixed(decimals) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        requestAnimationFrame(updateCount);
    };
    
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                // Staggered counter animation for KPIs
                kpiValues.forEach((kpi, index) => {
                    const target = parseFloat(kpi.getAttribute('data-target'));
                    const decimals = parseInt(kpi.getAttribute('data-decimals')) || 0;
                    const suffix = kpi.getAttribute('data-suffix') || '';
                    
                    setTimeout(() => {
                        countUp(kpi, target, 2500, decimals, suffix);
                    }, index * 150); // 150ms stagger between cards
                });
                
                kpiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (kpiSection) {
        kpiObserver.observe(kpiSection);
    }
}

/**
 * FILIERA TIMELINE ANIMATION
 * Vertical line draws progressively, markers activate sequentially
 */
function initTimelineAnimation() {
    const timelineSection = document.getElementById('filiera');
    if (!timelineSection) return;
    
    // Desktop elements
    const timelineProgressDesktop = document.getElementById('timeline-progress-desktop');
    const timelineItemsDesktop = document.querySelectorAll('.timeline-item-desktop');
    
    // Mobile elements
    const timelineProgressMobile = document.getElementById('timeline-progress-mobile');
    const timelineItemsMobile = document.querySelectorAll('.timeline-item-mobile');
    
    let progressAnimated = false;
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !progressAnimated) {
                progressAnimated = true;
                
                // Animate desktop line
                if (timelineProgressDesktop) {
                    setTimeout(() => {
                        timelineProgressDesktop.style.transform = 'scaleY(1)';
                    }, 300);
                }
                
                // Animate mobile line
                if (timelineProgressMobile) {
                    setTimeout(() => {
                        timelineProgressMobile.style.transform = 'scaleY(1)';
                    }, 300);
                }
                
                // Activate desktop items
                timelineItemsDesktop.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        
                        // Activate dot
                        const dot = item.querySelector('.timeline-dot');
                        const dotInner = item.querySelector('.timeline-dot-inner');
                        if (dot) {
                            dot.style.borderColor = 'var(--color-gold)';
                            dot.style.transform = 'scale(1.2)';
                        }
                        if (dotInner) {
                            dotInner.style.background = 'var(--color-gold)';
                            dotInner.style.transform = 'scale(1.5)';
                        }
                    }, 500 + (index * 200));
                });
                
                // Activate mobile items
                timelineItemsMobile.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                        
                        // Activate dot
                        const dot = item.querySelector('.timeline-dot-mobile');
                        const dotInner = item.querySelector('.timeline-dot-inner');
                        if (dot) {
                            dot.style.borderColor = 'var(--color-gold)';
                        }
                        if (dotInner) {
                            dotInner.style.background = 'var(--color-gold)';
                            dotInner.style.transform = 'scale(1.5)';
                        }
                    }, 500 + (index * 200));
                });
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    timelineObserver.observe(timelineSection);
}

/**
 * GOVERNANCE ANIMATION
 * Nodes appear sequentially with connector line animation
 */
function initGovernanceAnimation() {
    const governanceSection = document.getElementById('governance');
    const nodes = document.querySelectorAll('.governance-node');
    const connector = document.getElementById('governance-connector');
    
    if (!governanceSection) return;
    
    const governanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate connector line first
                if (connector) {
                    setTimeout(() => {
                        connector.style.transform = 'scaleX(1)';
                    }, 300);
                }
                
                // Stagger node appearances
                nodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.classList.add('active');
                    }, 500 + (index * 400)); // 400ms between nodes
                });
                
                governanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    governanceObserver.observe(governanceSection);
}

/**
 * LIGHT PARALLAX EFFECT
 * Hero section only, max 5-10px movement
 */
function initParallax() {
    const hero = document.getElementById('hero');
    const heroBg = hero?.querySelector('.hero-bg');
    
    if (!hero || !heroBg) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.02; // Very subtle: 2% of scroll
                
                // Cap at 10px max movement
                const limitedRate = Math.min(Math.max(rate, 0), 10);
                
                heroBg.style.transform = `translateY(${limitedRate}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * SMOOTH SCROLL FOR ANCHOR LINKS
 * Refined scrolling behavior
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });
}

/**
 * MOBILE MENU
 * Clean, minimal hamburger functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/**
     * MICRO-INTERACTIONS ENHANCEMENT
     * Additional subtle hover states via JS for performance
     */
    document.querySelectorAll('.path-card, .material-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });

    // KPI Card subtle glow effect on hover
    document.querySelectorAll('.kpi-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(201, 169, 97, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
