const config = {
    site: {
        title: "ATMLuck的AGC小屋 | 个人主页",
        logo: "img/icons/cherry-blossom.svg",
        name: "ATMLuck的AGC小屋"
    },
    hero: {
        greeting: "欢迎来到我的小屋喵~",
        name: "ATMLuck",
        titles: ["ATMLuck", "二次元爱好者", "C++/C#"],
        description: "一名热爱二次元文化的学生，喜欢用代码创造美好的事物。梦想是构建一个充满科技与幻想的数字世界，在这里分享我的创作与日常~ 喵~ <img src=\"img/icons/paw-prints.svg\" class=\"icon-inline\" alt=\"\">",
        tags: [
            { icon: "img/icons/laptop.svg", text: "后端开发" },
            { icon: "img/icons/artist-palette.svg", text: "素描绘画" },
            { icon: "img/icons/video-game.svg", text: "游戏爱好者" },
            { icon: "img/icons/camera.svg", text: "视频剪辑" },
            { icon: "img/icons/musical-note.svg", text: "音乐" }
        ],
        buttons: {
            primary: { text: "探索作品", icon: "img/icons/arrow-right-white.svg", href: "#projects" },
            secondary: { text: "联系我", href: "#contact" }
        },
        avatar: "img/ynz.webp",
        fallbackAvatar: "img/icons/cat-face.svg"
    },
    // 技能与项目数据已分离至 config/skills.json、config/projects.json、config/contact.json，
    // 由 loadDynamicSections() 在页面加载时 fetch 并渲染，增删内容直接改 JSON 即可
    footer: {
        text: "ATMLuck的AGC小屋 | 陇ICP备2026004953号-1",
        year: 2026
    },
    nav: [
        { label: "首页", href: "#home" },
        { label: "技能", href: "#skills" },
        { label: "项目", href: "#projects" },
        // { label: "历程", href: "#timeline" },
        { label: "联系", href: "#contact" }
    ]
};

// 判断 icon 字段是否为图片路径（兼容旧的 Emoji 文本写法）
function isIconImage(v) {
    return typeof v === 'string' && (v.startsWith('img/') || /\.(svg|png|webp|jpe?g|gif)$/i.test(v));
}

// 渲染图标：图片路径输出 <img>，否则按原文本（Emoji）输出
function iconMarkup(icon, cls = 'icon-img') {
    return isIconImage(icon) ? `<img src="${icon}" class="${cls}" alt="">` : (icon || '');
}

// 加载配置（现在直接使用嵌入的配置）
function loadConfig() {
    applyConfig();
}

// 应用配置到页面
function applyConfig() {
    // 站点信息
    document.title = config.site.title;
    document.querySelector('.logo span').textContent = config.site.name;
    document.querySelector('.logo-icon').innerHTML = iconMarkup(config.site.logo, 'logo-icon-img');

    // Hero 区域
    document.getElementById('greetingText').textContent = config.hero.greeting;
    document.querySelector('.hero-description').innerHTML = config.hero.description;

    // 渲染Hero标签
    renderHeroTags();

    // 渲染Hero按钮
    renderHeroButtons();

    // 加载头像
    loadAvatar();

    // 渲染时间线
    renderTimeline();

    // 渲染页脚
    renderFooter();

    // 渲染导航
    renderNav();
}

// 渲染Hero标签
function renderHeroTags() {
    const container = document.querySelector('.hero-tags');
    if (!container || !config.hero.tags) return;
    container.innerHTML = config.hero.tags.map(tag =>
        `<span class="tag">${iconMarkup(tag.icon, 'tag-icon')}${tag.text}</span>`
    ).join('');

    // 重新绑定标签点击效果
    initTagEffects();
}

