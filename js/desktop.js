// desktop.js - 桌面环境功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化桌面环境
    initDesktop();
});

/**
 * 初始化桌面环境
 */
function initDesktop() {
    // 加载用户设置
    loadUserSettings();
    
    // 初始化顶部菜单栏
    initMenuBar();
    
    // 初始化Dock栏
    initDock();
    
    // 初始化桌面图标
    initDesktopIcons();
    
    // 初始化桌面右键菜单
    initDesktopContextMenu();
    
    // 初始化窗口管理
    initWindowManager();
    
    // 初始化壁纸设置
    initWallpaper();
    
    // 初始化系统时间显示
    initSystemTime();
    
    // 注意：不再自动打开访达窗口
    // 之前的代码可能包含了类似下面的自动打开访达的代码：
    // openFinder();
    
    // 显示欢迎通知
    showWelcomeNotification();
}

/**
 * 加载用户设置
 */
function loadUserSettings() {
    // 从本地存储加载设置
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const accentColor = localStorage.getItem('accentColor') || '#0070f3';
    const wallpaper = localStorage.getItem('wallpaper') || 'img/wallpapers/monterey.jpg';
    const dockSize = localStorage.getItem('dockSize') || 'medium';
    const dockPosition = localStorage.getItem('dockPosition') || 'bottom';
    
    // 应用深色模式
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // 应用强调色
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    // 应用壁纸
    setWallpaper(wallpaper);
    
    // 应用Dock设置
    setDockSize(dockSize);
    setDockPosition(dockPosition);
}

/**
 * 初始化顶部菜单栏
 */
function initMenuBar() {
    // 菜单栏在menubar.js中实现
    if (typeof window.initializeMenuBar === 'function') {
        window.initializeMenuBar();
    } else {
        console.error('菜单栏初始化函数未找到');
    }
}

/**
 * 初始化Dock栏
 */
function initDock() {
    // Dock栏在dock.js中实现
    if (typeof window.initializeDock === 'function') {
        window.initializeDock();
    } else {
        console.error('Dock栏初始化函数未找到');
    }
}

/**
 * 初始化桌面图标
 */
function initDesktopIcons() {
    const desktopElement = document.getElementById('desktop');
    
    if (!desktopElement) {
        console.error('未找到桌面元素');
        return;
    }
    
    // 从本地存储加载桌面图标
    const desktopIcons = JSON.parse(localStorage.getItem('desktopIcons')) || [];
    
    // 创建默认桌面图标
    if (desktopIcons.length === 0) {
        desktopIcons.push({
            id: 'desktop-icon-1',
            name: '访达',
            icon: 'icons/apps/finder.svg',
            type: 'app',
            position: { x: 20, y: 20 }
        });
        
        desktopIcons.push({
            id: 'desktop-icon-2',
            name: '系统偏好设置',
            icon: 'icons/apps/settings.svg',
            type: 'app',
            position: { x: 20, y: 100 }
        });
        
        // 保存到本地存储
        localStorage.setItem('desktopIcons', JSON.stringify(desktopIcons));
    }
    
    // 渲染桌面图标
    desktopIcons.forEach(icon => {
        createDesktopIcon(icon);
    });
}

/**
 * 创建桌面图标
 * @param {Object} icon - 图标信息
 */
function createDesktopIcon(icon) {
    const desktopElement = document.getElementById('desktop');
    
    if (!desktopElement) {
        console.error('未找到桌面元素');
        return;
    }
    
    // 创建图标元素
    const iconElement = document.createElement('div');
    iconElement.className = 'desktop-icon';
    iconElement.id = icon.id;
    iconElement.style.left = `${icon.position.x}px`;
    iconElement.style.top = `${icon.position.y}px`;
    
    // 创建图标图像
    const iconImage = document.createElement('img');
    iconImage.src = icon.icon;
    iconImage.alt = icon.name;
    iconImage.className = 'desktop-icon-image';
    
    // 创建图标名称
    const iconName = document.createElement('div');
    iconName.className = 'desktop-icon-name';
    iconName.textContent = icon.name;
    
    // 添加到图标元素
    iconElement.appendChild(iconImage);
    iconElement.appendChild(iconName);
    
    // 添加点击事件
    iconElement.addEventListener('click', function(e) {
        // 选中图标
        selectDesktopIcon(icon.id);
        
        // 双击打开
        if (e.detail === 2) {
            openDesktopIcon(icon);
        }
    });
    
    // 添加拖拽功能
    makeIconDraggable(iconElement);
    
    // 添加到桌面
    desktopElement.appendChild(iconElement);
}

/**
 * 选中桌面图标
 * @param {string} iconId - 图标ID
 */
function selectDesktopIcon(iconId) {
    // 取消所有图标的选中状态
    const icons = document.querySelectorAll('.desktop-icon');
    
    icons.forEach(icon => {
        icon.classList.remove('selected');
    });
    
    // 选中当前图标
    const selectedIcon = document.getElementById(iconId);
    
    if (selectedIcon) {
        selectedIcon.classList.add('selected');
    }
}

/**
 * 打开桌面图标
 * @param {Object} icon - 图标信息
 */
function openDesktopIcon(icon) {
    switch (icon.type) {
        case 'app':
            if (icon.name === '访达') {
                openFinder();
            } else if (icon.name === '系统偏好设置') {
                openSystemPreferences();
            }
            break;
            
        case 'folder':
            openFolder(icon.path);
            break;
            
        case 'file':
            openFile(icon.path);
            break;
    }
}

/**
 * 使图标可拖拽
 * @param {HTMLElement} element - 图标元素
 */
function makeIconDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        // 获取鼠标位置
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // 添加拖拽中的类
        element.classList.add('dragging');
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        // 计算新位置
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // 设置元素的新位置
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // 停止移动
        document.onmouseup = null;
        document.onmousemove = null;
        
        // 移除拖拽中的类
        element.classList.remove('dragging');
        
        // 保存图标位置
        saveIconPosition(element.id, {
            x: element.offsetLeft,
            y: element.offsetTop
        });
    }
}

