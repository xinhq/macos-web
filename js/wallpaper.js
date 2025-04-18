// wallpaper.js - 壁纸自定义功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化壁纸功能
    initWallpaper();
});

/**
 * 初始化壁纸功能
 */
function initWallpaper() {
    // 初始化壁纸设置面板
    initWallpaperPanel();
    
    // 初始化壁纸上下文菜单
    initWallpaperContextMenu();
    
    // 加载保存的壁纸
    loadSavedWallpaper();
}

/**
 * 初始化壁纸设置面板
 */
function initWallpaperPanel() {
    const wallpaperPanel = document.querySelector('.wallpaper-panel');
    
    // 如果壁纸面板不存在，则返回
    if (!wallpaperPanel) return;
    
    // 关闭按钮
    const closeButton = wallpaperPanel.querySelector('.close-button');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            wallpaperPanel.classList.remove('show');
        });
    }
    
    // 壁纸类别
    const categories = wallpaperPanel.querySelectorAll('.category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // 移除其他类别的活动状态
            categories.forEach(c => c.classList.remove('active'));
            
            // 添加当前类别的活动状态
            this.classList.add('active');
            
            // 更新壁纸网格
            updateWallpaperGrid(this.dataset.category);
        });
    });
    
    // 应用按钮
    const applyButton = wallpaperPanel.querySelector('.apply-button');
    
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            // 获取选中的壁纸
            const selectedWallpaper = wallpaperPanel.querySelector('.wallpaper-item.active');
            
            if (selectedWallpaper) {
                // 应用壁纸
                applyWallpaper(selectedWallpaper.dataset.src);
                
                // 关闭面板
                wallpaperPanel.classList.remove('show');
            }
        });
    }
    
    // 上传按钮
    const uploadButton = wallpaperPanel.querySelector('.upload-button');
    
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            // 创建文件输入元素
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            // 添加文件选择事件
            fileInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 添加自定义壁纸
                        addCustomWallpaper(e.target.result);
                        
                        // 应用壁纸
                        applyWallpaper(e.target.result);
                        
                        // 关闭面板
                        wallpaperPanel.classList.remove('show');
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // 触发文件选择
            fileInput.click();
        });
    }
    
    // 初始化壁纸网格
    initWallpaperGrid();
}

/**
 * 初始化壁纸网格
 */
function initWallpaperGrid() {
    const wallpaperGrid = document.querySelector('.wallpaper-grid');
    
    // 如果壁纸网格不存在，则返回
    if (!wallpaperGrid) return;
    
    // 清空壁纸网格
    wallpaperGrid.innerHTML = '';
    
    // 添加默认壁纸
    const defaultWallpapers = [
        { src: 'img/wallpapers/monterey.jpg', name: 'Monterey', category: 'macos' },
        { src: 'img/wallpapers/big-sur.jpg', name: 'Big Sur', category: 'macos' },
        { src: 'img/wallpapers/catalina.jpg', name: 'Catalina', category: 'macos' },
        { src: 'img/wallpapers/mojave-day.jpg', name: 'Mojave (Day)', category: 'macos' },
        { src: 'img/wallpapers/mojave-night.jpg', name: 'Mojave (Night)', category: 'macos' },
        { src: 'img/wallpapers/high-sierra.jpg', name: 'High Sierra', category: 'macos' },
        { src: 'img/wallpapers/sierra.jpg', name: 'Sierra', category: 'macos' },
        { src: 'img/wallpapers/el-capitan.jpg', name: 'El Capitan', category: 'macos' },
        { src: 'img/wallpapers/landscape-1.jpg', name: 'Landscape 1', category: 'landscape' },
        { src: 'img/wallpapers/landscape-2.jpg', name: 'Landscape 2', category: 'landscape' },
        { src: 'img/wallpapers/landscape-3.jpg', name: 'Landscape 3', category: 'landscape' },
        { src: 'img/wallpapers/landscape-4.jpg', name: 'Landscape 4', category: 'landscape' },
        { src: 'img/wallpapers/abstract-1.jpg', name: 'Abstract 1', category: 'abstract' },
        { src: 'img/wallpapers/abstract-2.jpg', name: 'Abstract 2', category: 'abstract' },
        { src: 'img/wallpapers/abstract-3.jpg', name: 'Abstract 3', category: 'abstract' },
        { src: 'img/wallpapers/abstract-4.jpg', name: 'Abstract 4', category: 'abstract' }
    ];
    
    // 添加壁纸项
    defaultWallpapers.forEach(wallpaper => {
        addWallpaperItem(wallpaperGrid, wallpaper.src, wallpaper.name, wallpaper.category);
    });
    
    // 加载自定义壁纸
    loadCustomWallpapers(wallpaperGrid);
    
    // 为壁纸项添加点击事件
    addWallpaperItemClickEvents();
}