// 渲染Hero按钮
function renderHeroButtons() {
    const container = document.querySelector('.cta-buttons');
    if (!container || !config.hero.buttons) return;

    const buttons = config.hero.buttons;
    container.innerHTML = `
        <a href="${buttons.primary.href}" class="btn btn-primary">
            <span>${buttons.primary.text}</span>
            <span class="btn-icon">${iconMarkup(buttons.primary.icon, 'btn-icon-img')}</span>
        </a>
        <a href="${buttons.secondary.href}" class="btn btn-secondary">${buttons.secondary.text}</a>
    `;

    // 点赞按钮已移除
    // container.innerHTML = `
    //     <a href="${buttons.primary.href}" class="btn btn-primary">
    //         <span>${buttons.primary.text}</span>
    //         <span>${buttons.primary.icon}</span>
    //     </a>
    //     <a href="${buttons.secondary.href}" class="btn btn-secondary">${buttons.secondary.text}</a>
    //     <button class="btn btn-like" id="likeBtn" title="点赞">
    //         <span class="like-icon" id="likeIcon">☆</span>
    //         <span class="like-count" id="likeCount">0</span>
    //     </button>
    // `;
    // initLikeButton();
}

// 初始化点赞按钮
// function initLikeButton() {
//     const likeBtn = document.getElementById('likeBtn');
//     const likeIcon = document.getElementById('likeIcon');
//     const likeCount = document.getElementById('likeCount');
//     if (!likeBtn || !likeIcon || !likeCount) return;

//     // 从 localStorage 读取用户点赞状态
//     const hasLiked = localStorage.getItem('hasLiked') === 'true';
//     // 获取总点赞数（实际项目中应从服务器获取）
//     let totalLikes = parseInt(localStorage.getItem('totalLikes') || '42');

//     // 如果用户已点赞，确保计数包含用户的点赞
//     if (hasLiked) {
//         likeIcon.textContent = '★';
//         likeBtn.classList.add('liked');
//     }
//     likeCount.textContent = totalLikes;

//     // 点击事件
//     likeBtn.addEventListener('click', function() {
//         const currentlyLiked = likeBtn.classList.contains('liked');

//         if (currentlyLiked) {
//             // 取消点赞
//             likeBtn.classList.remove('liked');
//             likeIcon.textContent = '☆';
//             totalLikes--;
//             localStorage.setItem('hasLiked', 'false');
//         } else {
//             // 点赞
//             likeBtn.classList.add('liked');
//             likeIcon.textContent = '★';
//             totalLikes++;
//             localStorage.setItem('hasLiked', 'true');
//             // 添加动画效果
//             likeIcon.style.transform = 'scale(1.3)';
//             setTimeout(() => {
//                 likeIcon.style.transform = 'scale(1)';
//             }, 200);
//         }

//         likeCount.textContent = totalLikes;
//         localStorage.setItem('totalLikes', totalLikes.toString());
//     });
// }

// 渲染页脚
function renderFooter() {
    const footerText = document.querySelector('.footer-text');
    if (footerText && config.footer) {
        footerText.innerHTML = `${config.footer.text} | ${config.footer.year}`;
    }
}

// 渲染导航
function renderNav() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && config.nav) {
        navLinks.innerHTML = config.nav.map(item =>
            `<li><a href="${item.href}">${item.label}</a></li>`
        ).join('');
    }
}

// 加载头像
function loadAvatar() {
    const imgElement = document.getElementById('characterImg');
    const img = new Image();
    img.onload = function() {
        imgElement.innerHTML = `<img src="${config.hero.avatar}" alt="${config.hero.name}">`;
    };
    img.onerror = function() {
        imgElement.innerHTML = iconMarkup(config.hero.fallbackAvatar, 'fallback-avatar');
    };
    img.src = config.hero.avatar;
}

