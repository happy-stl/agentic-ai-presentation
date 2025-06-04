// FinAnalyst Pro Application Logic

class FinAnalystPro {
    constructor() {
        this.isAuthenticated = false;
        this.selectedAnalytics = {
            fractal: [],
            sec: [],
            operational: [],
            nonlinear: [],
            sentiment: [],
            sector: ''
        };
        this.ticker = '';
        this.sectorData = this.initializeSectorData();
        this.promptTemplate = this.initializePromptTemplate();

        this.init();
    }

    init() {
        // Reset any state
        this.resetState();
        // Bind events
        this.bindEvents();
        // Initial UI updates
        this.updatePromptPreview();
    }

    resetState() {
        // Clear all selected analytics
        this.selectedAnalytics = {
            fractal: [],
            sec: [],
            operational: [],
            nonlinear: [],
            sentiment: [],
            sector: ''
        };

        // Reset ticker
        this.ticker = '';

        // Reset any checked checkboxes in the DOM
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset the ticker input
        const tickerInput = document.getElementById('ticker');
        if (tickerInput) {
            tickerInput.value = '';
        }

        // Reset sector dropdown
        const sectorSelect = document.getElementById('sector');
        if (sectorSelect) {
            sectorSelect.value = '';
        }

        // Clear company name
        const companyNameEl = document.getElementById('company-name');
        if (companyNameEl) {
            companyNameEl.textContent = '';
            companyNameEl.className = 'company-name';
        }

        // Clear sector metrics
        const sectorMetricsEl = document.getElementById('sector-metrics');
        if (sectorMetricsEl) {
            sectorMetricsEl.innerHTML = '';
            sectorMetricsEl.classList.remove('active');
        }
    }

    initializeSectorData() {
        return {
            "Technology": [
                "R&D spend vs. patent yield decay (3-year slope <-15%)",
                "Cloud revenue concentration risk",
                "Competitive moat degradation patterns",
                "Platform dependency risks"
            ],
            "Healthcare": [
                "FDA approval pipeline risks",
                "Patent cliff exposure timeline",
                "Clinical trial failure patterns",
                "Regulatory compliance violations"
            ],
            "Financial Services": [
                "Net interest margin compression",
                "Credit loss provisioning patterns",
                "Regulatory capital adequacy",
                "Loan portfolio concentration"
            ],
            "Consumer Discretionary": [
                "Consumer confidence correlation",
                "Discretionary spending sensitivity",
                "Brand equity degradation",
                "Seasonal volatility patterns"
            ],
            "Consumer Staples": [
                "Market share erosion patterns",
                "Private label competition",
                "Commodity input cost volatility",
                "Distribution channel concentration"
            ],
            "Retail": [
                "Same-store sales vs. regional CPI (divergence >200bps)",
                "Inventory shrink patterns",
                "Store closure optimization cycles",
                "E-commerce transition risks"
            ],
            "Energy": [
                "Reserve replacement vs. capex (ratio <0.8 → 89% crisis)",
                "Commodity price sensitivity",
                "Environmental liability exposure",
                "Geopolitical risk concentration"
            ],
            "Materials": [
                "Commodity cycle positioning",
                "Environmental compliance costs",
                "End-market concentration risk",
                "Supply chain disruption exposure"
            ],
            "Industrials": [
                "Order backlog deterioration",
                "Cyclical demand patterns",
                "Labor cost inflation exposure",
                "Infrastructure spending correlation"
            ],
            "Real Estate": [
                "Interest rate sensitivity",
                "Occupancy rate trends",
                "Geographic concentration risk",
                "Development pipeline timing"
            ],
            "Utilities": [
                "Regulatory rate case outcomes",
                "Infrastructure replacement costs",
                "Renewable transition risks",
                "Credit rating stability"
            ],
            "Telecommunications": [
                "5G infrastructure costs",
                "Competitive pricing pressure",
                "Spectrum auction expenses",
                "Technology obsolescence risks"
            ]
        };
    }