/**
 * 保存图标位置
 * @param {string} iconId - 图标ID
 * @param {Object} position - 位置信息
 */
function saveIconPosition(iconId, position) {
    // 从本地存储加载桌面图标
    const desktopIcons = JSON.parse(localStorage.getItem('desktopIcons')) || [];
    
    // 更新位置
    const iconIndex = desktopIcons.findIndex(icon => icon.id === iconId);
    
    if (iconIndex !== -1) {
        desktopIcons[iconIndex].position = position;
        
        // 保存到本地存储
        localStorage.setItem('desktopIcons', JSON.stringify(desktopIcons));
    }
}

/**
 * 初始化桌面右键菜单
 */
function initDesktopContextMenu() {
    const desktopElement = document.getElementById('desktop');
    
    if (!desktopElement) {
        console.error('未找到桌面元素');
        return;
    }
    
    // 创建右键菜单
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.id = 'desktop-context-menu';
    
    // 添加菜单项
    const menuItems = [
        { text: '新建文件夹', action: createNewFolder },
        { text: '排列图标', action: arrangeIcons },
        { text: '更改桌面背景...', action: openWallpaperSettings },
        { text: '显示视图选项', action: showViewOptions }
    ];
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'context-menu-item';
        menuItem.textContent = item.text;
        menuItem.addEventListener('click', function() {
            // 隐藏菜单
            hideContextMenu();
            
            // 执行操作
            item.action();
        });
        
        contextMenu.appendChild(menuItem);
    });
    
    // 添加到桌面
    desktopElement.appendChild(contextMenu);
    
    // 添加右键事件
    desktopElement.addEventListener('contextmenu', function(e) {
        // 阻止默认右键菜单
        e.preventDefault();
        
        // 显示自定义右键菜单
        showContextMenu(e.clientX, e.clientY);
    });
    
    // 点击其他区域隐藏菜单
    document.addEventListener('click', hideContextMenu);
}

/**
 * 显示右键菜单
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 */
function showContextMenu(x, y) {
    const contextMenu = document.getElementById('desktop-context-menu');
    
    if (contextMenu) {
        // 设置位置
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        
        // 显示菜单
        contextMenu.classList.add('show');
    }
}

/**
 * 隐藏右键菜单
 */
function hideContextMenu() {
    const contextMenu = document.getElementById('desktop-context-menu');
    
    if (contextMenu) {
        contextMenu.classList.remove('show');
    }
}

/**
 * 创建新文件夹
 */
function createNewFolder() {
    // 从本地存储加载桌面图标
    const desktopIcons = JSON.parse(localStorage.getItem('desktopIcons')) || [];
    
    // 生成新文件夹ID
    const newId = `desktop-icon-${Date.now()}`;
    
    // 创建新文件夹图标
    const newFolder = {
        id: newId,
        name: '新建文件夹',
        icon: 'icons/folders/folder.svg',
        type: 'folder',
        path: '/Users/Guest/Desktop/新建文件夹',
        position: { x: 20, y: 180 }
    };
    
    // 添加到桌面图标列表
    desktopIcons.push(newFolder);
    
    // 保存到本地存储
    localStorage.setItem('desktopIcons', JSON.stringify(desktopIcons));
    
    // 创建桌面图标
    createDesktopIcon(newFolder);
    
    // 选中并进入编辑模式
    setTimeout(() => {
        selectDesktopIcon(newId);
        // TODO: 实现图标重命名功能
    }, 100);
}

/**
 * 排列图标
 */
function arrangeIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const iconSize = 80; // 图标大小
    const margin = 20; // 图标间距
    const startX = 20; // 起始X坐标
    const startY = 20; // 起始Y坐标
    const maxIconsPerColumn = Math.floor((window.innerHeight - startY) / (iconSize + margin));
    
    // 排列图标
    desktopIcons.forEach((icon, index) => {
        const column = Math.floor(index / maxIconsPerColumn);
        const row = index % maxIconsPerColumn;
        
        const x = startX + column * (iconSize + margin);
        const y = startY + row * (iconSize + margin);
        
        // 设置位置
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        
        // 保存位置
        saveIconPosition(icon.id, { x, y });
    });
}

/**
 * 打开壁纸设置
 */
function openWallpaperSettings() {
    // 打开系统偏好设置并导航到桌面与屏幕保护程序
    openSystemPreferences('desktop');
}

/**
 * 显示视图选项
 */
function showViewOptions() {
    // 创建视图选项窗口
    createWindow({
        title: '桌面视图选项',
        width: 400,
        height: 300,
        content: `
            <div class="view-options">
                <div class="option-group">
                    <label>图标大小:</label>
                    <input type="range" min="32" max="128" value="64" id="icon-size-slider">
                </div>
                <div class="option-group">
                    <label>图标排列方式:</label>
                    <select id="icon-arrangement">
                        <option value="grid">网格排列</option>
                        <option value="name">按名称排列</option>
                        <option value="date">按日期排列</option>
                        <option value="size">按大小排列</option>
                        <option value="kind">按种类排列</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>文本大小:</label>
                    <select id="text-size">
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14" selected>14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>标签位置:</label>
                    <select id="label-position">
                        <option value="bottom" selected>底部</option>
                        <option value="right">右侧</option>
                    </select>
                </div>
                <div class="option-group checkbox">
                    <input type="checkbox" id="show-item-info">
                    <label for="show-item-info">显示项目信息</label>
                </div>
                <div class="option-group checkbox">
                    <input type="checkbox" id="show-preview-icon">
                    <label for="show-preview-icon">显示预览图标</label>
                </div>
            </div>
            <div class="button-group">
                <button id="view-options-apply">应用</button>
                <button id="view-options-cancel">取消</button>
            </div>
        `
    });
    
    // 添加事件处理
    setTimeout(() => {
        const applyButton = document.getElementById('view-options-apply');
        const cancelButton = document.getElementById('view-options-cancel');
        
        if (applyButton) {
            applyButton.addEventListener('click', function() {
                // 应用视图选项
                const iconSize = document.getElementById('icon-size-slider').value;
                const iconArrangement = document.getElementById('icon-arrangement').value;
                const textSize = document.getElementById('text-size').value;
                const labelPosition = document.getElementById('label-position').value;
                const showItemInfo = document.getElementById('show-item-info').checked;
                const showPreviewIcon = document.getElementById('show-preview-icon').checked;
                
                // 保存设置
                localStorage.setItem('desktopIconSize', iconSize);
                localStorage.setItem('desktopIconArrangement', iconArrangement);
                localStorage.setItem('desktopTextSize', textSize);
                localStorage.setItem('desktopLabelPosition', labelPosition);
                localStorage.setItem('desktopShowItemInfo', showItemInfo);
                localStorage.setItem('desktopShowPreviewIcon', showPreviewIcon);
                
                // 应用设置
                applyDesktopViewOptions();
                
                // 关闭窗口
                closeWindowByTitle('桌面视图选项');
            });
        }
        
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                // 关闭窗口
                closeWindowByTitle('桌面视图选项');
            });
        }
    }, 100);
}