// 从 JSON 配置加载技能、项目与联系信息并渲染
// 配置文件：config/skills.json、config/projects.json、config/contact.json
// 注意：需通过 HTTP(S) 访问；file:// 双击打开时浏览器禁止 fetch 本地文件，会显示加载失败提示
async function loadDynamicSections() {
    const load = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    const showError = (containerSel, msg) => {
        const el = document.querySelector(containerSel);
        if (el) el.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-secondary, #5A8BB8);">${iconMarkup('img/icons/warning.svg', 'icon-inline')} ${msg}</p>`;
    };

    try {
        const skills = await load('config/skills.json');
        renderSkills(skills);
        animateSkills();
    } catch (err) {
        console.warn('技能配置加载失败：', err);
        showError('.skills-grid', '技能内容加载失败：请通过 HTTP 服务访问页面（直接双击打开的 HTML 无法读取配置文件）');
    }

    try {
        const projects = await load('config/projects.json');
        renderProjects(projects);
    } catch (err) {
        console.warn('项目配置加载失败：', err);
        showError('.projects-grid', '作品内容加载失败：请通过 HTTP 服务访问页面（直接双击打开的 HTML 无法读取配置文件）');
    }

    try {
        const contact = await load('config/contact.json');
        renderContact(contact);
    } catch (err) {
        console.warn('联系信息配置加载失败：', err);
        const descEl = document.querySelector('.contact-desc');
        if (descEl) descEl.innerHTML = `${iconMarkup('img/icons/warning.svg', 'icon-inline')} 联系信息加载失败：请通过 HTTP 服务访问页面（直接双击打开的 HTML 无法读取配置文件）`;
    }
}

// 渲染技能
function renderSkills(skills) {
    const container = document.querySelector('.skills-grid');
    if (!container || !Array.isArray(skills)) return;

    container.innerHTML = skills.map((skill, index) => `
        <div class="skill-card" data-skill="${skill.level}">
            <div class="skill-icon" style="animation-delay: ${index * 0.1}s">${iconMarkup(skill.icon, 'skill-icon-img')}</div>
            <div class="skill-name">${skill.name}</div>
            <p class="skill-desc">${skill.desc || ''}</p>
            <div class="skill-level">
                <div class="skill-progress"></div>
            </div>
        </div>
    `).join('');
}

// 渲染项目
function renderProjects(projects) {
    const container = document.querySelector('.projects-grid');
    if (!container || !Array.isArray(projects)) return;

    container.innerHTML = projects.map(project => `
        <a href="${project.link || '#'}" class="project-card-link" target="_blank" rel="noopener noreferrer" title="点击访问项目">
            <div class="project-card">
                <div class="project-image">${iconMarkup(project.icon, 'project-icon-img')}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc || ''}</p>
                    <div class="project-tech">
                        ${(project.techs || []).map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </a>
    `).join('');
}

