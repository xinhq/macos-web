/**
 * macOS Monterey 网页版 - 应用程序管理
 * 负责管理和运行应用程序
 */

// 应用程序管理器
const appManager = {
    // 存储所有应用程序
    apps: {},
    
    // 当前运行的应用
    runningApps: [],
    
    // 初始化应用管理器
    init: function() {
        console.log('应用程序管理器已初始化');
        
        // 注册应用程序
        this._registerApps();
    },
    
    // 注册应用程序
    _registerApps: function() {
        // 访达
        this.registerApp('finder', {
            name: '访达',
            icon: 'icons/finder.png',
            openWindow: this._openFinderWindow,
            onClose: null
        });
        
        // 启动台
        this.registerApp('launchpad', {
            name: '启动台',
            icon: 'icons/launchpad.png',
            openWindow: this._openLaunchpad,
            onClose: this._closeLaunchpad
        });
        
        // Safari
        this.registerApp('safari', {
            name: 'Safari',
            icon: 'icons/safari.png',
            openWindow: this._openSafariWindow,
            onClose: null
        });
        
        // 系统偏好设置
        this.registerApp('settings', {
            name: '系统偏好设置',
            icon: 'icons/settings.png',
            openWindow: this._openSettingsWindow,
            onClose: null
        });
        
        // 信息
        this.registerApp('messages', {
            name: '信息',
            icon: 'icons/messages.png',
            openWindow: this._openMessagesWindow,
            onClose: null
        });
        
        // 邮件
        this.registerApp('mail', {
            name: '邮件',
            icon: 'icons/mail.png',
            openWindow: this._openMailWindow,
            onClose: null
        });
        
        // 照片
        this.registerApp('photos', {
            name: '照片',
            icon: 'icons/photos.png',
            openWindow: this._openPhotosWindow,
            onClose: null
        });
        
        // 废纸篓
        this.registerApp('trash', {
            name: '废纸篓',
            icon: 'icons/trash.png',
            openWindow: this._openTrashWindow,
            onClose: null
        });
    },
    
    // 注册应用程序
    registerApp: function(id, config) {
        this.apps[id] = config;
    },
    
    // 打开应用程序
    openApp: function(appId, params) {
        console.log(`打开应用: ${appId}`, params);
        
        const app = this.apps[appId];
        
        if (!app) {
            console.error(`应用 ${appId} 不存在`);
            return;
        }
        
        // 更新菜单栏应用名称
        if (window.menubarManager) {
            window.menubarManager.updateAppMenu(app.name);
        }
        
        // 标记应用为运行状态
        if (window.dockManager) {
            window.dockManager.setAppRunningState(appId, true);
        }
        
        // 如果应用尚未运行，添加到运行列表
        if (!this.runningApps.includes(appId)) {
            this.runningApps.push(appId);
        }
        
        // 打开应用窗口
        if (typeof app.openWindow === 'function') {
            app.openWindow(params);
        }
    },
    
    // 关闭应用程序
    closeApp: function(appId) {
        console.log(`关闭应用: ${appId}`);
        
        const app = this.apps[appId];
        
        if (!app) {
            console.error(`应用 ${appId} 不存在`);
            return;
        }
        
        // 从运行列表中移除
        const index = this.runningApps.indexOf(appId);
        if (index !== -1) {
            this.runningApps.splice(index, 1);
        }
        
        // 标记应用为非运行状态
        if (window.dockManager) {
            window.dockManager.setAppRunningState(appId, false);
        }
        
        // 调用应用关闭回调
        if (typeof app.onClose === 'function') {
            app.onClose();
        }
        
        // 关闭所有相关窗口
        if (window.windowSystem) {
            const windows = window.windowSystem.windows.filter(w => w.app === appId);
            windows.forEach(w => {
                window.windowSystem.closeWindow(w.element);
            });
        }
    },
    
    // 打开访达窗口
    _openFinderWindow: function(params) {
        if (!window.windowSystem) return;
        
        // 创建访达窗口
        window.windowSystem.createWindow({
            app: 'finder',
            title: '访达',
            width: 800,
            height: 500,
            content: `
                <div class="finder-window">
                    <div class="finder-sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-title">收藏</div>
                            <div class="sidebar-item selected">
                                <img src="icons/finder-home.png" alt="Home">
                                <span>AirDrop</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-recents.png" alt="Recents">
                                <span>最近项目</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-applications.png" alt="Applications">
                                <span>应用程序</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-documents.png" alt="Documents">
                                <span>文稿</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-downloads.png" alt="Downloads">
                                <span>下载</span>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <div class="sidebar-title">位置</div>
                            <div class="sidebar-item">
                                <img src="icons/finder-desktop.png" alt="Desktop">
                                <span>桌面</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-home.png" alt="Home">
                                <span>主目录</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-computer.png" alt="Computer">
                                <span>电脑</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-network.png" alt="Network">
                                <span>网络</span>
                            </div>
                        </div>
                    </div>
                    <div class="finder-content">
                        <div class="finder-toolbar">
                            <div class="toolbar-controls">
                                <button class="toolbar-button back">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                                <button class="toolbar-button forward">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <div class="toolbar-view">
                                <button class="toolbar-button">
                                    <i class="bi bi-list"></i>
                                </button>
                                <button class="toolbar-button active">
                                    <i class="bi bi-grid"></i>
                                </button>
                            </div>
                            <div class="toolbar-actions">
                                <button class="toolbar-button">
                                    <i class="bi bi-share"></i>
                                </button>
                                <button class="toolbar-button">
                                    <i class="bi bi-tag"></i>
                                </button>
                                <button class="toolbar-button">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="finder-path">
                            <span>访达</span>
                            <span>></span>
                            <span>应用程序</span>
                        </div>
                        <div class="finder-files">
                            <div class="file-item">
                                <img src="icons/folder.png" alt="Folder">
                                <span>文稿</span>
                            </div>
                            <div class="file-item">
                                <img src="icons/folder.png" alt="Folder">
                                <span>下载</span>
                            </div>
                            <div class="file-item">
                                <img src="icons/folder.png" alt="Folder">
                                <span>图片</span>
                            </div>
                            <div class="file-item">
                                <img src="icons/folder.png" alt="Folder">
                                <span>音乐</span>
                            </div>
                            <div class="file-item">
                                <img src="icons/folder.png" alt="Folder">
                                <span>视频</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 打开启动台
    _openLaunchpad: function() {
        // 显示启动台
        const launchpad = document.getElementById('launchpad');
        
        if (!launchpad) {
            // 创建启动台元素
            const launchpadHTML = `
                <div id="launchpad" class="launchpad">
                    <div class="launchpad-search">
                        <input type="text" placeholder="搜索">
                    </div>
                    <div class="launchpad-grid">
                        <!-- 应用图标将通过JavaScript动态添加 -->
                    </div>
                    <div class="launchpad-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', launchpadHTML);
            
            // 添加应用图标
            const launchpadGrid = document.querySelector('.launchpad-grid');
            
            // 添加一些示例应用
            const apps = [
                { name: 'Safari', icon: 'icons/safari.png' },
                { name: '邮件', icon: 'icons/mail.png' },
                { name: '信息', icon: 'icons/messages.png' },
                { name: '地图', icon: 'icons/maps.png' },
                { name: '照片', icon: 'icons/photos.png' },
                { name: 'FaceTime', icon: 'icons/facetime.png' },
                { name: '日历', icon: 'icons/calendar.png' },
                { name: '备忘录', icon: 'icons/notes.png' },
                { name: '提醒事项', icon: 'icons/reminders.png' },
                { name: '音乐', icon: 'icons/music.png' },
                { name: '播客', icon: 'icons/podcasts.png' },
                { name: 'TV', icon: 'icons/tv.png' },
                { name: '新闻', icon: 'icons/news.png' },
                { name: '股市', icon: 'icons/stocks.png' },
                { name: '图书', icon: 'icons/books.png' },
                { name: 'App Store', icon: 'icons/appstore.png' },
                { name: '系统偏好设置', icon: 'icons/settings.png' },
                { name: '计算器', icon: 'icons/calculator.png' },
                { name: '语音备忘录', icon: 'icons/voice-memos.png' },
                { name: '查找', icon: 'icons/find-my.png' }
            ];
            
            apps.forEach(app => {
                const appHTML = `
                    <div class="launchpad-app">
                        <img src="${app.icon}" alt="${app.name}">
                        <span>${app.name}</span>
                    </div>
                `;
                
                launchpadGrid.insertAdjacentHTML('beforeend', appHTML);
            });
            
            // 添加点击事件
            document.querySelectorAll('.launchpad-app').forEach(app => {
                app.addEventListener('click', () => {
                    const appName = app.querySelector('span').textContent;
                    console.log(`点击了启动台应用: ${appName}`);
                    
                    // 关闭启动台
                    document.getElementById('launchpad').classList.add('hidden');
                    
                    // 打开相应应用
                    const appId = this._getAppIdByName(appName);
                    if (appId) {
                        this.openApp(appId);
                    }
                });
            });
            
            // 添加点击背景关闭启动台
            document.getElementById('launchpad').addEventListener('click', (e) => {
                if (e.target.id === 'launchpad') {
                    document.getElementById('launchpad').classList.add('hidden');
                }
            });
            
            // 添加搜索功能
            const searchInput = document.querySelector('.launchpad-search input');
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                document.querySelectorAll('.launchpad-app').forEach(app => {
                    const appName = app.querySelector('span').textContent.toLowerCase();
                    
                    if (appName.includes(searchTerm) || searchTerm === '') {
                        app.style.display = 'flex';
                    } else {
                        app.style.display = 'none';
                    }
                });
            });
        }
        
        // 显示启动台
        document.getElementById('launchpad').classList.remove('hidden');
    },
    
    // 关闭启动台
    _closeLaunchpad: function() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            launchpad.classList.add('hidden');
        }
    },
    
    // 打开Safari窗口
    _openSafariWindow: function() {
        if (!window.windowSystem) return;
        
        // 创建Safari窗口
        window.windowSystem.createWindow({
            app: 'safari',
            title: 'Safari',
            width: 900,
            height: 600,
            content: `
                <div class="safari-window">
                    <div class="safari-toolbar">
                        <div class="toolbar-controls">
                            <button class="toolbar-button back">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            <button class="toolbar-button forward">
                                <i class="bi bi-chevron-right"></i>
                            </button>
                            <button class="toolbar-button reload">
                                <i class="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                        <div class="address-bar">
                            <input type="text" value="https://www.apple.com/">
                        </div>
                        <div class="toolbar-actions">
                            <button class="toolbar-button">
                                <i class="bi bi-share"></i>
                            </button>
                            <button class="toolbar-button">
                                <i class="bi bi-plus"></i>
                            </button>
                            <button class="toolbar-button">
                                <i class="bi bi-layout-sidebar"></i>
                            </button>
                        </div>
                    </div>
                    <div class="safari-content">
                        <div class="safari-placeholder">
                            <img src="img/apple-website.jpg" alt="Apple Website">
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 打开系统偏好设置窗口
    _openSettingsWindow: function(params) {
        if (!window.windowSystem) return;
        
        // 创建系统偏好设置窗口
        window.windowSystem.createWindow({
            app: 'settings',
            title: '系统偏好设置',
            width: 700,
            height: 500,
            content: `
                <div class="settings-window">
                    <div class="settings-search">
                        <input type="text" placeholder="搜索">
                    </div>
                    <div class="settings-grid">
                        <div class="settings-item" data-section="general">
                            <img src="icons/settings-general.png" alt="General">
                            <span>通用</span>
                        </div>
                        <div class="settings-item" data-section="desktop">
                            <img src="icons/settings-desktop.png" alt="Desktop">
                            <span>桌面与屏幕保护程序</span>
                        </div>
                        <div class="settings-item" data-section="dock">
                            <img src="icons/settings-dock.png" alt="Dock">
                            <span>程序坞与菜单栏</span>
                        </div>
                        <div class="settings-item" data-section="display">
                            <img src="icons/settings-display.png" alt="Display">
                            <span>显示器</span>
                        </div>
                        <div class="settings-item" data-section="users">
                            <img src="icons/settings-users.png" alt="Users">
                            <span>用户与群组</span>
                        </div>
                        <div class="settings-item" data-section="siri">
                            <img src="icons/settings-siri.png" alt="Siri">
                            <span>Siri</span>
                        </div>
                        <div class="settings-item" data-section="date">
                            <img src="icons/settings-date.png" alt="Date">
                            <span>日期与时间</span>
                        </div>
                        <div class="settings-item" data-section="accessibility">
                            <img src="icons/settings-accessibility.png" alt="Accessibility">
                            <span>辅助功能</span>
                        </div>
                    </div>
                </div>
            `
        });
        
        // 如果有指定的部分，显示该部分
        if (params) {
            // TODO: 实现显示特定设置部分的功能
        }
    },
    
    // 打开信息窗口
    _openMessagesWindow: function() {
        if (!window.windowSystem) return;
        
        // 创建信息窗口
        window.windowSystem.createWindow({
            app: 'messages',
            title: '信息',
            width: 800,
            height: 600,
            content: `
                <div class="messages-window">
                    <div class="messages-sidebar">
                        <div class="messages-search">
                            <input type="text" placeholder="搜索">
                        </div>
                        <div class="messages-list">
                            <div class="message-contact selected">
                                <img src="img/avatar1.jpg" alt="Contact">
                                <div class="contact-info">
                                    <div class="contact-name">张三</div>
                                    <div class="contact-preview">你好，最近怎么样？</div>
                                </div>
                                <div class="contact-time">下午3:45</div>
                            </div>
                            <div class="message-contact">
                                <img src="img/avatar2.jpg" alt="Contact">
                                <div class="contact-info">
                                    <div class="contact-name">李四</div>
                                    <div class="contact-preview">明天见！</div>
                                </div>
                                <div class="contact-time">上午10:20</div>
                            </div>
                            <div class="message-contact">
                                <img src="img/avatar3.jpg" alt="Contact">
                                <div class="contact-info">
                                    <div class="contact-name">王五</div>
                                    <div class="contact-preview">好的，我会准时到达。</div>
                                </div>
                                <div class="contact-time">昨天</div>
                            </div>
                        </div>
                    </div>
                    <div class="messages-content">
                        <div class="messages-header">
                            <img src="img/avatar1.jpg" alt="Contact">
                            <div class="contact-name">张三</div>
                            <div class="header-actions">
                                <button><i class="bi bi-telephone"></i></button>
                                <button><i class="bi bi-camera-video"></i></button>
                                <button><i class="bi bi-info-circle"></i></button>
                            </div>
                        </div>
                        <div class="messages-chat">
                            <div class="message-bubble received">
                                <div class="message-text">你好，最近怎么样？</div>
                                <div class="message-time">下午3:45</div>
                            </div>
                            <div class="message-bubble sent">
                                <div class="message-text">我很好，谢谢！你呢？</div>
                                <div class="message-time">下午3:46</div>
                            </div>
                            <div class="message-bubble received">
                                <div class="message-text">我也不错。周末有什么计划吗？</div>
                                <div class="message-time">下午3:47</div>
                            </div>
                        </div>
                        <div class="messages-input">
                            <button><i class="bi bi-plus-circle"></i></button>
                            <input type="text" placeholder="信息">
                            <button><i class="bi bi-mic"></i></button>
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 打开邮件窗口
    _openMailWindow: function() {
        if (!window.windowSystem) return;
        
        // 创建邮件窗口
        window.windowSystem.createWindow({
            app: 'mail',
            title: '邮件',
            width: 900,
            height: 600,
            content: `
                <div class="mail-window">
                    <div class="mail-sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-item selected">
                                <i class="bi bi-inbox"></i>
                                <span>收件箱</span>
                                <span class="badge">3</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-star"></i>
                                <span>已加星标</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-send"></i>
                                <span>已发送</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-file-earmark"></i>
                                <span>草稿</span>
                                <span class="badge">1</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-trash"></i>
                                <span>已删除</span>
                            </div>
                        </div>
                    </div>
                    <div class="mail-list">
                        <div class="mail-item unread selected">
                            <div class="mail-sender">Apple</div>
                            <div class="mail-subject">您的Apple ID验证码</div>
                            <div class="mail-preview">您的验证码是：123456。请勿将此验证码分享给他人。</div>
                            <div class="mail-time">下午4:30</div>
                        </div>
                        <div class="mail-item unread">
                            <div class="mail-sender">张三</div>
                            <div class="mail-subject">项目进度报告</div>
                            <div class="mail-preview">附件中是最新的项目进度报告，请查收。</div>
                            <div class="mail-time">上午11:20</div>
                        </div>
                        <div class="mail-item unread">
                            <div class="mail-sender">李四</div>
                            <div class="mail-subject">周末聚会</div>
                            <div class="mail-preview">周末我们计划举办一个小型聚会，欢迎参加！</div>
                            <div class="mail-time">昨天</div>
                        </div>
                        <div class="mail-item">
                            <div class="mail-sender">王五</div>
                            <div class="mail-subject">会议纪要</div>
                            <div class="mail-preview">附件是昨天会议的纪要，请查阅。</div>
                            <div class="mail-time">前天</div>
                        </div>
                    </div>
                    <div class="mail-content">
                        <div class="mail-header">
                            <div class="mail-subject">您的Apple ID验证码</div>
                            <div class="mail-info">
                                <div class="mail-sender">
                                    <img src="img/apple-logo-small.png" alt="Apple">
                                    <span>Apple</span>
                                </div>
                                <div class="mail-to">
                                    <span>发送至：</span>
                                    <span>user@example.com</span>
                                </div>
                                <div class="mail-time">今天 下午4:30</div>
                            </div>
                        </div>
                        <div class="mail-body">
                            <p>尊敬的用户：</p>
                            <p>您的验证码是：<strong>123456</strong></p>
                            <p>请勿将此验证码分享给他人。</p>
                            <p>如果您没有请求此验证码，请忽略此邮件。</p>
                            <p>此致</p>
                            <p>Apple 团队</p>
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 打开照片窗口
    _openPhotosWindow: function() {
        if (!window.windowSystem) return;
        
        // 创建照片窗口
        window.windowSystem.createWindow({
            app: 'photos',
            title: '照片',
            width: 900,
            height: 600,
            content: `
                <div class="photos-window">
                    <div class="photos-sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-item selected">
                                <i class="bi bi-images"></i>
                                <span>照片</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-collection"></i>
                                <span>回忆</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-people"></i>
                                <span>人物</span>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <div class="sidebar-title">资料库</div>
                            <div class="sidebar-item">
                                <i class="bi bi-calendar"></i>
                                <span>年度</span>
                            </div>
                            <div class="sidebar-item">
                                <i class="bi bi-heart"></i>
                                <span>收藏</span>
                            </div>
                        </div>
                    </div>
                    <div class="photos-content">
                        <div class="photos-header">
                            <h2>照片</h2>
                            <div class="header-actions">
                                <button><i class="bi bi-plus"></i></button>
                                <button><i class="bi bi-heart"></i></button>
                                <button><i class="bi bi-info-circle"></i></button>
                            </div>
                        </div>
                        <div class="photos-grid">
                            <div class="photo-item">
                                <img src="img/photo1.jpg" alt="Photo">
                            </div>
                            <div class="photo-item">
                                <img src="img/photo2.jpg" alt="Photo">
                            </div>
                            <div class="photo-item">
                                <img src="img/photo3.jpg" alt="Photo">
                            </div>
                            <div class="photo-item">
                                <img src="img/photo4.jpg" alt="Photo">
                            </div>
                            <div class="photo-item">
                                <img src="img/photo5.jpg" alt="Photo">
                            </div>
                            <div class="photo-item">
                                <img src="img/photo6.jpg" alt="Photo">
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 打开废纸篓窗口
    _openTrashWindow: function() {
        if (!window.windowSystem) return;
        
        // 创建废纸篓窗口
        window.windowSystem.createWindow({
            app: 'trash',
            title: '废纸篓',
            width: 700,
            height: 500,
            content: `
                <div class="finder-window">
                    <div class="finder-sidebar">
                        <div class="sidebar-section">
                            <div class="sidebar-title">收藏</div>
                            <div class="sidebar-item">
                                <img src="icons/finder-home.png" alt="Home">
                                <span>AirDrop</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-recents.png" alt="Recents">
                                <span>最近项目</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-applications.png" alt="Applications">
                                <span>应用程序</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-documents.png" alt="Documents">
                                <span>文稿</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-downloads.png" alt="Downloads">
                                <span>下载</span>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <div class="sidebar-title">位置</div>
                            <div class="sidebar-item">
                                <img src="icons/finder-desktop.png" alt="Desktop">
                                <span>桌面</span>
                            </div>
                            <div class="sidebar-item">
                                <img src="icons/finder-home.png" alt="Home">
                                <span>主目录</span>
                            </div>
                            <div class="sidebar-item selected">
                                <img src="icons/trash.png" alt="Trash">
                                <span>废纸篓</span>
                            </div>
                        </div>
                    </div>
                    <div class="finder-content">
                        <div class="finder-toolbar">
                            <div class="toolbar-controls">
                                <button class="toolbar-button back">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                                <button class="toolbar-button forward">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <div class="toolbar-view">
                                <button class="toolbar-button">
                                    <i class="bi bi-list"></i>
                                </button>
                                <button class="toolbar-button active">
                                    <i class="bi bi-grid"></i>
                                </button>
                            </div>
                            <div class="toolbar-actions">
                                <button class="toolbar-button">
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </button>
                                <button class="toolbar-button">
                                    <i class="bi bi-trash"></i>
                                    <span>清空</span>
                                </button>
                            </div>
                        </div>
                        <div class="finder-path">
                            <span>废纸篓</span>
                        </div>
                        <div class="finder-files empty">
                            <div class="empty-message">
                                <img src="icons/trash-empty.png" alt="Empty Trash">
                                <p>废纸篓为空</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
    },
    
    // 根据应用名称获取应用ID
    _getAppIdByName: function(name) {
        for (const id in this.apps) {
            if (this.apps[id].name === name) {
                return id;
            }
        }
        return null;
    }
};

// 初始化应用程序管理器
function initApps() {
    appManager.init();
    
    // 导出应用管理器到全局
    window.appManager = appManager;
    
    // 导出应用打开和关闭函数到全局
    window.openApplication = function(appId, params) {
        appManager.openApp(appId, params);
    };
    
    window.closeApplication = function(appId) {
        appManager.closeApp(appId);
    };
}