/**
 * 应用桌面视图选项
 */
function applyDesktopViewOptions() {
    const iconSize = localStorage.getItem('desktopIconSize') || 64;
    const textSize = localStorage.getItem('desktopTextSize') || 14;
    const labelPosition = localStorage.getItem('desktopLabelPosition') || 'bottom';
    
    // 应用图标大小
    document.documentElement.style.setProperty('--desktop-icon-size', `${iconSize}px`);
    
    // 应用文本大小
    document.documentElement.style.setProperty('--desktop-text-size', `${textSize}px`);
    
    // 应用标签位置
    if (labelPosition === 'right') {
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.classList.add('label-right');
        });
    } else {
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.classList.remove('label-right');
        });
    }
    
    // 根据排列方式重新排列图标
    const arrangement = localStorage.getItem('desktopIconArrangement');
    
    if (arrangement) {
        arrangeIconsByType(arrangement);
    }
}

/**
 * 根据类型排列图标
 * @param {string} type - 排列类型
 */
function arrangeIconsByType(type) {
    // 从本地存储加载桌面图标
    let desktopIcons = JSON.parse(localStorage.getItem('desktopIcons')) || [];
    
    // 根据类型排序
    switch (type) {
        case 'name':
            desktopIcons.sort((a, b) => a.name.localeCompare(b.name));
            break;
            
        case 'date':
            // 假设有修改日期属性
            desktopIcons.sort((a, b) => (b.modifiedDate || 0) - (a.modifiedDate || 0));
            break;
            
        case 'size':
            // 假设有大小属性
            desktopIcons.sort((a, b) => (b.size || 0) - (a.size || 0));
            break;
            
        case 'kind':
            // 按类型排序
            desktopIcons.sort((a, b) => a.type.localeCompare(b.type));
            break;
    }
    
    // 保存排序后的图标
    localStorage.setItem('desktopIcons', JSON.stringify(desktopIcons));
    
    // 重新排列图标
    arrangeIcons();
}

/**
 * 初始化窗口管理
 */
function initWindowManager() {
    // 窗口管理在windows.js中实现
    if (typeof window.initializeWindowManager === 'function') {
        window.initializeWindowManager();
    } else {
        console.error('窗口管理初始化函数未找到');
    }
}

/**
 * 初始化壁纸设置
 */
function initWallpaper() {
    // 壁纸设置在wallpaper.js中实现
    if (typeof window.initializeWallpaper === 'function') {
        window.initializeWallpaper();
    } else {
        console.error('壁纸设置初始化函数未找到');
        
        // 使用默认壁纸
        setWallpaper('img/wallpapers/monterey.jpg');
    }
}

/**
 * 设置壁纸
 * @param {string} wallpaperPath - 壁纸路径
 */
function setWallpaper(wallpaperPath) {
    const desktopElement = document.getElementById('desktop');
    
    if (desktopElement) {
        desktopElement.style.backgroundImage = `url('${wallpaperPath}')`;
    }
}

/**
 * 初始化系统时间显示
 */
function initSystemTime() {
    // 更新时间
    updateSystemTime();
    
    // 每分钟更新一次
    setInterval(updateSystemTime, 60000);
}

/**
 * 更新系统时间
 */
