// Fuerte Financial Technologies - Client-Side Router
// For GitHub Pages demonstration

class FuerteRouter {
    constructor() {
        this.routes = {
            // Public Site Routes
            '/': {
                title: 'Fuerte Financial Technologies - Harnessing Chaos, Engineering Alpha',
                template: 'home',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/about': {
                title: 'About Fuerte - Our Story',
                template: 'about',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/about/story': {
                title: 'The Fuerte Story',
                template: 'about-story',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/about/team': {
                title: 'Leadership & Advisors',
                template: 'about-team',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/about/careers': {
                title: 'Join Our Mission',
                template: 'about-careers',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/philosophy': {
                title: 'Investment Philosophy',
                template: 'philosophy',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/strategies': {
                title: 'Investment Strategies',
                template: 'strategies',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/strategies/ai-quant': {
                title: 'AI Quantitative Fund',
                template: 'strategy-ai-quant',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/strategies/digital-alpha': {
                title: 'Digital Asset Alpha Fund',
                template: 'strategy-digital-alpha',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/strategies/market-neutral': {
                title: 'Market Neutral Strategy',
                template: 'strategy-market-neutral',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/insights': {
                title: 'Market Insights & Research',
                template: 'insights',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/insights/research': {
                title: 'Research Papers',
                template: 'insights-research',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/insights/market-views': {
                title: 'Market Commentary',
                template: 'insights-market',
                requiresAuth: false,
                requiresCompliance: true
            },
            '/contact': {
                title: 'Contact Investor Relations',
                template: 'contact',
                requiresAuth: false,
                requiresCompliance: true
            },
            
            // Portal Routes (Protected)
            '/portal': {
                title: 'Investor Portal Login',
                template: 'portal-login',
                requiresAuth: false,
                requiresCompliance: false,
                isPortal: true
            },
            '/portal/dashboard': {
                title: 'Investor Dashboard',
                template: 'portal-dashboard',
                requiresAuth: true,
                requiresCompliance: false,
                isPortal: true
            },
            '/portal/portfolio': {
                title: 'Portfolio Overview',
                template: 'portal-portfolio',
                requiresAuth: true,
                requiresCompliance: false,
                isPortal: true
            },
            '/portal/documents': {
                title: 'Document Vault',
                template: 'portal-documents',
                requiresAuth: true,
                requiresCompliance: false,
                isPortal: true
            },
            '/portal/communications': {
                title: 'Secure Communications',
                template: 'portal-communications',
                requiresAuth: true,
                requiresCompliance: false,
                isPortal: true
            },
            
            // Legal Routes
            '/legal/disclaimer': {
                title: 'Legal Disclaimer',
                template: 'legal-disclaimer',
                requiresAuth: false,
                requiresCompliance: false
            },
            '/legal/privacy': {
                title: 'Privacy Policy',
                template: 'legal-privacy',
                requiresAuth: false,
                requiresCompliance: false
            },
            '/legal/terms': {
                title: 'Terms of Service',
                template: 'legal-terms',
                requiresAuth: false,
                requiresCompliance: false
            }
        };
        
        this.currentRoute = null;
        this.complianceAccepted = false;
        this.isAuthenticated = false;
        
        this.init();
    }
    
    init() {
        // Check for stored compliance acceptance
        this.complianceAccepted = sessionStorage.getItem('complianceAccepted') === 'true';
        
        // Listen for navigation events
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
        
        // Intercept link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigate(route);
            }
        });
    }
    
    navigate(path) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }
    
    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/'];
        
        // Check compliance requirement
        if (route.requiresCompliance && !this.complianceAccepted) {
            this.showComplianceModal();
            return;
        }
        
        // Check authentication requirement
        if (route.requiresAuth && !this.isAuthenticated) {
            this.navigate('/portal');
            return;
        }
        
        // Handle portal routes differently
        if (route.isPortal && this.currentRoute && !this.currentRoute.isPortal) {
            this.showVelvetRopeTransition(() => {
                this.loadRoute(route);
            });
        } else {
            this.loadRoute(route);
        }
    }
    
    loadRoute(route) {
        this.currentRoute = route;
        document.title = route.title;
        
        // Update navigation active states
        this.updateNavigation(route);
        
        // Load template (in real app, this would load actual content)
        console.log(`Loading template: ${route.template}`);
        
        // Simulate content loading
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = `
                <div class="container">
                    <h1 class="animate-chaos-to-order">${route.title}</h1>
                    <p class="animate-chaos-to-order delay-200">
                        This would load the ${route.template} template.
                    </p>
                </div>
            `;
        }
    }
    
    updateNavigation(route) {
        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            if (linkRoute === window.location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    showComplianceModal() {
        // Show legal disclaimer modal
        const modal = document.getElementById('legalModal');
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    acceptCompliance() {
        this.complianceAccepted = true;
        sessionStorage.setItem('complianceAccepted', 'true');
        this.handleRoute();
    }
    
    showVelvetRopeTransition(callback) {
        const overlay = document.getElementById('velvetRopeOverlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.remove('active');
                if (callback) callback();
            }, 3000);
        } else {
            if (callback) callback();
        }
    }
    
    // Authentication methods
    login(credentials) {
        // Simulate authentication
        return new Promise((resolve) => {
            setTimeout(() => {
                this.isAuthenticated = true;
                sessionStorage.setItem('isAuthenticated', 'true');
                resolve(true);
            }, 1000);
        });
    }
    
    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('isAuthenticated');
        this.navigate('/');
    }
    
    // Qualification check
    checkQualification(data) {
        // Simulate qualification verification
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    qualified: true,
                    message: 'Qualification verified'
                });
            }, 1500);
        });
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.fuerteRouter = new FuerteRouter();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FuerteRouter;
} 