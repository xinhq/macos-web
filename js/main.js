/**
 * macOS Monterey 网页版 - 主脚本
 * 负责初始化和管理整个系统
 */

// 全局变量
const system = {
    // 系统状态
    state: {
        darkMode: false,
        wallpaper: 'img/wallpaper-monterey.jpg',
        volume: 50,
        brightness: 100,
        wifi: true,
        bluetooth: true,
        airDrop: true,
        doNotDisturb: false,
        time: new Date()
    },
    
    // 初始化系统
    init: function() {
        console.log('macOS Monterey 网页版已启动');
        
        // 设置壁纸
        this.setWallpaper(this.state.wallpaper);
        
        // 初始化时间
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // 初始化事件监听
        this._addEventListeners();
        
        // 初始化Dock栏
        if (typeof initDock === 'function') {
            initDock();
        }
        
        // 初始化菜单栏
        if (typeof menubarManager !== 'undefined') {
            menubarManager.init();
        }
        
        // 初始化窗口系统
        if (typeof windowSystem !== 'undefined') {
            windowSystem.init();
        }
        
        // 初始化应用系统
        if (typeof appSystem !== 'undefined') {
            appSystem.init();
        }
        
        // 初始化右键菜单
        this._initContextMenu();
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 桌面右键菜单
        document.getElementById('desktop').addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this._showDesktopContextMenu(e.clientX, e.clientY);
        });
        
        // 点击桌面关闭所有菜单
        document.getElementById('desktop').addEventListener('click', () => {
            this._closeAllMenus();
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this._handleKeyboardShortcuts(e);
        });
    },
    
    // 初始化右键菜单
    _initContextMenu: function() {
        const contextMenuHTML = `
            <div class="menu">
                <div class="menu-item">新建文件夹</div>
                <div class="menu-divider"></div>
                <div class="menu-item">获取信息</div>
                <div class="menu-item">更改桌面背景</div>
                <div class="menu-divider"></div>
                <div class="menu-item">排序方式</div>
                <div class="menu-item">整理方式</div>
                <div class="menu-divider"></div>
                <div class="menu-item">使用"访达"打开</div>
            </div>
        `;
        
        const contextMenu = document.getElementById('context-menu');
        contextMenu.innerHTML = contextMenuHTML;
        
        // 添加菜单项点击事件
        const menuItems = contextMenu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this._handleContextMenuItem(item.textContent);
                this._closeContextMenu();
            });
        });
    },
    
    // 显示桌面右键菜单
    _showDesktopContextMenu: function(x, y) {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.classList.remove('hidden');
    },
    
    // 关闭右键菜单
    _closeContextMenu: function() {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.classList.add('hidden');
    },
    
    // 关闭所有菜单
    _closeAllMenus: function() {
        // 关闭右键菜单
        this._closeContextMenu();
        
        // 关闭控制中心
        const controlCenter = document.getElementById('control-center');
        if (controlCenter) {
            controlCenter.classList.add('hidden');
        }
        
        // 关闭启动台
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            launchpad.classList.add('hidden');
        }
        
        // 关闭下拉菜单
        if (typeof menubarManager !== 'undefined') {
            menubarManager._closeAllDropdowns();
        }
    },
    
    // 处理右键菜单项点击
    _handleContextMenuItem: function(itemText) {
        console.log(`点击了右键菜单项: ${itemText}`);
        
        switch (itemText) {
            case '新建文件夹':
                // 创建新文件夹
                this._createNewFolder();
                break;
                
            case '获取信息':
                // 显示桌面信息
                this._showDesktopInfo();
                break;
                
            case '更改桌面背景':
                // 打开桌面背景设置
                this._openWallpaperSettings();
                break;
                
            case '使用"访达"打开':
                // 打开访达
                if (typeof window.openApplication === 'function') {
                    window.openApplication('finder');
                }
                break;
                
            default:
                console.log(`菜单项 ${itemText} 的功能尚未实现`);
        }
    },
    
    // 处理键盘快捷键
    _handleKeyboardShortcuts: function(e) {
        // Command+Space: 打开Spotlight搜索
        if (e.metaKey && e.code === 'Space') {
            e.preventDefault();
            console.log('打开Spotlight搜索');
            // TODO: 实现Spotlight搜索
        }
        
        // Command+Option+D: 切换Dock自动隐藏
        if (e.metaKey && e.altKey && e.code === 'KeyD') {
            e.preventDefault();
            this._toggleDockAutoHide();
        }
        
        // F11: 显示桌面
        if (e.code === 'F11') {
            e.preventDefault();
            this._showDesktop();
        }
    },
    
    // 创建新文件夹
    _createNewFolder: function() {
        console.log('创建新文件夹');
        // TODO: 实现创建新文件夹功能
    },
    
    // 显示桌面信息
    _showDesktopInfo: function() {
        console.log('显示桌面信息');
        // TODO: 实现显示桌面信息功能
    },
    
    // 打开桌面背景设置
    _openWallpaperSettings: function() {
        console.log('打开桌面背景设置');
        // TODO: 实现打开桌面背景设置功能
    },
    
    // 切换Dock自动隐藏
    _toggleDockAutoHide: function() {
        console.log('切换Dock自动隐藏');
        // TODO: 实现Dock自动隐藏功能
    },
    
    // 显示桌面
    _showDesktop: function() {
        console.log('显示桌面');
        // TODO: 实现显示桌面功能
    },
    
    // 设置壁纸
    setWallpaper: function(wallpaperUrl) {
        document.getElementById('desktop').style.backgroundImage = `url(${wallpaperUrl})`;
        this.state.wallpaper = wallpaperUrl;
    },
    
    // 切换深色模式
    toggleDarkMode: function() {
        this.state.darkMode = !this.state.darkMode;
        
        if (this.state.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        console.log(`深色模式: ${this.state.darkMode ? '开启' : '关闭'}`);
    },
    
    // 更新时间显示
    updateTime: function() {
        this.state.time = new Date();
        
        const hours = this.state.time.getHours().toString().padStart(2, '0');
        const minutes = this.state.time.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        const menuTime = document.getElementById('menu-time');
        if (menuTime) {
            menuTime.textContent = timeString;
        }
    }
};

// 当文档加载完成时初始化系统
document.addEventListener('DOMContentLoaded', () => {
    system.init();
});