function updateSystemTime() {
    const timeElement = document.getElementById('system-time');
    
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

/**
 * 打开访达
 */
function openFinder() {
    // 创建访达窗口
    createWindow({
        title: '访达',
        width: 800,
        height: 500,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/finder.svg',
        content: `
            <div class="finder-container">
                <div class="finder-sidebar">
                    <div class="sidebar-section">
                        <div class="sidebar-title">收藏</div>
                        <div class="sidebar-item active" data-path="/Users/Guest/Desktop">
                            <img src="icons/folders/folder-desktop.svg" alt="桌面">
                            <span>桌面</span>
                        </div>
                        <div class="sidebar-item" data-path="/Users/Guest/Documents">
                            <img src="icons/folders/folder-documents.svg" alt="文稿">
                            <span>文稿</span>
                        </div>
                        <div class="sidebar-item" data-path="/Users/Guest/Downloads">
                            <img src="icons/folders/folder-downloads.svg" alt="下载">
                            <span>下载</span>
                        </div>
                        <div class="sidebar-item" data-path="/Users/Guest/Pictures">
                            <img src="icons/folders/folder-pictures.svg" alt="图片">
                            <span>图片</span>
                        </div>
                        <div class="sidebar-item" data-path="/Users/Guest/Music">
                            <img src="icons/folders/folder-music.svg" alt="音乐">
                            <span>音乐</span>
                        </div>
                    </div>
                    <div class="sidebar-section">
                        <div class="sidebar-title">位置</div>
                        <div class="sidebar-item" data-path="/Applications">
                            <img src="icons/folders/folder-applications.svg" alt="应用程序">
                            <span>应用程序</span>
                        </div>
                        <div class="sidebar-item" data-path="/Users/Guest">
                            <img src="icons/system/user.svg" alt="Guest">
                            <span>Guest</span>
                        </div>
                    </div>
                </div>
                <div class="finder-content">
                    <div class="finder-toolbar">
                        <div class="toolbar-nav">
                            <button class="toolbar-button back-button" title="后退">
                                <span class="icon">←</span>
                            </button>
                            <button class="toolbar-button forward-button" title="前进">
                                <span class="icon">→</span>
                            </button>
                        </div>
                        <div class="toolbar-view">
                            <button class="toolbar-button icon-view-button active" title="图标视图">
                                <span class="icon">◫</span>
                            </button>
                            <button class="toolbar-button list-view-button" title="列表视图">
                                <span class="icon">≡</span>
                            </button>
                            <button class="toolbar-button column-view-button" title="分栏视图">
                                <span class="icon">◫|</span>
                            </button>
                        </div>
                        <div class="toolbar-actions">
                            <button class="toolbar-button action-button" title="操作">
                                <span class="icon">⚙</span>
                            </button>
                            <button class="toolbar-button info-button" title="信息">
                                <span class="icon">ⓘ</span>
                            </button>
                        </div>
                    </div>
                    <div class="finder-path-bar">
                        <span class="path-item">桌面</span>
                    </div>
                    <div class="finder-items">
                        <!-- 文件和文件夹将在这里动态生成 -->
                    </div>
                    <div class="finder-status-bar">
                        <span class="status-items">5 个项目</span>
                        <span class="status-space">可用空间：100GB</span>
                    </div>
                </div>
            </div>
        `
    });
    
    // 初始化访达功能
    setTimeout(() => {
        initFinderFunctionality();
    }, 100);
}

/**
 * 初始化访达功能
 */
function initFinderFunctionality() {
    // 侧边栏项目点击
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取路径
            const path = this.dataset.path;
            
            // 更新路径栏
            updatePathBar(path);
            
            // 加载文件夹内容
            loadFolderContent(path);
        });
    });
    
    // 工具栏按钮点击
    const viewButtons = document.querySelectorAll('.toolbar-view button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 更改视图
            const finderItems = document.querySelector('.finder-items');
            
            if (this.classList.contains('icon-view-button')) {
                finderItems.className = 'finder-items icon-view';
            } else if (this.classList.contains('list-view-button')) {
                finderItems.className = 'finder-items list-view';
            } else if (this.classList.contains('column-view-button')) {
                finderItems.className = 'finder-items column-view';
            }
        });
    });
    
    // 加载默认文件夹内容
    loadFolderContent('/Users/Guest/Desktop');
}

/**
 * 更新路径栏
 * @param {string} path - 文件路径
 */
function updatePathBar(path) {
    const pathBar = document.querySelector('.finder-path-bar');
    
    if (pathBar) {
        // 清空路径栏
        pathBar.innerHTML = '';
        
        // 分割路径
        const pathParts = path.split('/').filter(part => part);
        
        // 添加路径项
        pathParts.forEach((part, index) => {
            // 创建路径项
            const pathItem = document.createElement('span');
            pathItem.className = 'path-item';
            
            // 显示友好名称
            let displayName = part;
            
            switch (part) {
                case 'Users':
                    displayName = '用户';
                    break;
                case 'Guest':
                    displayName = 'Guest';
                    break;
                case 'Desktop':
                    displayName = '桌面';
                    break;
                case 'Documents':
                    displayName = '文稿';
                    break;
                case 'Downloads':
                    displayName = '下载';
                    break;
                case 'Pictures':
                    displayName = '图片';
                    break;
                case 'Music':
                    displayName = '音乐';
                    break;
                case 'Applications':
                    displayName = '应用程序';
                    break;
            }
            
            pathItem.textContent = displayName;
            
            // 添加到路径栏
            pathBar.appendChild(pathItem);
            
            // 添加分隔符
            if (index < pathParts.length - 1) {
                const separator = document.createElement('span');
                separator.className = 'path-separator';
                separator.textContent = '>';
                pathBar.appendChild(separator);
            }
        });
    }
}

/**
 * 加载文件夹内容
 * @param {string} path - 文件路径
 */
