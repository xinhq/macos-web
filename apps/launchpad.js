/**
 * macOS Monterey 网页版 - 启动台(Launchpad)功能
 * 负责启动台的交互和功能实现
 */

// 启动台管理器
const launchpadManager = {
    // 当前页面索引
    currentPage: 0,
    
    // 应用列表
    apps: [
        // 第一页应用
        [
            { id: 'safari', name: 'Safari', icon: 'icons/safari.png', url: 'https://www.apple.com/safari/' },
            { id: 'mail', name: '邮件', icon: 'icons/mail.png', url: 'https://www.apple.com/mail/' },
            { id: 'messages', name: '信息', icon: 'icons/messages.png', url: 'https://www.apple.com/messages/' },
            { id: 'maps', name: '地图', icon: 'icons/maps.png', url: 'https://www.apple.com/maps/' },
            { id: 'photos', name: '照片', icon: 'icons/photos.png', url: 'https://www.apple.com/photos/' },
            { id: 'facetime', name: 'FaceTime', icon: 'icons/facetime.png', url: 'https://www.apple.com/facetime/' },
            { id: 'calendar', name: '日历', icon: 'icons/calendar.png', url: 'https://www.apple.com/calendar/' },
            { id: 'contacts', name: '通讯录', icon: 'icons/contacts.png', url: 'https://www.apple.com/contacts/' },
            { id: 'reminders', name: '提醒事项', icon: 'icons/reminders.png', url: 'https://www.apple.com/reminders/' },
            { id: 'notes', name: '备忘录', icon: 'icons/notes.png', url: 'https://www.apple.com/notes/' },
            { id: 'music', name: '音乐', icon: 'icons/music.png', url: 'https://www.apple.com/music/' },
            { id: 'podcasts', name: '播客', icon: 'icons/podcasts.png', url: 'https://www.apple.com/apple-podcasts/' },
            { id: 'tv', name: 'TV', icon: 'icons/tv.png', url: 'https://www.apple.com/apple-tv-app/' },
            { id: 'news', name: '新闻', icon: 'icons/news.png', url: 'https://www.apple.com/news/' },
            { id: 'stocks', name: '股市', icon: 'icons/stocks.png', url: 'https://www.apple.com/stocks/' },
            { id: 'appstore', name: 'App Store', icon: 'icons/appstore.png', url: 'https://www.apple.com/app-store/' },
            { id: 'settings', name: '系统偏好设置', icon: 'icons/settings.png' },
            { id: 'finder', name: '访达', icon: 'icons/finder.png' },
            { id: 'calculator', name: '计算器', icon: 'icons/calculator.png' },
            { id: 'dictionary', name: '词典', icon: 'icons/dictionary.png', url: 'https://www.apple.com/dictionary/' },
            { id: 'books', name: '图书', icon: 'icons/books.png', url: 'https://www.apple.com/apple-books/' }
        ],
        // 第二页应用
        [
            { id: 'pages', name: 'Pages', icon: 'icons/pages.png', url: 'https://www.apple.com/pages/' },
            { id: 'numbers', name: 'Numbers', icon: 'icons/numbers.png', url: 'https://www.apple.com/numbers/' },
            { id: 'keynote', name: 'Keynote', icon: 'icons/keynote.png', url: 'https://www.apple.com/keynote/' },
            { id: 'garageband', name: 'GarageBand', icon: 'icons/garageband.png', url: 'https://www.apple.com/mac/garageband/' },
            { id: 'imovie', name: 'iMovie', icon: 'icons/imovie.png', url: 'https://www.apple.com/imovie/' },
            { id: 'preview', name: '预览', icon: 'icons/preview.png' },
            { id: 'quicktime', name: 'QuickTime Player', icon: 'icons/quicktime.png', url: 'https://support.apple.com/quicktime' },
            { id: 'terminal', name: '终端', icon: 'icons/terminal.png' },
            { id: 'utilities', name: '实用工具', icon: 'icons/utilities.png', isFolder: true, apps: [
                { id: 'activitymonitor', name: '活动监视器', icon: 'icons/activitymonitor.png' },
                { id: 'diskutility', name: '磁盘工具', icon: 'icons/diskutility.png' },
                { id: 'console', name: '控制台', icon: 'icons/console.png' },
                { id: 'colorpicker', name: '数码测色计', icon: 'icons/colorpicker.png' }
            ]}
        ]
    ],
    
    // 搜索结果
    searchResults: [],
    
    // 当前打开的文件夹
    openFolder: null,
    
    // 初始化启动台
    init: function() {
        console.log('启动台已初始化');
        
        // 创建启动台内容
        this._createLaunchpadContent();
        
        // 添加事件监听
        this._addEventListeners();
    },
    
    // 创建启动台内容
    _createLaunchpadContent: function() {
        const launchpad = document.getElementById('launchpad');
        if (!launchpad) return;
        
        // 创建启动台HTML
        const html = `
            <div class="launchpad-search">
                <div class="launchpad-search-icon">
                    <i class="fas fa-search"></i>
                </div>
                <input type="text" placeholder="搜索应用">
            </div>
            <div class="launchpad-grid">
                ${this._createPages()}
            </div>
            <div class="launchpad-dots">
                ${this._createDots()}
            </div>
        `;
        
        launchpad.innerHTML = html;
    },
    
    // 创建页面
    _createPages: function() {
        let html = '';
        
        this.apps.forEach((page, index) => {
            html += `
                <div class="launchpad-page" data-page="${index}" style="display: ${index === this.currentPage ? 'grid' : 'none'}">
                    ${this._createApps(page)}
                </div>
            `;
        });
        
        return html;
    },
    
    // 创建应用图标
    _createApps: function(apps) {
        let html = '';
        
        apps.forEach(app => {
            if (app.isFolder) {
                // 文件夹
                html += `
                    <div class="launchpad-app launchpad-folder" data-id="${app.id}">
                        <div class="launchpad-folder-background">
                            ${this._createFolderItems(app.apps)}
                        </div>
                        <div class="launchpad-app-name">${app.name}</div>
                    </div>
                `;
            } else {
                // 普通应用
                html += `
                    <div class="launchpad-app" data-id="${app.id}" ${app.url ? `data-url="${app.url}"` : ''}>
                        <div class="launchpad-app-icon">
                            <img src="${app.icon}" alt="${app.name}">
                        </div>
                        <div class="launchpad-app-name">${app.name}</div>
                    </div>
                `;
            }
        });
        
        return html;
    },
    
    // 创建文件夹内的应用图标
    _createFolderItems: function(apps) {
        let html = '';
        const maxItems = 4; // 最多显示4个
        
        for (let i = 0; i < Math.min(apps.length, maxItems); i++) {
            html += `
                <div class="launchpad-folder-item">
                    <img src="${apps[i].icon}" alt="${apps[i].name}">
                </div>
            `;
        }
        
        return html;
    },
    
    // 创建分页点
    _createDots: function() {
        let html = '';
        
        for (let i = 0; i < this.apps.length; i++) {
            html += `
                <div class="launchpad-dot ${i === this.currentPage ? 'active' : ''}" data-page="${i}"></div>
            `;
        }
        
        return html;
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 点击背景关闭启动台
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            launchpad.addEventListener('click', (e) => {
                if (e.target === launchpad) {
                    this.close();
                }
            });
            
            // 阻止冒泡
            const launchpadGrid = launchpad.querySelector('.launchpad-grid');
            if (launchpadGrid) {
                launchpadGrid.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }
        
        // 搜索框输入
        const searchInput = document.querySelector('#launchpad .launchpad-search input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this._handleSearch(e.target.value);
            });
            
            // 阻止冒泡
            searchInput.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // 分页点点击
        const dots = document.querySelectorAll('#launchpad .launchpad-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const page = parseInt(dot.getAttribute('data-page'));
                this._switchToPage(page);
            });
        });
        
        // 应用点击
        const apps = document.querySelectorAll('#launchpad .launchpad-app');
        apps.forEach(app => {
            app.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = app.getAttribute('data-id');
                const url = app.getAttribute('data-url');
                
                if (app.classList.contains('launchpad-folder')) {
                    // 打开文件夹
                    this._openFolderById(id);
                } else {
                    // 打开应用
                    this._openApp(id, url);
                }
            });
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (launchpad.classList.contains('hidden')) return;
            
            if (e.key === 'Escape') {
                // ESC键关闭启动台
                this.close();
            } else if (e.key === 'ArrowLeft') {
                // 左箭头切换到上一页
                if (this.currentPage > 0) {
                    this._switchToPage(this.currentPage - 1);
                }
            } else if (e.key === 'ArrowRight') {
                // 右箭头切换到下一页
                if (this.currentPage < this.apps.length - 1) {
                    this._switchToPage(this.currentPage + 1);
                }
            }
        });
    },
    
    // 处理搜索
    _handleSearch: function(searchTerm) {
        if (!searchTerm) {
            // 清空搜索，显示正常页面
            this._clearSearch();
            return;
        }
        
        searchTerm = searchTerm.toLowerCase();
        this.searchResults = [];
        
        // 搜索所有应用
        this.apps.forEach(page => {
            page.forEach(app => {
                if (app.name.toLowerCase().includes(searchTerm)) {
                    this.searchResults.push(app);
                }
                
                // 搜索文件夹内的应用
                if (app.isFolder && app.apps) {
                    app.apps.forEach(folderApp => {
                        if (folderApp.name.toLowerCase().includes(searchTerm)) {
                            this.searchResults.push(folderApp);
                        }
                    });
                }
            });
        });
        
        // 显示搜索结果
        this._showSearchResults();
    },
    
    // 显示搜索结果
    _showSearchResults: function() {
        const launchpadGrid = document.querySelector('#launchpad .launchpad-grid');
        if (!launchpadGrid) return;
        
        // 隐藏所有页面
        const pages = document.querySelectorAll('#launchpad .launchpad-page');
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // 隐藏分页点
        const dots = document.querySelector('#launchpad .launchpad-dots');
        if (dots) {
            dots.style.display = 'none';
        }
        
        // 创建搜索结果页面
        const searchPage = document.createElement('div');
        searchPage.className = 'launchpad-page';
        searchPage.setAttribute('data-page', 'search');
        searchPage.style.display = 'grid';
        
        // 添加搜索结果应用
        searchPage.innerHTML = this._createApps(this.searchResults);
        
        // 清除之前的搜索结果
        const oldSearchPage = document.querySelector('#launchpad .launchpad-page[data-page="search"]');
        if (oldSearchPage) {
            oldSearchPage.remove();
        }
        
        // 添加新的搜索结果
        launchpadGrid.appendChild(searchPage);
        
        // 为搜索结果中的应用添加点击事件
        const searchApps = document.querySelectorAll('#launchpad .launchpad-page[data-page="search"] .launchpad-app');
        searchApps.forEach(app => {
            app.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = app.getAttribute('data-id');
                const url = app.getAttribute('data-url');
                
                if (app.classList.contains('launchpad-folder')) {
                    // 打开文件夹
                    this._openFolderById(id);
                } else {
                    // 打开应用
                    this._openApp(id, url);
                }
            });
        });
    },
    
    // 清除搜索
    _clearSearch: function() {
        // 显示当前页面
        const pages = document.querySelectorAll('#launchpad .launchpad-page');
        pages.forEach(page => {
            const pageIndex = parseInt(page.getAttribute('data-page'));
            if (!isNaN(pageIndex)) {
                page.style.display = pageIndex === this.currentPage ? 'grid' : 'none';
            } else if (page.getAttribute('data-page') === 'search') {
                page.remove();
            }
        });
        
        // 显示分页点
        const dots = document.querySelector('#launchpad .launchpad-dots');
        if (dots) {
            dots.style.display = 'flex';
        }
    },
    
    // 切换到指定页面
    _switchToPage: function(pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.apps.length) return;
        
        // 更新当前页面索引
        this.currentPage = pageIndex;
        
        // 更新页面显示
        const pages = document.querySelectorAll('#launchpad .launchpad-page');
        pages.forEach(page => {
            const index = parseInt(page.getAttribute('data-page'));
            if (!isNaN(index)) {
                page.style.display = index === pageIndex ? 'grid' : 'none';
            }
        });
        
        // 更新分页点
        const dots = document.querySelectorAll('#launchpad .launchpad-dot');
        dots.forEach(dot => {
            const index = parseInt(dot.getAttribute('data-page'));
            if (index === pageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    },
    
    // 打开文件夹
    _openFolderById: function(folderId) {
        // 查找文件夹
        let folder = null;
        
        this.apps.forEach(page => {
            page.forEach(app => {
                if (app.id === folderId && app.isFolder) {
                    folder = app;
                }
            });
        });
        
        if (!folder) return;
        
        this.openFolder = folder;
        this._showFolderContent(folder);
    },
    
    // 显示文件夹内容
    _showFolderContent: function(folder) {
        // 创建文件夹展开视图
        const folderView = document.createElement('div');
        folderView.className = 'launchpad-folder-expanded';
        folderView.setAttribute('data-folder', folder.id);
        
        // 添加文件夹标题
        const folderTitle = document.createElement('div');
        folderTitle.className = 'launchpad-folder-title';
        folderTitle.textContent = folder.name;
        folderView.appendChild(folderTitle);
        
        // 添加文件夹应用网格
        const folderGrid = document.createElement('div');
        folderGrid.className = 'launchpad-folder-grid';
        
        // 添加文件夹内的应用
        folder.apps.forEach(app => {
            const appElement = document.createElement('div');
            appElement.className = 'launchpad-app';
            appElement.setAttribute('data-id', app.id);
            if (app.url) {
                appElement.setAttribute('data-url', app.url);
            }
            
            appElement.innerHTML = `
                <div class="launchpad-app-icon">
                    <img src="${app.icon}" alt="${app.name}">
                </div>
                <div class="launchpad-app-name">${app.name}</div>
            `;
            
            // 添加点击事件
            appElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this._openApp(app.id, app.url);
            });
            
            folderGrid.appendChild(appElement);
        });
        
        folderView.appendChild(folderGrid);
        
        // 添加到启动台
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            // 移除之前的文件夹视图
            const oldFolderView = document.querySelector('#launchpad .launchpad-folder-expanded');
            if (oldFolderView) {
                oldFolderView.remove();
            }
            
            launchpad.appendChild(folderView);
            
            // 点击文件夹外部关闭文件夹
            folderView.addEventListener('click', (e) => {
                if (e.target === folderView) {
                    this._closeFolderView();
                }
            });
        }
    },
    
    // 关闭文件夹视图
    _closeFolderView: function() {
        const folderView = document.querySelector('#launchpad .launchpad-folder-expanded');
        if (folderView) {
            folderView.remove();
        }
        
        this.openFolder = null;
    },
    
    // 打开应用
    _openApp: function(appId, appUrl) {
        console.log(`打开应用: ${appId}`);
        
        // 关闭启动台
        this.close();
        
        // 关闭文件夹视图
        this._closeFolderView();
        
        // 如果有URL，打开链接
        if (appUrl) {
            if (window.windowSystem) {
                // 在Safari中打开URL
                window.windowSystem.createWindow({
                    app: 'safari',
                    title: 'Safari',
                    width: 900,
                    height: 600,
                    content: `<iframe src="${appUrl}" style="width:100%;height:100%;border:none;"></iframe>`
                });
            } else {
                // 如果窗口系统不可用，直接在新标签页打开
                window.open(appUrl, '_blank');
            }
            return;
        }
        
        // 根据应用ID执行相应操作
        switch (appId) {
            case 'finder':
                // 打开访达
                if (window.finderManager) {
                    window.finderManager.createWindow();
                }
                break;
                
            case 'settings':
                // 打开系统偏好设置
                if (window.settingsManager) {
                    window.settingsManager.createWindow();
                }
                break;
                
            case 'calculator':
                // 打开计算器
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'calculator',
                        title: '计算器',
                        width: 300,
                        height: 400,
                        resizable: false,
                        content: '<div class="calculator-content">计算器内容将在后续实现</div>'
                    });
                }
                break;
                
            case 'terminal':
                // 打开终端
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'terminal',
                        title: '终端',
                        width: 600,
                        height: 400,
                        content: '<div class="terminal-content">终端内容将在后续实现</div>'
                    });
                }
                break;
                
            default:
                console.log(`应用 ${appId} 的功能尚未实现`);
                
                // 通用应用窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: appId,
                        title: this._getAppNameById(appId),
                        width: 800,
                        height: 500,
                        content: `<div class="${appId}-content">${this._getAppNameById(appId)}内容将在后续实现</div>`
                    });
                }
        }
    },
    
    // 根据ID获取应用名称
    _getAppNameById: function(appId) {
        let appName = appId;
        
        // 搜索所有应用
        this.apps.forEach(page => {
            page.forEach(app => {
                if (app.id === appId) {
                    appName = app.name;
                }
                
                // 搜索文件夹内的应用
                if (app.isFolder && app.apps) {
                    app.apps.forEach(folderApp => {
                        if (folderApp.id === appId) {
                            appName = folderApp.name;
                        }
                    });
                }
            });
        });
        
        return appName;
    },
    
    // 打开启动台
    open: function() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            launchpad.classList.remove('hidden');
            
            // 聚焦搜索框
            const searchInput = document.querySelector('#launchpad .launchpad-search input');
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
            }
        }
    },
    
    // 关闭启动台
    close: function() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            launchpad.classList.add('hidden');
            
            // 清空搜索框
            const searchInput = document.querySelector('#launchpad .launchpad-search input');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // 清除搜索结果
            this._clearSearch();
            
            // 关闭文件夹视图
            this._closeFolderView();
        }
    },
    
    // 切换启动台显示状态
    toggle: function() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            if (launchpad.classList.contains('hidden')) {
                this.open();
            } else {
                this.close();
            }
        }
    }
};

// 初始化启动台
function initLaunchpad() {
    launchpadManager.init();
    
    // 导出启动台管理器到全局
    window.launchpadManager = launchpadManager;
}

// 当文档加载完成时初始化启动台
document.addEventListener('DOMContentLoaded', () => {
    initLaunchpad();
});
