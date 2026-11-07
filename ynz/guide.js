const sections = [
    { id: 'chat', label: '聊天与陪伴', file: 'chat.html' },
    { id: 'memory', label: '记忆与回忆', file: 'memory.html' },
    { id: 'creation', label: '创作与表达', file: 'creation.html' },
    { id: 'games', label: '游戏与娱乐', file: 'games.html' },
    { id: 'information', label: '资讯与学习', file: 'information.html' },
    { id: 'groups', label: '群聊小助手', file: 'groups.html' },
    { id: 'tools', label: '工具与管理', file: 'tools.html' }
];

const tabs = document.getElementById('guide-tabs');
const content = document.getElementById('guide-content');
const cache = new Map();
let requestId = 0;

tabs.innerHTML = sections.map((item, index) =>
    `<button type="button" class="guide-tab" data-section="${item.id}" aria-current="false"><span>${String(index + 1).padStart(2, '0')}</span>${item.label}</button>`
).join('');

async function showSection(id, scroll) {
    const item = sections.find(section => section.id === id) || sections[0];
    const currentRequest = ++requestId;
    tabs.querySelectorAll('.guide-tab').forEach(tab => {
        tab.setAttribute('aria-current', String(tab.dataset.section === item.id));
    });
    content.innerHTML = '<p class="loading">正在加载使用指南…</p>';

    try {
        let html = cache.get(item.id);
        if (!html) {
            const response = await fetch(`./sections/${item.file}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            html = await response.text();
            cache.set(item.id, html);
        }
        if (currentRequest !== requestId) return;
        content.innerHTML = html;
    } catch (error) {
        if (currentRequest !== requestId) return;
        content.innerHTML = '<p class="loading">这部分内容暂时无法加载，请刷新页面重试。</p>';
        console.error('指南内容加载失败：', error);
    }

    if (scroll) document.getElementById('guide').scrollIntoView({ block: 'start' });
}

function syncHash(scroll) {
    const id = location.hash.slice(1);
    if (sections.some(section => section.id === id)) showSection(id, scroll);
}

tabs.addEventListener('click', event => {
    const button = event.target.closest('button[data-section]');
    if (!button) return;
    const id = button.dataset.section;
    if (location.hash === `#${id}`) showSection(id, true);
    else location.hash = id;
});

window.addEventListener('hashchange', () => syncHash(true));
const initialId = location.hash.slice(1);
showSection(initialId, sections.some(section => section.id === initialId));
