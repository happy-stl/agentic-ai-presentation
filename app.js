// Citation data
const citations = {
    1: {
        id: 1,
        title: "Claude 3.5 Sonnet solved 64% of problems",
        source: "Anthropic",
        url: "https://www.anthropic.com/news/claude-3-5-sonnet",
        summary: "In internal agentic coding evaluation, Claude 3.5 Sonnet solved 64% of problems, outperforming Claude 3 Opus (38%). Shows marked improvement in coding proficiency and complex instruction handling."
    },
    2: {
        id: 2,
        title: "SWE-bench: benchmark for real-world coding tasks",
        source: "SWE-bench",
        url: "http://www.swebench.com",
        summary: "SWE-bench is a benchmark for evaluating AI coding assistants on real-world GitHub issues. It measures how effectively models can understand and implement code changes across diverse codebases and languages."
    },
    3: {
        id: 3,
        title: "92% of developers use AI coding tools",
        source: "GitHub",
        url: "https://github.blog/news-insights/research/survey-reveals-ais-impact-on-the-developer-experience/",
        summary: "Survey reveals 92% of U.S.-based developers are using AI coding tools both in and outside of work. 70% see significant benefits including improved productivity and collaboration."
    },
    4: {
        id: 4,
        title: "Introducing Claude 4",
        source: "Anthropic",
        url: "https://www.anthropic.com/news/claude-4",
        summary: "Claude Sonnet 4 significantly improves on previous capabilities, excelling in coding with a state-of-the-art 72.7% on SWE-bench Verified, a benchmark for performance on real software engineering tasks."
    },
    5: {
        id: 5,
        title: "Gemini 2.5 Pro tops LMArena by close to 40 points",
        source: "RD World Report March 2025",
        url: "https://www.rdworldonline.com/googles-gemini-2-5-pro-model-tops-lmarena-by-40-points-outperforms-competitors-in-scientific-reasoning/",
        summary: "Gemini 2.5 Pro achieved 84% on GPQA Diamond benchmark, leading LMArena. Features thinking model capabilities and 1 million token context window with native multimodality."
    },
    6: {
        id: 6,
        title: "Model Context Protocol (MCP) creates a standard for AI tools",
        source: "Model Context Protocol Official Documentation",
        url: "https://modelcontextprotocol.io/introduction",
        summary: "Model Context Protocol (MCP) is an open standard that enables LLMs to use tools via a consistent interface. It provides a unified way to connect AI systems with external data sources, APIs, and user interfaces through a structured protocol."
    },
    7: {
        id: 7,
        title: "Fitness function-driven development concepts",
        source: "ThoughtWorks",
        url: "https://www.thoughtworks.com/en-us/insights/articles/fitness-function-driven-development",
        summary: "Fitness functions describe how close an architecture is to achieving architectural aims. During TDD, tests verify features conform to business outcomes; with fitness functions, tests measure system alignment to architectural goals."
    },
    8: {
        id: 8,
        title: "JetBrains AI Assistant Survey 2024",
        source: "JetBrains",
        url: "https://blog.jetbrains.com/ai/2024/04/developers-save-up-to-8-hours-per-week-with-jetbrains-ai-assistant/",
        summary: "91% of developers save time with AI tools. 37% save 1-3 hours per week, 22% save 3-5 hours per week, and 4% save more than 8 hours per week. Significant productivity improvements reported."
    },
    9: {
        id: 9,
        title: "Claude 3.7+ models show 70% code quality improvement",
        source: "DataCamp Blog",
        url: "https://www.datacamp.com/blog/claude-3-7-sonnet",
        summary: "Claude 3.7 Sonnet shows a clear advantage in software engineering, with a 62.3% accuracy score in SWE-bench Verified, a significant jump from Claude 3.5 Sonnet's 49.0%. When using a custom scaffold (a structured prompt or additional context that helps guide the model's response toward a more accurate solution), that accuracy increases to 70.3%, making it the best-performing model in this category."
    },
    10: {
        id: 10,
        title: "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet",
        source: "Anthropic",
        url: "https://www.anthropic.com/engineering/swe-bench-sonnet",
        summary: "The updated Claude 3.5 Sonnet achieved 49% on SWE-bench Verified, beating previous state-of-the-art models. SWE-bench tests a model's ability to complete real-world software engineering tasks from GitHub issues. Claude's performance demonstrates significant improvements in understanding, modifying, and testing code in complex repositories."
    },
    11: {
        id: 11,
        title: "Claude 3.7 Sonnet and Claude Code",
        source: "Anthropic",
        url: "https://www.anthropic.com/news/claude-3-7-sonnet",
        summary: "Claude 3.7 Sonnet is Anthropic's most intelligent model to date and the first hybrid reasoning model, capable of both near-instant responses and extended, step-by-step thinking visible to users. It shows particularly strong improvements in coding, achieving state-of-the-art performance on SWE-bench Verified and TAU-bench."
    },
    12: {
        id: 12,
        title: "Activating AI Safety Level 3 Protections",
        source: "Anthropic",
        url: "https://www.anthropic.com/news/activating-asl3-protections",
        summary: "Anthropic has implemented AI Safety Level 3 (ASL3) protections for their advanced AI systems. These higher-tier safety measures include enhanced safeguards against misuse, improved monitoring systems, and stronger defenses against prompt injection and jailbreaking attempts while maintaining the system's utility."
    },
    13: {
        id: 13,
        title: "Cursor AI: AI-powered coding assistant",
        source: "Cursor AI",
        url: "https://www.cursor.com",
        summary: "Cursor AI is an AI-powered coding assistant that helps developers write code faster and more efficiently. It uses advanced AI models to understand developer intent and generate code suggestions."
    },
    14: {
        id: 14,
        title: "Agentic AI Software Engineering: Best Practices for Modern Development with Cursor and AI-Powered Tools",
        source: "Perplexity",
        url: "https://www.perplexity.ai/search/hello-can-you-please-help-me-p-LrF_Q5v.SQupTmo.VaL5sQ",
        summary: "This research explores the emerging landscape of agentic AI in software development, focusing on practical implementation strategies, prompt engineering excellence, and the integration of advanced AI models through tools like Cursor."
    },
    15: {
        id: 15,
        title: "Agentic AI Presentation",
        source: "GitHub",
        url: "https://github.com/happiness-enterprises/agentic-ai-presentation",
        summary: "This is the code repository for this presentation."
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Navigation functionality
    const navigation = document.getElementById('navigation');
    const progressFill = document.getElementById('progressFill');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    const citationTooltip = document.getElementById('citationTooltip');

    // Cache section positions for better performance
    let sectionPositions = [];

    function updateSectionPositions() {
        sectionPositions = Array.from(sections).map(section => ({
            id: section.id,
            offsetTop: section.offsetTop,
            offsetHeight: section.offsetHeight
        }));
    }

    // Initial position calculation
    updateSectionPositions();

    // Recalculate positions on window resize
    window.addEventListener('resize', updateSectionPositions);

    // Citation tooltip functionality
    function initializeCitationTooltips() {
        const citedElements = document.querySelectorAll('[data-cite]');

        citedElements.forEach(element => {
            const citeId = parseInt(element.getAttribute('data-cite'));
            const citation = citations[citeId];

            if (citation) {
                // Create wrapper anchor element
                const wrapper = document.createElement('a');
                wrapper.href = citation.url;
                wrapper.target = '_blank';
                wrapper.rel = 'noopener noreferrer';

                // Don't inherit text decoration from parent styles
                wrapper.style.textDecoration = 'inherit';
                wrapper.style.color = 'inherit';

                // Clone element attributes to the wrapper
                Array.from(element.attributes).forEach(attr => {
                    if (attr.name !== 'data-cite') {
                        wrapper.setAttribute(attr.name, attr.value);
                    }
                });

                // Keep the data-cite attribute on the original element
                wrapper.appendChild(element.cloneNode(true));

                // Replace the original element with the wrapper
                element.parentNode.replaceChild(wrapper, element);

                // Use the wrapper for tooltip events
                wrapper.addEventListener('mouseenter', function (e) {
                    showTooltip(e, citation);
                });

                wrapper.addEventListener('mouseleave', function () {
                    hideTooltip();
                });

                wrapper.addEventListener('mousemove', function (e) {
                    updateTooltipPosition(e);
                });
            }
        });
    }

    function showTooltip(event, citation) {
        const tooltipTitle = citationTooltip.querySelector('.tooltip-title');
        const tooltipSource = citationTooltip.querySelector('.tooltip-source');
        const tooltipSummary = citationTooltip.querySelector('.tooltip-summary');

        tooltipTitle.textContent = citation.title;
        tooltipSource.textContent = citation.source;
        tooltipSummary.textContent = citation.summary;

        citationTooltip.classList.add('visible');
        updateTooltipPosition(event);
    }

    function hideTooltip() {
        citationTooltip.classList.remove('visible');
    }

    function updateTooltipPosition(event) {
        if (!citationTooltip.classList.contains('visible')) return;

        const tooltipRect = citationTooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = event.clientX;
        let y = event.clientY;

        // Position tooltip to the right of cursor by default
        x += 15;
        y -= tooltipRect.height / 2;

        // Adjust horizontal position if tooltip would go off-screen
        if (x + tooltipRect.width > viewportWidth - 20) {
            x = event.clientX - tooltipRect.width - 15; // Position to the left
        }

        // Adjust vertical position if tooltip would go off-screen
        if (y < 20) {
            y = 20;
        } else if (y + tooltipRect.height > viewportHeight - 20) {
            y = viewportHeight - tooltipRect.height - 20;
        }

        // Use fixed positioning with client coordinates to stay with viewport
        citationTooltip.style.position = 'fixed';
        citationTooltip.style.left = x + 'px';
        citationTooltip.style.top = y + 'px';
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized scroll handler with better progress calculation
    function updateNavigationState() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // More accurate progress bar calculation
        const maxScroll = documentHeight - windowHeight;
        const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        progressFill.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';

        // Improved active section detection
        let activeSection = '';
        const buffer = 150; // Larger buffer for better section detection

        for (let i = 0; i < sectionPositions.length; i++) {
            const section = sectionPositions[i];
            const sectionTop = section.offsetTop - buffer;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                activeSection = section.id;
                break;
            }
        }

        // Fallback: if no section is active, use the first one
        if (!activeSection && sectionPositions.length > 0) {
            activeSection = sectionPositions[0].id;
        }

        // Update navigation highlighting
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Throttled scroll handler for better performance
    let scrollTicking = false;
    function handleScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                updateNavigationState();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimized Intersection Observer for animations
    const observerOptions = {
        threshold: [0, 0.1, 0.2],
        rootMargin: '0px 0px -10% 0px'
    };

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with a small delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('fade-in-delayed');
                }, 100);
                // Stop observing once animated
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation, but do it after initial load
    setTimeout(() => {
        const animatedElements = document.querySelectorAll(`
            .comparison-card,
            .principle-card,
            .prompt-example,
            .arch-component,
            .capability-card,
            .model-card,
            .benefit-card,
            .approach-section,
            .pattern-step,
            .practice-category,
            .takeaway-card,
            .stat-item,
            .security-item
        `);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }, 500);

    // Optimized hover effects
    function addHoverEffects() {
        const interactiveCards = document.querySelectorAll(`
            .stat-card,
            .comparison-card,
            .principle-card,
            .arch-component,
            .capability-card,
            .model-card,
            .benefit-card,
            .pattern-step,
            .practice-category,
            .takeaway-card
        `);

        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }, { passive: true });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            }, { passive: true });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Only handle if no input is focused
        if (document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        const currentActiveIndex = Array.from(navLinks).findIndex(link =>
            link.classList.contains('active')
        );

        let newIndex = currentActiveIndex;

        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                newIndex = Math.max(0, currentActiveIndex - 1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                newIndex = Math.min(navLinks.length - 1, currentActiveIndex + 1);
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = navLinks.length - 1;
                break;
            case 'Escape':
                // Hide tooltip on escape
                hideTooltip();
                break;
        }

        if (newIndex !== currentActiveIndex && navLinks[newIndex]) {
            navLinks[newIndex].click();
        }
    });

    // Presentation timer
    let presentationStartTime = Date.now();
    let timerInterval;

    function updatePresentationTimer() {
        const elapsed = Date.now() - presentationStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const timerElement = document.getElementById('presentation-timer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // Start presentation timer
    timerInterval = setInterval(updatePresentationTimer, 1000);

    // Demo status updater
    const demoStatus = document.querySelector('.demo-status');
    if (demoStatus) {
        const statusMessages = [
            '🔄 Preparing containers...',
            '🐳 Loading Docker images...',
            '⚡ Starting Erlang processes...',
            '✅ Demo environment ready!'
        ];

        let statusIndex = 0;
        const statusInterval = setInterval(() => {
            if (statusIndex < statusMessages.length - 1) {
                statusIndex++;
                demoStatus.textContent = statusMessages[statusIndex];
            } else {
                clearInterval(statusInterval);
                demoStatus.style.color = '#059669'; // success color
            }
        }, 2500);
    }

    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Only handle horizontal swipes with sufficient distance
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
            const currentActiveIndex = Array.from(navLinks).findIndex(link =>
                link.classList.contains('active')
            );

            let newIndex = currentActiveIndex;

            if (diffX > 0) {
                // Swipe left - next section
                newIndex = Math.min(navLinks.length - 1, currentActiveIndex + 1);
            } else {
                // Swipe right - previous section
                newIndex = Math.max(0, currentActiveIndex - 1);
            }

            if (newIndex !== currentActiveIndex && navLinks[newIndex]) {
                navLinks[newIndex].click();
            }
        }

        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });

    // Hide tooltip when clicking elsewhere
    document.addEventListener('click', function (e) {
        if (!citationTooltip.contains(e.target) && !e.target.hasAttribute('data-cite')) {
            hideTooltip();
        }
    }, { passive: true });

    // Hide tooltip on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (citationTooltip.classList.contains('visible')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                hideTooltip();
            }, 150);
        }
    }, { passive: true });

    // Initialize everything when page loads
    window.addEventListener('load', function () {
        // Trigger hero animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }

        // Initialize citation tooltips
        initializeCitationTooltips();

        // Add hover effects after load for better performance
        addHoverEffects();

        // Initial navigation state
        updateNavigationState();

        console.log('Agentic AI Presentation: Fully loaded and optimized');
        console.log('Citation tooltips initialized for', Object.keys(citations).length, 'citations');
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', function () {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (animationObserver) {
            animationObserver.disconnect();
        }
    });

    // Error handling for smooth scroll
    function smoothScrollFallback(target, offset = 70) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - offset;
        const distance = targetPosition - startPosition;
        const duration = 600;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Performance monitoring
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    console.log(`Page load time: ${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`);
                }
            }, 0);
        });
    }

    // Add accessibility features
    function enhanceAccessibility() {
        // Add ARIA labels to cited elements
        const citedElements = document.querySelectorAll('a[href]:has([data-cite]), [data-cite]');
        citedElements.forEach(element => {
            let citeId;

            // Check if this is a wrapper or original element
            if (element.hasAttribute('data-cite')) {
                citeId = parseInt(element.getAttribute('data-cite'));
            } else {
                // This is a wrapper, get the citation id from the child
                const citedChild = element.querySelector('[data-cite]');
                if (citedChild) {
                    citeId = parseInt(citedChild.getAttribute('data-cite'));
                }
            }

            const citation = citations[citeId];
            if (citation) {
                element.setAttribute('aria-label', `Cited content: ${citation.source}. Click to visit source.`);
                element.setAttribute('role', 'button');
                element.setAttribute('tabindex', '0');

                // Add keyboard support for citations
                element.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // Navigate to the URL
                        window.open(citation.url, '_blank', 'noopener,noreferrer');

                        // Also show tooltip
                        const mouseEvent = new MouseEvent('mouseenter', {
                            clientX: element.getBoundingClientRect().left + element.offsetWidth / 2,
                            clientY: element.getBoundingClientRect().top + element.offsetHeight / 2
                        });
                        element.dispatchEvent(mouseEvent);
                    }
                });

                element.addEventListener('blur', function () {
                    hideTooltip();
                });
            }
        });

        // Add ARIA live region for demo status updates
        const demoStatus = document.querySelector('.demo-status');
        if (demoStatus) {
            demoStatus.setAttribute('aria-live', 'polite');
            demoStatus.setAttribute('aria-atomic', 'true');
        }
    }

    // Initialize accessibility features
    setTimeout(enhanceAccessibility, 100);
});