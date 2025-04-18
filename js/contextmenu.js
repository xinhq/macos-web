// contextmenu.js - 桌面右键菜单功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化桌面右键菜单
    initializeDesktopContextMenu();
});

/**
 * 初始化桌面右键菜单
 */
function initializeDesktopContextMenu() {
    // 获取桌面元素
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 添加右键菜单事件
        desktop.addEventListener('contextmenu', function(event) {
            // 阻止默认右键菜单
            event.preventDefault();
            
            // 显示自定义右键菜单
            showDesktopContextMenu(event.clientX, event.clientY);
        });
        
        // 点击其他区域关闭右键菜单
        document.addEventListener('click', function() {
            hideContextMenu();
        });
    }
}

/**
 * 显示桌面右键菜单
 * @param {number} x - 横坐标
 * @param {number} y - 纵坐标
 */
function showDesktopContextMenu(x, y) {
    // 隐藏已有的右键菜单
    hideContextMenu();
    
    // 创建右键菜单
    const contextMenu = document.createElement('div');
    contextMenu.id = 'desktop-context-menu';
    contextMenu.className = 'context-menu';
    
    // 设置菜单内容
    contextMenu.innerHTML = `
        <div class="context-menu-item" data-action="new-folder">
            <span>新建文件夹</span>
        </div>
        <div class="context-menu-item" data-action="get-info">
            <span>显示简介</span>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="change-desktop-background">
            <span>更改桌面背景...</span>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="use-stacks">
            <span>使用叠放</span>
        </div>
        <div class="context-menu-item" data-action="sort-by">
            <span>排序方式</span>
            <span class="context-menu-arrow">▶</span>
            <div class="context-submenu">
                <div class="context-menu-item" data-action="sort-by-name">
                    <span>名称</span>
                    <span class="context-menu-checkmark">✓</span>
                </div>
                <div class="context-menu-item" data-action="sort-by-kind">
                    <span>种类</span>
                </div>
                <div class="context-menu-item" data-action="sort-by-date">
                    <span>日期</span>
                </div>
                <div class="context-menu-item" data-action="sort-by-size">
                    <span>大小</span>
                </div>
                <div class="context-menu-item" data-action="sort-by-tags">
                    <span>标签</span>
                </div>
            </div>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="clean-up">
            <span>整理</span>
        </div>
        <div class="context-menu-item" data-action="clean-up-by">
            <span>整理方式</span>
            <span class="context-menu-arrow">▶</span>
            <div class="context-submenu">
                <div class="context-menu-item" data-action="clean-up-by-name">
                    <span>名称</span>
                </div>
                <div class="context-menu-item" data-action="clean-up-by-kind">
                    <span>种类</span>
                </div>
                <div class="context-menu-item" data-action="clean-up-by-date">
                    <span>日期</span>
                </div>
                <div class="context-menu-item" data-action="clean-up-by-size">
                    <span>大小</span>
                </div>
                <div class="context-menu-item" data-action="clean-up-by-tags">
                    <span>标签</span>
                </div>
            </div>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="show-view-options">
            <span>显示查看选项</span>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(contextMenu);
    
    // 设置位置
    positionContextMenu(contextMenu, x, y);
    
    // 添加菜单项点击事件
    addContextMenuItemEvents(contextMenu);
}

/**
 * 设置右键菜单位置
 * @param {HTMLElement} menu - 菜单元素
 * @param {number} x - 横坐标
 * @param {number} y - 纵坐标
 */
function positionContextMenu(menu, x, y) {
    // 获取窗口尺寸
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 获取菜单尺寸
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    
    // 计算菜单位置
    let menuX = x;
    let menuY = y;
    
    // 确保菜单不超出窗口右侧
    if (menuX + menuWidth > windowWidth) {
        menuX = windowWidth - menuWidth;
    }
    
    // 确保菜单不超出窗口底部
    if (menuY + menuHeight > windowHeight) {
        menuY = windowHeight - menuHeight;
    }
    
    // 设置菜单位置
    menu.style.left = `${menuX}px`;
    menu.style.top = `${menuY}px`;
}

/**
 * 添加菜单项点击事件
 * @param {HTMLElement} menu - 菜单元素
 */
function addContextMenuItemEvents(menu) {
    // 获取所有菜单项
    const menuItems = menu.querySelectorAll('.context-menu-item');
    
    menuItems.forEach(item => {
        // 获取操作
        const action = item.getAttribute('data-action');
        
        // 添加点击事件
        item.addEventListener('click', function(event) {
            // 阻止事件冒泡
            event.stopPropagation();
            
            // 处理操作
            handleContextMenuAction(action);
            
            // 隐藏菜单
            hideContextMenu();
        });
        
        // 处理子菜单
        const submenu = item.querySelector('.context-submenu');
        
        if (submenu) {
            // 鼠标进入显示子菜单
            item.addEventListener('mouseenter', function() {
                // 获取子菜单位置
                const rect = item.getBoundingClientRect();
                
                // 设置子菜单位置
                submenu.style.left = `${rect.width}px`;
                submenu.style.top = '0';
                
                // 显示子菜单
                submenu.style.display = 'block';
            });
            
            // 鼠标离开隐藏子菜单
            item.addEventListener('mouseleave', function() {
                submenu.style.display = 'none';
            });
            
            // 阻止子菜单点击事件冒泡
            submenu.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    });
}

/**
 * 处理右键菜单操作
 * @param {string} action - 操作
 */
function handleContextMenuAction(action) {
    switch (action) {
        case 'new-folder':
            createNewFolder();
            break;
        case 'get-info':
            showDesktopInfo();
            break;
        case 'change-desktop-background':
            openWallpaperSettings();
            break;
        case 'use-stacks':
            toggleDesktopStacks();
            break;
        case 'sort-by-name':
        case 'sort-by-kind':
        case 'sort-by-date':
        case 'sort-by-size':
        case 'sort-by-tags':
            sortDesktopItems(action.replace('sort-by-', ''));
            break;
        case 'clean-up':
            cleanUpDesktop();
            break;
        case 'clean-up-by-name':
        case 'clean-up-by-kind':
        case 'clean-up-by-date':
        case 'clean-up-by-size':
        case 'clean-up-by-tags':
            cleanUpDesktopBy(action.replace('clean-up-by-', ''));
            break;
        case 'show-view-options':
            showDesktopViewOptions();
            break;
    }
}

/**
 * 隐藏右键菜单
 */
function hideContextMenu() {
    // 获取右键菜单
    const contextMenu = document.getElementById('desktop-context-menu');
    
    if (contextMenu) {
        // 移除右键菜单
        contextMenu.remove();
    }
}

/**
 * 创建新文件夹
 */
function createNewFolder() {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 创建新文件夹元素
        const folder = document.createElement('div');
        folder.className = 'desktop-item folder';
        
        // 生成唯一ID
        const folderId = `folder-${Date.now()}`;
        folder.id = folderId;
        
        // 设置文件夹内容
        folder.innerHTML = `
            <div class="desktop-item-icon">
                <img src="icons/system/folder.svg" alt="文件夹">
            </div>
            <div class="desktop-item-name" contenteditable="true">未命名文件夹</div>
        `;
        
        // 添加到桌面
        desktop.appendChild(folder);
        
        // 聚焦文件夹名称
        setTimeout(() => {
            const nameElement = folder.querySelector('.desktop-item-name');
            
            if (nameElement) {
                nameElement.focus();
                
                // 选中所有文本
                const range = document.createRange();
                range.selectNodeContents(nameElement);
                
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                // 添加失焦事件
                nameElement.addEventListener('blur', function() {
                    // 如果名称为空，恢复默认名称
                    if (this.textContent.trim() === '') {
                        this.textContent = '未命名文件夹';
                    }
                });
                
                // 添加按键事件
                nameElement.addEventListener('keydown', function(event) {
                    // 按下回车键完成编辑
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this.blur();
                    }
                });
            }
        }, 100);
        
        // 添加文件夹拖拽功能
        makeDraggable(folder);
    }
}

/**
 * 使元素可拖拽
 * @param {HTMLElement} element - 元素
 */
function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    
    // 鼠标按下事件
    element.addEventListener('mousedown', function(event) {
        // 如果点击的是文件夹名称，不启动拖拽
        if (event.target.classList.contains('desktop-item-name') && event.target.getAttribute('contenteditable') === 'true') {
            return;
        }
        
        // 计算偏移量
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;
        
        // 设置拖拽状态
        isDragging = true;
        
        // 添加拖拽中样式
        element.classList.add('dragging');
    });
    
    // 鼠标移动事件
    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            // 计算新位置
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;
            
            // 设置元素位置
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    });
    
    // 鼠标松开事件
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            // 取消拖拽状态
            isDragging = false;
            
            // 移除拖拽中样式
            element.classList.remove('dragging');
        }
    });
}

/**
 * 显示桌面简介
 */
function showDesktopInfo() {
    // 创建桌面简介窗口
    createWindow({
        title: '桌面简介',
        width: 400,
        height: 500,
        resizable: true,
        maximizable: false,
        minimizable: true,
        icon: 'icons/system/info.svg',
        content: `
            <div class="info-container">
                <div class="info-header">
                    <img src="icons/system/desktop.svg" alt="桌面" class="info-icon">
                    <div class="info-title">
                        <h2>桌面</h2>
                        <p>位置：/Users/用户/Desktop</p>
                    </div>
                </div>
                <div class="info-tabs">
                    <div class="info-tab active" data-tab="general">通用</div>
                    <div class="info-tab" data-tab="sharing">共享与权限</div>
                </div>
                <div class="info-content">
                    <div class="info-panel active" id="panel-general">
                        <div class="info-section">
                            <div class="info-row">
                                <span class="info-label">种类：</span>
                                <span class="info-value">文件夹</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">创建于：</span>
                                <span class="info-value">${new Date().toLocaleString()}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">修改于：</span>
                                <span class="info-value">${new Date().toLocaleString()}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">大小：</span>
                                <span class="info-value">0 字节</span>
                            </div>
                        </div>
                        <div class="info-section">
                            <div class="info-row">
                                <span class="info-label">注释：</span>
                            </div>
                            <textarea class="info-comment" placeholder="添加注释..."></textarea>
                        </div>
                        <div class="info-section">
                            <div class="info-row">
                                <span class="info-label">标签：</span>
                                <div class="info-tags">
                                    <div class="info-tag" style="background-color: #ff2d55;"></div>
                                    <div class="info-tag" style="background-color: #ff9500;"></div>
                                    <div class="info-tag" style="background-color: #ffcc00;"></div>
                                    <div class="info-tag" style="background-color: #4cd964;"></div>
                                    <div class="info-tag" style="background-color: #5ac8fa;"></div>
                                    <div class="info-tag" style="background-color: #0070c9;"></div>
                                    <div class="info-tag" style="background-color: #5856d6;"></div>
                                    <div class="info-tag" style="background-color: #8e8e93;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info-panel" id="panel-sharing">
                        <div class="info-section">
                            <div class="info-row">
                                <span class="info-label">共享文件夹：</span>
                                <div class="info-toggle"></div>
                            </div>
                        </div>
                        <div class="info-section">
                            <div class="info-row">
                                <span class="info-label">权限：</span>
                            </div>
                            <div class="info-permissions">
                                <div class="permission-row">
                                    <span class="permission-user">用户</span>
                                    <select class="permission-select">
                                        <option value="read-write">读与写</option>
                                        <option value="read-only">只读</option>
                                        <option value="write-only">只写</option>
                                        <option value="no-access">无访问权限</option>
                                    </select>
                                </div>
                                <div class="permission-row">
                                    <span class="permission-user">管理员</span>
                                    <select class="permission-select">
                                        <option value="read-write">读与写</option>
                                        <option value="read-only">只读</option>
                                        <option value="write-only">只写</option>
                                        <option value="no-access">无访问权限</option>
                                    </select>
                                </div>
                                <div class="permission-row">
                                    <span class="permission-user">其他</span>
                                    <select class="permission-select">
                                        <option value="read-write">读与写</option>
                                        <option value="read-only">只读</option>
                                        <option value="write-only">只写</option>
                                        <option value="no-access">无访问权限</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    
    // 初始化简介功能
    setTimeout(() => {
        initInfoFunctionality();
    }, 100);
}

