// 樱奈子更新日志 - 交互逻辑
// 版本内容已拆分至 versions/ 目录：
//   versions/versions.json   版本索引（元数据：版本号/标题/特性/日期等）
//   versions/v1.html ~ v4.html   各版本正文片段
// 新增版本：新建 versions/vX.html，并在 versions.json 数组头部加一条元数据

let versionData = [];

// 状态管理
let isMobile = false;
let sidebarCollapsed = false;

// 加载版本索引与内容片段
async function loadVersions() {
    // 读取索引
    const res = await fetch('versions/versions.json');
    if (!res.ok) throw new Error('versions.json: HTTP ' + res.status);
    versionData = await res.json();

    renderTimeline();

    // 并行加载所有版本正文片段
    await Promise.all(versionData.map(async (v) => {
        const r = await fetch('versions/' + v.file);
        if (!r.ok) throw new Error(v.file + ': HTTP ' + r.status);
        v.content = { html: await r.text() };
    }));

    renderContentSections();

    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

// 检测是否为移动端
function checkMobile() {
    return window.innerWidth <= 768;
}

// 渲染时间线
function renderTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    let html = '<div class="timeline-line"></div>';

    versionData.forEach((item, index) => {
        const isLast = index === versionData.length - 1;
        const mbClass = isLast ? '' : 'mb-4';
        const badgeHtml = item.badgeStyle
            ? `<span class="version-badge" style="${item.badgeStyle}">${item.version}</span>`
            : `<span class="version-badge ${item.badgeClass}">${item.version}</span>`;
        const activeClass = item.active ? 'active' : '';
        const tooltipText = `${item.version} ${item.title}`;

        html += `
            <div class="timeline-item ${mbClass} ${activeClass}" data-version="${item.id}" onclick="switchVersion('${item.id}')">
                <div class="timeline-dot"></div>
                <div class="timeline-tooltip">${tooltipText}</div>
                <div class="timeline-content">
                    ${badgeHtml}
                    <div class="timeline-text">
                        <h3 class="font-bold text-slate-800">${item.title}</h3>
                        <p class="text-sm text-slate-500 mt-1">${item.features}</p>
                        <p class="text-xs text-slate-400 mt-1">${item.date}</p>
                    </div>
                </div>
            </div>
        `;
    });

    html += `<div class="timeline-extension" style="position: absolute; left: 24px; top: 100%; width: 4px; height: calc(100vh - 300px); background: linear-gradient(to bottom, #4A90E2, #87CEFA, transparent); opacity: 0.3;"></div>`;

    timelineContainer.innerHTML = html;
}

// 渲染内容区域
function renderContentSections() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    let html = '';

    versionData.forEach((version, index) => {
        const activeClass = version.active ? 'active' : '';

        html += `
            <div id="${version.id}-content" class="content-section ${activeClass}">
                <div class="container mx-auto px-4 pt-2 pb-16">
                    <div class="anime-border rounded-2xl p-1 md:p-4 mb-8">
                        ${version.content.html}
                    </div>
                </div>
                ${renderFooter()}
            </div>
        `;
    });

    mainContent.innerHTML = html;
}

// 渲染页脚
function renderFooter() {
    return `
        <footer class="bg-navy/90 text-white py-6 shadow-anime">
            <div class="container mx-auto px-4 text-center">
                <p class="mb-2">樱奈子 Bot - 二次元智能助手 | 陇ICP备2026004953号-1</p>
                <p class="text-sm text-lightBlue/80">© 2026 ATMLuck 保留所有权利</p>
            </div>
        </footer>
    `;
}

// 版本切换功能
function switchVersion(version) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contentSections = document.querySelectorAll('.content-section');

    for (let i = 0; i < timelineItems.length; i++) {
        timelineItems[i].classList.remove('active');
        if (timelineItems[i].getAttribute('data-version') === version) {
            timelineItems[i].classList.add('active');
        }
    }

    for (let j = 0; j < contentSections.length; j++) {
        contentSections[j].classList.remove('active');
    }

    const targetContent = document.getElementById(version + '-content');
    if (targetContent) {
        targetContent.classList.add('active');
    }

    window.scrollTo(0, 0);

    if (isMobile) {
        closeMobileSidebar();
    }

    return false;
}

// 关闭移动端侧边栏
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 打开移动端侧边栏
function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 切换桌面端侧边栏显示/隐藏
function toggleDesktopSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (!sidebar || !mainContent) return;

    sidebarCollapsed = !sidebarCollapsed;

    if (sidebarCollapsed) {
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.opacity = '0';
        mainContent.style.marginLeft = '0';
    } else {
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.opacity = '1';
        mainContent.style.marginLeft = '288px';
    }

    localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
}

// 侧边栏切换入口
function toggleSidebar() {
    if (isMobile) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }
    } else {
        toggleDesktopSidebar();
    }
}

// 响应式处理
function handleResize() {
    const wasMobile = isMobile;
    isMobile = checkMobile();

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');

    if (!sidebar || !mainContent) return;

    if (isMobile) {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.remove('mobile-open');
        sidebar.style.transform = '';
        sidebar.style.opacity = '';
        mainContent.style.marginLeft = '0';
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';

        if (sidebarCollapsed) {
            sidebar.style.transform = 'translateX(-100%)';
            sidebar.style.opacity = '0';
            mainContent.style.marginLeft = '0';
        } else {
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.opacity = '1';
            mainContent.style.marginLeft = '288px';
        }
    }
}

// 动态添加新版本（versionInfo 需包含 content.html 片段文本）
function addVersion(versionInfo) {
    versionData.push(versionInfo);
    renderTimeline();
    renderContentSections();
}


// 初始化
function init() {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
        sidebarCollapsed = savedState === 'true';
    }

    isMobile = checkMobile();

    if (!isMobile) {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        if (sidebar && mainContent) {
            if (sidebarCollapsed) {
                sidebar.style.transform = 'translateX(-100%)';
                sidebar.style.opacity = '0';
                mainContent.style.marginLeft = '0';
            } else {
                sidebar.style.transform = 'translateX(0)';
                sidebar.style.opacity = '1';
                mainContent.style.marginLeft = '288px';
            }
        }
    }

    if (isMobile) {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) mainContent.style.marginLeft = '0';
    }

    loadVersions().catch(err => {
        console.error('版本内容加载失败：', err);
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = '<div class="container mx-auto px-4 py-16 text-center text-slate-500">版本内容加载失败，请刷新重试</div>';
        }
    });

    window.addEventListener('resize', handleResize);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobile) {
            closeMobileSidebar();
        }
    });
}

// 启动
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
