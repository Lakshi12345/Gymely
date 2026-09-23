/* =================================
    Author  : Aigenix Theme
    Version : 1.0
================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* INITIALIZE AOS */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 550,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 80,
            anchorPlacement: 'top-bottom'
        });
        window.addEventListener('load', () => {
            AOS.refresh();
        });
    }

    /* TYPED TEXT INITIALIZATION */
    const typedEl = document.getElementById('typed-text');
    if (typedEl && typeof Typed !== 'undefined') {
        const stringsAttr = typedEl.getAttribute('data-strings');
        const strings = stringsAttr ? JSON.parse(stringsAttr) : ['Smarter Decisions.', 'Real-Time Insights.', 'Human Potential.'];
        typedEl.textContent = '';
        new Typed('#typed-text', {
            strings: strings,
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 2000,
            loop: true,
        });
    }

    /* BACK TO TOP BUTTON INITIALIZATION */
    const backToTopBtn = document.getElementById('back-to-top');
    const circle = backToTopBtn ? backToTopBtn.querySelector('.progress-ring_circle') : null;
    let circumference = 0;
    if (circle) {
        const radius = circle.r.baseVal.value;
        circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
    }
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* SCROLL */
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.addEventListener('resize', () => {
        docHeight = document.documentElement.scrollHeight - window.innerHeight;
    });
    const updateScrollUI = () => {
        const scroll = window.scrollY || window.pageYOffset || 0;
        if (progressBar && docHeight > 0) {
            progressBar.style.width = (scroll / docHeight * 100) + '%';
        }
        if (navbar) {
            navbar.classList.toggle('scrolled', scroll > 60);
        }
        if (backToTopBtn) {
            if (scroll > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
            if (circle && docHeight > 0) {
                const progress = scroll / docHeight;
                const offset = circumference - (progress * circumference);
                circle.style.strokeDashoffset = offset;
            }
        }
    };
    updateScrollUI();
    let scrollTicking = false;
    let scrollPauseTimer;
    const onScroll = () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                updateScrollUI();
                scrollTicking = false;
            });
        }
        document.documentElement.classList.add('is-scrolling');
        clearTimeout(scrollPauseTimer);
        scrollPauseTimer = setTimeout(() => {
            document.documentElement.classList.remove('is-scrolling');
        }, 140);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* NAVIGATION */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    function closeMobileNav() {
        if (!navMenu) return;
        navMenu.classList.remove('open');
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        navBackdrop?.classList.remove('show');
        document.body.classList.remove('nav-open');
        document.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
    }
    function openMobileNav() {
        navMenu?.classList.add('open');
        navToggle?.classList.add('active');
        navToggle?.setAttribute('aria-expanded', 'true');
        navBackdrop?.classList.add('show');
        document.body.classList.add('nav-open');
    }
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains('open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
        navBackdrop?.addEventListener('click', (e) => {
            if (e.target === navBackdrop) closeMobileNav();
        });

        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        document.querySelectorAll('.menu-item').forEach((item) => {
            const trigger = item.querySelector('.nav-link');
            if (!trigger) return;
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    const directPanel = item.querySelector('.dropdown-panel');
                    if (directPanel) {
                        e.preventDefault();
                        e.stopPropagation();
                        const isActive = item.classList.contains('active');
                        document.querySelectorAll('.menu-item').forEach((i) => {
                            if (i !== item) i.classList.remove('active');
                        });
                        if (isActive) {
                            item.classList.remove('active');
                        } else {
                            item.classList.add('active');
                        }
                    } else {
                        e.stopPropagation();
                    }
                } else {
                    const href = trigger.getAttribute('href');
                    if (!href || href === '#') {
                        e.preventDefault();
                        e.stopPropagation();
                        const isOpen = item.classList.contains('open');
                        document.querySelectorAll('.menu-item.open').forEach((i) => i.classList.remove('open'));
                        if (!isOpen) item.classList.add('open');
                    }
                }
            });
        });
        document.addEventListener('click', (e) => {
            if (window.innerWidth > 1024) {
                if (!e.target.closest('.menu-item')) {
                    document.querySelectorAll('.menu-item.open').forEach((i) => i.classList.remove('open'));
                }
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                closeMobileNav();
                document.querySelectorAll('.menu-item.open').forEach((i) => i.classList.remove('open'));
            }
        });
    }

    /* HERO BACKGROUND â€” NEURAL NETWORK */
    initHeroBackground();

    /* HERO AI HUB ENTRANCE */
    initHeroHub();

    /* HERO ENTRANCE TIMELINE */
    if (document.getElementById('hero')) {
        window.heroEntranceTimeline = gsap.timeline({ paused: true });

        // 1. Badge Animation
        window.heroEntranceTimeline.fromTo('#hero .hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

        // 2. Hero Title first line animation (White Headline)
        const heroFirstLine = document.querySelector('.hero-title .line:not(.accent)');
        if (heroFirstLine) {
            window.heroEntranceTimeline.fromTo(heroFirstLine,
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                },
                '-=0.3'
            );
        }

        // 3. Rest of the Hero content elements (chained in sequence)
        window.heroEntranceTimeline
            .fromTo('.hero-title .line.accent', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.5')
            .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .fromTo('.hero-cta .btn-primary, .hero-cta .btn-ghost', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
            .fromTo('.hero-stats .stat-item', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
            .fromTo('.hero-ai-hub', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)' }, '-=0.8');
    }

    /* COUNTUP */
    document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 80;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + suffix;
                }, 20);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(el);
    });

    /* ANCHOR LINKS */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (navMenu && navMenu.classList.contains('open')) {
                        closeMobileNav();
                    }
                    const top = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    /* PRICING BILLING SWITCH */
    const billingSwitch = document.getElementById('pricing-billing-switch');
    const labelMonthly = document.getElementById('billing-monthly');
    const labelYearly = document.getElementById('billing-yearly');
    const priceVals = document.querySelectorAll('.price-val');
    if (billingSwitch && priceVals.length) {
        billingSwitch.addEventListener('click', () => {
            const isActive = billingSwitch.classList.toggle('active');
            // Toggle active classes on labels
            labelMonthly?.classList.toggle('active', !isActive);
            labelYearly?.classList.toggle('active', isActive);
            priceVals.forEach(el => {
                const targetPrice = parseInt(isActive ? el.dataset.yearly : el.dataset.monthly, 10);
                const currentPrice = parseInt(el.textContent, 10);

                if (typeof gsap !== 'undefined') {
                    const priceObj = { val: currentPrice };
                    gsap.to(priceObj, {
                        val: targetPrice,
                        duration: 0.4,
                        ease: 'power1.out',
                        onUpdate: () => {
                            el.textContent = Math.floor(priceObj.val);
                        }
                    });
                } else {
                    el.textContent = targetPrice;
                }
            });
        });
    }

    //FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach((item, index) => {
            const btn = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!btn || !answer) return;

            const qId = btn.id || `faq-q-${index + 1}`;
            const aId = answer.id || `faq-a-${index + 1}`;
            btn.id = qId;
            answer.id = aId;
            btn.setAttribute('type', 'button');
            btn.setAttribute('aria-controls', aId);
            answer.setAttribute('role', 'region');
            answer.setAttribute('aria-labelledby', qId);

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
        window.addEventListener('resize', () => {
            const activeItem = document.querySelector('.faq-item.active .faq-answer');
            if (activeItem) {
                activeItem.style.maxHeight = activeItem.scrollHeight + "px";
            }
        });
    }
});