/**
 * 初始化简介功能
 */
function initInfoFunctionality() {
    // 标签切换
    const tabs = document.querySelectorAll('.info-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除其他标签活动状态
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // 添加当前标签活动状态
            this.classList.add('active');
            
            // 获取标签ID
            const tabId = this.getAttribute('data-tab');
            
            // 隐藏所有面板
            const panels = document.querySelectorAll('.info-panel');
            
            panels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // 显示当前面板
            const currentPanel = document.getElementById(`panel-${tabId}`);
            
            if (currentPanel) {
                currentPanel.classList.add('active');
            }
        });
    });
    
    // 标签选择
    const tags = document.querySelectorAll('.info-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 切换选中状态
            this.classList.toggle('selected');
        });
    });
    
    // 权限切换
    const permissionSelects = document.querySelectorAll('.permission-select');
    
    permissionSelects.forEach(select => {
        select.addEventListener('change', function() {
            // 获取权限值
            const permission = this.value;
            
            // 更新权限样式
            this.className = 'permission-select';
            this.classList.add(permission);
        });
    });
    
    // 共享开关
    const sharingToggle = document.querySelector('.info-toggle');
    
    if (sharingToggle) {
        sharingToggle.addEventListener('click', function() {
            // 切换开关状态
            this.classList.toggle('active');
        });
    }
}