    initializePromptTemplate() {
        return {
            title: "Universal Stock Decline Prediction Analysis",
            introduction: "Analyze [TICKER]'s collapse risk through comprehensive fractal and fundamental analysis:",
            sections: {
                fractalAnalysis: {
                    title: "**1. Fractal Financial Analysis**",
                    items: {
                        "hurst": "- Calculate Hurst exponents for operating cash flow (H <0.5 = mean-reverting danger)",
                        "crisis-patterns": "- Identify self-similar crisis patterns in 5-year gross margin decay rates",
                        "volatility": "- Analyze volatility clustering in inventory turnover and cash flow",
                        "cash-flow": "- Evaluate operating cash flow fractal dimension and mean reversion"
                    }
                },
                secFilings: {
                    title: "**2. SEC Filing Red Flags**",
                    items: {
                        "10k-analysis": "- 10-K/Q cash flow fractal dimension (H <0.55 → 78% crisis link)",
                        "8k-disclosures": "- 8-K material weakness disclosures (3+ in 12mo → 4.2x risk)",
                        "compensation": "- DEF 14A executive option grant timing (Q4 grants → 63% underperform)",
                        "insider-trading": "- Form 4 insider trading patterns and timeline analysis"
                    }
                },
                operationalWarnings: {
                    title: "**3. Operational Early Warnings**",
                    items: {
                        "capex": "- Maintenance vs. growth CAPEX ratio inversion",
                        "retention": "- Employee retention rates in critical functions",
                        "supply-chain": "- Supply chain concentration risk (single-source >40%)",
                        "inventory": "- Inventory turnover patterns and deterioration signals"
                    }
                },
                nonlinearRisk: {
                    title: "**4. Nonlinear Risk Exposure**",
                    items: {
                        "stress-testing": "- Stress test against 10x historical worst-case scenarios",
                        "tail-risk": "- Quantify unhedged tail risks in market exposure",
                        "currency": "- Foreign exchange exposure risks and hedging evaluation",
                        "commodity": "- Commodity dependency analysis and price shock modeling"
                    }
                },
                marketSentiment: {
                    title: "**5. Market Sentiment Triangulation**",
                    items: {
                        "news": "- News sentiment analysis for supplier payment delays",
                        "short-interest": "- Short interest vs. 3-month average (+25% divergence)",
                        "analyst": "- Analyst coverage patterns and ratings distribution",
                        "social": "- Social media sentiment trend analysis and volatility"
                    }
                },
                sectorSpecific: `**6. Sector-Specific Fractals**
[SECTOR_METRICS]`,
                dataSources: `**Required Data:**
- Latest 10-K/Q (Items 1A, 7, 7A)
- 5 years of earnings call transcripts
- EDGAR Form 4 filings (insider trades)
- Bloomberg sector comps + VIX term structure`,
                outputFormat: `**Analysis Output Format:**
1. Fractal Risk Score: [0-10]
2. Key Decline Catalysts:
   - Catalyst 1 (Probability: X%)
   - Catalyst 2 (Probability: Y%)
3. Comparative Resilience: vs. [PEER 1], [PEER 2]
4. Time Horizon Estimate: [3/6/12 mo]`
            }
        };
    }

    bindEvents() {
        // Ticker input
        const tickerInput = document.getElementById('ticker');
        if (tickerInput) {
            tickerInput.addEventListener('input', (e) => {
                this.ticker = e.target.value.toUpperCase();
                e.target.value = this.ticker;
                this.updateCompanyName();
                this.updatePromptPreview();
            });
        }

        // Checkboxes - IMPORTANT FIX HERE
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            // Clear any existing event listeners
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);