function loadFolderContent(path) {
    const finderItems = document.querySelector('.finder-items');
    
    if (finderItems) {
        // 清空内容
        finderItems.innerHTML = '';
        
        // 模拟文件夹内容
        let items = [];
        
        if (path === '/Users/Guest/Desktop') {
            items = [
                { name: '新建文件夹', type: 'folder', icon: 'icons/folders/folder.svg' },
                { name: 'macOS网页版项目', type: 'folder', icon: 'icons/folders/folder.svg' },
                { name: '截屏2025-04-16', type: 'file', icon: 'icons/files/image.svg' },
                { name: '重要文档', type: 'file', icon: 'icons/files/pdf.svg' },
                { name: '待办事项', type: 'file', icon: 'icons/files/text.svg' }
            ];
        } else if (path === '/Users/Guest/Documents') {
            items = [
                { name: '工作文档', type: 'folder', icon: 'icons/folders/folder.svg' },
                { name: '个人文档', type: 'folder', icon: 'icons/folders/folder.svg' },
                { name: '项目计划', type: 'file', icon: 'icons/files/text.svg' },
                { name: '财务报表', type: 'file', icon: 'icons/files/pdf.svg' },
                { name: '会议记录', type: 'file', icon: 'icons/files/text.svg' }
            ];
        } else if (path === '/Users/Guest/Downloads') {
            items = [
                { name: 'macOS_Monterey.dmg', type: 'file', icon: 'icons/files/dmg.svg' },
                { name: 'project_files.zip', type: 'file', icon: 'icons/files/archive.svg' },
                { name: 'presentation.key', type: 'file', icon: 'icons/files/keynote.svg' },
                { name: 'report.pdf', type: 'file', icon: 'icons/files/pdf.svg' },
                { name: 'vacation_photo.jpg', type: 'file', icon: 'icons/files/image.svg' }
            ];
        } else if (path === '/Users/Guest/Pictures') {
            items = [
                { name: '家庭照片', type: 'folder', icon: 'icons/folders/folder-pictures.svg' },
                { name: '旅行照片', type: 'folder', icon: 'icons/folders/folder-pictures.svg' },
                { name: '截屏', type: 'folder', icon: 'icons/folders/folder-pictures.svg' },
                { name: 'profile.jpg', type: 'file', icon: 'icons/files/image.svg' },
                { name: 'wallpaper.jpg', type: 'file', icon: 'icons/files/image.svg' }
            ];
        } else if (path === '/Users/Guest/Music') {
            items = [
                { name: '我的播放列表', type: 'folder', icon: 'icons/folders/folder-music.svg' },
                { name: '下载的音乐', type: 'folder', icon: 'icons/folders/folder-music.svg' },
                { name: 'favorite_song.mp3', type: 'file', icon: 'icons/files/audio.svg' },
                { name: 'new_album.mp3', type: 'file', icon: 'icons/files/audio.svg' },
                { name: 'podcast.mp3', type: 'file', icon: 'icons/files/audio.svg' }
            ];
        } else if (path === '/Applications') {
            items = [
                { name: 'Safari', type: 'app', icon: 'icons/apps/safari.svg' },
                { name: '邮件', type: 'app', icon: 'icons/apps/mail.svg' },
                { name: '信息', type: 'app', icon: 'icons/apps/messages.svg' },
                { name: '地图', type: 'app', icon: 'icons/apps/maps.svg' },
                { name: '照片', type: 'app', icon: 'icons/apps/photos.svg' },
                { name: '备忘录', type: 'app', icon: 'icons/apps/notes.svg' },
                { name: '提醒事项', type: 'app', icon: 'icons/apps/reminders.svg' },
                { name: '日历', type: 'app', icon: 'icons/apps/calendar.svg' },
                { name: '联系人', type: 'app', icon: 'icons/apps/contacts.svg' },
                { name: '音乐', type: 'app', icon: 'icons/apps/music.svg' }
            ];
        } else if (path === '/Users/Guest') {
            items = [
                { name: '桌面', type: 'folder', icon: 'icons/folders/folder-desktop.svg' },
                { name: '文稿', type: 'folder', icon: 'icons/folders/folder-documents.svg' },
                { name: '下载', type: 'folder', icon: 'icons/folders/folder-downloads.svg' },
                { name: '图片', type: 'folder', icon: 'icons/folders/folder-pictures.svg' },
                { name: '音乐', type: 'folder', icon: 'icons/folders/folder-music.svg' },
                { name: '影片', type: 'folder', icon: 'icons/folders/folder-movies.svg' },
                { name: '公共', type: 'folder', icon: 'icons/folders/folder-shared.svg' }
            ];
        }
        
        // 创建项目
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `finder-item ${item.type}`;
            
            const itemIcon = document.createElement('img');
            itemIcon.src = item.icon;
            itemIcon.alt = item.name;
            itemIcon.className = 'item-icon';
            
            const itemName = document.createElement('div');
            itemName.className = 'item-name';
            itemName.textContent = item.name;
            
            itemElement.appendChild(itemIcon);
            itemElement.appendChild(itemName);
            
            // 添加双击事件
            itemElement.addEventListener('dblclick', function() {
                if (item.type === 'folder' || item.type === 'app') {
                    // 构建新路径
                    let newPath = path;
                    
                    if (!newPath.endsWith('/')) {
                        newPath += '/';
                    }
                    
                    newPath += item.name;
                    
                    // 更新路径栏
                    updatePathBar(newPath);
                    
                    // 加载文件夹内容
                    loadFolderContent(newPath);
                } else {
                    // 打开文件
                    openFile(item);
                }
            });
            
            finderItems.appendChild(itemElement);
        });
        
        // 更新状态栏
        const statusItems = document.querySelector('.status-items');
        
        if (statusItems) {
            statusItems.textContent = `${items.length} 个项目`;
        }
    }
}

/**
 * 打开文件
 * @param {Object} file - 文件信息
 */
function openFile(file) {
    // 根据文件类型打开不同的应用
    switch (file.type) {
        case 'pdf':
            // 打开PDF查看器
            createWindow({
                title: file.name,
                width: 800,
                height: 600,
                resizable: true,
                maximizable: true,
                minimizable: true,
                icon: 'icons/files/pdf.svg',
                content: `
                    <div class="pdf-viewer">
                        <div class="pdf-toolbar">
                            <button class="toolbar-button">
                                <span class="icon">-</span>
                            </button>
                            <input type="text" class="page-input" value="1">
                            <span class="page-count">/ 10</span>
                            <button class="toolbar-button">
                                <span class="icon">+</span>
                            </button>
                            <button class="toolbar-button">
                                <span class="icon">⟳</span>
                            </button>
                        </div>
                        <div class="pdf-content">
                            <div class="pdf-placeholder">
                                <img src="icons/files/pdf.svg" alt="PDF">
                                <p>PDF 内容将在这里显示</p>
                            </div>
                        </div>
                    </div>
                `
            });
            break;
            
        case 'image':
            // 打开图片查看器
            createWindow({
                title: file.name,
                width: 800,
                height: 600,
                resizable: true,
                maximizable: true,
                minimizable: true,
                icon: 'icons/files/image.svg',
                content: `
                    <div class="image-viewer">
                        <div class="image-toolbar">
                            <button class="toolbar-button">
                                <span class="icon">-</span>
                            </button>
                            <button class="toolbar-button">
                                <span class="icon">+</span>
                            </button>
                            <button class="toolbar-button">
                                <span class="icon">⟳</span>
                            </button>
                        </div>
                        <div class="image-content">
                            <div class="image-placeholder">
                                <img src="icons/files/image.svg" alt="Image">
                                <p>图片内容将在这里显示</p>
                            </div>
                        </div>
                    </div>
                `
            });
            break;
            
        case 'text':
            // 打开文本编辑器
            createWindow({
                title: file.name,
                width: 600,
                height: 400,
                resizable: true,
                maximizable: true,
                minimizable: true,
                icon: 'icons/files/text.svg',
                content: `
                    <div class="text-editor">
                        <div class="text-toolbar">
                            <button class="toolbar-button">
                                <span class="icon">B</span>
                            </button>
                            <button class="toolbar-button">
                                <span class="icon">I</span>
                            </button>
                            <button class="toolbar-button">
                                <span class="icon">U</span>
                            </button>
                            <select class="font-select">
                                <option>San Francisco</option>
                                <option>Helvetica</option>
                                <option>Arial</option>
                            </select>
                            <select class="size-select">
                                <option>12</option>
                                <option>14</option>
                                <option>16</option>
                                <option>18</option>
                            </select>
                        </div>
                        <div class="text-content">
                            <textarea class="text-area" placeholder="在这里输入文本..."></textarea>
                        </div>
                    </div>
                `
            });
            break;
            
        default:
            // 默认查看器
            createWindow({
                title: file.name,
                width: 400,
                height: 300,
                resizable: true,
                maximizable: true,
                minimizable: true,
                icon: 'icons/files/generic.svg',
                content: `
                    <div class="file-viewer">
                        <div class="file-icon">
                            <img src="${file.icon}" alt="${file.name}">
                        </div>
                        <div class="file-info">
                            <p><strong>名称:</strong> ${file.name}</p>
                            <p><strong>类型:</strong> ${file.type}</p>
                            <p><strong>大小:</strong> 未知</p>
                            <p><strong>创建日期:</strong> 未知</p>
                            <p><strong>修改日期:</strong> 未知</p>
                        </div>
                    </div>
                `
            });
    }
}