/**
 * 打开壁纸设置
 */
function openWallpaperSettings() {
    // 打开系统偏好设置
    if (typeof openSystemPreferences === 'function') {
        openSystemPreferences();
        
        // 选择壁纸设置
        setTimeout(() => {
            const wallpaperItem = document.querySelector('.preference-item[data-pref="wallpaper"]');
            
            if (wallpaperItem) {
                wallpaperItem.click();
            }
        }, 100);
    }
}

/**
 * 切换桌面叠放
 */
function toggleDesktopStacks() {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 切换叠放状态
        desktop.classList.toggle('use-stacks');
        
        // 更新设置
        const useStacks = desktop.classList.contains('use-stacks');
        localStorage.setItem('useStacks', useStacks.toString());
    }
}

/**
 * 排序桌面项目
 * @param {string} sortBy - 排序方式
 */
function sortDesktopItems(sortBy) {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 获取所有桌面项目
        const items = Array.from(desktop.querySelectorAll('.desktop-item'));
        
        // 根据排序方式排序
        items.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    const nameA = a.querySelector('.desktop-item-name').textContent.toLowerCase();
                    const nameB = b.querySelector('.desktop-item-name').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                case 'kind':
                    const kindA = a.classList.contains('folder') ? 'folder' : 'file';
                    const kindB = b.classList.contains('folder') ? 'folder' : 'file';
                    return kindA.localeCompare(kindB);
                case 'date':
                    // 使用ID中的时间戳作为日期
                    const dateA = parseInt(a.id.split('-')[1]) || 0;
                    const dateB = parseInt(b.id.split('-')[1]) || 0;
                    return dateB - dateA; // 降序排列
                case 'size':
                    // 文件夹大小为0
                    const sizeA = a.classList.contains('folder') ? 0 : 1;
                    const sizeB = b.classList.contains('folder') ? 0 : 1;
                    return sizeB - sizeA; // 降序排列
                case 'tags':
                    // 暂不支持标签排序
                    return 0;
                default:
                    return 0;
            }
        });
        
        // 清空桌面
        items.forEach(item => {
            item.remove();
        });
        
        // 重新添加排序后的项目
        items.forEach(item => {
            desktop.appendChild(item);
        });
        
        // 保存排序方式
        localStorage.setItem('desktopSortBy', sortBy);
    }
}

