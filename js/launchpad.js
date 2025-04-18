// launchpad.js - 启动台功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化启动台
    initializeLaunchpad();
});

/**
 * 初始化启动台
 */
function initializeLaunchpad() {
    // 注册启动台按钮点击事件
    const launchpadButton = document.getElementById('dock-launchpad');
    
    if (launchpadButton) {
        launchpadButton.addEventListener('click', function() {
            openLaunchpad();
        });
    }
}

/**
 * 打开启动台
 */
function openLaunchpad() {
    // 创建启动台容器
    const launchpad = document.createElement('div');
    launchpad.className = 'launchpad';
    launchpad.id = 'launchpad';
    
    // 创建搜索框
    const searchContainer = document.createElement('div');
    searchContainer.className = 'launchpad-search';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索';
    searchInput.className = 'launchpad-search-input';
    
    searchContainer.appendChild(searchInput);
    
    // 创建应用网格
    const appGrid = document.createElement('div');
    appGrid.className = 'launchpad-grid';
    
    // 添加应用图标
    const apps = [
        { name: '访达', icon: 'icons/apps/finder.svg', action: 'openFinder', url: 'https://www.apple.com/cn/macos/finder/' },
        { name: 'Safari', icon: 'icons/apps/safari.svg', action: 'openSafari', url: 'https://www.apple.com/cn/safari/' },
        { name: '邮件', icon: 'icons/apps/mail.svg', action: 'openMail', url: 'https://www.apple.com/cn/macos/mail/' },
        { name: '信息', icon: 'icons/apps/messages.svg', action: 'openMessages', url: 'https://www.apple.com/cn/macos/messages/' },
        { name: '地图', icon: 'icons/apps/maps.svg', action: 'openMaps', url: 'https://www.apple.com/cn/maps/' },
        { name: '照片', icon: 'icons/apps/photos.svg', action: 'openPhotos', url: 'https://www.apple.com/cn/macos/photos/' },
        { name: '备忘录', icon: 'icons/apps/notes.svg', action: null, url: 'https://www.apple.com/cn/macos/notes/' },
        { name: '提醒事项', icon: 'icons/apps/reminders.svg', action: null, url: 'https://www.apple.com/cn/macos/reminders/' },
        { name: '日历', icon: 'icons/apps/calendar.svg', action: null, url: 'https://www.apple.com/cn/macos/calendar/' },
        { name: '联系人', icon: 'icons/apps/contacts.svg', action: null, url: 'https://www.apple.com/cn/macos/contacts/' },
        { name: '音乐', icon: 'icons/apps/music.svg', action: null, url: 'https://www.apple.com/cn/music/' },
        { name: '播客', icon: 'icons/apps/podcasts.svg', action: null, url: 'https://www.apple.com/cn/apple-podcasts/' },
        { name: 'TV', icon: 'icons/apps/tv.svg', action: null, url: 'https://www.apple.com/cn/apple-tv-plus/' },
        { name: 'App Store', icon: 'icons/apps/app-store.svg', action: null, url: 'https://www.apple.com/cn/app-store/' },
        { name: 'FaceTime', icon: 'icons/apps/facetime.svg', action: null, url: 'https://www.apple.com/cn/macos/facetime/' },
        { name: '图书', icon: 'icons/apps/books.svg', action: null, url: 'https://www.apple.com/cn/apple-books/' },
        { name: '计算器', icon: 'icons/apps/calculator.svg', action: null, url: 'https://support.apple.com/zh-cn/guide/calculator/welcome/mac' },
        { name: '终端', icon: 'icons/apps/terminal.svg', action: null, url: 'https://support.apple.com/zh-cn/guide/terminal/welcome/mac' },
        { name: '系统偏好设置', icon: 'icons/system/settings.svg', action: 'openSystemPreferences', url: 'https://support.apple.com/zh-cn/guide/system-preferences/welcome/mac' }
    ];
    
    // 创建应用分页
    const appsPerPage = 20;
    const totalPages = Math.ceil(apps.length / appsPerPage);
    let currentPage = 0;
    
    // 创建页面指示器
    const pageIndicator = document.createElement('div');
    pageIndicator.className = 'launchpad-page-indicator';
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'page-dot';
        if (i === 0) dot.classList.add('active');
        
        // 添加点击事件切换页面
        dot.addEventListener('click', function() {
            showPage(i);
        });
        
        pageIndicator.appendChild(dot);
    }
    
    // 创建所有页面
    const pages = [];
    
    for (let i = 0; i < totalPages; i++) {
        const page = document.createElement('div');
        page.className = 'launchpad-page';
        if (i === 0) page.classList.add('active');
        
        // 添加当前页面的应用
        const startIndex = i * appsPerPage;
        const endIndex = Math.min(startIndex + appsPerPage, apps.length);
        
        for (let j = startIndex; j < endIndex; j++) {
            const app = apps[j];
            const appItem = createAppItem(app);
            page.appendChild(appItem);
        }
        
        pages.push(page);
        appGrid.appendChild(page);
    }
    
    // 组装启动台
    launchpad.appendChild(searchContainer);
    launchpad.appendChild(appGrid);
    launchpad.appendChild(pageIndicator);
    
    // 添加到文档
    document.body.appendChild(launchpad);
    
    // 显示启动台
    setTimeout(() => {
        launchpad.classList.add('show');
    }, 10);
    
    // 添加点击背景关闭事件
    launchpad.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLaunchpad();
        }
    });
    
    // 添加ESC键关闭事件
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLaunchpad();
        }
    });
    
    // 添加搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            // 显示分页
            appGrid.classList.remove('search-mode');
            pageIndicator.style.display = '';
            
            // 显示第一页
            showPage(0);
        } else {
            // 隐藏分页，进入搜索模式
            appGrid.classList.add('search-mode');
            pageIndicator.style.display = 'none';
            
            // 隐藏所有页面
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // 过滤应用
            const appItems = document.querySelectorAll('.launchpad-item');
            
            appItems.forEach(item => {
                const appName = item.querySelector('.launchpad-label').textContent.toLowerCase();
                
                if (appName.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
    
    // 添加滑动切换页面
    let startX = 0;
    let isDragging = false;
    
    launchpad.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isDragging = true;
    });
    
    launchpad.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0 && currentPage > 0) {
                // 向右滑动，显示上一页
                showPage(currentPage - 1);
                isDragging = false;
            } else if (deltaX < 0 && currentPage < totalPages - 1) {
                // 向左滑动，显示下一页
                showPage(currentPage + 1);
                isDragging = false;
            }
        }
    });
    
    launchpad.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    launchpad.addEventListener('mouseleave', function() {
        isDragging = false;
    });
    
    // 自动聚焦搜索框
    searchInput.focus();
    
    /**
     * 显示指定页面
     * @param {number} pageIndex - 页面索引
     */
    function showPage(pageIndex) {
        // 更新当前页面
        currentPage = pageIndex;
        
        // 更新页面显示
        pages.forEach((page, index) => {
            if (index === pageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        // 更新页面指示器
        const dots = document.querySelectorAll('.page-dot');
        
        dots.forEach((dot, index) => {
            if (index === pageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * 创建应用项
     * @param {Object} app - 应用信息
     * @returns {HTMLElement} 应用项元素
     */
    function createAppItem(app) {
        const appItem = document.createElement('div');
        appItem.className = 'launchpad-item';
        
        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt = app.name;
        appIcon.className = 'launchpad-icon';
        
        const appName = document.createElement('div');
        appName.className = 'launchpad-label';
        appName.textContent = app.name;
        
        appItem.appendChild(appIcon);
        appItem.appendChild(appName);
        
        // 添加点击事件
        appItem.addEventListener('click', function() {
            // 关闭启动台
            closeLaunchpad();
            
            // 执行应用操作或打开URL
            if (app.action && typeof window[app.action] === 'function') {
                // 调用应用操作函数
                window[app.action]();
            } else if (app.url) {
                // 打开Safari并导航到URL
                openSafariWithUrl(app.url);
            }
        });
        
        return appItem;
    }
}

/**
 * 关闭启动台
 */
function closeLaunchpad() {
    const launchpad = document.getElementById('launchpad');
    
    if (launchpad) {
        launchpad.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            launchpad.remove();
            
            // 移除ESC键事件监听
            document.removeEventListener('keydown', handleEscKey);
        }, 300);
    }
}

/**
 * 处理ESC键事件
 * @param {KeyboardEvent} e - 键盘事件
 */
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeLaunchpad();
    }
}

/**
 * 使用Safari打开URL
 * @param {string} url - 要打开的URL
 */
function openSafariWithUrl(url) {
    // 创建Safari窗口
    createWindow({
        title: 'Safari',
        width: 900,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/safari.svg',
        content: `
            <div class="safari-container">
                <div class="safari-toolbar">
                    <div class="safari-controls">
                        <button class="safari-button back-button" title="后退">
                            <span class="icon">←</span>
                        </button>
                        <button class="safari-button forward-button" title="前进">
                            <span class="icon">→</span>
                        </button>
                        <button class="safari-button reload-button" title="重新加载">
                            <span class="icon">↻</span>
                        </button>
                    </div>
                    <div class="safari-address-bar">
                        <input type="text" class="safari-address-input" value="${url}" placeholder="搜索或输入网站名称">
                    </div>
                    <div class="safari-actions">
                        <button class="safari-button share-button" title="分享">
                            <span class="icon">↗</span>
                        </button>
                        <button class="safari-button tabs-button" title="标签页">
                            <span class="icon">⧉</span>
                        </button>
                    </div>
                </div>
                <div class="safari-content">
                    <iframe src="${url}" class="safari-iframe"></iframe>
                </div>
            </div>
        `
    });
    
    // 初始化Safari功能
    setTimeout(() => {
        initSafariFunctionality();
    }, 100);
    
    // 设置应用正在运行
    if (typeof setAppRunning === 'function') {
        setAppRunning('safari', true);
    }
}

/**
 * 初始化Safari功能
 */
function initSafariFunctionality() {
    // 地址栏输入
    const addressInput = document.querySelector('.safari-address-input');
    
    if (addressInput) {
        addressInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // 获取URL
                let url = this.value.trim();
                
                // 确保URL格式正确
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    // 检查是否是域名格式
                    if (url.includes('.') && !url.includes(' ')) {
                        url = 'https://' + url;
                    } else {
                        // 作为搜索查询
                        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
                    }
                }
                
                // 更新地址栏
                this.value = url;
                
                // 导航到URL
                const iframe = document.querySelector('.safari-iframe');
                
                if (iframe) {
                    iframe.src = url;
                }
            }
        });
    }
    
    // 后退按钮
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 尝试后退
                try {
                    iframe.contentWindow.history.back();
                } catch (e) {
                    console.error('无法访问iframe历史记录:', e);
                }
            }
        });
    }
    
    // 前进按钮
    const forwardButton = document.querySelector('.forward-button');
    
    if (forwardButton) {
        forwardButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 尝试前进
                try {
                    iframe.contentWindow.history.forward();
                } catch (e) {
                    console.error('无法访问iframe历史记录:', e);
                }
            }
        });
    }
    
    // 重新加载按钮
    const reloadButton = document.querySelector('.reload-button');
    
    if (reloadButton) {
        reloadButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 重新加载
                iframe.src = iframe.src;
            }
        });
    }
    
    // 监听iframe加载完成
    const iframe = document.querySelector('.safari-iframe');
    
    if (iframe) {
        iframe.addEventListener('load', function() {
            // 更新地址栏
            try {
                const addressInput = document.querySelector('.safari-address-input');
                if (addressInput && this.contentWindow.location.href) {
                    addressInput.value = this.contentWindow.location.href;
                }
            } catch (e) {
                console.error('无法访问iframe位置:', e);
            }
        });
    }
}

/**
 * 创建窗口
 * @param {Object} options - 窗口选项
 */
function createWindow(options) {
    // 窗口管理在windows.js中实现
    if (typeof window.createWindow === 'function') {
        window.createWindow(options);
    } else {
        console.error('窗口创建函数未找到');
        alert(`无法创建窗口：${options.title}`);
    }
}

// 导出函数供其他模块使用
window.initializeLaunchpad = initializeLaunchpad;
window.openLaunchpad = openLaunchpad;
window.closeLaunchpad = closeLaunchpad;
window.openSafariWithUrl = openSafariWithUrl;
