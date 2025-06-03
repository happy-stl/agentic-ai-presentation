// Citation data from the application
const citations = {
  1: {
    id: 1,
    source: "Anthropic Claude 3.7 Announcement",
    date: "February 24, 2025",
    url: "https://www.anthropic.com/news/claude-3-7-sonnet",
    preview: "Official announcement of Claude 3.7 Sonnet, the first hybrid reasoning model. Details dual-mode operation, extended thinking capabilities, and Claude Code integration for autonomous development workflows.",
    type: "company_announcement"
  },
  2: {
    id: 2,
    source: "Anthropic Claude 4 Release",
    date: "May 22, 2025", 
    url: "https://www.anthropic.com/news/claude-4-opus-sonnet",
    preview: "Claude 4 Opus and Sonnet release details. Includes SWE-bench performance metrics, 7-hour autonomous operation capabilities, and ASL-3 safety classification implementation.",
    type: "company_announcement"
  },
  3: {
    id: 3,
    source: "SWE-bench Verified Results",
    date: "2025",
    url: "https://www.swebench.com/leaderboard",
    preview: "Comprehensive benchmark results for AI coding models. Contains standardized software engineering problem-solving metrics, comparison charts, and methodology documentation.",
    type: "benchmark_data"
  },
  4: {
    id: 4,
    source: "GitHub 2025 Developer Survey",
    date: "2025",
    url: "https://survey.stackoverflow.co/2025/",
    preview: "Annual developer survey results showing AI adoption trends. Includes usage statistics, productivity metrics, and developer satisfaction data with AI-powered tools.",
    type: "survey_data"
  },
  5: {
    id: 5,
    source: "Model Context Protocol Documentation",
    date: "2024-2025",
    url: "https://spec.modelcontextprotocol.io/",
    preview: "Official MCP specification and implementation guide. Contains technical architecture details, security considerations, and integration examples for AI development environments.",
    type: "technical_specification"
  },
  6: {
    id: 6,
    source: "Perplexity Research Session",
    date: "Current Session",
    url: "https://www.perplexity.ai/search/review-the-previous-conversati-K83P3EuAT9CJI_IxmE_bfw",
    preview: "Complete research methodology and source verification for this presentation. Includes fact-checking processes, cross-referencing strategies, and detailed analysis of AI model capabilities.",
    type: "research_session"
  }
};

// Citation tooltip system
class CitationTooltip {
  constructor() {
    this.tooltip = document.getElementById('citation-tooltip');
    this.currentCitation = null;
    this.isVisible = false;
    this.hoverTimeout = null;
    this.hideTimeout = null;
    this.boundHandlers = {};
    
    this.init();
  }
  
  init() {
    // Bind handlers with proper context
    this.boundHandlers.showTooltip = this.showTooltip.bind(this);
    this.boundHandlers.hideTooltip = this.hideTooltip.bind(this);
    this.boundHandlers.handleClick = this.handleClick.bind(this);
    this.boundHandlers.handleKeydown = this.handleKeydown.bind(this);
    this.boundHandlers.handleTooltipMouseEnter = this.handleTooltipMouseEnter.bind(this);
    this.boundHandlers.handleTooltipMouseLeave = this.handleTooltipMouseLeave.bind(this);
    
    // Setup citation event listeners
    this.setupCitationListeners();
    
    // Tooltip hover handlers to keep it visible
    this.tooltip.addEventListener('mouseenter', this.boundHandlers.handleTooltipMouseEnter);
    this.tooltip.addEventListener('mouseleave', this.boundHandlers.handleTooltipMouseLeave);
    
    // Handle window resize for repositioning
    window.addEventListener('resize', this.throttle(() => {
      if (this.isVisible && this.currentCitation) {
        this.positionTooltip(this.currentCitation.element);
      }
    }, 100));
    
    // Handle scroll for repositioning
    window.addEventListener('scroll', this.throttle(() => {
      if (this.isVisible && this.currentCitation) {
        this.positionTooltip(this.currentCitation.element);
      }
    }, 50), { passive: true });
  }
  