/**
 * 整理桌面
 */
function cleanUpDesktop() {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 获取所有桌面项目
        const items = Array.from(desktop.querySelectorAll('.desktop-item'));
        
        // 获取桌面尺寸
        const desktopWidth = desktop.offsetWidth;
        const desktopHeight = desktop.offsetHeight;
        
        // 设置网格参数
        const gridSize = 100;
        const gridMargin = 20;
        const startX = gridMargin;
        const startY = gridMargin;
        
        // 计算每行可容纳的项目数
        const itemsPerRow = Math.floor((desktopWidth - gridMargin) / (gridSize + gridMargin));
        
        // 排列项目
        items.forEach((item, index) => {
            // 计算行列位置
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            
            // 计算位置
            const x = startX + col * (gridSize + gridMargin);
            const y = startY + row * (gridSize + gridMargin);
            
            // 设置位置
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
        });
    }
}

/**
 * 按指定方式整理桌面
 * @param {string} cleanUpBy - 整理方式
 */
function cleanUpDesktopBy(cleanUpBy) {
    // 先排序
    sortDesktopItems(cleanUpBy);
    
    // 再整理
    cleanUpDesktop();
}

/**
 * 显示桌面查看选项
 */
function showDesktopViewOptions() {
    // 创建查看选项窗口
    createWindow({
        title: '桌面查看选项',
        width: 400,
        height: 500,
        resizable: false,
        maximizable: false,
        minimizable: true,
        icon: 'icons/system/view.svg',
        content: `
            <div class="view-options-container">
                <div class="view-options-section">
                    <h3>图标大小</h3>
                    <div class="icon-size-slider-container">
                        <span>小</span>
                        <input type="range" min="0" max="100" value="50" class="icon-size-slider">
                        <span>大</span>
                    </div>
                </div>
                <div class="view-options-section">
                    <h3>网格间距</h3>
                    <div class="grid-spacing-slider-container">
                        <span>窄</span>
                        <input type="range" min="0" max="100" value="50" class="grid-spacing-slider">
                        <span>宽</span>
                    </div>
                </div>
                <div class="view-options-section">
                    <h3>文本大小</h3>
                    <div class="text-size-slider-container">
                        <span>小</span>
                        <input type="range" min="0" max="100" value="50" class="text-size-slider">
                        <span>大</span>
                    </div>
                </div>
                <div class="view-options-section">
                    <h3>标签位置</h3>
                    <div class="label-position-options">
                        <div class="label-position-option active" data-position="bottom">
                            <div class="position-preview bottom-preview"></div>
                            <span>底部</span>
                        </div>
                        <div class="label-position-option" data-position="right">
                            <div class="position-preview right-preview"></div>
                            <span>右侧</span>
                        </div>
                    </div>
                </div>
                <div class="view-options-section">
                    <h3>排序方式</h3>
                    <select class="sort-by-select">
                        <option value="name">名称</option>
                        <option value="kind">种类</option>
                        <option value="date">日期</option>
                        <option value="size">大小</option>
                        <option value="tags">标签</option>
                    </select>
                </div>
                <div class="view-options-section checkbox-options">
                    <div class="checkbox-option">
                        <input type="checkbox" id="show-item-info" checked>
                        <label for="show-item-info">显示项目信息</label>
                    </div>
                    <div class="checkbox-option">
                        <input type="checkbox" id="show-item-extension">
                        <label for="show-item-extension">显示文件扩展名</label>
                    </div>
                    <div class="checkbox-option">
                        <input type="checkbox" id="snap-to-grid" checked>
                        <label for="snap-to-grid">对齐到网格</label>
                    </div>
                </div>
                <div class="view-options-section">
                    <div class="view-options-buttons">
                        <button class="view-options-button" data-action="use-as-defaults">用作默认</button>
                        <button class="view-options-button" data-action="restore-defaults">恢复默认</button>
                    </div>
                </div>
            </div>
        `
    });
    
    // 初始化查看选项功能
    setTimeout(() => {
        initViewOptionsFunctionality();
    }, 100);
}

