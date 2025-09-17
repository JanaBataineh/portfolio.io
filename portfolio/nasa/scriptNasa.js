     // Global variables
        let currentScreen = 'splash';
        let onboardingStep = 0;
        let analysisProgress = 0;
        let analysisInterval;

        // Screen navigation
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
            currentScreen = screenId;
        }

        function navigateToOnboarding() {
            showScreen('onboarding-screen');
            initOnboarding();
        }

        function navigateToLogin() {
            showScreen('login-screen');
            createLoginStars();
        }

        function navigateToHome() {
            showScreen('home-screen');
            populateRecentDiscoveries();
        }

        function navigateToAnalysis() {
            showScreen('analysis-screen');
        }

        function navigateToResults() {
            showScreen('results-screen');
            populateDiscoveredPlanets();
        }

        // Initialize splash screen
        function initSplash() {
            createStars('stars-container', 50);
            setTimeout(() => {
                navigateToOnboarding();
            }, 3000);
        }

        // Create animated stars
        function createStars(containerId, count) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = 'floating-stars';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(star);
            }
        }

        function createLoginStars() {
            createStars('login-stars', 30);
        }

        // Onboarding functionality
        const onboardingData = [
            {
                icon: 'fas fa-telescope',
                title: 'اكتشف الكواكب خارج نظامنا الشمسي',
                description: 'استكشف عوالم جديدة وكواكب بعيدة باستخدام أحدث التقنيات',
                color: 'from-blue-500 to-purple-500'
            },
            {
                icon: 'fas fa-brain',
                title: 'حلل البيانات باستخدام الذكاء الاصطناعي',
                description: 'خوارزميات متقدمة لتحليل البيانات الفلكية وتحديد الكواكب المحتملة',
                color: 'from-purple-500 to-pink-500'
            },
            {
                icon: 'fas fa-share-alt',
                title: 'شارك اكتشافاتك مع العالم',
                description: 'احفظ النتائج وشاركها مع مجتمع الباحثين والمهتمين بعلم الفلك',
                color: 'from-cyan-500 to-blue-500'
            }
        ];

        function initOnboarding() {
            updateOnboardingContent();
            updateOnboardingButtons();
        }

        function updateOnboardingContent() {
            const data = onboardingData[onboardingStep];
            const content = document.getElementById('onboarding-content');
            
            content.innerHTML = `
                <div class="scale-in">
                    <div class="w-24 h-24 mx-auto mb-8 bg-gradient-to-r ${data.color} rounded-full flex items-center justify-center">
                        <i class="${data.icon} text-white text-3xl"></i>
                    </div>
                    <h2 class="text-2xl mb-4 text-white">${data.title}</h2>
                    <p class="text-gray-300 leading-relaxed mb-12">${data.description}</p>
                </div>
            `;

            // Update progress dots
            document.querySelectorAll('.progress-dot').forEach((dot, index) => {
                if (index === onboardingStep) {
                    dot.classList.remove('bg-gray-600');
                    dot.classList.add('bg-purple-400');
                } else {
                    dot.classList.remove('bg-purple-400');
                    dot.classList.add('bg-gray-600');
                }
            });
        }

        function updateOnboardingButtons() {
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            prevBtn.disabled = onboardingStep === 0;
            nextBtn.textContent = onboardingStep === onboardingData.length - 1 ? 'ابدأ الآن' : 'التالي';
        }

        // Onboarding navigation
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (onboardingStep > 0) {
                onboardingStep--;
                updateOnboardingContent();
                updateOnboardingButtons();
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (onboardingStep < onboardingData.length - 1) {
                onboardingStep++;
                updateOnboardingContent();
                updateOnboardingButtons();
            } else {
                navigateToLogin();
            }
        });

        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            navigateToHome();
        });

        // Recent discoveries data
        const recentDiscoveries = [
            {
                name: 'Kepler-452b',
                distance: '1,400 سنة ضوئية',
                habitability: 85,
                date: 'قبل يومين'
            },
            {
                name: 'TRAPPIST-1e',
                distance: '40 سنة ضوئية',
                habitability: 78,
                date: 'قبل أسبوع'
            },
            {
                name: 'Proxima Centauri b',
                distance: '4.2 سنة ضوئية',
                habitability: 92,
                date: 'قبل شهر'
            }
        ];

        function populateRecentDiscoveries() {
            const container = document.getElementById('recent-discoveries');
            container.innerHTML = '';

            recentDiscoveries.forEach((planet, index) => {
                const planetCard = document.createElement('div');
                planetCard.className = 'card cursor-pointer slide-in-left';
                planetCard.style.animationDelay = `${index * 0.1}s`;
                
                const habitabilityClass = planet.habitability > 85 ? 'badge-success' : 
                                        planet.habitability > 70 ? 'badge-warning' : 'badge-error';

                planetCard.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-globe text-white"></i>
                            </div>
                            <div>
                                <h4 class="text-white">${planet.name}</h4>
                                <p class="text-gray-400 text-sm">${planet.distance}</p>
                            </div>
                        </div>
                        <div class="text-left">
                            <span class="badge ${habitabilityClass}">
                                صالح للحياة: ${planet.habitability}%
                            </span>
                            <p class="text-gray-500 text-xs mt-1 flex items-center">
                                <i class="fas fa-clock text-xs mr-1"></i>
                                ${planet.date}
                            </p>
                        </div>
                    </div>
                `;

                container.appendChild(planetCard);
            });
        }

        // Dataset and algorithm data
        const datasets = {
            kepler: {
                name: 'Kepler Mission Data',
                description: 'بيانات مهمة كبلر - 4,000+ كوكب مكتشف',
                size: '2.3 GB',
                planets: 4000
            },
            tess: {
                name: 'TESS Survey Data',
                description: 'بيانات مسح TESS - أحدث الاكتشافات',
                size: '1.8 GB',
                planets: 2500
            },
            trappist: {
                name: 'TRAPPIST-1 System',
                description: 'نظام TRAPPIST-1 الكامل',
                size: '450 MB',
                planets: 7
            }
        };

        const algorithms = {
            'neural-network': {
                name: 'الشبكة العصبية',
                description: 'دقة عالية للكشف عن الكواكب المعقدة',
                accuracy: 94,
                speed: 'متوسط'
            },
            'random-forest': {
                name: 'Random Forest',
                description: 'متوازن بين الدقة والسرعة',
                accuracy: 89,
                speed: 'سريع'
            },
            'svm': {
                name: 'Support Vector Machine',
                description: 'ممتاز للبيانات الصغيرة والمتوسطة',
                accuracy: 87,
                speed: 'سريع جداً'
            }
        };

        // Dataset selection
        document.getElementById('dataset-select').addEventListener('change', (e) => {
            const dataset = datasets[e.target.value];
            const infoDiv = document.getElementById('dataset-info');
            
            if (dataset) {
                document.getElementById('dataset-name').textContent = dataset.name;
                document.getElementById('dataset-description').textContent = dataset.description;
                document.getElementById('dataset-size').textContent = `الحجم: ${dataset.size}`;
                document.getElementById('dataset-planets').textContent = `الكواكب: ${dataset.planets.toLocaleString()}`;
                infoDiv.classList.remove('hidden');
            } else {
                infoDiv.classList.add('hidden');
            }
            
            updateAnalysisButton();
        });

        // Algorithm selection
        document.getElementById('algorithm-select').addEventListener('change', (e) => {
            const algorithm = algorithms[e.target.value];
            const infoDiv = document.getElementById('algorithm-info');
            
            if (algorithm) {
                document.getElementById('algorithm-name').textContent = algorithm.name;
                document.getElementById('algorithm-description').textContent = algorithm.description;
                document.getElementById('algorithm-accuracy').textContent = `الدقة: ${algorithm.accuracy}%`;
                document.getElementById('algorithm-speed').textContent = `السرعة: ${algorithm.speed}`;
                infoDiv.classList.remove('hidden');
            } else {
                infoDiv.classList.add('hidden');
            }
            
            updateAnalysisButton();
        });

        function updateAnalysisButton() {
            const dataset = document.getElementById('dataset-select').value;
            const algorithm = document.getElementById('algorithm-select').value;
            const startBtn = document.getElementById('start-analysis');
            
            startBtn.disabled = !dataset || !algorithm;
        }

        // Analysis functionality
        function startAnalysis() {
            document.getElementById('analysis-controls').classList.add('hidden');
            document.getElementById('analysis-progress').classList.remove('hidden');
            
            analysisProgress = 0;
            analysisInterval = setInterval(() => {
                analysisProgress += Math.random() * 15;
                
                if (analysisProgress >= 100) {
                    analysisProgress = 100;
                    clearInterval(analysisInterval);
                    completeAnalysis();
                }
                
                document.getElementById('progress-bar').style.width = `${analysisProgress}%`;
                document.getElementById('progress-text').textContent = `التقدم: ${Math.round(analysisProgress)}%`;
            }, 500);
        }

        function completeAnalysis() {
            document.getElementById('analysis-progress').classList.add('hidden');
            document.getElementById('analysis-complete').classList.remove('hidden');
        }

        // Discovered planets data
        const discoveredPlanets = [
            {
                name: 'ExoAI-2024-001',
                habitability: 92,
                temperature: 15,
                distance: 127,
                orbitalPeriod: 342,
                discovery: 'جديد'
            },
            {
                name: 'ExoAI-2024-002',
                habitability: 87,
                temperature: 22,
                distance: 89,
                orbitalPeriod: 298,
                discovery: 'مؤكد'
            },
            {
                name: 'ExoAI-2024-003',
                habitability: 78,
                temperature: -5,
                distance: 203,
                orbitalPeriod: 445,
                discovery: 'محتمل'
            },
            {
                name: 'ExoAI-2024-004',
                habitability: 95,
                temperature: 18,
                distance: 156,
                orbitalPeriod: 378,
                discovery: 'جديد'
            }
        ];

        function populateDiscoveredPlanets() {
            const container = document.getElementById('discovered-planets');
            container.innerHTML = '';

            discoveredPlanets.forEach((planet, index) => {
                const planetCard = document.createElement('div');
                planetCard.className = 'card cursor-pointer slide-in-left';
                planetCard.style.animationDelay = `${index * 0.1}s`;

                const habitabilityClass = planet.habitability >= 90 ? 'text-green-400 bg-green-900/50' :
                                        planet.habitability >= 80 ? 'text-yellow-400 bg-yellow-900/50' :
                                        planet.habitability >= 70 ? 'text-orange-400 bg-orange-900/50' :
                                        'text-red-400 bg-red-900/50';

                const discoveryClass = planet.discovery === 'جديد' ? 'badge-success' :
                                     planet.discovery === 'مؤكد' ? 'badge-warning' : 'badge-error';

                planetCard.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-globe text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="flex items-center space-x-2 mb-1">
                                    <h3 class="text-white text-lg">${planet.name}</h3>
                                    <span class="badge ${discoveryClass}">${planet.discovery}</span>
                                </div>
                                <div class="flex items-center space-x-4 text-sm text-gray-400">
                                    <span class="flex items-center">
                                        <i class="fas fa-ruler text-xs mr-1"></i>
                                        ${planet.distance} سنة ضوئية
                                    </span>
                                    <span class="flex items-center">
                                        <i class="fas fa-thermometer-half text-xs mr-1"></i>
                                        ${planet.temperature}°C
                                    </span>
                                    <span class="flex items-center">
                                        <i class="fas fa-clock text-xs mr-1"></i>
                                        ${planet.orbitalPeriod} يوم
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="text-left space-y-2">
                            <span class="badge ${habitabilityClass} px-3 py-1">
                                صالح للحياة: ${planet.habitability}%
                            </span>
                            <div class="flex space-x-2">
                                <button class="btn btn-secondary text-xs px-2 py-1">التفاصيل</button>
                                <button class="btn btn-ghost text-xs px-2 py-1">
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button class="btn btn-ghost text-xs px-2 py-1">
                                    <i class="fas fa-share"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(planetCard);
            });
        }

        // Tab functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                const tabName = e.target.getAttribute('data-tab');
                
                // Update tab buttons
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                document.getElementById(`${tabName}-tab`).classList.remove('hidden');
            }
        });

        // CSS for tabs
        const tabStyle = document.createElement('style');
        tabStyle.textContent = `
            .tab-btn {
                padding: 12px 24px;
                border-radius: 8px;
                background: transparent;
                color: #9CA3AF;
                border: 1px solid #374151;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .tab-btn.active {
                background: #8B5CF6;
                color: white;
                border-color: #8B5CF6;
            }
            
            .tab-btn:hover {
                background: rgba(139, 92, 246, 0.1);
                color: white;
            }
        `;
        document.head.appendChild(tabStyle);

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            initSplash();
        });