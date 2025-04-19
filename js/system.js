/**
 * macOS Monterey 网页版 - 主入口文件
 * 负责初始化系统和加载各个模块
 */

// 系统状态
const system = {
    // 系统状态
    state: {
        darkMode: false,
        volume: 60,
        brightness: 80,
        wifi: true,
        bluetooth: false,
        doNotDisturb: false,
        nightShift: false,
        airDrop: true,
        airplay: false
    },
    
    // 初始化系统
    init: function() {
        console.log('macOS Monterey 网页版已启动');
        
        // 加载系统模块
        this._loadModules();
        
        // 初始化桌面
        this._initDesktop();
        
        // 添加系统事件监听
        this._addEventListeners();
    },
    
    // 加载系统模块
    _loadModules: function() {
        // 初始化窗口管理器
        if (typeof initWindowManager === 'function') {
            initWindowManager();
        }
        
        // 初始化Dock
        if (typeof initDock === 'function') {
            initDock();
        }
        
        // 初始化菜单栏
        if (typeof initMenuBar === 'function') {
            initMenuBar();
        }
        
        // 初始化控制中心
        if (typeof initControlCenter === 'function') {
            initControlCenter();
        }
        
        // 初始化Finder
        if (typeof initFinder === 'function') {
            initFinder();
        }
        
        // 初始化启动台
        if (typeof initLaunchpad === 'function') {
            initLaunchpad();
        }
        
        // 初始化系统偏好设置
        if (typeof initSettings === 'function') {
            initSettings();
        }
        
        // 初始化Safari
        if (typeof initSafari === 'function') {
            initSafari();
        }
        
        // 初始化动画管理器
        if (typeof initAnimations === 'function') {
            initAnimations();
        }
    },
    
    // 初始化桌面
    _initDesktop: function() {
        // 设置壁纸
        this._setWallpaper();
        
        // 创建桌面图标
        this._createDesktopIcons();
        
        // 初始化右键菜单
        this._initContextMenu();
    },
    
    // 设置壁纸
    _setWallpaper: function() {
        const desktop = document.getElementById('desktop');
        if (desktop) {
            desktop.style.backgroundImage = 'url("img/wallpaper.jpg")';
        }
    },
    
    // 创建桌面图标
    _createDesktopIcons: function() {
        const desktop = document.getElementById('desktop');
        if (!desktop) return;
        
        // 创建访达图标
        const finderIcon = document.createElement('div');
        finderIcon.className = 'desktop-icon';
        finderIcon.innerHTML = `
            <div class="desktop-icon-img">
                <img src="icons/finder.png" alt="访达">
            </div>
            <div class="desktop-icon-name">访达</div>
        `;
        desktop.appendChild(finderIcon);
        
        // 点击事件
        finderIcon.addEventListener('click', () => {
            if (window.finderManager) {
                window.finderManager.createWindow();
            }
        });
    },
    
    // 初始化右键菜单
    _initContextMenu: function() {
        const desktop = document.getElementById('desktop');
        if (!desktop) return;
        
        desktop.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            // 移除现有的右键菜单
            const existingMenu = document.querySelector('.context-menu');
            if (existingMenu) {
                existingMenu.remove();
            }
            
            // 创建右键菜单
            const contextMenu = document.createElement('div');
            contextMenu.className = 'context-menu';
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.top = `${e.clientY}px`;
            
            contextMenu.innerHTML = `
                <div class="context-menu-item" data-action="new-folder">新建文件夹</div>
                <div class="context-menu-item" data-action="get-info">显示简介</div>
                <div class="context-menu-separator"></div>
                <div class="context-menu-item" data-action="change-wallpaper">更换桌面背景...</div>
                <div class="context-menu-separator"></div>
                <div class="context-menu-item" data-action="sort-by">排序方式</div>
                <div class="context-menu-item" data-action="clean-up">整理</div>
            `;
            
            document.body.appendChild(contextMenu);
            
            // 添加菜单项点击事件
            contextMenu.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                if (action) {
                    this._handleContextMenuAction(action);
                }
                
                // 关闭菜单
                contextMenu.remove();
            });
            
            // 点击其他区域关闭菜单
            document.addEventListener('click', () => {
                contextMenu.remove();
            }, { once: true });
        });
    },
    
    // 处理右键菜单动作
    _handleContextMenuAction: function(action) {
        switch (action) {
            case 'new-folder':
                console.log('新建文件夹');
                break;
                
            case 'get-info':
                console.log('显示简介');
                break;
                
            case 'change-wallpaper':
                // 打开系统偏好设置的桌面与屏幕保护程序
                if (window.settingsManager) {
                    window.settingsManager.createWindow('wallpaper');
                }
                break;
                
            case 'sort-by':
                console.log('排序方式');
                break;
                
            case 'clean-up':
                console.log('整理');
                break;
        }
    },
    
    // 添加系统事件监听
    _addEventListeners: function() {
        // 监听深色模式切换
        document.addEventListener('dark-mode-toggle', (e) => {
            this.state.darkMode = e.detail.isDarkMode;
        });
        
        // 监听音量变化
        document.addEventListener('volume-change', (e) => {
            this.state.volume = e.detail.volume;
        });
        
        // 监听亮度变化
        document.addEventListener('brightness-change', (e) => {
            this.state.brightness = e.detail.brightness;
            
            // 更新亮度
            if (window.animationManager) {
                window.animationManager.setBrightness(e.detail.brightness);
            }
        });
        
        // 监听窗口创建
        document.addEventListener('window-created', (e) => {
            // 如果是应用窗口，在Dock中添加运行指示器
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                const appId = windowElement.getAttribute('data-app');
                if (appId) {
                    const dockItem = document.querySelector(`.dock-item[data-app="${appId}"]`);
                    if (dockItem) {
                        dockItem.classList.add('running');
                        
                        // 添加弹跳动画
                        if (window.animationManager) {
                            window.animationManager.addDockBounce(appId);
                        }
                    }
                }
            }
        });
        
        // 监听窗口关闭
        document.addEventListener('window-closing', (e) => {
            // 如果是应用的最后一个窗口，移除Dock中的运行指示器
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                const appId = windowElement.getAttribute('data-app');
                if (appId) {
                    // 检查是否还有该应用的其他窗口
                    const appWindows = document.querySelectorAll(`.window[data-app="${appId}"]`);
                    if (appWindows.length <= 1) {
                        const dockItem = document.querySelector(`.dock-item[data-app="${appId}"]`);
                        if (dockItem) {
                            dockItem.classList.remove('running');
                        }
                    }
                }
            }
        });
        
        // 监听键盘事件
        document.addEventListener('keydown', (e) => {
            // Command+Tab 切换应用
            if (e.metaKey && e.key === 'Tab') {
                e.preventDefault();
                this._switchApplication();
            }
            
            // Command+Space 打开Spotlight
            if (e.metaKey && e.key === ' ') {
                e.preventDefault();
                this._openSpotlight();
            }
            
            // Command+Option+Esc 强制退出应用
            if (e.metaKey && e.altKey && e.key === 'Escape') {
                e.preventDefault();
                this._showForceQuitDialog();
            }
        });
    },
    
    // 切换应用
    _switchApplication: function() {
        console.log('切换应用');
        // 在实际实现中，这里会显示应用切换器
    },
    
    // 打开Spotlight
    _openSpotlight: function() {
        console.log('打开Spotlight');
        // 在实际实现中，这里会显示Spotlight搜索
    },
    
    // 显示强制退出对话框
    _showForceQuitDialog: function() {
        console.log('显示强制退出对话框');
        // 在实际实现中，这里会显示强制退出应用的对话框
    },
    
    // 切换深色模式
    toggleDarkMode: function() {
        this.state.darkMode = !this.state.darkMode;
        
        // 触发深色模式切换事件
        const event = new CustomEvent('dark-mode-toggle', { 
            detail: { isDarkMode: this.state.darkMode } 
        });
        document.dispatchEvent(event);
        
        return this.state.darkMode;
    },
    
    // 设置音量
    setVolume: function(volume) {
        this.state.volume = volume;
        
        // 触发音量变化事件
        const event = new CustomEvent('volume-change', { 
            detail: { volume: this.state.volume } 
        });
        document.dispatchEvent(event);
        
        return this.state.volume;
    },
    
    // 设置亮度
    setBrightness: function(brightness) {
        this.state.brightness = brightness;
        
        // 触发亮度变化事件
        const event = new CustomEvent('brightness-change', { 
            detail: { brightness: this.state.brightness } 
        });
        document.dispatchEvent(event);
        
        return this.state.brightness;
    }
};

// 导出系统对象到全局
window.system = system;

// 当文档加载完成时初始化系统
document.addEventListener('DOMContentLoaded', () => {
    system.init();
});