/**
 * 初始化查看选项功能
 */
function initViewOptionsFunctionality() {
    // 图标大小滑块
    const iconSizeSlider = document.querySelector('.icon-size-slider');
    
    if (iconSizeSlider) {
        // 设置初始值
        const savedIconSize = localStorage.getItem('desktopIconSize') || '50';
        iconSizeSlider.value = savedIconSize;
        
        iconSizeSlider.addEventListener('input', function() {
            const size = this.value;
            
            // 更新图标大小
            updateDesktopIconSize(size);
            
            // 保存设置
            localStorage.setItem('desktopIconSize', size);
        });
    }
    
    // 网格间距滑块
    const gridSpacingSlider = document.querySelector('.grid-spacing-slider');
    
    if (gridSpacingSlider) {
        // 设置初始值
        const savedGridSpacing = localStorage.getItem('desktopGridSpacing') || '50';
        gridSpacingSlider.value = savedGridSpacing;
        
        gridSpacingSlider.addEventListener('input', function() {
            const spacing = this.value;
            
            // 更新网格间距
            updateDesktopGridSpacing(spacing);
            
            // 保存设置
            localStorage.setItem('desktopGridSpacing', spacing);
        });
    }
    
    // 文本大小滑块
    const textSizeSlider = document.querySelector('.text-size-slider');
    
    if (textSizeSlider) {
        // 设置初始值
        const savedTextSize = localStorage.getItem('desktopTextSize') || '50';
        textSizeSlider.value = savedTextSize;
        
        textSizeSlider.addEventListener('input', function() {
            const size = this.value;
            
            // 更新文本大小
            updateDesktopTextSize(size);
            
            // 保存设置
            localStorage.setItem('desktopTextSize', size);
        });
    }
    
    // 标签位置选项
    const labelPositionOptions = document.querySelectorAll('.label-position-option');
    
    if (labelPositionOptions.length > 0) {
        // 设置初始值
        const savedPosition = localStorage.getItem('desktopLabelPosition') || 'bottom';
        
        labelPositionOptions.forEach(option => {
            const position = option.getAttribute('data-position');
            
            if (position === savedPosition) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
            
            option.addEventListener('click', function() {
                // 移除其他选项活动状态
                labelPositionOptions.forEach(o => {
                    o.classList.remove('active');
                });
                
                // 添加当前选项活动状态
                this.classList.add('active');
                
                // 获取位置
                const position = this.getAttribute('data-position');
                
                // 更新标签位置
                updateDesktopLabelPosition(position);
                
                // 保存设置
                localStorage.setItem('desktopLabelPosition', position);
            });
        });
    }
    
    // 排序方式选择
    const sortBySelect = document.querySelector('.sort-by-select');
    
    if (sortBySelect) {
        // 设置初始值
        const savedSortBy = localStorage.getItem('desktopSortBy') || 'name';
        sortBySelect.value = savedSortBy;
        
        sortBySelect.addEventListener('change', function() {
            const sortBy = this.value;
            
            // 排序桌面项目
            sortDesktopItems(sortBy);
        });
    }
    
    // 复选框选项
    const checkboxOptions = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
    
    checkboxOptions.forEach(checkbox => {
        const id = checkbox.id;
        
        // 设置初始值
        const checked = localStorage.getItem(`desktop-${id}`) !== 'false';
        checkbox.checked = checked;
        
        checkbox.addEventListener('change', function() {
            const checked = this.checked;
            
            // 更新设置
            updateDesktopOption(id, checked);
            
            // 保存设置
            localStorage.setItem(`desktop-${id}`, checked.toString());
        });
    });
    
    // 按钮操作
    const buttons = document.querySelectorAll('.view-options-button');
    
    buttons.forEach(button => {
        const action = button.getAttribute('data-action');
        
        button.addEventListener('click', function() {
            switch (action) {
                case 'use-as-defaults':
                    saveViewOptionsAsDefaults();
                    break;
                case 'restore-defaults':
                    restoreDefaultViewOptions();
                    break;
            }
        });
    });
}