/**
 * 打开系统偏好设置
 * @param {string} section - 设置部分
 */
function openSystemPreferences(section) {
    // 系统偏好设置在settings.js中实现
    if (typeof window.openSystemPreferences === 'function') {
        window.openSystemPreferences(section);
    } else {
        console.error('系统偏好设置函数未找到');
        
        // 创建基本的系统偏好设置窗口
        createWindow({
            title: '系统偏好设置',
            width: 800,
            height: 600,
            resizable: true,
            maximizable: true,
            minimizable: true,
            icon: 'icons/system/settings.svg',
            content: `
                <div class="preferences-container">
                    <div class="preferences-grid">
                        <div class="preference-item" data-section="general">
                            <img src="icons/system/settings-general.svg" alt="通用">
                            <span>通用</span>
                        </div>
                        <div class="preference-item" data-section="desktop">
                            <img src="icons/system/settings-desktop.svg" alt="桌面与屏幕保护程序">
                            <span>桌面与屏幕保护程序</span>
                        </div>
                        <div class="preference-item" data-section="dock">
                            <img src="icons/system/settings-dock.svg" alt="程序坞">
                            <span>程序坞</span>
                        </div>
                        <div class="preference-item" data-section="users">
                            <img src="icons/system/settings-users.svg" alt="用户与群组">
                            <span>用户与群组</span>
                        </div>
                        <div class="preference-item" data-section="security">
                            <img src="icons/system/settings-security.svg" alt="安全性与隐私">
                            <span>安全性与隐私</span>
                        </div>
                        <div class="preference-item" data-section="displays">
                            <img src="icons/system/settings-displays.svg" alt="显示器">
                            <span>显示器</span>
                        </div>
                        <div class="preference-item" data-section="energy">
                            <img src="icons/system/settings-energy.svg" alt="节能">
                            <span>节能</span>
                        </div>
                        <div class="preference-item" data-section="keyboard">
                            <img src="icons/system/settings-keyboard.svg" alt="键盘">
                            <span>键盘</span>
                        </div>
                        <div class="preference-item" data-section="mouse">
                            <img src="icons/system/settings-mouse.svg" alt="鼠标">
                            <span>鼠标</span>
                        </div>
                        <div class="preference-item" data-section="sound">
                            <img src="icons/system/settings-sound.svg" alt="声音">
                            <span>声音</span>
                        </div>
                    </div>
                </div>
            `
        });
        
        // 添加设置项点击事件
        setTimeout(() => {
            const preferenceItems = document.querySelectorAll('.preference-item');
            
            preferenceItems.forEach(item => {
                item.addEventListener('click', function() {
                    const section = this.dataset.section;
                    
                    // 打开对应的设置部分
                    openPreferenceSection(section);
                });
            });
            
            // 如果指定了部分，自动打开
            if (section) {
                openPreferenceSection(section);
            }
        }, 100);
    }
}

/**
 * 打开偏好设置部分
 * @param {string} section - 设置部分
 */