/* HERO BACKGROUND PARTICLES */
function initHeroBackground() {
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas || typeof THREE === 'undefined') return;
    let width = heroCanvas.clientWidth || window.innerWidth;
    let height = heroCanvas.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 4;
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];
    const colorPrimary = new THREE.Color(0xb8fb04);
    const colorSecondary = new THREE.Color(0x034651);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        velocities.push({
            x: (Math.random() - 0.5) * 0.003,
            y: (Math.random() - 0.5) * 0.003,
        });
        const mixedColor = new THREE.Color();
        mixedColor.copy(colorPrimary).lerp(colorSecondary, Math.random() * 0.7);
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const ptMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });
    const particleSystem = new THREE.Points(ptGeo, ptMat);
    scene.add(particleSystem);
    let heroVisible = true;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        new IntersectionObserver(([entry]) => {
            heroVisible = entry.isIntersecting;
        }, { threshold: 0, rootMargin: '80px' }).observe(heroSection);
    }
    let mouseNX = 0, mouseNY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseNX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        mouseNY = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    });
    function animate() {
        requestAnimationFrame(animate);
        if (!heroVisible) return;
        const pos = ptGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] += velocities[i].x;
            pos[i * 3 + 1] += velocities[i].y;
            if (Math.abs(pos[i * 3]) > 5) velocities[i].x *= -1;
            if (Math.abs(pos[i * 3 + 1]) > 3) velocities[i].y *= -1;
        }
        ptGeo.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.0005;
        camera.position.x += (mouseNX - camera.position.x) * 0.03;
        camera.position.y += (mouseNY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        width = heroCanvas.clientWidth || window.innerWidth;
        height = heroCanvas.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

/* HERO AI HUB */
function initHeroHub() {
    const hub = document.getElementById('hero-ai-hub');
    if (!hub) return;
    const angles = [0, 60, 120, 180, 240, 300];
    const linesGroup = hub.querySelector('.hub-lines');
    const stage = hub.querySelector('.hub-stage');
    if (linesGroup && !linesGroup.children.length) {
        angles.forEach(() => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linesGroup.appendChild(line);
        });
    }
    const runSync = () => requestAnimationFrame(() => syncHubConnections());
    runSync();
    window.addEventListener('resize', runSync);
    window.addEventListener('load', runSync);
    if (window.innerWidth <= 768) return;
}

function syncHubConnections() {
    const hub = document.getElementById('hero-ai-hub');
    if (!hub) return;
    const svg = hub.querySelector('.hub-svg');
    const stage = hub.querySelector('.hub-stage');
    const lines = hub.querySelectorAll('.hub-lines line');
    // const linkDots = hub.querySelectorAll('.hub-link-dot'); /* unused: no .hub-link-dot in HTML */
    const hexRing = hub.querySelector('.hub-hex-ring');
    const chip = hub.querySelector('.hub-chip');
    const nodes = hub.querySelectorAll('.hub-node');
    if (!svg || !chip || !stage || !lines.length || !nodes.length) return;
    const svgRect = svg.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;
    const vbMin = -30;
    const vbSize = 520;
    const scaleX = vbSize / svgRect.width;
    const scaleY = vbSize / svgRect.height;
    const toSvg = (x, y) => ({
        x: vbMin + (x - svgRect.left) * scaleX,
        y: vbMin + (y - svgRect.top) * scaleY,
    });
    const stageRect = stage.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const coreCenter = toSvg(
        chipRect.left + chipRect.width / 2,
        chipRect.top + chipRect.height / 2
    );
    const outerPoints = [];
    nodes.forEach((node, i) => {
        const pill = node.querySelector('.hub-node-pill');
        if (!pill || !lines[i]) return;
        const pillRect = pill.getBoundingClientRect();
        const pillCenter = toSvg(
            pillRect.left + pillRect.width / 2,
            pillRect.top + pillRect.height / 2
        );
        const dx = pillCenter.x - coreCenter.x;
        const dy = pillCenter.y - coreCenter.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const chipHalfW = (chipRect.width / 2) * scaleX;
        const chipHalfH = (chipRect.height / 2) * scaleY;
        const chipEdge = Math.min(
            ux !== 0 ? chipHalfW / Math.abs(ux) : Infinity,
            uy !== 0 ? chipHalfH / Math.abs(uy) : Infinity
        );
        const pillHalfW = (pillRect.width / 2) * scaleX;
        const pillHalfH = (pillRect.height / 2) * scaleY;
        const pillEdge = Math.min(
            ux !== 0 ? pillHalfW / Math.abs(ux) : Infinity,
            uy !== 0 ? pillHalfH / Math.abs(uy) : Infinity
        );
        const x1 = coreCenter.x + ux * chipEdge;
        const y1 = coreCenter.y + uy * chipEdge;
        const x2 = pillCenter.x - ux * pillEdge;
        const y2 = pillCenter.y - uy * pillEdge;
        lines[i].setAttribute('x1', x1.toFixed(1));
        lines[i].setAttribute('y1', y1.toFixed(1));
        lines[i].setAttribute('x2', x2.toFixed(1));
        lines[i].setAttribute('y2', y2.toFixed(1));
        outerPoints.push(`${x2.toFixed(1)},${y2.toFixed(1)}`);
    });
    if (hexRing && outerPoints.length === 6) {
        hexRing.setAttribute('points', outerPoints.join(' '));
    }
}