/**
 * 更新桌面图标大小
 * @param {string|number} size - 大小
 */
function updateDesktopIconSize(size) {
    // 转换为数值
    const sizeValue = parseInt(size);
    
    // 计算实际大小（40-80像素）
    const actualSize = 40 + (sizeValue / 100) * 40;
    
    // 设置CSS变量
    document.documentElement.style.setProperty('--desktop-icon-size', `${actualSize}px`);
}

/**
 * 更新桌面网格间距
 * @param {string|number} spacing - 间距
 */
function updateDesktopGridSpacing(spacing) {
    // 转换为数值
    const spacingValue = parseInt(spacing);
    
    // 计算实际间距（10-50像素）
    const actualSpacing = 10 + (spacingValue / 100) * 40;
    
    // 设置CSS变量
    document.documentElement.style.setProperty('--desktop-grid-spacing', `${actualSpacing}px`);
}

/**
 * 更新桌面文本大小
 * @param {string|number} size - 大小
 */
function updateDesktopTextSize(size) {
    // 转换为数值
    const sizeValue = parseInt(size);
    
    // 计算实际大小（10-16像素）
    const actualSize = 10 + (sizeValue / 100) * 6;
    
    // 设置CSS变量
    document.documentElement.style.setProperty('--desktop-text-size', `${actualSize}px`);
}

