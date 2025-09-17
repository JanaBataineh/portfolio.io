    // Mobile Menu Toggle
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                menuBtn.className = 'fas fa-times';
            } else {
                menuBtn.className = 'fas fa-bars';
            }
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.remove('active');
            menuBtn.className = 'fas fa-bars';
        }

        // Smooth Scrolling
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Add smooth scrolling to all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        // Form Submission
        function handleFormSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            showToast('تم إرسال رسالتك بنجاح! سأقوم بالرد عليك قريباً.', 'success');
            
            // Reset form
            event.target.reset();
        }

        // Toast Notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Skill Bar Animation
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                        
                        observer.unobserve(bar);
                    }
                });
            });
            
            skillBars.forEach(bar => observer.observe(bar));
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            animateSkillBars();
        });

        // Header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        });