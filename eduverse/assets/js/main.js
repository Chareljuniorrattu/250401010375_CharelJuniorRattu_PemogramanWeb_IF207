// ================================================================
// 1. DATA KURSUS (ARRAY OF OBJECTS)
// ================================================================
const courseData = [
    { id: 1, title: 'HTML & CSS Dasar', category: 'programming', icon: 'fa-html5', color: 'danger', level: 'Pemula', students: 1250 },
    { id: 2, title: 'JavaScript Fundamental', category: 'programming', icon: 'fa-js', color: 'warning', level: 'Intermediate', students: 980 },
    { id: 3, title: 'Aljabar & Fungsi', category: 'matematika', icon: 'fa-calculator', color: 'primary', level: 'Pemula', students: 820 },
    { id: 4, title: 'Geometri Analitik', category: 'matematika', icon: 'fa-shapes', color: 'info', level: 'Mahir', students: 450 },
    { id: 5, title: 'Fisika Gerak', category: 'sains', icon: 'fa-atom', color: 'success', level: 'Intermediate', students: 630 },
    { id: 6, title: 'Kimia Organik', category: 'sains', icon: 'fa-flask', color: 'danger', level: 'Mahir', students: 310 },
    { id: 7, title: 'Bahasa Inggris B1', category: 'bahasa', icon: 'fa-language', color: 'info', level: 'Pemula', students: 1500 },
    { id: 8, title: 'TOEFL Preparation', category: 'bahasa', icon: 'fa-graduation-cap', color: 'success', level: 'Mahir', students: 720 },
];

// ================================================================
// 2. RENDER KURSUS DI INDEX.HTML
// ================================================================
function renderFeaturedCourses() {
    const container = document.getElementById('courseContainer');
    if (!container) return;

    // Ambil 4 kursus pertama sebagai featured
    const featured = courseData.slice(0, 4);
    
    let html = '';
    featured.forEach(course => {
        html += `
            <div class="col-md-6 col-lg-3">
                <div class="course-card h-100 p-3 text-center fade-in-up">
                    <div class="bg-${course.color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3" style="width:70px;height:70px;justify-content:center;align-items:center;">
                        <i class="fab ${course.icon} fa-2x text-${course.color}"></i>
                    </div>
                    <h6 class="fw-bold">${course.title}</h6>
                    <span class="badge bg-${course.color}">${course.level}</span>
                    <p class="text-muted small mt-2">
                        <i class="fas fa-user-graduate me-1"></i> ${course.students} siswa
                    </p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ================================================================
// 3. RENDER KURSUS DI COURSES.HTML + FILTER
// ================================================================
function renderAllCourses(filter = 'all') {
    const container = document.getElementById('courseList');
    if (!container) return;

    let filtered = courseData;
    if (filter !== 'all') {
        filtered = courseData.filter(c => c.category === filter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Tidak ada kursus untuk kategori ini</h5>
                <button class="btn btn-primary mt-2" onclick="filterCourses('all')">Lihat Semua</button>
            </div>
        `;
        return;
    }

    let html = '';
    filtered.forEach(course => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="course-card h-100 p-3 fade-in-up">
                    <div class="d-flex align-items-center gap-3 mb-2">
                        <div class="bg-${course.color} bg-opacity-10 rounded-circle p-2" style="width:45px;height:45px;display:flex;justify-content:center;align-items:center;">
                            <i class="fab ${course.icon} text-${course.color}"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-0">${course.title}</h6>
                            <span class="badge bg-${course.color}">${course.level}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between text-muted small">
                        <span><i class="fas fa-user-graduate me-1"></i> ${course.students} siswa</span>
                        <span><i class="fas fa-tag me-1"></i> ${course.category}</span>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ================================================================
// 4. FILTER FUNCTION (untuk courses.html)
// ================================================================
function filterCourses(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    renderAllCourses(category);
}

// ================================================================
// 5. COUNTER ANIMATION
// ================================================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 60);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(interval);
                        } else {
                            counter.textContent = current.toLocaleString();
                        }
                    }, 25);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(counter);
    });
}

// ================================================================
// 6. CONTACT FORM HANDLER
// ================================================================
function handleContactForm() {
    const nama = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const pesan = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');

    // Validasi
    if (nama === '' || email === '' || pesan === '') {
        feedback.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">
                <i class="fas fa-exclamation-circle me-2"></i> Semua field wajib diisi!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        return false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        feedback.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">
                <i class="fas fa-exclamation-circle me-2"></i> Format email tidak valid!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        return false;
    }

    // Sukses
    feedback.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show">
            <i class="fas fa-check-circle me-2"></i> Terima kasih! Pesanmu sudah terkirim.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    document.getElementById('contactForm').reset();

    // Auto close setelah 5 detik
    setTimeout(() => {
        feedback.innerHTML = '';
    }, 5000);

    return false;
}

// ================================================================
// 7. SCROLL ANIMATION
// ================================================================
function initScrollAnimation() {
    const elements = document.querySelectorAll('.service-card, .course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ================================================================
// 8. INITIALIZE (DIJALANKAN SAAT DOM READY)
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Render featured courses di index.html
    renderFeaturedCourses();
    
    // Render all courses di courses.html
    if (document.getElementById('courseList')) {
        renderAllCourses('all');
    }
    
    // Counter animation
    animateCounters();
    
    // Scroll animation
    initScrollAnimation();
    
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterCourses(category);
        });
    });
});