/**
 * 更新桌面标签位置
 * @param {string} position - 位置
 */
function updateDesktopLabelPosition(position) {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        // 移除所有位置类
        desktop.classList.remove('labels-bottom', 'labels-right');
        
        // 添加新位置类
        desktop.classList.add(`labels-${position}`);
    }
}

/**
 * 更新桌面选项
 * @param {string} option - 选项
 * @param {boolean} enabled - 是否启用
 */
function updateDesktopOption(option, enabled) {
    // 获取桌面
    const desktop = document.getElementById('desktop');
    
    if (desktop) {
        switch (option) {
            case 'show-item-info':
                if (enabled) {
                    desktop.classList.add('show-item-info');
                } else {
                    desktop.classList.remove('show-item-info');
                }
                break;
            case 'show-item-extension':
                if (enabled) {
                    desktop.classList.add('show-item-extension');
                } else {
                    desktop.classList.remove('show-item-extension');
                }
                break;
            case 'snap-to-grid':
                if (enabled) {
                    desktop.classList.add('snap-to-grid');
                } else {
                    desktop.classList.remove('snap-to-grid');
                }
                break;
        }
    }
}

/**
 * 保存查看选项为默认值
 */
function saveViewOptionsAsDefaults() {
    // 获取当前设置
    const iconSize = localStorage.getItem('desktopIconSize') || '50';
    const gridSpacing = localStorage.getItem('desktopGridSpacing') || '50';
    const textSize = localStorage.getItem('desktopTextSize') || '50';
    const labelPosition = localStorage.getItem('desktopLabelPosition') || 'bottom';
    const sortBy = localStorage.getItem('desktopSortBy') || 'name';
    const showItemInfo = localStorage.getItem('desktop-show-item-info') !== 'false';
    const showItemExtension = localStorage.getItem('desktop-show-item-extension') === 'true';
    const snapToGrid = localStorage.getItem('desktop-snap-to-grid') !== 'false';
    
    // 保存为默认设置
    localStorage.setItem('defaultDesktopIconSize', iconSize);
    localStorage.setItem('defaultDesktopGridSpacing', gridSpacing);
    localStorage.setItem('defaultDesktopTextSize', textSize);
    localStorage.setItem('defaultDesktopLabelPosition', labelPosition);
    localStorage.setItem('defaultDesktopSortBy', sortBy);
    localStorage.setItem('defaultDesktopShowItemInfo', showItemInfo.toString());
    localStorage.setItem('defaultDesktopShowItemExtension', showItemExtension.toString());
    localStorage.setItem('defaultDesktopSnapToGrid', snapToGrid.toString());
    
    // 显示提示
    showNotification('已将当前设置保存为默认值');
}

