/**
 * macOS Monterey 网页版 - 菜单栏功能
 * 负责菜单栏的交互和功能实现
 */

// 菜单栏管理
const menubarManager = {
    // 当前活动的下拉菜单
    activeDropdown: null,
    
    // 初始化菜单栏
    init: function() {
        console.log('菜单栏已初始化');
        
        // 添加事件监听
        this._addEventListeners();
        
        // 创建下拉菜单
        this._createDropdownMenus();
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 苹果菜单
        const appleMenu = document.querySelector('.apple-menu');
        appleMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleDropdown('apple-dropdown');
        });
        
        // 应用菜单项
        const appMenuItems = document.querySelectorAll('.app-menu .menu-item');
        appMenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuName = item.textContent.toLowerCase();
                this._toggleDropdown(`app-${menuName}-dropdown`);
            });
        });
        
        // 应用名称
        const appName = document.querySelector('.app-name');
        appName.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleDropdown('app-dropdown');
        });
        
        // 右侧菜单图标
        const menuIcons = document.querySelectorAll('.menu-icons .menu-icon');
        menuIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (icon.classList.contains('control-center')) {
                    this._toggleControlCenter();
                } else if (icon.classList.contains('search')) {
                    this._toggleSpotlight();
                }
            });
        });
        
        // 时间点击
        const menuTime = document.getElementById('menu-time');
        menuTime.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleDateDisplay();
        });
        
        // 点击其他区域关闭下拉菜单
        document.addEventListener('click', () => {
            this._closeAllDropdowns();
        });
    },
    
    // 创建下拉菜单
    _createDropdownMenus: function() {
        // 创建苹果菜单
        this._createAppleMenu();
        
        // 创建应用菜单
        this._createAppMenu();
        
        // 创建文件菜单
        this._createFileMenu();
        
        // 创建编辑菜单
        this._createEditMenu();
        
        // 创建显示菜单
        this._createViewMenu();
        
        // 创建前往菜单
        this._createGoMenu();
        
        // 创建窗口菜单
        this._createWindowMenu();
        
        // 创建帮助菜单
        this._createHelpMenu();
    },
    
    // 创建苹果菜单
    _createAppleMenu: function() {
        const menuHTML = `
            <div id="apple-dropdown" class="dropdown-menu apple-dropdown">
                <div class="dropdown-item">关于本机</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">系统偏好设置...</div>
                <div class="dropdown-item">App Store...</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">最近使用的项目</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">强制退出...</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">睡眠</div>
                <div class="dropdown-item">重新启动...</div>
                <div class="dropdown-item">关机...</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">锁定屏幕</div>
                <div class="dropdown-item">退出登录...</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const appleDropdown = document.getElementById('apple-dropdown');
        const dropdownItems = appleDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this._handleAppleMenuItem(item.textContent);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建应用菜单
    _createAppMenu: function() {
        const menuHTML = `
            <div id="app-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">关于访达</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">偏好设置...</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">服务</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">隐藏访达</div>
                <div class="dropdown-item">隐藏其他</div>
                <div class="dropdown-item">显示全部</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">退出访达</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const appDropdown = document.getElementById('app-dropdown');
        const dropdownItems = appDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this._handleAppMenuItem(item.textContent);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建文件菜单
    _createFileMenu: function() {
        const menuHTML = `
            <div id="app-文件-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">新建访达窗口<span class="shortcut">⌘N</span></div>
                <div class="dropdown-item">新建文件夹<span class="shortcut">⇧⌘N</span></div>
                <div class="dropdown-item">新建标签页<span class="shortcut">⌘T</span></div>
                <div class="dropdown-item">打开<span class="shortcut">⌘O</span></div>
                <div class="dropdown-item">打开方式</div>
                <div class="dropdown-item">关闭窗口<span class="shortcut">⌘W</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">获取信息<span class="shortcut">⌘I</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">打印<span class="shortcut">⌘P</span></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const fileDropdown = document.getElementById('app-文件-dropdown');
        const dropdownItems = fileDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemText = item.textContent.replace(/\s*⌘.*$/, '');
                this._handleFileMenuItem(itemText);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建编辑菜单
    _createEditMenu: function() {
        const menuHTML = `
            <div id="app-编辑-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">撤销<span class="shortcut">⌘Z</span></div>
                <div class="dropdown-item">重做<span class="shortcut">⇧⌘Z</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">剪切<span class="shortcut">⌘X</span></div>
                <div class="dropdown-item">复制<span class="shortcut">⌘C</span></div>
                <div class="dropdown-item">粘贴<span class="shortcut">⌘V</span></div>
                <div class="dropdown-item">全选<span class="shortcut">⌘A</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">查找</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const editDropdown = document.getElementById('app-编辑-dropdown');
        const dropdownItems = editDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemText = item.textContent.replace(/\s*⌘.*$/, '');
                this._handleEditMenuItem(itemText);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建显示菜单
    _createViewMenu: function() {
        const menuHTML = `
            <div id="app-显示-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">为图标显示标题</div>
                <div class="dropdown-item">为图标显示预览</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">排序方式</div>
                <div class="dropdown-item">整理方式</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">显示路径栏<span class="shortcut">⌥⌘P</span></div>
                <div class="dropdown-item">显示状态栏</div>
                <div class="dropdown-item">显示边栏<span class="shortcut">⌥⌘S</span></div>
                <div class="dropdown-item">显示预览</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const viewDropdown = document.getElementById('app-显示-dropdown');
        const dropdownItems = viewDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemText = item.textContent.replace(/\s*⌘.*$/, '');
                this._handleViewMenuItem(itemText);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建前往菜单
    _createGoMenu: function() {
        const menuHTML = `
            <div id="app-前往-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">后退<span class="shortcut">⌘[</span></div>
                <div class="dropdown-item">前进<span class="shortcut">⌘]</span></div>
                <div class="dropdown-item">包含所在文件夹<span class="shortcut">⌘↑</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">电脑<span class="shortcut">⇧⌘C</span></div>
                <div class="dropdown-item">主目录<span class="shortcut">⇧⌘H</span></div>
                <div class="dropdown-item">下载<span class="shortcut">⌥⌘L</span></div>
                <div class="dropdown-item">应用程序<span class="shortcut">⇧⌘A</span></div>
                <div class="dropdown-item">文稿<span class="shortcut">⇧⌘O</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">前往文件夹...<span class="shortcut">⇧⌘G</span></div>
                <div class="dropdown-item">连接服务器...<span class="shortcut">⌘K</span></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const goDropdown = document.getElementById('app-前往-dropdown');
        const dropdownItems = goDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemText = item.textContent.replace(/\s*⌘.*$/, '');
                this._handleGoMenuItem(itemText);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建窗口菜单
    _createWindowMenu: function() {
        const menuHTML = `
            <div id="app-窗口-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">最小化<span class="shortcut">⌘M</span></div>
                <div class="dropdown-item">缩放</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">显示工具栏<span class="shortcut">⌥⌘T</span></div>
                <div class="dropdown-item">自定义工具栏...</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">将所有窗口拼贴<span class="shortcut">^↑⌘T</span></div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">前置全部窗口</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const windowDropdown = document.getElementById('app-窗口-dropdown');
        const dropdownItems = windowDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemText = item.textContent.replace(/\s*⌘.*$/, '');
                this._handleWindowMenuItem(itemText);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 创建帮助菜单
    _createHelpMenu: function() {
        const menuHTML = `
            <div id="app-帮助-dropdown" class="dropdown-menu app-dropdown">
                <div class="dropdown-item">访达帮助</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">macOS网页版帮助</div>
                <div class="dropdown-item">关于macOS网页版</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 添加点击事件
        const helpDropdown = document.getElementById('app-帮助-dropdown');
        const dropdownItems = helpDropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this._handleHelpMenuItem(item.textContent);
                this._closeAllDropdowns();
            });
        });
    },
    
    // 切换下拉菜单显示状态
    _toggleDropdown: function(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        
        if (!dropdown) return;
        
        // 关闭其他下拉菜单
        this._closeAllDropdowns();
        
        // 显示当前下拉菜单
        dropdown.classList.add('show');
        this.activeDropdown = dropdown;
    },
    
    // 关闭所有下拉菜单
    _closeAllDropdowns: function() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        
        this.activeDropdown = null;
    },
    
    // 切换控制中心
    _toggleControlCenter: function() {
        const controlCenter = document.getElementById('control-center');
        
        if (controlCenter.classList.contains('hidden')) {
            controlCenter.classList.remove('hidden');
        } else {
            controlCenter.classList.add('hidden');
        }
    },
    
    // 切换Spotlight搜索
    _toggleSpotlight: function() {
        console.log('切换Spotlight搜索');
        // TODO: 实现Spotlight搜索
    },
    
    // 切换日期显示
    _toggleDateDisplay: function() {
        console.log('切换日期显示');
        // TODO: 实现日期显示
    },
    
    // 处理苹果菜单项点击
    _handleAppleMenuItem: function(itemText) {
        console.log(`点击了苹果菜单项: ${itemText}`);
        
        switch (itemText) {
            case '关于本机':
                // 显示关于本机窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'about',
                        title: '关于本机',
                        width: 500,
                        height: 400,
                        resizable: false,
                        content: `
                            <div style="padding: 20px; text-align: center;">
                                <img src="icons/apple-logo.png" alt="Apple Logo" style="width: 80px; height: 80px; margin-bottom: 20px;">
                                <h2>macOS Monterey</h2>
                                <p>版本 12.0</p>
                                <p>macOS网页版 - 使用HTML, CSS和JavaScript实现</p>
                                <p>© 2025 Apple Inc. 保留所有权利。</p>
                            </div>
                        `
                    });
                }
                break;
                
            case '系统偏好设置...':
                // 打开系统偏好设置
                if (typeof window.openApplication === 'function') {
                    window.openApplication('settings');
                }
                break;
                
            // 处理其他菜单项...
        }
    },
    
    // 处理应用菜单项点击
    _handleAppMenuItem: function(itemText) {
        console.log(`点击了应用菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        switch (itemText) {
            case '退出访达':
                // 关闭所有访达窗口
                if (window.windowSystem) {
                    const finderWindows = window.windowSystem.windows.filter(w => w.app === 'finder');
                    finderWindows.forEach(w => {
                        window.windowSystem.closeWindow(w.element);
                    });
                }
                break;
                
            // 处理其他菜单项...
        }
    },
    
    // 处理文件菜单项点击
    _handleFileMenuItem: function(itemText) {
        console.log(`点击了文件菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        switch (itemText) {
            case '新建访达窗口':
                // 打开新的访达窗口
                if (typeof window.openApplication === 'function') {
                    window.openApplication('finder');
                }
                break;
                
            // 处理其他菜单项...
        }
    },
    
    // 处理编辑菜单项点击
    _handleEditMenuItem: function(itemText) {
        console.log(`点击了编辑菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        // ...
    },
    
    // 处理显示菜单项点击
    _handleViewMenuItem: function(itemText) {
        console.log(`点击了显示菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        // ...
    },
    
    // 处理前往菜单项点击
    _handleGoMenuItem: function(itemText) {
        console.log(`点击了前往菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        // ...
    },
    
    // 处理窗口菜单项点击
    _handleWindowMenuItem: function(itemText) {
        console.log(`点击了窗口菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        switch (itemText) {
            case '最小化':
                // 最小化当前窗口
                if (window.windowSystem) {
                    const focusedWindow = document.querySelector('.window.focused');
                    if (focusedWindow) {
                        window.windowSystem.minimizeWindow(focusedWindow);
                    }
                }
                break;
                
            // 处理其他菜单项...
        }
    },
    
    // 处理帮助菜单项点击
    _handleHelpMenuItem: function(itemText) {
        console.log(`点击了帮助菜单项: ${itemText}`);
        
        // 根据菜单项执行相应操作
        switch (itemText) {
            case '关于macOS网页版':
                // 显示关于窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'about',
                        title: '关于macOS网页版',
                        width: 500,
                        height: 300,
                        resizable: false,
                        content: `
                            <div style="padding: 20px; text-align: center;">
                                <h2>macOS Monterey 网页版</h2>
                                <p>版本 1.0</p>
                                <p>使用HTML, CSS和JavaScript实现的macOS Monterey模拟器</p>
                                <p>© 2025 保留所有权利。</p>
                            </div>
                        `
                    });
                }
                break;
                
            // 处理其他菜单项...
        }
    },
    
    // 更新应用名称和菜单
    updateAppMenu: function(appName) {
        // 更新应用名称
        document.querySelector('.app-name').textContent = appName;
        
        // TODO: 根据应用更新菜单项
    }
};

// 初始化菜单栏
function initMenuBar() {
    menubarManager.init();
    
    // 导出菜单栏管理器到全局
    window.menubarManager = menubarManager;
}