            // Add our event listener
            newCheckbox.addEventListener('change', (e) => {
                this.handleCheckboxChange(e);
            });
        });

        // Sector dropdown
        const sectorSelect = document.getElementById('sector');
        if (sectorSelect) {
            sectorSelect.addEventListener('change', (e) => {
                this.selectedAnalytics.sector = e.target.value;
                this.updateSectorMetrics();
                this.updatePromptPreview();
            });
        }

        // Action buttons
        const copyBtn = document.getElementById('copy-prompt');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyPromptToClipboard();
            });
        }

        const saveBtn = document.getElementById('save-prompt');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.savePrompt();
            });
        }
    }

    authenticateUser(provider) {
        console.log(`Authenticating with ${provider}`);

        const loadingOverlay = document.getElementById('loading-overlay');
        const authPage = document.getElementById('auth-page');
        const mainApp = document.getElementById('main-app');

        if (!loadingOverlay || !authPage || !mainApp) {
            console.error('Required DOM elements not found');
            return;
        }

        // Show loading overlay
        loadingOverlay.classList.remove('hidden');

        // Simulate authentication delay
        setTimeout(() => {
            try {
                this.isAuthenticated = true;

                // Hide loading overlay
                loadingOverlay.classList.add('hidden');

                // Hide auth page and show main app
                authPage.classList.add('hidden');
                mainApp.classList.remove('hidden');

                // Show success notification
                this.showNotification(`Successfully authenticated with ${provider}!`);

                console.log('Authentication successful');
            } catch (error) {
                console.error('Authentication error:', error);
                loadingOverlay.classList.add('hidden');
                this.showNotification('Authentication failed. Please try again.');
            }
        }, 1500);
    }

    handleCheckboxChange(event) {
        try {
            const category = event.target.dataset.category;
            const value = event.target.value;

            console.log(`Checkbox change detected: category=${category}, value=${value}, checked=${event.target.checked}`);

            if (!category || !this.selectedAnalytics[category]) {
                console.warn(`Invalid category: ${category}`);
                return;
            }

            // Clean approach - recreate the array each time
            if (event.target.checked) {
                // Add this value if not already present
                if (!this.selectedAnalytics[category].includes(value)) {
                    this.selectedAnalytics[category].push(value);
                }
            } else {
                // Remove this value
                this.selectedAnalytics[category] = this.selectedAnalytics[category].filter(item => item !== value);
            }

            // Log the current state after change
            console.log(`Updated ${category} selections:`, this.selectedAnalytics[category]);

            // Update the prompt preview
            this.updatePromptPreview();
        } catch (error) {
            console.error("Error in handleCheckboxChange:", error);
        }
    }

    updateCompanyName() {
        const companyNameEl = document.getElementById('company-name');
        if (!companyNameEl) return;

        // Simulate company name lookup
        const companyNames = {
            'AAPL': 'Apple Inc.',
            'TSLA': 'Tesla, Inc.',
            'NVDA': 'NVIDIA Corporation',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc.',
            'AMZN': 'Amazon.com, Inc.',
            'META': 'Meta Platforms, Inc.',
            'NFLX': 'Netflix, Inc.',
            'JPM': 'JPMorgan Chase & Co.',
            'JNJ': 'Johnson & Johnson',
            'V': 'Visa Inc.',
            'PG': 'The Procter & Gamble Company',
            'UNH': 'UnitedHealth Group Incorporated',
            'HD': 'The Home Depot, Inc.',
            'MA': 'Mastercard Incorporated'
        };

        // Clear existing classes
        companyNameEl.className = 'company-name';

        if (this.ticker && companyNames[this.ticker]) {
            companyNameEl.textContent = companyNames[this.ticker];
            companyNameEl.classList.add('risk-indicator', 'risk-indicator--low');
        } else if (this.ticker) {
            companyNameEl.textContent = 'Company name not found';
        } else {
            companyNameEl.textContent = '';
        }
    }

    updateSectorMetrics() {
        const sectorMetricsEl = document.getElementById('sector-metrics');
        if (!sectorMetricsEl) return;

        const selectedSector = this.selectedAnalytics.sector;

        if (selectedSector && this.sectorData[selectedSector]) {
            const metrics = this.sectorData[selectedSector];
            sectorMetricsEl.innerHTML = `
                <h5>Sector-Specific Risk Metrics:</h5>
                <ul>
                    ${metrics.map(metric => `<li>${metric}</li>`).join('')}
                </ul>
            `;
            sectorMetricsEl.classList.add('active');
        } else {
            sectorMetricsEl.classList.remove('active');
            sectorMetricsEl.innerHTML = '';
        }
    }

    generatePrompt() {
        try {
            // Start with the intro
            const ticker = this.ticker || '[TICKER]';
            let prompt = `# ${this.promptTemplate.title}\n\n`;
            prompt += `${this.promptTemplate.introduction.replace('[TICKER]', ticker)}\n\n`;

            // This function will process one category
            const processCategory = (category, templateKey) => {
                // Get template section
                const section = this.promptTemplate.sections[templateKey];
                if (!section || !section.items) return "";

                // Skip if no checkboxes are selected
                const selected = this.selectedAnalytics[category] || [];
                if (selected.length === 0) return "";

                // Start with the section title
                let sectionText = section.title + '\n';

                // For each selected checkbox
                selected.forEach(checkboxValue => {
                    // Make sure we have text for this checkbox
                    if (section.items[checkboxValue]) {
                        // Add the item text
                        sectionText += section.items[checkboxValue] + '\n';
                    }
                });

                // Return the section with a blank line at the end
                return sectionText + '\n';
            };

            // Process each category
            prompt += processCategory('fractal', 'fractalAnalysis');
            prompt += processCategory('sec', 'secFilings');
            prompt += processCategory('operational', 'operationalWarnings');
            prompt += processCategory('nonlinear', 'nonlinearRisk');
            prompt += processCategory('sentiment', 'marketSentiment');

            // Sector-specific section
            if (this.selectedAnalytics.sector && this.sectorData[this.selectedAnalytics.sector]) {
                const selectedSector = this.selectedAnalytics.sector;
                const sectorMetrics = this.sectorData[selectedSector]
                    .map(metric => `- ${metric}`)
                    .join('\n');

                let sectorSection = this.promptTemplate.sections.sectorSpecific
                    .replace('[SECTOR_METRICS]', sectorMetrics);

                // Add the sector name as the first item in the list
                const sectorNameLine = `- **${selectedSector} Sector Analysis**`;
                sectorSection = sectorSection.replace('**6. Sector-Specific Fractals**\n', `**6. Sector-Specific Fractals**\n${sectorNameLine}\n`);

                prompt += sectorSection + '\n\n';
            }

            // Always include data sources and output format
            prompt += this.promptTemplate.sections.dataSources + '\n\n';
            prompt += this.promptTemplate.sections.outputFormat;

            return prompt;
        } catch (error) {
            console.error("Error in generatePrompt:", error);
            return "Error generating prompt. Please check console for details.";
        }
    }

    hasSelectedAnalytics(category) {
        return this.selectedAnalytics[category] && this.selectedAnalytics[category].length > 0;
    }

    updatePromptPreview() {
        const promptContentEl = document.getElementById('prompt-content');
        if (!promptContentEl) return;

        // Check if any analytics are selected or ticker is entered
        const hasSelections = Object.values(this.selectedAnalytics).some(value =>
            Array.isArray(value) ? value.length > 0 : value !== ''
        ) || this.ticker;

        if (hasSelections) {
            try {
                // Debug information
                console.log("Selected analytics before generating prompt:", JSON.stringify(this.selectedAnalytics, null, 2));

                const generatedPrompt = this.generatePrompt();
                promptContentEl.textContent = generatedPrompt;
                promptContentEl.className = 'prompt-content';

                // Show what was actually generated
                console.log("Generated prompt:", generatedPrompt);
            } catch (error) {
                console.error("Error generating prompt:", error);
                promptContentEl.textContent = "Error generating prompt. See console for details.";
            }
        } else {
            promptContentEl.innerHTML = '<p class="placeholder-text">Select analysis parameters to generate your custom prompt...</p>';
        }
    }

    async copyPromptToClipboard() {
        const prompt = this.generatePrompt();

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(prompt);
                this.showNotification('Prompt copied to clipboard!');
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = prompt;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand('copy');
                    this.showNotification('Prompt copied to clipboard!');
                } catch (err) {
                    console.error('Copy failed:', err);
                    this.showNotification('Failed to copy prompt. Please try again.');
                }

                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Copy to clipboard failed:', err);
            this.showNotification('Failed to copy prompt. Please try again.');
        }
    }

    savePrompt() {
        const prompt = this.generatePrompt();
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:\-]/g, '');
        const filename = `finanalyst-prompt-${this.ticker || 'analysis'}-${timestamp}.md`;

        try {
            const blob = new Blob([prompt], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showNotification('Prompt saved successfully!');
        } catch (error) {
            console.error('Save failed:', error);
            this.showNotification('Failed to save prompt. Please try again.');
        }
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');

        if (!notification || !notificationText) {
            console.warn('Notification elements not found');
            return;
        }

        notificationText.textContent = message;
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }
}