  setupCitationListeners() {
    const citationElements = document.querySelectorAll('.cited-text');
    
    citationElements.forEach(element => {
      const citationId = element.getAttribute('data-citation');
      if (!citationId || !citations[citationId]) return;
      
      // Mouse events
      element.addEventListener('mouseenter', (e) => {
        this.clearTimeouts();
        this.hoverTimeout = setTimeout(() => {
          this.boundHandlers.showTooltip(e, citationId);
        }, 150); // Small delay to prevent rapid flickering
      });
      
      element.addEventListener('mouseleave', () => {
        this.clearTimeouts();
        this.hideTimeout = setTimeout(() => {
          this.boundHandlers.hideTooltip();
        }, 300); // Longer delay to allow moving to tooltip
      });
      
      // Click events
      element.addEventListener('click', (e) => {
        this.boundHandlers.handleClick(e, citationId);
      });
      
      // Keyboard events for accessibility
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
      element.setAttribute('aria-describedby', 'citation-tooltip');
      element.addEventListener('keydown', (e) => {
        this.boundHandlers.handleKeydown(e, citationId);
      });
      
      // Touch events for mobile
      element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.boundHandlers.showTooltip(e, citationId);
      }, { passive: false });
    });
  }
  
  showTooltip(event, citationId) {
    const citation = citations[citationId];
    if (!citation) return;
    
    const element = event.currentTarget;
    
    // Update tooltip content
    this.updateTooltipContent(citation);
    
    // Position tooltip
    this.positionTooltip(element);
    
    // Show tooltip with animation
    this.tooltip.classList.add('visible');
    this.tooltip.setAttribute('aria-hidden', 'false');
    
    this.isVisible = true;
    this.currentCitation = { citation, element };
    
    // Analytics/logging for presentation mode
    console.log(`📖 Citation ${citationId} viewed: ${citation.source}`);
  }
  
  hideTooltip() {
    if (!this.isVisible) return;
    
    this.tooltip.classList.remove('visible');
    this.tooltip.setAttribute('aria-hidden', 'true');
    
    // Reset position classes
    this.tooltip.classList.remove('position-top', 'position-bottom', 'position-left', 'position-right');
    
    this.isVisible = false;
    this.currentCitation = null;
  }
  
  handleClick(event, citationId) {
    const citation = citations[citationId];
    if (!citation || !citation.url) return;
    
    event.preventDefault();
    
    // Open in new window with appropriate features
    const windowFeatures = 'width=1024,height=768,scrollbars=yes,resizable=yes,status=yes,location=yes';
    window.open(citation.url, '_blank', windowFeatures);
    
    // Log click for analytics
    console.log(`🔗 Citation ${citationId} opened: ${citation.source}`);
    
    // Brief visual feedback
    event.currentTarget.style.background = 'rgba(33, 128, 141, 0.2)';
    setTimeout(() => {
      event.currentTarget.style.background = '';
    }, 200);
  }
  
  handleKeydown(event, citationId) {
    switch(event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleClick(event, citationId);
        break;
      case 'Escape':
        this.hideTooltip();
        event.currentTarget.blur();
        break;
    }
  }
  
  handleTooltipMouseEnter() {
    this.clearTimeouts();
  }
  
  handleTooltipMouseLeave() {
    this.hideTimeout = setTimeout(() => {
      this.boundHandlers.hideTooltip();
    }, 300);
  }
  
  updateTooltipContent(citation) {
    const titleElement = this.tooltip.querySelector('.tooltip-title');
    const dateElement = this.tooltip.querySelector('.tooltip-date');
    const previewElement = this.tooltip.querySelector('.tooltip-preview');
    
    if (titleElement) titleElement.textContent = citation.source;
    if (dateElement) dateElement.textContent = citation.date;
    if (previewElement) previewElement.textContent = citation.preview;
  }
  
  positionTooltip(targetElement) {
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    
    // Reset all position classes
    this.tooltip.classList.remove('position-top', 'position-bottom', 'position-left', 'position-right');
    
    // Calculate preferred position (bottom by default)
    let position = 'bottom';
    let left = targetRect.left + scrollLeft + (targetRect.width / 2) - (this.tooltip.offsetWidth / 2);
    let top = targetRect.bottom + scrollTop + 12;
    
    // Check if tooltip would go off-screen and adjust position
    
    // Horizontal bounds checking
    if (left < 8) {
      left = 8;
    } else if (left + this.tooltip.offsetWidth > viewportWidth - 8) {
      left = viewportWidth - this.tooltip.offsetWidth - 8;
    }
    
    // Vertical position logic with smart positioning
    const spaceBelow = viewportHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    const tooltipHeight = this.tooltip.offsetHeight || 200; // Fallback height
    
    if (spaceBelow < tooltipHeight + 20 && spaceAbove > tooltipHeight + 20) {
      // Not enough space below, but enough above
      position = 'top';
      top = targetRect.top + scrollTop - tooltipHeight - 12;
    } else if (spaceBelow < tooltipHeight + 20 && spaceAbove < tooltipHeight + 20) {
      // Not enough space above or below, try left/right
      const spaceLeft = targetRect.left;
      const spaceRight = viewportWidth - targetRect.right;
      
      if (spaceRight > this.tooltip.offsetWidth + 20) {
        position = 'right';
        left = targetRect.right + scrollLeft + 12;
        top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipHeight / 2);
      } else if (spaceLeft > this.tooltip.offsetWidth + 20) {
        position = 'left';
        left = targetRect.left + scrollLeft - this.tooltip.offsetWidth - 12;
        top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipHeight / 2);
      }
      // If neither left nor right work, stick with bottom and let it overflow
    }
    
    // Final bounds checking
    if (top < scrollTop + 8) {
      top = scrollTop + 8;
    }
    
    // Apply position
    this.tooltip.style.left = Math.round(left) + 'px';
    this.tooltip.style.top = Math.round(top) + 'px';
    this.tooltip.classList.add(`position-${position}`);
  }
  
  clearTimeouts() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  
  // Utility function for throttling
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize citation tooltips
    const citationTooltip = new CitationTooltip();
    
    // Navigation functionality
    const navigation = document.getElementById('navigation');
    const progressFill = document.getElementById('progressFill');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    
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
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    const animationObserver = new IntersectionObserver(function(entries) {
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
            .model-detail-card,
            .benefit-card,
            .approach-section,
            .pattern-step,
            .process-step,
            .takeaway-card,
            .stat-item,
            .security-item,
            .timeline-item,
            .validation-item,
            .challenge-item,
            .citation-item
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
            .model-detail-card,
            .benefit-card,
            .pattern-step,
            .process-step,
            .takeaway-card,
            .validation-item,
            .challenge-item
        `);
        
        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }, { passive: true });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Only handle if no input is focused and no citation tooltip is active
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA' ||
            document.activeElement.classList.contains('cited-text')) {
            return;
        }
        
        const currentActiveIndex = Array.from(navLinks).findIndex(link => 
            link.classList.contains('active')
        );
        
        let newIndex = currentActiveIndex;
        
        switch(e.key) {
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
            
            // Update color based on time
            if (minutes >= 40) {
                timerElement.style.background = 'rgba(255, 84, 89, 0.2)';
                timerElement.style.color = '#FF5459';
            } else if (minutes >= 35) {
                timerElement.style.background = 'rgba(230, 129, 97, 0.2)';
                timerElement.style.color = '#E68161';
            }
        }
    }
    
    // Start presentation timer
    timerInterval = setInterval(updatePresentationTimer, 1000);
    
    // Demo status updater with more realistic progression
    const demoStatus = document.querySelector('.demo-status');
    if (demoStatus) {
        const statusMessages = [
            '🔄 Preparing containers...',
            '🐳 Loading Docker images...',
            '📦 Installing dependencies...',
            '⚡ Starting Erlang processes...',
            '🔧 Configuring MCP servers...',
            '🤖 Initializing Claude 4.0 integration...',
            '✅ Demo environment ready!'
        ];
        
        let statusIndex = 0;
        const statusInterval = setInterval(() => {
            if (statusIndex < statusMessages.length - 1) {
                statusIndex++;
                demoStatus.textContent = statusMessages[statusIndex];
                
                // Add visual feedback for progress
                if (statusIndex === statusMessages.length - 1) {
                    demoStatus.style.color = '#21808D'; // success color
                    demoStatus.style.fontWeight = '600';
                }
            } else {
                clearInterval(statusInterval);
            }
        }, 3000); // Slower progression for realism
    }
    
    // Touch gesture support for mobile presentation navigation
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        // Don't interfere with citation interactions
        if (e.target.closest('.cited-text') || e.target.closest('.citation-tooltip')) {
            return;
        }
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        // Don't interfere with citation interactions
        if (e.target.closest('.cited-text') || e.target.closest('.citation-tooltip')) {
            return;
        }
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes with sufficient distance
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
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
    
    // Enhanced chart interaction for the performance chart
    const performanceChart = document.querySelector('.performance-chart');
    if (performanceChart) {
        let chartTooltip = null;
        
        // Create tooltip element
        function createChartTooltip() {
            if (!chartTooltip) {
                chartTooltip = document.createElement('div');
                chartTooltip.style.cssText = `
                    position: absolute;
                    background: var(--color-surface);
                    border: 1px solid var(--color-card-border);
                    border-radius: var(--radius-base);
                    padding: var(--space-12);
                    font-size: var(--font-size-sm);
                    color: var(--color-text);
                    pointer-events: none;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity var(--duration-fast) ease;
                    box-shadow: var(--shadow-md);
                `;
                document.body.appendChild(chartTooltip);
            }
            return chartTooltip;
        }
        
        performanceChart.addEventListener('mouseenter', function() {
            const tooltip = createChartTooltip();
            tooltip.innerHTML = `
                <strong>Claude Model Evolution</strong><br>
                <small>Click to view detailed analysis</small>
            `;
            tooltip.style.opacity = '1';
        });
        
        performanceChart.addEventListener('mousemove', function(e) {
            if (chartTooltip) {
                chartTooltip.style.left = (e.pageX + 10) + 'px';
                chartTooltip.style.top = (e.pageY - 10) + 'px';
            }
        });
        
        performanceChart.addEventListener('mouseleave', function() {
            if (chartTooltip) {
                chartTooltip.style.opacity = '0';
            }
        });
        
        performanceChart.addEventListener('click', function() {
            // Scroll to detailed analysis section
            const claudeSection = document.getElementById('claude-evolution');
            if (claudeSection) {
                claudeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Performance metrics animation
    function animateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value, .stat-number');
        
        const animateNumber = (element, finalValue) => {
            const duration = 2000;
            const startTime = performance.now();
            const isPercentage = finalValue.includes('%');
            const numericValue = parseFloat(finalValue.replace('%', ''));
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.round(numericValue * easeOutCubic);
                
                element.textContent = currentValue + (isPercentage ? '%' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        };
        
        // Intersection observer for metric animation
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.dataset.value || element.textContent;
                    element.dataset.value = finalValue;
                    
                    // Start from 0
                    element.textContent = '0';
                    setTimeout(() => animateNumber(element, finalValue), 300);
                    
                    metricsObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        metricValues.forEach(metric => {
            metricsObserver.observe(metric);
        });
    }
    
    // Initialize everything when page loads
    window.addEventListener('load', function() {
        // Trigger hero animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
        
        // Add interactive effects after load for better performance
        addHoverEffects();
        animateMetrics();
        
        // Initial navigation state
        updateNavigationState();
        
        // Log successful initialization
        console.log('🚀 Agentic AI Presentation: Fully loaded and optimized');
        console.log('📊 Claude 3.7/4.0 data integrated successfully');
        console.log('🔗 Citations and research validation ready');
        console.log('💡 Interactive citation system active');
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (animationObserver) {
            animationObserver.disconnect();
        }
        if (citationTooltip) {
            citationTooltip.clearTimeouts();
        }
    });
    
    // Error handling for smooth scroll fallback
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
    
    // Performance monitoring and optimization
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                    console.log(`📈 Page load time: ${loadTime}ms`);
                    
                    // Log performance metrics for optimization
                    if (loadTime > 3000) {
                        console.warn('⚠️ Slow load time detected. Consider optimizing images or reducing animations.');
                    } else {
                        console.log('✅ Good performance: Load time under 3 seconds');
                    }
                }
            }, 0);
        });
    }
    
    // Add support for presentation mode shortcuts
    document.addEventListener('keydown', function(e) {
        // Don't interfere with citation interactions
        if (document.activeElement.classList.contains('cited-text')) {
            return;
        }
        
        // Presentation mode shortcuts
        switch(e.key) {
            case 'F5':
                e.preventDefault();
                // Reset timer
                presentationStartTime = Date.now();
                updatePresentationTimer();
                console.log('🔄 Presentation timer reset');
                break;
            case 'Escape':
                // Quick navigation to conclusion for Q&A
                const conclusionLink = document.querySelector('a[href="#conclusion"]');
                if (conclusionLink && e.ctrlKey) {
                    e.preventDefault();
                    conclusionLink.click();
                }
                break;
            case 'c':
                // Toggle citation highlights (presentation mode)
                if (e.ctrlKey && e.altKey) {
                    e.preventDefault();
                    const citedTexts = document.querySelectorAll('.cited-text');
                    citedTexts.forEach(text => {
                        text.style.background = text.style.background ? '' : 'rgba(33, 128, 141, 0.15)';
                    });
                    console.log('🔖 Citation highlights toggled');
                }
                break;
        }
    });
    
    // Citation analytics for presentation insights
    const citationAnalytics = {
        views: {},
        clicks: {},
        
        logView(citationId) {
            this.views[citationId] = (this.views[citationId] || 0) + 1;
        },
        
        logClick(citationId) {
            this.clicks[citationId] = (this.clicks[citationId] || 0) + 1;
        },
        
        getReport() {
            console.log('📊 Citation Analytics Report:');
            console.log('Views:', this.views);
            console.log('Clicks:', this.clicks);
            
            const totalViews = Object.values(this.views).reduce((a, b) => a + b, 0);
            const totalClicks = Object.values(this.clicks).reduce((a, b) => a + b, 0);
            const ctr = totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(1) : 0;
            
            console.log(`Total engagement: ${totalViews} views, ${totalClicks} clicks (${ctr}% CTR)`);
            
            return { views: this.views, clicks: this.clicks, totalViews, totalClicks, ctr };
        }
    };
    
    // Make analytics available globally for presentation insights
    window.citationAnalytics = citationAnalytics;
    
    // Generate report on Ctrl+Shift+R
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            citationAnalytics.getReport();
        }
    });
});