/**
 * 恢复默认查看选项
 */
function restoreDefaultViewOptions() {
    // 获取默认设置
    const iconSize = localStorage.getItem('defaultDesktopIconSize') || '50';
    const gridSpacing = localStorage.getItem('defaultDesktopGridSpacing') || '50';
    const textSize = localStorage.getItem('defaultDesktopTextSize') || '50';
    const labelPosition = localStorage.getItem('defaultDesktopLabelPosition') || 'bottom';
    const sortBy = localStorage.getItem('defaultDesktopSortBy') || 'name';
    const showItemInfo = localStorage.getItem('defaultDesktopShowItemInfo') !== 'false';
    const showItemExtension = localStorage.getItem('defaultDesktopShowItemExtension') === 'true';
    const snapToGrid = localStorage.getItem('defaultDesktopSnapToGrid') !== 'false';
    
    // 更新当前设置
    localStorage.setItem('desktopIconSize', iconSize);
    localStorage.setItem('desktopGridSpacing', gridSpacing);
    localStorage.setItem('desktopTextSize', textSize);
    localStorage.setItem('desktopLabelPosition', labelPosition);
    localStorage.setItem('desktopSortBy', sortBy);
    localStorage.setItem('desktop-show-item-info', showItemInfo.toString());
    localStorage.setItem('desktop-show-item-extension', showItemExtension.toString());
    localStorage.setItem('desktop-snap-to-grid', snapToGrid.toString());
    
    // 更新UI
    updateDesktopIconSize(iconSize);
    updateDesktopGridSpacing(gridSpacing);
    updateDesktopTextSize(textSize);
    updateDesktopLabelPosition(labelPosition);
    sortDesktopItems(sortBy);
    updateDesktopOption('show-item-info', showItemInfo);
    updateDesktopOption('show-item-extension', showItemExtension);
    updateDesktopOption('snap-to-grid', snapToGrid);
    
    // 更新滑块和选项
    const iconSizeSlider = document.querySelector('.icon-size-slider');
    if (iconSizeSlider) iconSizeSlider.value = iconSize;
    
    const gridSpacingSlider = document.querySelector('.grid-spacing-slider');
    if (gridSpacingSlider) gridSpacingSlider.value = gridSpacing;
    
    const textSizeSlider = document.querySelector('.text-size-slider');
    if (textSizeSlider) textSizeSlider.value = textSize;
    
    const labelPositionOptions = document.querySelectorAll('.label-position-option');
    if (labelPositionOptions.length > 0) {
        labelPositionOptions.forEach(option => {
            const position = option.getAttribute('data-position');
            
            if (position === labelPosition) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    const sortBySelect = document.querySelector('.sort-by-select');
    if (sortBySelect) sortBySelect.value = sortBy;
    
    const showItemInfoCheckbox = document.getElementById('show-item-info');
    if (showItemInfoCheckbox) showItemInfoCheckbox.checked = showItemInfo;
    
    const showItemExtensionCheckbox = document.getElementById('show-item-extension');
    if (showItemExtensionCheckbox) showItemExtensionCheckbox.checked = showItemExtension;
    
    const snapToGridCheckbox = document.getElementById('snap-to-grid');
    if (snapToGridCheckbox) snapToGridCheckbox.checked = snapToGrid;
    
    // 显示提示
    showNotification('已恢复默认设置');
}

/**
 * 显示通知
 * @param {string} message - 消息
 */
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 添加到文档
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        
        // 移除元素
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 导出函数供其他模块使用
window.initializeDesktopContextMenu = initializeDesktopContextMenu;
window.showDesktopContextMenu = showDesktopContextMenu;
window.hideContextMenu = hideContextMenu;