// Global function for authentication buttons
function authenticateUser(provider) {
    if (window.finAnalystPro) {
        window.finAnalystPro.authenticateUser(provider);
    } else {
        console.error('FinAnalyst Pro instance not found');
    }
}

// Risk Assessment Utilities
class RiskAssessment {
    static calculateRiskScore(selectedAnalytics) {
        const weights = {
            fractal: 0.25,
            sec: 0.20,
            operational: 0.20,
            nonlinear: 0.15,
            sentiment: 0.10,
            sector: 0.10
        };

        let score = 0;
        Object.keys(weights).forEach(category => {
            const selections = selectedAnalytics[category];
            if (Array.isArray(selections)) {
                score += (selections.length / 4) * weights[category] * 10;
            } else if (selections) {
                score += weights[category] * 10;
            }
        });

        return Math.min(score, 10);
    }

    static getRiskLevel(score) {
        if (score >= 7) return 'high';
        if (score >= 4) return 'medium';
        return 'low';
    }

    static getRiskColor(level) {
        const colors = {
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#10b981'
        };
        return colors[level] || colors.low;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.finAnalystPro = new FinAnalystPro();

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only add shortcuts if we're in the main app
            if (window.finAnalystPro && window.finAnalystPro.isAuthenticated) {
                // Ctrl/Cmd + Enter to copy prompt
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    window.finAnalystPro.copyPromptToClipboard();
                }

                // Ctrl/Cmd + S to save prompt
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    window.finAnalystPro.savePrompt();
                }
            }
        });

        // Prevent form submission on enter in ticker input
        const tickerInput = document.getElementById('ticker');
        if (tickerInput) {
            tickerInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        }

        console.log('FinAnalyst Pro initialized successfully');
    } catch (error) {
        console.error('Failed to initialize FinAnalyst Pro:', error);
    }
});