/* PAGE LOADER */
const loader = document.getElementById('ai-loader');
const loaderBar = document.querySelector('.loader-bar');
const metricPct = document.querySelector('.metric-pct');
const statusTag = document.querySelector('.status-tag');
if (loader && loaderBar && metricPct) {
    document.body.style.overflow = 'hidden';
    gsap.set(loader, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    const bootSequences = [
        'CONNECTING TO SYST_CORE...',
        'LOADING NEURAL WEIGHTS...',
        'SPINNING SYNAPSE MATRIX...',
        'SYNC COMPLETED SUCCESSFULLY'
    ];
    const countObj = { value: 0 };
    const loaderTl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = '';
            if (window.heroEntranceTimeline) {
                window.heroEntranceTimeline.play();
            }
            requestAnimationFrame(() => {
                if (typeof syncHubConnections === 'function') syncHubConnections();
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        }
    });
    loaderTl.to(countObj, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
            const currentPct = Math.floor(countObj.value);
            metricPct.textContent = currentPct.toString().padStart(2, '0') + '%';
            loaderBar.style.width = currentPct + '%';

            if (currentPct < 30) statusTag.textContent = bootSequences[0];
            else if (currentPct < 60) statusTag.textContent = bootSequences[1];
            else if (currentPct < 90) statusTag.textContent = bootSequences[2];
            else statusTag.textContent = bootSequences[3];
        }
    });
    loaderTl.to(loader, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.45,
        ease: 'power3.inOut'
    });
    loaderTl.to(loader, { display: 'none', duration: 0 });
}
document.addEventListener('DOMContentLoaded', () => {
    const chartPath = document.querySelector('.bp-path-fg');
    const radialWrapper = document.querySelector('.bp-radial-wrapper');
    const radialCircle = document.querySelector('.bp-radial-fg');
    const radialVal = document.querySelector('.bp-radial-val');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Smoothly Draw SVG Line Chart
                if (chartPath) {
                    chartPath.style.strokeDashoffset = '0';
                }
                // 2. Animate Radial Pie Chart
                if (radialWrapper && radialCircle && radialVal) {
                    const targetProgress = parseInt(radialWrapper.getAttribute('data-progress'), 10);
                    // Circle radius is 38, circumference = 2 * pi * 38 = ~238.7
                    const circumference = 238.7;
                    const offset = circumference - (targetProgress / 100) * circumference;
                    radialCircle.style.strokeDashoffset = offset;
                    // Text Counter Animation
                    let currentProgress = 0;
                    const interval = setInterval(() => {
                        currentProgress += 2;
                        if (currentProgress >= targetProgress) {
                            currentProgress = targetProgress;
                            clearInterval(interval);
                        }
                        radialVal.textContent = currentProgress + '%';
                    }, 25);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    const bentoSection = document.getElementById('bento-premium-light');
    if (bentoSection) {
        observer.observe(bentoSection);
    }
});

//ABOUT 
document.addEventListener("DOMContentLoaded", () => {
    // 1. Live Data Simulation (Updates the floating white cards)
    const loadVal = document.getElementById("live-sys-load");
    const latVal = document.getElementById("live-latency");

    if (loadVal && latVal) {
        setInterval(() => {
            // Fluctuate load between 98.0 and 99.9
            const newLoad = (98 + Math.random() * 1.9).toFixed(1);
            // Fluctuate latency between 0.20 and 0.65
            const newLat = (0.2 + Math.random() * 0.45).toFixed(2);

            loadVal.textContent = newLoad + '%';
            latVal.textContent = newLat + 'ms';
        }, 2200);
    }

    // 2. Interactive GSAP Parallax (Desktop Only)
    const genesisSectionLight = document.querySelector('.about-genesis-light');
    const visualCoreLight = document.querySelector('.genesis-core-container-light');

    if (genesisSectionLight && visualCoreLight && typeof gsap !== 'undefined') {
        if (window.innerWidth > 1024) {
            let rect = null;
            genesisSectionLight.addEventListener('mouseenter', () => {
                rect = visualCoreLight.getBoundingClientRect();
            });
            genesisSectionLight.addEventListener('mousemove', (e) => {
                if (!rect) rect = visualCoreLight.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Create a subtle floating shift
                const moveX = (e.clientX - centerX) * 0.03;
                const moveY = (e.clientY - centerY) * 0.03;

                gsap.to(visualCoreLight, {
                    x: moveX,
                    y: moveY,
                    rotateY: moveX * 0.4,
                    rotateX: -moveY * 0.4,
                    transformPerspective: 1000,
                    duration: 1.2,
                    ease: "power2.out"
                });
            });

            genesisSectionLight.addEventListener('mouseleave', () => {
                // Snap back beautifully
                gsap.to(visualCoreLight, {
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        }
    }
});

/* TESTIMONIALS CAROUSEL */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-next-testimonials',
                prevEl: '.swiper-prev-testimonials',
            },
        });
    }

    const tsSection = document.querySelector('.ais-ts-section');
    if (tsSection) {
        const picks = tsSection.querySelectorAll('.ais-ts-pick');
        const panels = tsSection.querySelectorAll('.ais-ts-quote');
        const progressBar = tsSection.querySelector('.ais-ts-progress_bar');
        const prevBtn = tsSection.querySelector('.ais-ts-prev');
        const nextBtn = tsSection.querySelector('.ais-ts-next');
        let activeIndex = 0;
        let autoTimer = null;

        const setActive = (index) => {
            const total = panels.length;
            if (!total) return;
            activeIndex = ((index % total) + total) % total;

            picks.forEach((pick, i) => {
                const isActive = i === activeIndex;
                pick.classList.toggle('is-active', isActive);
                pick.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            panels.forEach((panel, i) => {
                const isActive = i === activeIndex;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });

            if (progressBar) {
                progressBar.style.width = `${((activeIndex + 1) / total) * 100}%`;
            }
        };

        const startAuto = () => {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => setActive(activeIndex + 1), 6500);
        };

        picks.forEach((pick) => {
            pick.addEventListener('click', () => {
                setActive(Number(pick.dataset.tsIndex));
                startAuto();
            });
        });

        prevBtn?.addEventListener('click', () => {
            setActive(activeIndex - 1);
            startAuto();
        });

        nextBtn?.addEventListener('click', () => {
            setActive(activeIndex + 1);
            startAuto();
        });

        tsSection.addEventListener('mouseenter', () => clearInterval(autoTimer));
        tsSection.addEventListener('mouseleave', startAuto);

        setActive(0);
        startAuto();
    }
});

