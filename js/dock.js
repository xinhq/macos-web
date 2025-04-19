/**
 * macOS Monterey 网页版 - Dock栏功能
 * 负责Dock栏的交互和动画效果
 */

// Dock栏管理
const dockManager = {
    // 存储Dock项目元素
    items: [],
    
    // 初始化Dock栏
    init: function() {
        console.log('Dock栏已初始化');
        
        // 获取所有Dock项目
        const dockItems = document.querySelectorAll('#dock .dock-item');
        this.items = Array.from(dockItems);
        
        // 添加事件监听
        this._addEventListeners();
        
        // 初始化Dock缩放效果
        this._initDockZoom();
        
        // 为每个Dock项添加提示标签
        this._addTooltips();
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 为每个Dock项添加点击事件
        this.items.forEach(item => {
            // 添加点击事件
            item.addEventListener('click', () => {
                const appName = item.getAttribute('data-app');
                this._handleDockItemClick(appName, item);
            });
            
            // 添加鼠标进入/离开事件
            item.addEventListener('mouseenter', () => {
                this._showTooltip(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this._hideTooltip(item);
            });
        });
        
        // 为Dock添加鼠标移动事件（用于缩放效果）
        document.getElementById('dock').addEventListener('mousemove', (e) => {
            this._handleDockMouseMove(e);
        });
        
        // 鼠标离开Dock时重置缩放
        document.getElementById('dock').addEventListener('mouseleave', () => {
            this._resetDockZoom();
        });
    },
    
    // 处理Dock项点击
    _handleDockItemClick: function(appName, item) {
        console.log(`点击了Dock项: ${appName}`);
        
        // 添加弹跳动画
        item.classList.add('bounce');
        setTimeout(() => {
            item.classList.remove('bounce');
        }, 500);
        
        // 打开应用
        if (typeof window.openApplication === 'function') {
            window.openApplication(appName);
        } else {
            // 如果应用管理器还未加载，使用简单的应用打开逻辑
            this._openApp(appName);
        }
    },
    
    // 简单的应用打开逻辑（临时使用，最终会被apps.js中的逻辑替代）
    _openApp: function(appName) {
        // 标记应用为运行状态
        const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
        if (dockItem) {
            dockItem.classList.add('running');
        }
        
        // 根据应用名称执行相应操作
        switch (appName) {
            case 'finder':
                // 打开访达窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'finder',
                        title: '访达',
                        width: 800,
                        height: 500,
                        content: '<div class="finder-content">访达内容将在后续实现</div>'
                    });
                }
                break;
                
            case 'launchpad':
                // 显示启动台
                const launchpad = document.getElementById('launchpad');
                launchpad.classList.remove('hidden');
                break;
                
            case 'safari':
                // 打开Safari窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'safari',
                        title: 'Safari',
                        width: 900,
                        height: 600,
                        content: '<div class="safari-content">Safari内容将在后续实现</div>'
                    });
                }
                break;
                
            case 'settings':
                // 打开系统偏好设置窗口
                if (window.windowSystem) {
                    window.windowSystem.createWindow({
                        app: 'settings',
                        title: '系统偏好设置',
                        width: 700,
                        height: 500,
                        content: '<div class="settings-content">系统偏好设置内容将在后续实现</div>'
                    });
                }
                break;
                
            default:
                console.log(`应用 ${appName} 的功能尚未实现`);
        }
    },
    
    // 初始化Dock缩放效果
    _initDockZoom: function() {
        // 为每个Dock项设置原始尺寸
        this.items.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.transformOrigin = 'bottom';
        });
    },
    
    // 处理Dock鼠标移动（实现缩放效果）
    _handleDockMouseMove: function(e) {
        const dock = document.getElementById('dock');
        const dockRect = dock.getBoundingClientRect();
        
        // 计算鼠标在Dock上的相对位置
        const mouseX = e.clientX - dockRect.left;
        
        // 对每个Dock项应用缩放
        this.items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemX = itemRect.left + itemRect.width / 2 - dockRect.left;
            
            // 计算距离（相对于Dock宽度）
            const distance = Math.abs(mouseX - itemX) / dockRect.width;
            
            // 计算缩放因子（距离越近，缩放越大）
            let scale = 1 + (1 - Math.min(distance * 3, 1)) * 0.5; // 最大缩放到1.5倍
            
            // 应用缩放
            item.style.transform = `scale(${scale})`;
        });
    },
    
    // 重置Dock缩放
    _resetDockZoom: function() {
        this.items.forEach(item => {
            item.style.transform = 'scale(1)';
        });
    },
    
    // 添加提示标签
    _addTooltips: function() {
        this.items.forEach(item => {
            const appName = item.getAttribute('data-app');
            const tooltip = document.createElement('div');
            tooltip.className = 'dock-tooltip';
            tooltip.textContent = this._getAppDisplayName(appName);
            item.appendChild(tooltip);
        });
    },
    
    // 显示提示标签
    _showTooltip: function(item) {
        const tooltip = item.querySelector('.dock-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
        }
    },
    
    // 隐藏提示标签
    _hideTooltip: function(item) {
        const tooltip = item.querySelector('.dock-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    },
    
    // 获取应用显示名称
    _getAppDisplayName: function(appName) {
        const appNames = {
            'finder': '访达',
            'launchpad': '启动台',
            'safari': 'Safari',
            'messages': '信息',
            'mail': '邮件',
            'photos': '照片',
            'settings': '系统偏好设置',
            'trash': '废纸篓'
        };
        
        return appNames[appName] || appName;
    },
    
    // 添加应用到Dock
    addAppToDock: function(appName, iconUrl, position = 'before-divider') {
        // 创建新的Dock项
        const newItem = document.createElement('div');
        newItem.className = 'dock-item';
        newItem.setAttribute('data-app', appName);
        
        // 创建图标
        const icon = document.createElement('img');
        icon.src = iconUrl;
        icon.alt = appName;
        
        // 创建提示标签
        const tooltip = document.createElement('div');
        tooltip.className = 'dock-tooltip';
        tooltip.textContent = this._getAppDisplayName(appName);
        
        // 组装Dock项
        newItem.appendChild(icon);
        newItem.appendChild(tooltip);
        
        // 添加到Dock
        const dock = document.getElementById('dock');
        const divider = dock.querySelector('.dock-divider');
        
        if (position === 'before-divider' && divider) {
            dock.insertBefore(newItem, divider);
        } else if (position === 'after-divider' && divider) {
            dock.insertBefore(newItem, divider.nextSibling);
        } else {
            dock.appendChild(newItem);
        }
        
        // 更新items数组
        this.items.push(newItem);
        
        // 添加事件监听
        newItem.addEventListener('click', () => {
            this._handleDockItemClick(appName, newItem);
        });
        
        newItem.addEventListener('mouseenter', () => {
            this._showTooltip(newItem);
        });
        
        newItem.addEventListener('mouseleave', () => {
            this._hideTooltip(newItem);
        });
        
        return newItem;
    },
    
    // 从Dock移除应用
    removeAppFromDock: function(appName) {
        const item = document.querySelector(`.dock-item[data-app="${appName}"]`);
        
        if (item) {
            // 从DOM中移除
            item.remove();
            
            // 从items数组中移除
            const index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        }
    },
    
    // 设置应用运行状态
    setAppRunningState: function(appName, isRunning) {
        const item = document.querySelector(`.dock-item[data-app="${appName}"]`);
        
        if (item) {
            if (isRunning) {
                item.classList.add('running');
            } else {
                item.classList.remove('running');
            }
        }
    }
};

// 初始化Dock栏
function initDock() {
    dockManager.init();
    
    // 导出Dock管理器到全局
    window.dockManager = dockManager;
}