function openPreferenceSection(section) {
    // 创建设置部分窗口
    let title = '系统偏好设置';
    let content = '';
    
    switch (section) {
        case 'general':
            title = '通用';
            content = `
                <div class="preference-section">
                    <div class="preference-group">
                        <h3>外观</h3>
                        <div class="preference-option">
                            <input type="radio" name="appearance" id="appearance-light" checked>
                            <label for="appearance-light">浅色</label>
                        </div>
                        <div class="preference-option">
                            <input type="radio" name="appearance" id="appearance-dark">
                            <label for="appearance-dark">深色</label>
                        </div>
                        <div class="preference-option">
                            <input type="radio" name="appearance" id="appearance-auto">
                            <label for="appearance-auto">自动</label>
                        </div>
                    </div>
                    <div class="preference-group">
                        <h3>强调色</h3>
                        <div class="color-options">
                            <div class="color-option blue selected" data-color="#0070f3"></div>
                            <div class="color-option purple" data-color="#9c27b0"></div>
                            <div class="color-option pink" data-color="#e91e63"></div>
                            <div class="color-option red" data-color="#f44336"></div>
                            <div class="color-option orange" data-color="#ff9800"></div>
                            <div class="color-option yellow" data-color="#ffeb3b"></div>
                            <div class="color-option green" data-color="#4caf50"></div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'desktop':
            title = '桌面与屏幕保护程序';
            content = `
                <div class="preference-section">
                    <div class="preference-tabs">
                        <div class="tab active" data-tab="desktop">桌面</div>
                        <div class="tab" data-tab="screensaver">屏幕保护程序</div>
                    </div>
                    <div class="tab-content desktop-tab active">
                        <div class="wallpaper-options">
                            <div class="wallpaper-category">
                                <h3>macOS</h3>
                                <div class="wallpaper-grid">
                                    <div class="wallpaper-item selected" data-wallpaper="img/wallpapers/monterey.jpg">
                                        <img src="img/wallpapers/monterey.jpg" alt="Monterey">
                                    </div>
                                    <div class="wallpaper-item" data-wallpaper="img/wallpapers/big-sur.jpg">
                                        <img src="img/wallpapers/big-sur.jpg" alt="Big Sur">
                                    </div>
                                    <div class="wallpaper-item" data-wallpaper="img/wallpapers/catalina.jpg">
                                        <img src="img/wallpapers/catalina.jpg" alt="Catalina">
                                    </div>
                                    <div class="wallpaper-item" data-wallpaper="img/wallpapers/mojave.jpg">
                                        <img src="img/wallpapers/mojave.jpg" alt="Mojave">
                                    </div>
                                </div>
                            </div>
                            <div class="wallpaper-category">
                                <h3>动态</h3>
                                <div class="wallpaper-grid">
                                    <div class="wallpaper-item" data-wallpaper="img/wallpapers/dynamic-1.jpg">
                                        <img src="img/wallpapers/dynamic-1.jpg" alt="动态1">
                                    </div>
                                    <div class="wallpaper-item" data-wallpaper="img/wallpapers/dynamic-2.jpg">
                                        <img src="img/wallpapers/dynamic-2.jpg" alt="动态2">
                                    </div>
                                </div>
                            </div>
                            <div class="wallpaper-upload">
                                <button class="upload-button">选择图片...</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content screensaver-tab">
                        <div class="screensaver-options">
                            <div class="screensaver-list">
                                <div class="screensaver-item selected">
                                    <span>漂浮</span>
                                </div>
                                <div class="screensaver-item">
                                    <span>照片墙</span>
                                </div>
                                <div class="screensaver-item">
                                    <span>幻灯片</span>
                                </div>
                            </div>
                            <div class="screensaver-preview">
                                <div class="preview-placeholder">
                                    <span>屏幕保护程序预览</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'dock':
            title = '程序坞';
            content = `
                <div class="preference-section">
                    <div class="preference-group">
                        <h3>大小</h3>
                        <div class="slider-container">
                            <span class="slider-label">小</span>
                            <input type="range" min="0" max="100" value="50" class="preference-slider" id="dock-size-slider">
                            <span class="slider-label">大</span>
                        </div>
                    </div>
                    <div class="preference-group">
                        <h3>放大</h3>
                        <div class="preference-option">
                            <input type="checkbox" id="dock-magnification" checked>
                            <label for="dock-magnification">开启放大</label>
                        </div>
                        <div class="slider-container">
                            <span class="slider-label">小</span>
                            <input type="range" min="0" max="100" value="70" class="preference-slider" id="dock-magnification-slider">
                            <span class="slider-label">大</span>
                        </div>
                    </div>
                    <div class="preference-group">
                        <h3>位置</h3>
                        <div class="preference-option">
                            <input type="radio" name="dock-position" id="dock-position-bottom" checked>
                            <label for="dock-position-bottom">屏幕底部</label>
                        </div>
                        <div class="preference-option">
                            <input type="radio" name="dock-position" id="dock-position-left">
                            <label for="dock-position-left">屏幕左侧</label>
                        </div>
                        <div class="preference-option">
                            <input type="radio" name="dock-position" id="dock-position-right">
                            <label for="dock-position-right">屏幕右侧</label>
                        </div>
                    </div>
                    <div class="preference-group">
                        <h3>其他选项</h3>
                        <div class="preference-option">
                            <input type="checkbox" id="dock-autohide">
                            <label for="dock-autohide">自动隐藏和显示程序坞</label>
                        </div>
                        <div class="preference-option">
                            <input type="checkbox" id="dock-show-indicators" checked>
                            <label for="dock-show-indicators">在程序坞中显示打开的应用程序的指示灯</label>
                        </div>
                        <div class="preference-option">
                            <input type="checkbox" id="dock-minimize-effect" checked>
                            <label for="dock-minimize-effect">使用缩放效果最小化窗口</label>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        // 其他设置部分...
        default:
            content = `
                <div class="preference-section">
                    <div class="preference-placeholder">
                        <p>此设置部分尚未实现</p>
                    </div>
                </div>
            `;
    }
    
    // 创建窗口
    createWindow({
        title: title,
        width: 700,
        height: 500,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/system/settings.svg',
        content: content
    });
    
    // 添加设置部分的事件处理
    setTimeout(() => {
        initPreferenceSectionEvents(section);
    }, 100);
}

/**
 * 初始化设置部分的事件处理
 * @param {string} section - 设置部分
 */
function initPreferenceSectionEvents(section) {
    switch (section) {
        case 'general':
            // 外观选项
            const appearanceOptions = document.querySelectorAll('input[name="appearance"]');
            
            appearanceOptions.forEach(option => {
                option.addEventListener('change', function() {
                    if (this.id === 'appearance-light') {
                        document.body.classList.remove('dark-mode');
                        localStorage.setItem('darkMode', 'false');
                    } else if (this.id === 'appearance-dark') {
                        document.body.classList.add('dark-mode');
                        localStorage.setItem('darkMode', 'true');
                    } else if (this.id === 'appearance-auto') {
                        // 自动模式根据系统设置
                        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        
                        if (prefersDarkMode) {
                            document.body.classList.add('dark-mode');
                        } else {
                            document.body.classList.remove('dark-mode');
                        }
                        
                        localStorage.setItem('darkMode', prefersDarkMode ? 'true' : 'false');
                    }
                });
            });
            
            // 强调色选项
            const colorOptions = document.querySelectorAll('.color-option');
            
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // 移除所有选中状态
                    colorOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // 添加选中状态
                    this.classList.add('selected');
                    
                    // 获取颜色
                    const color = this.dataset.color;
                    
                    // 应用强调色
                    document.documentElement.style.setProperty('--accent-color', color);
                    
                    // 保存设置
                    localStorage.setItem('accentColor', color);
                });
            });
            break;
            
        case 'desktop':
            // 标签切换
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // 移除所有活动状态
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // 添加活动状态
                    this.classList.add('active');
                    
                    // 显示对应的内容
                    const tabName = this.dataset.tab;
                    document.querySelector(`.${tabName}-tab`).classList.add('active');
                });
            });
            
            // 壁纸选择
            const wallpaperItems = document.querySelectorAll('.wallpaper-item');
            
            wallpaperItems.forEach(item => {
                item.addEventListener('click', function() {
                    // 移除所有选中状态
                    wallpaperItems.forEach(i => i.classList.remove('selected'));
                    
                    // 添加选中状态
                    this.classList.add('selected');
                    
                    // 获取壁纸路径
                    const wallpaperPath = this.dataset.wallpaper;
                    
                    // 设置壁纸
                    setWallpaper(wallpaperPath);
                    
                    // 保存设置
                    localStorage.setItem('wallpaper', wallpaperPath);
                });
            });
            
            // 上传壁纸按钮
            const uploadButton = document.querySelector('.upload-button');
            
            if (uploadButton) {
                uploadButton.addEventListener('click', function() {
                    // 模拟文件上传
                    alert('在实际应用中，这里会打开文件选择对话框');
                });
            }
            break;
            
        case 'dock':
            // Dock大小滑块
            const dockSizeSlider = document.getElementById('dock-size-slider');
            
            if (dockSizeSlider) {
                dockSizeSlider.addEventListener('input', function() {
                    // 设置Dock大小
                    const size = this.value;
                    setDockSize(size);
                    
                    // 保存设置
                    localStorage.setItem('dockSize', size);
                });
            }
            
            // Dock位置选项
            const dockPositionOptions = document.querySelectorAll('input[name="dock-position"]');
            
            dockPositionOptions.forEach(option => {
                option.addEventListener('change', function() {
                    let position = 'bottom';
                    
                    if (this.id === 'dock-position-left') {
                        position = 'left';
                    } else if (this.id === 'dock-position-right') {
                        position = 'right';
                    }
                    
                    // 设置Dock位置
                    setDockPosition(position);
                    
                    // 保存设置
                    localStorage.setItem('dockPosition', position);
                });
            });
            
            // 其他Dock选项
            const dockAutoHide = document.getElementById('dock-autohide');
            
            if (dockAutoHide) {
                dockAutoHide.addEventListener('change', function() {
                    // 设置Dock自动隐藏
                    const autoHide = this.checked;
                    setDockAutoHide(autoHide);
                    
                    // 保存设置
                    localStorage.setItem('dockAutoHide', autoHide);
                });
            }
            break;
    }
}

/**
 * 设置Dock大小
 * @param {string|number} size - Dock大小
 */
function setDockSize(size) {
    // 转换为数值
    const sizeValue = parseInt(size);
    
    // 计算实际大小（40-80像素）
    const actualSize = 40 + (sizeValue / 100) * 40;
    
    // 设置CSS变量
    document.documentElement.style.setProperty('--dock-size', `${actualSize}px`);
    
    // 设置大小类
    const dock = document.getElementById('dock');
    
    if (dock) {
        dock.classList.remove('dock-small', 'dock-medium', 'dock-large');
        
        if (sizeValue < 33) {
            dock.classList.add('dock-small');
        } else if (sizeValue < 66) {
            dock.classList.add('dock-medium');
        } else {
            dock.classList.add('dock-large');
        }
    }
}

/**
 * 设置Dock位置
 * @param {string} position - Dock位置
 */
function setDockPosition(position) {
    const dock = document.getElementById('dock');
    
    if (dock) {
        dock.classList.remove('dock-bottom', 'dock-left', 'dock-right');
        dock.classList.add(`dock-${position}`);
    }
}

/**
 * 设置Dock自动隐藏
 * @param {boolean} autoHide - 是否自动隐藏
 */
function setDockAutoHide(autoHide) {
    const dock = document.getElementById('dock');
    
    if (dock) {
        if (autoHide) {
            dock.classList.add('dock-autohide');
        } else {
            dock.classList.remove('dock-autohide');
        }
    }
}

/**
 * 打开文件夹
 * @param {string} path - 文件夹路径
 */
function openFolder(path) {
    // 打开访达并导航到指定路径
    openFinder();
    
    // 延迟加载文件夹内容
    setTimeout(() => {
        // 更新路径栏
        updatePathBar(path);
        
        // 加载文件夹内容
        loadFolderContent(path);
    }, 100);
}

/**
 * 显示欢迎通知
 */
function showWelcomeNotification() {
    // 创建通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <img src="icons/system/finder.svg" alt="Finder">
        </div>
        <div class="notification-content">
            <div class="notification-title">欢迎使用macOS网页版</div>
            <div class="notification-message">点击Dock栏上的图标开始使用</div>
        </div>
        <div class="notification-close">×</div>
    `;
    
    // 添加到文档
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 500);
    
    // 添加关闭按钮事件
    const closeButton = notification.querySelector('.notification-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            notification.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // 自动关闭
    setTimeout(() => {
        notification.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
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
    }
}

/**
 * 关闭窗口
 * @param {string} title - 窗口标题
 */
function closeWindowByTitle(title) {
    // 窗口管理在windows.js中实现
    if (typeof window.closeWindowByTitle === 'function') {
        window.closeWindowByTitle(title);
    } else {
        console.error('窗口关闭函数未找到');
    }
}

// 导出函数供其他模块使用
window.initDesktop = initDesktop;
window.openFinder = openFinder;
window.openSystemPreferences = openSystemPreferences;
window.setWallpaper = setWallpaper;
window.setDockSize = setDockSize;
window.setDockPosition = setDockPosition;
window.setDockAutoHide = setDockAutoHide;