/* PORTFOLIO CARD FILTERING SYSTEM */
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.portfolio-filter-menu .filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-filterable-grid .portfolio-card-wrap');
    const gridContainer = document.querySelector('.portfolio-filterable-grid');

    if (portfolioCards.length > 0 && gridContainer && typeof gsap !== 'undefined') {
        // Initial scroll reveal handled via data-aos on .portfolio-card-wrap

        // Handle filtering interactions
        if (filterButtons.length > 0) {
            let isTransitioning = false;

            filterButtons.forEach(button => {
                button.setAttribute('type', 'button');
                button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');

                button.addEventListener('click', () => {
                    if (isTransitioning) return;

                    const filterValue = button.getAttribute('data-filter');
                    const activeBtn = document.querySelector('.portfolio-filter-menu .filter-btn.active');
                    if (activeBtn === button) return; // Already on this filter

                    isTransitioning = true;

                    // Update active button state
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');

                    const cardsToShow = [];
                    const cardsToHide = [];

                    portfolioCards.forEach(card => {
                        if (filterValue === 'all' || card.classList.contains('cat-' + filterValue)) {
                            cardsToShow.push(card);
                        } else {
                            cardsToHide.push(card);
                        }
                    });

                    // Fade out the entire grid container to hide the layout shift
                    gsap.to(gridContainer, {
                        opacity: 0,
                        y: 10,
                        duration: 0.2,
                        ease: 'power1.out',
                        onComplete: () => {
                            // Toggle individual cards display instantly
                            cardsToHide.forEach(card => {
                                card.style.display = 'none';
                            });

                            cardsToShow.forEach(card => {
                                card.style.display = 'block';
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(15px)';
                            });

                            // Fade the grid container back in
                            gsap.to(gridContainer, {
                                opacity: 1,
                                y: 0,
                                duration: 0.2,
                                ease: 'power2.out',
                                onComplete: () => {
                                    // Stagger fade-in the cards inside the container
                                    gsap.to(cardsToShow, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        stagger: 0.05,
                                        ease: 'power2.out',
                                        clearProps: 'transform,opacity',
                                        onComplete: () => {
                                            isTransitioning = false;
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            });
        }
    }
});

/* PORTFOLIO OPERATIONS DASHBOARD INTERACTIONS */
document.addEventListener("DOMContentLoaded", () => {
    // Rotating Hex Key Scrambler Simulator (Card 2)
    const keyEl = document.getElementById('hex-key-1');
    if (keyEl) {
        const hexChars = '0123456789ABCDEF';
        function generateRandomHexSegment(len) {
            let res = '';
            for (let i = 0; i < len; i++) {
                res += hexChars[Math.floor(Math.random() * 16)];
            }
            return res;
        }
        setInterval(() => {
            const currentKeyEl = document.getElementById('hex-key-1');
            if (!currentKeyEl) return;
            const newKey = `0x${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}`;
            let iterations = 0;
            const interval = setInterval(() => {
                currentKeyEl.textContent = `0x${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}_${generateRandomHexSegment(4)}`;
                iterations++;
                if (iterations >= 6) {
                    clearInterval(interval);
                    currentKeyEl.textContent = newKey;
                }
            }, 70);
        }, 3000);
    }

    // 4. Live Telemetry Logs Stream Simulator (Card 4)
    const consoleBody = document.querySelector('.portfolio-mini-console .console-body');
    if (consoleBody) {
        const logs = [
            "sync swarm_ops core (124 nodes)",
            "model_checkpoint weight sync complete",
            "node_38 latency shift: 0.04ms",
            "rotating HSM encryption weight hashes",
            "secure handshake verified (AES-256)",
            "scaling edge clusters: active=4",
            "health status: 100% operational",
            "high request flow: routing deflection",
            "packet integrity check: verified",
            "consensus ring weight convergence: 0.03ms"
        ];
        const tags = ["[OK]", "[OK]", "[LATENCY]", "[SEC]", "[OK]", "[LOAD]", "[OK]", "[WARN]", "[SEC]", "[OK]"];

        setInterval(() => {
            const currentConsole = document.querySelector('.portfolio-mini-console .console-body');
            if (!currentConsole) return;
            const lines = currentConsole.querySelectorAll('.console-line');
            if (lines.length >= 2) {
                lines[0].remove();
            }
            const index = Math.floor(Math.random() * logs.length);
            const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

            const line = document.createElement('div');
            line.className = 'console-line';
            line.style.opacity = '0';
            line.style.transform = 'translateY(4px)';

            const tag = tags[index];
            let tagClass = 'c-tag';
            if (tag.includes('SEC')) tagClass = 'text-info';
            if (tag.includes('WARN')) tagClass = 'text-warning';
            if (tag.includes('LATENCY')) tagClass = 'text-success';

            line.innerHTML = `[${time}] <span class="${tagClass}">${tag}</span> ${logs[index]}`;
            currentConsole.appendChild(line);

            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                ease: 'power1.out'
            });
        }, 2500);
    }

    // 5. Neural Core Utilization Load Bar Fluctuation (Card 3)
    const utilMeter = document.querySelector('.portfolio-util-meter .meter-fill');
    if (utilMeter && typeof gsap !== 'undefined') {
        setInterval(() => {
            const currentMeter = document.querySelector('.portfolio-util-meter .meter-fill');
            if (!currentMeter) return;
            const targetWidth = Math.floor(Math.random() * 25) + 70; // 70% to 95%
            gsap.to(currentMeter, {
                width: targetWidth + '%',
                duration: 1.2,
                ease: 'power2.inOut'
            });
        }, 3500);
    }

    // 6. Cluster Active Node Blinking Grid Map Updates (Card 6)
    const scaleDots = document.querySelectorAll('.portfolio-node-scale .s-dot');
    if (scaleDots.length > 0) {
        setInterval(() => {
            scaleDots.forEach((dot, index) => {
                const rand = Math.random();
                if (index < 3) {
                    dot.classList.add('active');
                    dot.classList.remove('animate-pulse');
                } else if (index === 3) {
                    if (rand > 0.5) {
                        dot.classList.add('animate-pulse', 'active');
                    } else {
                        dot.classList.remove('animate-pulse');
                    }
                } else {
                    if (rand > 0.6) {
                        dot.classList.add('active');
                        if (rand > 0.8) {
                            dot.classList.add('animate-pulse');
                        } else {
                            dot.classList.remove('animate-pulse');
                        }
                    } else {
                        dot.classList.remove('active', 'animate-pulse');
                    }
                }
            });
        }, 2200);
    }

    /* PORTFOLIO DETAILS: ROI PROJECTION SLIDER */
    const roiRange = document.getElementById('roi-range');
    const roiSliderReadout = document.getElementById('roi-slider-readout');
    const roiCostVal = document.getElementById('roi-cost-val');
    const roiHoursVal = document.getElementById('roi-hours-val');
    const roiEfficiencyVal = document.getElementById('roi-efficiency-val');

    let costCounter = { val: 2400 };
    let hoursCounter = { val: 120 };

    if (roiRange && roiSliderReadout) {
        roiRange.addEventListener('input', (e) => {
            const tasks = parseInt(e.target.value);
            roiSliderReadout.textContent = tasks.toLocaleString() + ' runs';

            const targetCost = tasks * 0.24;
            const targetHours = tasks * 0.012;
            const targetEff = (90.0 + (tasks / 50000) * 6.8).toFixed(1);

            if (typeof gsap !== 'undefined') {
                gsap.to(costCounter, {
                    val: targetCost,
                    duration: 0.4,
                    ease: 'power1.out',
                    onUpdate: () => {
                        if (roiCostVal) roiCostVal.textContent = '$' + Math.round(costCounter.val).toLocaleString();
                    }
                });

                gsap.to(hoursCounter, {
                    val: targetHours,
                    duration: 0.4,
                    ease: 'power1.out',
                    onUpdate: () => {
                        if (roiHoursVal) roiHoursVal.textContent = Math.round(hoursCounter.val).toLocaleString() + 'h';
                    }
                });
            } else {
                if (roiCostVal) roiCostVal.textContent = '$' + Math.round(targetCost).toLocaleString();
                if (roiHoursVal) roiHoursVal.textContent = Math.round(targetHours).toLocaleString() + 'h';
            }

            if (roiEfficiencyVal) roiEfficiencyVal.textContent = targetEff + '%';
        });
    }
});


/* PRICING TOGGLE */
const billingSwitch = document.getElementById('billing-switch');
const labelMonthly = document.getElementById('label-monthly');
const labelYearly = document.getElementById('label-yearly');
const priceAmounts = document.querySelectorAll('.price-anim');

if (billingSwitch) {
    billingSwitch.addEventListener('click', () => {
        const isYearly = billingSwitch.getAttribute('aria-pressed') === 'true';

        // Toggle State
        billingSwitch.setAttribute('aria-pressed', !isYearly);

        // Toggle Active Classes on Labels
        if (!isYearly) {
            labelMonthly.classList.remove('active');
            labelYearly.classList.add('active');
        } else {
            labelMonthly.classList.add('active');
            labelYearly.classList.remove('active');
        }

        // Animate and update prices using GSAP counter animation
        priceAmounts.forEach(price => {
            const targetVal = parseInt(!isYearly ? price.getAttribute('data-yearly') : price.getAttribute('data-monthly'), 10);
            const currentVal = parseInt(price.textContent, 10) || 0;

            if (typeof gsap !== 'undefined') {
                const animObj = { val: currentVal };
                gsap.to(animObj, {
                    val: targetVal,
                    duration: 0.4,
                    ease: 'power1.out',
                    onUpdate: () => {
                        price.textContent = Math.floor(animObj.val);
                    }
                });
            } else {
                price.textContent = targetVal;
            }
        });
    });
}

/* AUTHENTICATION LOGIC (PASSWORD TOGGLE)  */
document.querySelectorAll('.auth-pwd-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
        const wrapper = btn.closest('.auth-input-wrapper');
        const input = wrapper ? wrapper.querySelector('.auth-input') : null;
        if (!input) return;

        const isPassword = input.getAttribute('type') === 'password';
        const newType = isPassword ? 'text' : 'password';
        input.setAttribute('type', newType);

        // Toggle eye icon
        const icon = btn.querySelector('i');
        if (icon) {
            if (isPassword) {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                icon.classList.add('text-primary');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                icon.classList.remove('text-primary');
            }
        }
    });
});

/* ============================================================
   AIGENIX - AI STARTUP HOMEPAGE SCRIPTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll header state change
    const aisHeader = document.querySelector('.ais-header');
    if (aisHeader) {
        const updateAisScroll = () => {
            const scroll = window.scrollY || window.pageYOffset;
            if (scroll > 60) {
                aisHeader.classList.add('ais-header-scrolled');
            } else {
                aisHeader.classList.remove('ais-header-scrolled');
            }
        };
        updateAisScroll();
        window.addEventListener('scroll', updateAisScroll, { passive: true });
    }

    // 2. Mobile Nav Drawer Toggle
    const aisNavToggle = document.getElementById('ais-nav-toggle');
    const aisNavMenu = document.getElementById('ais-nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const aisNavItems = document.querySelectorAll('.ais-nav-item');

    function closeAisMobileNav() {
        if (aisNavMenu) aisNavMenu.classList.remove('active');
        if (aisNavToggle) {
            aisNavToggle.classList.remove('active');
            aisNavToggle.setAttribute('aria-expanded', 'false');
        }
        if (navBackdrop) navBackdrop.classList.remove('show');
        document.body.classList.remove('nav-open');
        aisNavItems.forEach((item) => item.classList.remove('open'));
    }

    function openAisMobileNav() {
        if (aisNavMenu) aisNavMenu.classList.add('active');
        if (aisNavToggle) {
            aisNavToggle.classList.add('active');
            aisNavToggle.setAttribute('aria-expanded', 'true');
        }
        if (navBackdrop) navBackdrop.classList.add('show');
        document.body.classList.add('nav-open');
    }

    if (aisNavToggle && aisNavMenu) {
        aisNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (aisNavMenu.classList.contains('active')) {
                closeAisMobileNav();
            } else {
                openAisMobileNav();
            }
        });

        aisNavMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close when clicking backdrop
        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => {
                closeAisMobileNav();
            });
        }

        // Close drawer after following a link (mobile)
        aisNavMenu.querySelectorAll('a.ais-dropdown-link, a.ais-nav-link[href]').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    closeAisMobileNav();
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAisMobileNav();
            }
        });
    }

    // 3. Mobile Accordion Dropdowns for .ais-nav-item
    aisNavItems.forEach((item) => {
        const link = item.querySelector(':scope > .ais-nav-link');
        const dropdown = item.querySelector(':scope > .ais-dropdown-panel');
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth > 1024) return;

                e.preventDefault();
                e.stopPropagation();

                const isOpen = item.classList.contains('open');
                item.parentElement.querySelectorAll(':scope > .ais-nav-item.open').forEach((sibling) => {
                    if (sibling !== item) sibling.classList.remove('open');
                });
                item.classList.toggle('open', !isOpen);
            });
        }
    });
});

/* ============================================================
   AIGENIX - AI SAAS HOMEPAGE SCRIPTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const saasHeader = document.querySelector('.saas-header');
    if (saasHeader) {
        const updateSaasScroll = () => {
            const scroll = window.scrollY || window.pageYOffset;
            saasHeader.classList.toggle('saas-header-scrolled', scroll > 40);
        };
        updateSaasScroll();
        window.addEventListener('scroll', updateSaasScroll, { passive: true });
    }

    const saasNavToggle = document.getElementById('saas-nav-toggle');
    const saasNavClose = document.getElementById('saas-nav-close');
    const saasNavMenu = document.getElementById('saas-nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const saasNavItems = document.querySelectorAll('.saas-nav-item');

    function closeSaasMobileNav() {
        if (saasNavMenu) saasNavMenu.classList.remove('active');
        if (saasNavToggle) {
            saasNavToggle.classList.remove('active');
            saasNavToggle.setAttribute('aria-expanded', 'false');
        }
        if (navBackdrop) navBackdrop.classList.remove('show');
        document.body.classList.remove('nav-open');
        saasNavItems.forEach((item) => item.classList.remove('open'));
    }

    function openSaasMobileNav() {
        if (saasNavMenu) saasNavMenu.classList.add('active');
        if (saasNavToggle) {
            saasNavToggle.classList.add('active');
            saasNavToggle.setAttribute('aria-expanded', 'true');
        }
        if (navBackdrop) navBackdrop.classList.add('show');
        document.body.classList.add('nav-open');
    }

    if (saasNavToggle && saasNavMenu) {
        saasNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (saasNavMenu.classList.contains('active')) {
                closeSaasMobileNav();
            } else {
                openSaasMobileNav();
            }
        });

        saasNavMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => {
                closeSaasMobileNav();
            });
        }

        saasNavMenu.querySelectorAll('a.saas-dropdown-link, a.saas-nav-link[href]').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    closeSaasMobileNav();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSaasMobileNav();
            }
        });
    }

    if (saasNavClose) {
        saasNavClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSaasMobileNav();
        });
    }

    saasNavItems.forEach((item) => {
        const link = item.querySelector(':scope > .saas-nav-link');
        const dropdown = item.querySelector(':scope > .saas-dropdown');
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth > 1024) return;

                e.preventDefault();
                e.stopPropagation();

                const isOpen = item.classList.contains('open');
                item.parentElement.querySelectorAll(':scope > .saas-nav-item.open').forEach((sibling) => {
                    if (sibling !== item) sibling.classList.remove('open');
                });
                item.classList.toggle('open', !isOpen);
            });
        }
    });

    const saasFtForm = document.querySelector('.saas-ft-form');
    if (saasFtForm) {
        saasFtForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    const saasBillingSwitch = document.getElementById('saas-price-billing-switch');
    const saasLabelMonthly = document.getElementById('saas-price-monthly');
    const saasLabelYearly = document.getElementById('saas-price-yearly');
    const saasPriceVals = document.querySelectorAll('.saas-price .saas-price_val');

    if (saasBillingSwitch && saasPriceVals.length) {
        saasBillingSwitch.addEventListener('click', () => {
            const isAnnual = saasBillingSwitch.classList.toggle('active');
            saasLabelMonthly?.classList.toggle('active', !isAnnual);
            saasLabelYearly?.classList.toggle('active', isAnnual);

            saasPriceVals.forEach((el) => {
                const targetPrice = parseInt(isAnnual ? el.dataset.yearly : el.dataset.monthly, 10);
                const currentPrice = parseInt(el.textContent, 10);

                if (typeof gsap !== 'undefined') {
                    const priceObj = { val: currentPrice };
                    gsap.to(priceObj, {
                        val: targetPrice,
                        duration: 0.4,
                        ease: 'power1.out',
                        onUpdate: () => {
                            el.textContent = Math.floor(priceObj.val);
                        },
                    });
                } else {
                    el.textContent = targetPrice;
                }
            });
        });
    }

    const saasTsSwiperEl = document.querySelector('.saas-ts_swiper');
    if (saasTsSwiperEl && typeof Swiper !== 'undefined') {
        const saasTsSlider = saasTsSwiperEl.closest('.saas-ts_slider');
        const saasTsProgressBar = saasTsSlider?.querySelector('.saas-ts_progress-bar');
        const saasTsSlideCount = saasTsSwiperEl.querySelectorAll('.swiper-slide').length;

        const updateSaasTsProgress = (swiper) => {
            if (saasTsProgressBar && saasTsSlideCount) {
                saasTsProgressBar.style.width = `${((swiper.realIndex + 1) / saasTsSlideCount) * 100}%`;
            }
        };

        new Swiper(saasTsSwiperEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            centeredSlidesBounds: true,
            loop: false,
            rewind: true,
            speed: 700,
            grabCursor: true,
            watchOverflow: true,
            autoplay: {
                delay: 6500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: saasTsSlider?.querySelector('.saas-ts_next'),
                prevEl: saasTsSlider?.querySelector('.saas-ts_prev'),
            },
            pagination: {
                el: saasTsSlider?.querySelector('.saas-ts_pagination'),
                clickable: true,
                bulletClass: 'saas-ts_bullet',
                bulletActiveClass: 'is-active',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    centeredSlides: false,
                },
            },
            on: {
                init(swiper) {
                    updateSaasTsProgress(swiper);
                },
                slideChange(swiper) {
                    updateSaasTsProgress(swiper);
                },
            },
        });
    }

    const saasFaqSection = document.querySelector('.saas-faq');
    if (saasFaqSection) {
        const saasFaqItems = saasFaqSection.querySelectorAll('.saas-faq_item');

        const setSaasFaqAnswerHeight = (item) => {
            const answer = item.querySelector('.saas-faq_answer');
            if (answer && item.classList.contains('active')) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        };

        saasFaqItems.forEach((item) => {
            const btn = item.querySelector('.saas-faq_question');
            const answer = item.querySelector('.saas-faq_answer');
            if (!btn || !answer) return;

            if (item.classList.contains('active')) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }

            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                saasFaqItems.forEach((otherItem) => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.saas-faq_question');
                    const otherAnswer = otherItem.querySelector('.saas-faq_answer');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = `${answer.scrollHeight}px`;
                }
            });
        });

        window.addEventListener('resize', () => {
            saasFaqItems.forEach(setSaasFaqAnswerHeight);
        });
    }
});

/* ============================================================
   AIGENIX - AI CHATBOT HOMEPAGE SCRIPTS (bot- prefix)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initBotIntegFlow();
    initBotTsSwiper();

    const botHeader = document.querySelector('.bot-header');
    const botNavToggle = document.getElementById('bot-nav-toggle');
    const botNavClose = document.getElementById('bot-nav-close');
    const botNavMenu = document.getElementById('bot-nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const botNavItems = document.querySelectorAll('.bot-nav_item');
    const BOT_MOBILE_BREAKPOINT = 1024;

    if (!botHeader) return;

    const botTopbar = botHeader.querySelector('.bot-topbar');
    let lastBotScroll = 0;
    let botScrollTicking = false;
    const BOT_TOPBAR_HIDE_OFFSET = 72;
    const BOT_TOPBAR_SHOW_OFFSET = 24;

    const updateBotScroll = () => {
        const scroll = Math.max(window.scrollY || window.pageYOffset || 0, 0);
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nearBottom = docHeight > 0 && scroll >= docHeight - BOT_TOPBAR_HIDE_OFFSET;
        const scrollingDown = scroll > lastBotScroll;
        const atTop = scroll <= BOT_TOPBAR_SHOW_OFFSET;

        let hideTopbar = false;

        if (atTop) {
            hideTopbar = false;
        } else if (nearBottom) {
            hideTopbar = true;
        } else if (scroll > BOT_TOPBAR_HIDE_OFFSET && scrollingDown) {
            hideTopbar = true;
        } else if (!scrollingDown) {
            hideTopbar = false;
        } else {
            hideTopbar = botHeader.classList.contains('bot-header-scrolled');
        }

        botHeader.classList.toggle('bot-header-scrolled', hideTopbar);
        botTopbar?.setAttribute('aria-hidden', hideTopbar ? 'true' : 'false');

        lastBotScroll = scroll;
        botScrollTicking = false;
    };

    const onBotScroll = () => {
        if (!botScrollTicking) {
            botScrollTicking = true;
            requestAnimationFrame(updateBotScroll);
        }
    };

    updateBotScroll();
    window.addEventListener('scroll', onBotScroll, { passive: true });
    window.addEventListener('resize', updateBotScroll, { passive: true });

    function closeBotMobileNav() {
        botNavMenu?.classList.remove('active');
        botNavToggle?.classList.remove('active');
        botNavToggle?.setAttribute('aria-expanded', 'false');
        navBackdrop?.classList.remove('show');
        document.body.classList.remove('nav-open');
        botNavItems.forEach((item) => item.classList.remove('open'));
    }

    function openBotMobileNav() {
        botNavMenu?.classList.add('active');
        botNavToggle?.classList.add('active');
        botNavToggle?.setAttribute('aria-expanded', 'true');
        navBackdrop?.classList.add('show');
        document.body.classList.add('nav-open');
    }

    if (botNavToggle && botNavMenu) {
        botNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (botNavMenu.classList.contains('active')) {
                closeBotMobileNav();
            } else {
                openBotMobileNav();
            }
        });

        botNavMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        navBackdrop?.addEventListener('click', closeBotMobileNav);

        botNavMenu.querySelectorAll('a.bot-dropdown_link, a.bot-nav_link[href]').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= BOT_MOBILE_BREAKPOINT) {
                    closeBotMobileNav();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeBotMobileNav();
            }
        });
    }

    botNavClose?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeBotMobileNav();
    });

    botNavItems.forEach((item) => {
        const link = item.querySelector(':scope > .bot-nav_link');
        const dropdown = item.querySelector(':scope > .bot-dropdown');

        if (!link || !dropdown) return;

        link.addEventListener('click', (e) => {
            if (window.innerWidth > BOT_MOBILE_BREAKPOINT) return;

            e.preventDefault();
            e.stopPropagation();

            const isOpen = item.classList.contains('open');
            item.parentElement.querySelectorAll(':scope > .bot-nav_item.open').forEach((sibling) => {
                if (sibling !== item) sibling.classList.remove('open');
            });
            item.classList.toggle('open', !isOpen);
        });
    });
});

function initBotIntegFlow() {
    const wrap = document.querySelector('.bot-integ_bridge-wrap');
    const bridge = wrap?.querySelector('.bot-integ_bridge');
    const hubCore = wrap?.querySelector('.bot-integ_hub-core');
    const linesGroup = wrap?.querySelector('.bot-integ_flow-lines');
    const svg = wrap?.querySelector('.bot-integ_flow');

    if (!wrap || !bridge || !hubCore || !linesGroup || !svg) return;

    let flowTicking = false;
    let flowStableTimer = null;
    let lastLayoutSignature = '';

    const getBridgeLayoutMode = () => {
        const columns = window
            .getComputedStyle(bridge)
            .gridTemplateColumns.trim()
            .split(/\s+/)
            .filter(Boolean);

        if (columns.length >= 3) return 'desktop';
        if (columns.length === 2) return 'tablet';
        return 'mobile';
    };

    const isBridgeMotionSettled = () => {
        if (!bridge.hasAttribute('data-aos')) return true;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return true;
        }

        if (!bridge.classList.contains('aos-animate')) {
            return false;
        }

        const transform = window.getComputedStyle(bridge).transform;
        if (!transform || transform === 'none') {
            return true;
        }

        const matrix = new DOMMatrixReadOnly(transform);
        return (
            Math.abs(matrix.m41) < 0.5 &&
            Math.abs(matrix.m42) < 0.5 &&
            Math.abs(matrix.m11 - 1) < 0.02 &&
            Math.abs(matrix.m22 - 1) < 0.02
        );
    };

    const getStabilitySignature = () => {
        const wrapRect = wrap.getBoundingClientRect();
        const hubRect = hubCore.getBoundingClientRect();
        const bridgeStyle = window.getComputedStyle(bridge);

        return [
            getBridgeLayoutMode(),
            bridge.classList.contains('aos-animate') ? 'aos-on' : 'aos-off',
            bridgeStyle.transform,
            bridgeStyle.opacity,
            wrapRect.width.toFixed(1),
            wrapRect.height.toFixed(1),
            hubRect.left.toFixed(1),
            hubRect.top.toFixed(1),
            hubRect.width.toFixed(1),
            hubRect.height.toFixed(1),
        ].join('|');
    };

    const isLayoutMeasurable = () => {
        const wrapRect = wrap.getBoundingClientRect();
        const hubRect = hubCore.getBoundingClientRect();

        if (wrapRect.width < 1 || wrapRect.height < 1) return false;
        if (hubRect.width < 8 || hubRect.height < 8) return false;

        return Array.from(bridge.querySelectorAll('.bot-integ_link')).every((link) => {
            const rect = link.getBoundingClientRect();
            return rect.width > 8 && rect.height > 8;
        });
    };

    const buildFlowPath = (x1, y1, x2, y2, bend) => {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = (-dy / len) * bend;
        const ny = (dx / len) * bend;

        return `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${(mx + nx).toFixed(2)} ${(my + ny).toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
    };

    const getFlowEndpoints = (linkRect, hubRect, wrapRect) => {
        const wrapLeft = wrapRect.left;
        const wrapTop = wrapRect.top;

        const linkCx = linkRect.left + linkRect.width / 2 - wrapLeft;
        const linkCy = linkRect.top + linkRect.height / 2 - wrapTop;
        const hubCx = hubRect.left + hubRect.width / 2 - wrapLeft;
        const hubCy = hubRect.top + hubRect.height / 2 - wrapTop;

        const dx = hubCx - linkCx;
        const dy = hubCy - linkCy;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        let x1;
        let y1;

        if (absDx >= absDy) {
            x1 = dx >= 0 ? linkRect.right - wrapLeft : linkRect.left - wrapLeft;
            y1 = linkCy;
        } else {
            x1 = linkCx;
            y1 = dy >= 0 ? linkRect.bottom - wrapTop : linkRect.top - wrapTop;
        }

        const dist = Math.hypot(dx, dy) || 1;
        const hubR = Math.min(hubRect.width, hubRect.height) * 0.52;
        const ux = (linkCx - hubCx) / dist;
        const uy = (linkCy - hubCy) / dist;
        const x2 = hubCx + ux * hubR;
        const y2 = hubCy + uy * hubR;

        return { x1, y1, x2, y2, absDx, absDy };
    };

    const getDesktopFlowEndpoints = (linkRect, hubRect, wrapRect, isLeftSide) => {
        const wrapLeft = wrapRect.left;
        const wrapTop = wrapRect.top;

        const linkCx = linkRect.left + linkRect.width / 2 - wrapLeft;
        const linkCy = linkRect.top + linkRect.height / 2 - wrapTop;
        const hubCx = hubRect.left + hubRect.width / 2 - wrapLeft;
        const hubCy = hubRect.top + hubRect.height / 2 - wrapTop;
        const hubR = Math.min(hubRect.width, hubRect.height) * 0.52;

        const x1 = isLeftSide ? linkRect.right - wrapLeft : linkRect.left - wrapLeft;
        const y1 = linkCy;

        const dx = linkCx - hubCx;
        const dy = linkCy - hubCy;
        const dist = Math.hypot(dx, dy) || 1;
        const x2 = hubCx + (dx / dist) * hubR;
        const y2 = hubCy + (dy / dist) * hubR;

        return {
            x1,
            y1,
            x2,
            y2,
            linkCy,
            hubCy,
            absDx: Math.abs(x1 - x2),
            absDy: Math.abs(y1 - y2),
        };
    };

    const getDesktopBend = (isLeftSide, linkCy, hubCy, sideIndex) => {
        const bendBase = 16 + (sideIndex % 3) * 5;
        const verticalOffset = linkCy - hubCy;
        const outward = verticalOffset >= 0 ? bendBase : -bendBase;

        return isLeftSide ? outward : -outward;
    };

    const buildFlowLinesData = () => {
        const wrapRect = wrap.getBoundingClientRect();
        const hubRect = hubCore.getBoundingClientRect();
        const layoutMode = getBridgeLayoutMode();
        const isDesktopBridge = layoutMode === 'desktop';
        const links = bridge.querySelectorAll('.bot-integ_link');
        const lines = [];

        links.forEach((link, index) => {
            const linkRect = link.getBoundingClientRect();
            const isLeftSide = !!link.closest('.bot-integ_side--left');
            const isRightSide = !!link.closest('.bot-integ_side--right');
            const sideRoot = link.closest('.bot-integ_side');
            const sideIndex = sideRoot
                ? Array.from(sideRoot.querySelectorAll('.bot-integ_link')).indexOf(link)
                : index;

            let x1;
            let y1;
            let x2;
            let y2;
            let absDx;
            let absDy;
            let linkCy;
            let hubCy;
            let bend;

            if (isDesktopBridge && (isLeftSide || isRightSide)) {
                const desktop = getDesktopFlowEndpoints(linkRect, hubRect, wrapRect, isLeftSide);
                ({ x1, y1, x2, y2, linkCy, hubCy, absDx, absDy } = desktop);
                bend = getDesktopBend(isLeftSide, linkCy, hubCy, sideIndex);
            } else {
                const endpoints = getFlowEndpoints(linkRect, hubRect, wrapRect);
                ({ x1, y1, x2, y2, absDx, absDy } = endpoints);
                linkCy = linkRect.top + linkRect.height / 2 - wrapRect.top;
                hubCy = hubRect.top + hubRect.height / 2 - wrapRect.top;
                const bendSign = sideIndex % 2 === 0 ? 1 : -1;
                const bendBase = layoutMode === 'mobile' ? 10 : 12;
                bend = absDx >= absDy ? bendBase * bendSign : bendBase * bendSign * 0.65;
            }

            const pathD = buildFlowPath(x1, y1, x2, y2, bend);
            const gradId = `bot-integ-grad-${index}`;
            const delay = (sideIndex * 0.18).toFixed(2);
            const dur = (2.1 + (sideIndex % 4) * 0.25).toFixed(2);

            lines.push({ pathD, gradId, x1, y1, x2, y2, delay, dur, sideIndex });
        });

        return { lines, wrapRect };
    };

    const applyFlowLinePaths = (lineEl, lineData) => {
        const { pathD, gradId, x1, y1, x2, y2 } = lineData;

        lineEl.querySelectorAll('.bot-integ_flow-track, .bot-integ_flow-pulse').forEach((path) => {
            path.setAttribute('d', pathD);
        });

        lineEl.querySelectorAll('animateMotion').forEach((motion) => {
            motion.setAttribute('path', pathD);
        });

        const grad = svg.querySelector(`#${gradId}`);
        if (grad) {
            grad.setAttribute('x1', x1.toFixed(2));
            grad.setAttribute('y1', y1.toFixed(2));
            grad.setAttribute('x2', x2.toFixed(2));
            grad.setAttribute('y2', y2.toFixed(2));
        }
    };

    const drawBotIntegFlow = (silent = false) => {
        if (!isLayoutMeasurable()) return false;

        const { lines, wrapRect } = buildFlowLinesData();
        const defs = svg.querySelector('defs');
        const existingLines = [...linesGroup.querySelectorAll('.bot-integ_flow-line')];

        svg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${wrapRect.height}`);

        if (silent && existingLines.length === lines.length) {
            lines.forEach((lineData, index) => {
                applyFlowLinePaths(existingLines[index], lineData);
            });
            wrap.classList.add('bot-integ_bridge-wrap--flow');
            return true;
        }

        const gradientMarkup = [];
        const lineMarkup = [];

        lines.forEach((lineData) => {
            const { pathD, gradId, x1, y1, x2, y2, delay, dur, sideIndex } = lineData;

            gradientMarkup.push(`
                <linearGradient id="${gradId}" gradientUnits="userSpaceOnUse"
                    x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}"
                    x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}">
                    <stop offset="0%" stop-color="rgba(3, 70, 81, 0.18)" />
                    <stop offset="55%" stop-color="rgba(184, 251, 4, 0.95)" />
                    <stop offset="100%" stop-color="rgba(184, 251, 4, 0.42)" />
                </linearGradient>
            `);

            lineMarkup.push(`
                <g class="bot-integ_flow-line" style="--flow-delay:${delay}s">
                    <path class="bot-integ_flow-track" d="${pathD}" />
                    <path class="bot-integ_flow-pulse" d="${pathD}" pathLength="100" stroke="url(#${gradId})" />
                    <circle class="bot-integ_flow-dot" r="3.5" opacity="0">
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="${dur}s" repeatCount="indefinite" begin="${delay}s" />
                        <animateMotion dur="${dur}s" repeatCount="indefinite" begin="${delay}s" path="${pathD}" calcMode="linear" />
                    </circle>
                    <circle class="bot-integ_flow-dot bot-integ_flow-dot--soft" r="2" opacity="0">
                        <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.9;1" dur="${dur}s" repeatCount="indefinite" begin="${(parseFloat(delay) + 0.45).toFixed(2)}s" />
                        <animateMotion dur="${dur}s" repeatCount="indefinite" begin="${(parseFloat(delay) + 0.45).toFixed(2)}s" path="${pathD}" calcMode="linear" />
                    </circle>
                </g>
            `);
        });

        if (defs) {
            defs.innerHTML = gradientMarkup.join('');
        }

        linesGroup.innerHTML = lineMarkup.join('');
        wrap.classList.add('bot-integ_bridge-wrap--flow');
        return true;
    };

    const markFlowReady = (signature) => {
        if (signature) {
            lastLayoutSignature = signature;
        }
        wrap.classList.add('bot-integ_bridge-wrap--flow-ready');
    };

    const scheduleBotIntegFlow = () => {
        if (flowTicking) return;
        flowTicking = true;

        const wasReady = wrap.classList.contains('bot-integ_bridge-wrap--flow-ready');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const firstSignature = getStabilitySignature();
                const drew = drawBotIntegFlow(wasReady);

                requestAnimationFrame(() => {
                    const secondSignature = getStabilitySignature();
                    const isStable =
                        drew &&
                        firstSignature === secondSignature &&
                        isLayoutMeasurable() &&
                        isBridgeMotionSettled();

                    if (isStable) {
                        if (secondSignature !== lastLayoutSignature) {
                            drawBotIntegFlow(wasReady);
                        }
                        markFlowReady(secondSignature);
                        flowTicking = false;
                        return;
                    }

                    flowTicking = false;
                    clearTimeout(flowStableTimer);
                    flowStableTimer = setTimeout(scheduleBotIntegFlow, 80);
                });
            });
        });
    };

    const queueBotIntegFlow = (resetVisibility = false) => {
        const isReady = wrap.classList.contains('bot-integ_bridge-wrap--flow-ready');

        if (resetVisibility || !isReady) {
            wrap.classList.remove('bot-integ_bridge-wrap--flow-ready');
        }

        clearTimeout(flowStableTimer);
        flowStableTimer = setTimeout(scheduleBotIntegFlow, 40);
    };

    queueBotIntegFlow();
    window.addEventListener('resize', queueBotIntegFlow, { passive: true });
    window.addEventListener('load', queueBotIntegFlow);

    if (document.fonts?.ready) {
        document.fonts.ready.then(queueBotIntegFlow).catch(() => { });
    }

    if (typeof ResizeObserver !== 'undefined') {
        const observedSizes = new Map();

        const flowObserver = new ResizeObserver((entries) => {
            let sizeChanged = false;

            entries.forEach((entry) => {
                const { width, height } = entry.contentRect;
                const prev = observedSizes.get(entry.target);

                if (
                    !prev ||
                    Math.abs(prev.width - width) > 0.5 ||
                    Math.abs(prev.height - height) > 0.5
                ) {
                    observedSizes.set(entry.target, { width, height });
                    sizeChanged = true;
                }
            });

            if (sizeChanged) {
                queueBotIntegFlow();
            }
        });

        flowObserver.observe(wrap);
        flowObserver.observe(bridge);
        flowObserver.observe(hubCore);
    }

    document.addEventListener('aos:in', (event) => {
        if (event.detail instanceof Element && wrap.contains(event.detail)) {
            queueBotIntegFlow();
        }
    });

    bridge.addEventListener('transitionend', (event) => {
        if (event.target !== bridge) return;

        if (event.propertyName === 'transform' || event.propertyName === 'opacity') {
            queueBotIntegFlow();
        }
    });

    if (typeof MutationObserver !== 'undefined' && bridge.hasAttribute('data-aos')) {
        const aosClassObserver = new MutationObserver(() => {
            queueBotIntegFlow();
        });
        aosClassObserver.observe(bridge, { attributes: true, attributeFilter: ['class'] });
    }

    [300, 700, 1100, 1600, 2200].forEach((delay) => {
        setTimeout(queueBotIntegFlow, delay);
    });
}

function initBotTsSwiper() {
    const swiperEl = document.querySelector('.bot-ts_swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    if (swiperEl.swiper) {
        swiperEl.swiper.destroy(true, true);
    }

    const stage = swiperEl.closest('.bot-ts_stage');
    const paginationEl = stage?.querySelector('.bot-ts_pagination');

    const revealSwiper = () => {
        swiperEl.classList.add('bot-ts_swiper--ready');
    };

    let botTsAutoplayTimer = null;
    let botTsSwiper = null;

    const startBotTsAutoplay = () => {
        clearInterval(botTsAutoplayTimer);
        botTsAutoplayTimer = setInterval(() => {
            if (!botTsSwiper || botTsSwiper.destroyed) return;
            if (botTsSwiper.isEnd) {
                botTsSwiper.slideTo(0);
            } else {
                botTsSwiper.slideNext();
            }
        }, 5000);
    };

    botTsSwiper = new Swiper(swiperEl, {
        allowTouchMove: false,
        simulateTouch: false,
        grabCursor: false,
        centeredSlides: true,
        centeredSlidesBounds: false,
        slidesPerView: 'auto',
        initialSlide: 0,
        loop: false,
        rewind: true,
        speed: 700,
        spaceBetween: 24,
        watchSlidesProgress: true,
        pagination: {
            el: paginationEl,
            clickable: false,
            bulletClass: 'bot-ts_bullet',
            bulletActiveClass: 'is-active',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: true,
            },
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 24,
                centeredSlides: true,
            },
        },
        on: {
            init(swiper) {
                requestAnimationFrame(() => {
                    swiper.update();
                    revealSwiper();
                    startBotTsAutoplay();
                });
            },
            resize(swiper) {
                swiper.update();
            },
        },
    });

    let resizeTicking = false;
    const scheduleBotTsUpdate = () => {
        if (resizeTicking) return;
        resizeTicking = true;
        requestAnimationFrame(() => {
            botTsSwiper.update();
            resizeTicking = false;
        });
    };

    window.addEventListener('resize', scheduleBotTsUpdate, { passive: true });
    window.addEventListener('load', scheduleBotTsUpdate, { once: true });

    document.addEventListener('aos:in', (event) => {
        if (event.detail instanceof Element && stage?.contains(event.detail)) {
            scheduleBotTsUpdate();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(botTsAutoplayTimer);
        } else {
            startBotTsAutoplay();
        }
    });
}