/**
 * 添加壁纸项
 * @param {HTMLElement} container - 容器元素
 * @param {string} src - 壁纸路径
 * @param {string} name - 壁纸名称
 * @param {string} category - 壁纸类别
 */
function addWallpaperItem(container, src, name, category) {
    const wallpaperItem = document.createElement('div');
    wallpaperItem.className = 'wallpaper-item';
    wallpaperItem.dataset.src = src;
    wallpaperItem.dataset.name = name;
    wallpaperItem.dataset.category = category;
    
    wallpaperItem.innerHTML = `<img src="${src}" alt="${name}">`;
    
    container.appendChild(wallpaperItem);
}

/**
 * 为壁纸项添加点击事件
 */
function addWallpaperItemClickEvents() {
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    
    wallpaperItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他壁纸项的活动状态
            wallpaperItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前壁纸项的活动状态
            this.classList.add('active');
        });
    });
}

/**
 * 更新壁纸网格
 * @param {string} category - 壁纸类别
 */
function updateWallpaperGrid(category) {
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    
    wallpaperItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * 加载自定义壁纸
 * @param {HTMLElement} container - 容器元素
 */
function loadCustomWallpapers(container) {
    // 从本地存储获取自定义壁纸
    const customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
    
    // 添加自定义壁纸项
    customWallpapers.forEach(wallpaper => {
        addWallpaperItem(container, wallpaper.src, wallpaper.name, 'custom');
    });
}

/**
 * 添加自定义壁纸
 * @param {string} src - 壁纸数据URL
 */
function addCustomWallpaper(src) {
    // 从本地存储获取自定义壁纸
    const customWallpapers = JSON.parse(localStorage.getItem('customWallpapers')) || [];
    
    // 添加新壁纸
    const newWallpaper = {
        src: src,
        name: `Custom ${customWallpapers.length + 1}`,
        category: 'custom'
    };
    
    customWallpapers.push(newWallpaper);
    
    // 保存到本地存储
    localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
    
    // 添加到壁纸网格
    const wallpaperGrid = document.querySelector('.wallpaper-grid');
    
    if (wallpaperGrid) {
        addWallpaperItem(wallpaperGrid, newWallpaper.src, newWallpaper.name, newWallpaper.category);
        
        // 更新点击事件
        addWallpaperItemClickEvents();
    }
}

/**
 * 应用壁纸
 * @param {string} src - 壁纸路径
 */
function applyWallpaper(src) {
    const desktopBackground = document.querySelector('.desktop-background');
    
    if (desktopBackground) {
        // 添加过渡动画
        desktopBackground.classList.add('changing');
        
        // 设置新壁纸
        desktopBackground.style.backgroundImage = `url('${src}')`;
        
        // 移除过渡动画
        setTimeout(() => {
            desktopBackground.classList.remove('changing');
        }, 1000);
        
        // 保存壁纸设置
        saveWallpaperSetting(src);
    }
}

/**
 * 保存壁纸设置
 * @param {string} src - 壁纸路径
 */
function saveWallpaperSetting(src) {
    localStorage.setItem('currentWallpaper', src);
}

/**
 * 加载保存的壁纸
 */
function loadSavedWallpaper() {
    const savedWallpaper = localStorage.getItem('currentWallpaper');
    
    if (savedWallpaper) {
        applyWallpaper(savedWallpaper);
    }
}

/**
 * 初始化壁纸上下文菜单
 */
function initWallpaperContextMenu() {
    const desktopScreen = document.querySelector('.desktop-screen');
    
    // 如果桌面屏幕不存在，则返回
    if (!desktopScreen) return;
    
    // 为桌面添加右键菜单事件
    desktopScreen.addEventListener('contextmenu', function(e) {
        // 如果点击的是桌面图标或其他元素，则不显示桌面上下文菜单
        if (e.target.closest('.desktop-icon') || e.target.closest('.dock') || e.target.closest('.window')) {
            return;
        }
        
        e.preventDefault();
        
        // 显示桌面上下文菜单
        showDesktopContextMenu(e.clientX, e.clientY);
    });
}

/**
 * 显示桌面上下文菜单
 * @param {number} x - 菜单X坐标
 * @param {number} y - 菜单Y坐标
 */
function showDesktopContextMenu(x, y) {
    // 获取或创建上下文菜单
    let contextMenu = document.querySelector('.desktop-context-menu');
    
    if (!contextMenu) {
        // 创建上下文菜单
        contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu desktop-context-menu';
        
        // 添加菜单项
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="new-folder">新建文件夹</div>
            <div class="context-menu-item" data-action="get-info">获取信息</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="change-wallpaper">更改桌面背景...</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="show-view-options">显示查看选项</div>
            <div class="context-menu-item" data-action="sort-by">排序方式</div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="paste">粘贴</div>
        `;
        
        // 添加到文档
        document.body.appendChild(contextMenu);
        
        // 为菜单项添加点击事件
        const menuItems = contextMenu.querySelectorAll('.context-menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // 隐藏菜单
                contextMenu.classList.remove('show');
                
                // 获取操作
                const action = this.dataset.action;
                
                if (action) {
                    handleDesktopContextMenuAction(action);
                }
            });
        });
    }
    
    // 设置菜单位置
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    
    // 显示菜单
    contextMenu.classList.add('show');
    
    // 点击其他区域关闭菜单
    const closeContextMenu = function(e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.classList.remove('show');
            document.removeEventListener('click', closeContextMenu);
        }
    };
    
    // 延迟添加事件，避免立即触发
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu);
    }, 0);
}

/**
 * 处理桌面上下文菜单操作
 * @param {string} action - 操作名称
 */
function handleDesktopContextMenuAction(action) {
    switch (action) {
        case 'new-folder':
            // 在桌面创建新文件夹
            createDesktopFolder();
            break;
        
        case 'get-info':
            // 显示桌面信息
            alert('显示桌面信息');
            break;
        
        case 'change-wallpaper':
            // 打开壁纸设置面板
            openWallpaperPanel();
            break;
        
        case 'show-view-options':
            // 显示查看选项
            alert('显示查看选项');
            break;
        
        case 'sort-by':
            // 排序方式
            alert('选择排序方式');
            break;
        
        case 'paste':
            // 粘贴项目
            alert('粘贴项目到桌面');
            break;
    }
}

/**
 * 在桌面创建新文件夹
 */
function createDesktopFolder() {
    const desktopIcons = document.querySelector('.desktop-icons');
    
    // 如果桌面图标容器不存在，则返回
    if (!desktopIcons) return;
    
    // 创建新文件夹图标
    const folderIcon = document.createElement('div');
    folderIcon.className = 'desktop-icon';
    
    // 获取文件夹数量
    const folderCount = desktopIcons.querySelectorAll('.desktop-icon[data-type="folder"]').length;
    const folderName = folderCount === 0 ? '未命名文件夹' : `未命名文件夹 ${folderCount}`;
    
    folderIcon.dataset.type = 'folder';
    folderIcon.dataset.name = folderName;
    
    folderIcon.innerHTML = `
        <img src="icons/system/folder.svg" alt="${folderName}" class="desktop-icon-img">
        <div class="desktop-icon-name">${folderName}</div>
    `;
    
    // 添加到桌面
    desktopIcons.appendChild(folderIcon);
}

/**
 * 打开壁纸设置面板
 */
function openWallpaperPanel() {
    const wallpaperPanel = document.querySelector('.wallpaper-panel');
    
    if (wallpaperPanel) {
        wallpaperPanel.classList.add('show');
    }
}

// 导出函数供其他模块使用
window.applyWallpaper = applyWallpaper;
window.openWallpaperPanel = openWallpaperPanel;