// 渲染时间线
function renderTimeline() {
    const container = document.querySelector('.timeline');
    if (!container || !config.timeline) return;

    container.innerHTML = config.timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
            <div class="timeline-dot"></div>
        </div>
    `).join('');
}

// 渲染联系信息
function renderContact(contact) {
    if (!contact) return;

    const descEl = document.querySelector('.contact-desc');
    const emailEl = document.querySelector('.contact-email');
    const socialsEl = document.querySelector('.social-links');

    if (descEl) descEl.textContent = contact.desc;
    if (emailEl) emailEl.textContent = contact.email;

    if (socialsEl && contact.socials) {
        socialsEl.innerHTML = contact.socials.map(social => `
            <a href="${social.url}" class="social-link" title="${social.title}">${iconMarkup(social.icon, 'social-icon-img')}</a>
        `).join('');

        // 重新绑定社交链接事件
        bindSocialLinks();
    }
}

// 页面加载动画：DOM 就绪即收起，不等待大体积图片下载完成
// （技能进度条动画在 loadDynamicSections 渲染完成后触发）
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 800);
});

// 创建粒子背景
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// 创建樱花花瓣 - 数量较少，速度较慢
function createSakura() {
    const container = document.getElementById('sakuraContainer');
    if (!container) return;

    const petalCount = 12; // 数量较少
    const animations = ['sakura-fall-1', 'sakura-fall-2', 'sakura-fall-3', 'sakura-fall-4'];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';

        // 随机位置
        petal.style.left = Math.random() * 100 + '%';

        // 随机动画类型
        const animType = animations[Math.floor(Math.random() * animations.length)];
        petal.style.animationName = animType;

        // 较慢的飘落速度：12-20秒
        const duration = 12 + Math.random() * 8;
        petal.style.animationDuration = duration + 's';

        // 随机延迟，让花瓣分散出现
        petal.style.animationDelay = Math.random() * 15 + 's';

        // 随机大小
        const scale = 0.7 + Math.random() * 0.5;
        petal.style.transform = `scale(${scale})`;

        // 无限循环
        petal.style.animationIterationCount = 'infinite';
        petal.style.animationTimingFunction = 'linear';

        container.appendChild(petal);
    }
}

// 鼠标跟随光效
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 打字机效果
function initTypingEffect() {
    const texts = config.hero?.titles || ['ATMLuck', '二次元爱好者', 'C++/C#'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
}

// 问候语根据时间变化
function updateGreeting() {
    const greetingElement = document.getElementById('greetingText');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = config.hero?.greeting || '欢迎来到我的小窝~';

    if (hour >= 5 && hour < 12) {
        greeting = '早上好呀，新的一天要元气满满哦~';
    } else if (hour >= 12 && hour < 18) {
        greeting = '下午好，工作学习辛苦啦~';
    } else if (hour >= 18 && hour < 22) {
        greeting = '晚上好，是放松时间了呢~';
    } else {
        greeting = '夜深了，要注意休息哦~';
    }

    greetingElement.textContent = greeting;
}

// 技能进度条动画
function animateSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.dataset.skill;
                const progress = entry.target.querySelector('.skill-progress');
                if (progress) {
                    setTimeout(() => {
                        progress.style.width = skillLevel + '%';
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

// 导航栏滚动效果
function initNavScroll() {
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.boxShadow = '0 5px 30px rgba(94, 180, 255, 0.15)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.65)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// 标签点击效果
function initTagEffects() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 社交链接事件绑定
function bindSocialLinks() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            const title = this.getAttribute('title');
            showNotification(`正在跳转到 ${title}...`);

            // 延迟跳转，让用户看到提示
            setTimeout(() => {
                window.open(url, '_blank');
            }, 500);
        });
    });
}

// 通知提示
function showNotification(message) {
    // 移除现有通知
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #5EB4FF, #A8D8FF);
        padding: 16px 35px;
        border-radius: 30px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 10px 30px rgba(94, 180, 255, 0.4);
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 添加动画样式
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// 项目卡片 3D 倾斜效果
function initCardTilt() {
    document.querySelectorAll('.project-card-link').forEach(link => {
        const card = link.querySelector('.project-card');
        if (!card) return;

        link.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        link.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// 彩蛋：Konami Code
function initEasterEgg() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                            'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // 彩虹滤镜必须挂在根元素上：挂在 body 会因 filter 生成 containing block，
            // 导致 body 内所有 position:fixed 元素（拖尾画布、光晕、导航栏）退化为文档定位而脱离视口
            document.documentElement.style.animation = 'rainbow 3s linear infinite';
            showNotification(`${iconMarkup('img/icons/party-popper.svg', 'icon-inline')} 彩蛋解锁！彩虹模式启动！`);

            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }
    });
}

// 初始化标签页
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

// 背景两侧图片装饰
function initSideDecorations() {
    const images = [
        'img/ynz.webp',
        'img/ynz1.webp',
        'img/ynzd.webp',
        'img/ynz (3).webp',
        'img/ynz (4).webp',
        'img/ynz (8).webp',
        'img/ynz (9).webp',
        'img/ynz (11).webp'
    ];

    const main = document.querySelector('main');
    if (!main) return;

    const container = document.createElement('div');
    container.id = 'sideDecorations';
    container.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;

    const spacing = 800;
    const mainHeight = main.scrollHeight;
    const count = Math.max(3, Math.ceil(mainHeight / spacing));

    for (let i = 0; i < count; i++) {
        const y = i * spacing + 200;

        const leftImg = images[i % images.length];
        const rightImg = images[(i + Math.floor(images.length / 2)) % images.length];

        const leftEl = document.createElement('img');
        leftEl.src = leftImg;
        // 装饰图不在首屏，懒加载避免抢占首屏带宽
        leftEl.loading = 'lazy';
        leftEl.decoding = 'async';
        leftEl.style.cssText = `
            position: absolute;
            left: 30px;
            top: ${y}px;
            width: 150px;
            height: auto;
            opacity: 0.12;
            transform: rotate(-8deg);
            transition: opacity 0.3s ease;
        `;

        const rightEl = document.createElement('img');
        rightEl.src = rightImg;
        rightEl.loading = 'lazy';
        rightEl.decoding = 'async';
        rightEl.style.cssText = `
            position: absolute;
            right: 30px;
            top: ${y + 400}px;
            width: 150px;
            height: auto;
            opacity: 0.12;
            transform: rotate(8deg);
            transition: opacity 0.3s ease;
        `;

        container.appendChild(leftEl);
        container.appendChild(rightEl);
    }

    main.style.position = 'relative';
    main.insertBefore(container, main.firstChild);
}

// 鼠标拖尾效果
function initCursorTrail() {
    const canvas = document.createElement('canvas');
    canvas.id = 'cursorTrail';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let trail = [];
    const trailDuration = 1000;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > 5) {
            trail.push({ x: e.clientX, y: e.clientY, time: now });
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function animate() {
        const now = Date.now();
        ctx.clearRect(0, 0, width, height);

        trail = trail.filter(point => now - point.time < trailDuration);

        if (trail.length > 1) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // 创建整体渐变：从轨迹起点（淡蓝）到终点（粉红）
            const startPoint = trail[0];
            const endPoint = trail[trail.length - 1];
            const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            gradient.addColorStop(0, 'rgba(168, 216, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 209, 220, 0.8)');

            // 绘制整条路径（使用统一的颜色和宽度渐变）
            for (let i = 1; i < trail.length; i++) {
                const p1 = trail[i - 1];
                const p2 = trail[i];
                const age = now - p1.time;
                const progress = 1 - (age / trailDuration);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 4 * progress + 2;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// 移动端菜单初始化
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');

    if (!menuBtn || !navLinks || !overlay) return;

    // 点击汉堡菜单按钮
    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // 点击遮罩层关闭菜单
    overlay.addEventListener('click', closeMobileMenu);

    // 点击导航链接后自动关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // 滑动关闭菜单
    let touchStartX = 0;
    navLinks.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const diff = touchX - touchStartX;
        if (diff < -50) {
            closeMobileMenu();
        }
    }, { passive: true });

    // ESC键关闭菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        menuBtn.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 检测是否为触摸设备
function isTouchDevice() {
    // 仅当主指针为粗精度（触摸）且无精细指针（鼠标）时，才判定为纯触摸设备
    return window.matchMedia('(pointer: coarse)').matches &&
           !window.matchMedia('(pointer: fine)').matches;

    // 旧版检测逻辑（过于激进，导致带触摸板的笔记本也误判为触摸设备）
    // return window.matchMedia('(pointer: coarse)').matches ||
    //        'ontouchstart' in window ||
    //        navigator.maxTouchPoints > 0;
}

// 初始化点击光圈特效
function initClickRipple() {
    // 移动端不启用
    if (isTouchDevice()) return;

    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        // 动画结束后移除元素
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 加载配置
    loadConfig();

    // 加载技能/项目 JSON 配置并渲染
    loadDynamicSections();

    // 初始化功能
    createParticles();
    createSakura();
    initSideDecorations();

    // 仅在非触摸设备上启用鼠标效果
    if (!isTouchDevice()) {
        initCursorGlow();
        initCursorTrail();
        initClickRipple();
    }

    initSmoothScroll();
    initTypingEffect();
    updateGreeting();
    initNavScroll();
    initTagEffects();
    bindSocialLinks();
    addAnimationStyles();
    initCardTilt();
    initEasterEgg();
    initTabs();
    initMobileMenu();

    // 控制台欢迎信息
    console.log('%c 🌸 ATMLuck的AGC小屋 %c 欢迎来访！',
        'background: linear-gradient(135deg, #5EB4FF, #A8D8FF); color: white; padding: 10px 20px; font-size: 16px; border-radius: 10px;',
        'background: #FFD1DC; color: white; padding: 10px 20px; font-size: 16px; border-radius: 10px;'
    );
    console.log('%c 彩蛋提示：试试输入 Konami Code ↑↑↓↓←→←→BA', 'color: #5EB4FF; font-size: 14px;');
});
