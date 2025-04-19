/**
 * macOS Monterey 网页版 - 窗口管理系统
 * 负责创建、管理和操作窗口
 */

// 窗口管理器
const windowManager = {
    // 窗口列表
    windows: [],
    
    // 当前活动窗口ID
    activeWindowId: null,
    
    // 窗口Z轴索引基数
    baseZIndex: 100,
    
    // 窗口ID计数器
    windowIdCounter: 0,
    
    // 初始化窗口管理器
    init: function() {
        console.log('窗口管理器已初始化');
        
        // 添加事件监听
        this._addEventListeners();
    },
    
    // 创建新窗口
    createWindow: function(options = {}) {
        // 默认窗口选项
        const defaultOptions = {
            app: 'default',
            title: 'Untitled',
            width: 800,
            height: 600,
            x: 'center',
            y: 'center',
            minWidth: 200,
            minHeight: 150,
            resizable: true,
            maximizable: true,
            minimizable: true,
            closable: true,
            content: ''
        };
        
        // 合并选项
        const windowOptions = { ...defaultOptions, ...options };
        
        // 生成窗口ID
        const windowId = this._generateWindowId();
        
        // 计算窗口位置
        const position = this._calculateWindowPosition(windowOptions);
        
        // 创建窗口元素
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.setAttribute('data-id', windowId);
        windowElement.setAttribute('data-app', windowOptions.app);
        windowElement.style.width = `${windowOptions.width}px`;
        windowElement.style.height = `${windowOptions.height}px`;
        windowElement.style.left = `${position.x}px`;
        windowElement.style.top = `${position.y}px`;
        windowElement.style.zIndex = this._getNextZIndex();
        
        // 创建窗口内容
        windowElement.innerHTML = `
            <div class="window-titlebar">
                <div class="window-titlebar-controls">
                    <div class="window-control window-close" title="关闭">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="window-control window-minimize" title="最小化">
                        <i class="fas fa-minus"></i>
                    </div>
                    <div class="window-control window-maximize" title="最大化">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="window-title">${windowOptions.title}</div>
                <div class="window-titlebar-spacer"></div>
            </div>
            <div class="window-content">
                ${windowOptions.content}
            </div>
            ${windowOptions.resizable ? '<div class="window-resize-handle"></div>' : ''}
        `;
        
        // 添加窗口到文档
        document.body.appendChild(windowElement);
        
        // 保存窗口信息
        const windowInfo = {
            id: windowId,
            app: windowOptions.app,
            title: windowOptions.title,
            element: windowElement,
            options: windowOptions,
            isMaximized: false,
            isMinimized: false,
            originalSize: {
                width: windowOptions.width,
                height: windowOptions.height,
                x: position.x,
                y: position.y
            }
        };
        
        this.windows.push(windowInfo);
        
        // 设置为活动窗口
        this.setActiveWindow(windowId);
        
        // 初始化窗口事件
        this._initWindowEvents(windowElement, windowInfo);
        
        // 触发窗口创建事件
        this._triggerEvent('window-created', { windowId });
        
        // 返回窗口信息
        return windowInfo;
    },
    
    // 关闭窗口
    closeWindow: function(windowId) {
        const windowIndex = this.windows.findIndex(w => w.id === windowId);
        if (windowIndex === -1) return;
        
        const windowInfo = this.windows[windowIndex];
        
        // 触发窗口关闭事件
        this._triggerEvent('window-closing', { windowId });
        
        // 从窗口列表中移除
        this.windows.splice(windowIndex, 1);
        
        // 如果是活动窗口，设置新的活动窗口
        if (this.activeWindowId === windowId) {
            this.activeWindowId = null;
            
            // 激活最上层的窗口
            if (this.windows.length > 0) {
                const topWindow = this.windows.reduce((prev, current) => {
                    return parseInt(prev.element.style.zIndex) > parseInt(current.element.style.zIndex) ? prev : current;
                });
                
                this.setActiveWindow(topWindow.id);
            }
        }
    },
    
    // 最小化窗口
    minimizeWindow: function(windowId) {
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (!windowInfo || windowInfo.isMinimized) return;
        
        // 标记为最小化
        windowInfo.isMinimized = true;
        
        // 触发窗口最小化事件
        this._triggerEvent('window-minimizing', { windowId });
        
        // 如果是活动窗口，设置新的活动窗口
        if (this.activeWindowId === windowId) {
            this.activeWindowId = null;
            
            // 激活最上层的非最小化窗口
            const visibleWindows = this.windows.filter(w => !w.isMinimized);
            if (visibleWindows.length > 0) {
                const topWindow = visibleWindows.reduce((prev, current) => {
                    return parseInt(prev.element.style.zIndex) > parseInt(current.element.style.zIndex) ? prev : current;
                });
                
                this.setActiveWindow(topWindow.id);
            }
        }
        
        // 添加到Dock
        this._addWindowToDock(windowInfo);
    },
    
    // 恢复窗口
    restoreWindow: function(windowId) {
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (!windowInfo || !windowInfo.isMinimized) return;
        
        // 取消最小化标记
        windowInfo.isMinimized = false;
        
        // 触发窗口恢复事件
        this._triggerEvent('window-restoring', { windowId });
        
        // 设置为活动窗口
        this.setActiveWindow(windowId);
    },
    
    // 最大化窗口
    maximizeWindow: function(windowId) {
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (!windowInfo || windowInfo.isMinimized) return;
        
        const windowElement = windowInfo.element;
        
        if (!windowInfo.isMaximized) {
            // 保存原始大小和位置
            windowInfo.originalSize = {
                width: windowElement.offsetWidth,
                height: windowElement.offsetHeight,
                x: windowElement.offsetLeft,
                y: windowElement.offsetTop
            };
            
            // 设置为最大化
            windowElement.style.width = '100%';
            windowElement.style.height = 'calc(100% - 25px)'; // 减去菜单栏高度
            windowElement.style.left = '0';
            windowElement.style.top = '25px'; // 菜单栏高度
            windowElement.classList.add('maximized');
            
            // 标记为最大化
            windowInfo.isMaximized = true;
        } else {
            // 恢复原始大小和位置
            windowElement.style.width = `${windowInfo.originalSize.width}px`;
            windowElement.style.height = `${windowInfo.originalSize.height}px`;
            windowElement.style.left = `${windowInfo.originalSize.x}px`;
            windowElement.style.top = `${windowInfo.originalSize.y}px`;
            windowElement.classList.remove('maximized');
            
            // 取消最大化标记
            windowInfo.isMaximized = false;
        }
        
        // 触发窗口最大化/恢复事件
        this._triggerEvent(windowInfo.isMaximized ? 'window-maximized' : 'window-unmaximized', { windowId });
    },
    
    // 设置活动窗口
    setActiveWindow: function(windowId) {
        // 如果窗口已经是活动窗口，不做任何操作
        if (this.activeWindowId === windowId) return;
        
        // 取消之前的活动窗口
        if (this.activeWindowId) {
            const prevActiveWindow = this.windows.find(w => w.id === this.activeWindowId);
            if (prevActiveWindow) {
                prevActiveWindow.element.classList.remove('active');
            }
        }
        
        // 设置新的活动窗口
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (windowInfo && !windowInfo.isMinimized) {
            // 更新活动窗口ID
            this.activeWindowId = windowId;
            
            // 添加活动类
            windowInfo.element.classList.add('active');
            
            // 将窗口移到最前
            windowInfo.element.style.zIndex = this._getNextZIndex();
            
            // 触发窗口激活事件
            this._triggerEvent('window-activated', { windowId });
        }
    },
    
    // 设置窗口标题
    setWindowTitle: function(windowId, title) {
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (!windowInfo) return;
        
        // 更新窗口信息
        windowInfo.title = title;
        
        // 更新窗口标题元素
        const titleElement = windowInfo.element.querySelector('.window-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    },
    
    // 设置窗口内容
    setWindowContent: function(windowId, content) {
        const windowInfo = this.windows.find(w => w.id === windowId);
        if (!windowInfo) return;
        
        // 更新窗口内容元素
        const contentElement = windowInfo.element.querySelector('.window-content');
        if (contentElement) {
            contentElement.innerHTML = content;
        }
    },
    
    // 获取窗口信息
    getWindowInfo: function(windowId) {
        return this.windows.find(w => w.id === windowId);
    },
    
    // 获取所有窗口
    getAllWindows: function() {
        return this.windows;
    },
    
    // 获取应用的窗口
    getAppWindows: function(appId) {
        return this.windows.filter(w => w.app === appId);
    },
    
    // 生成窗口ID
    _generateWindowId: function() {
        return `window-${++this.windowIdCounter}`;
    },
    
    // 计算窗口位置
    _calculateWindowPosition: function(options) {
        let x, y;
        
        // 计算X坐标
        if (options.x === 'center') {
            x = (window.innerWidth - options.width) / 2;
        } else if (typeof options.x === 'number') {
            x = options.x;
        } else {
            // 默认位置，错开堆叠
            x = 50 + (this.windows.length * 20);
        }
        
        // 计算Y坐标
        if (options.y === 'center') {
            y = (window.innerHeight - options.height) / 2;
        } else if (typeof options.y === 'number') {
            y = options.y;
        } else {
            // 默认位置，错开堆叠
            y = 50 + (this.windows.length * 20);
        }
        
        // 确保窗口在可视区域内
        x = Math.max(0, Math.min(x, window.innerWidth - options.width));
        y = Math.max(25, Math.min(y, window.innerHeight - options.height)); // 25px是菜单栏高度
        
        return { x, y };
    },
    
    // 获取下一个Z轴索引
    _getNextZIndex: function() {
        return this.baseZIndex + this.windows.length;
    },
    
    // 初始化窗口事件
    _initWindowEvents: function(windowElement, windowInfo) {
        // 窗口点击事件，设置为活动窗口
        windowElement.addEventListener('mousedown', (e) => {
            // 如果点击的不是控制按钮，设置为活动窗口
            if (!e.target.closest('.window-control')) {
                this.setActiveWindow(windowInfo.id);
            }
        });
        
        // 关闭按钮点击事件
        const closeButton = windowElement.querySelector('.window-close');
        if (closeButton && windowInfo.options.closable) {
            closeButton.addEventListener('click', () => {
                this.closeWindow(windowInfo.id);
            });
        } else if (closeButton) {
            closeButton.classList.add('disabled');
        }
        
        // 最小化按钮点击事件
        const minimizeButton = windowElement.querySelector('.window-minimize');
        if (minimizeButton && windowInfo.options.minimizable) {
            minimizeButton.addEventListener('click', () => {
                this.minimizeWindow(windowInfo.id);
            });
        } else if (minimizeButton) {
            minimizeButton.classList.add('disabled');
        }
        
        // 最大化按钮点击事件
        const maximizeButton = windowElement.querySelector('.window-maximize');
        if (maximizeButton && windowInfo.options.maximizable) {
            maximizeButton.addEventListener('click', () => {
                this.maximizeWindow(windowInfo.id);
            });
        } else if (maximizeButton) {
            maximizeButton.classList.add('disabled');
        }
        
        // 标题栏双击事件，切换最大化状态
        const titleBar = windowElement.querySelector('.window-titlebar');
        if (titleBar && windowInfo.options.maximizable) {
            titleBar.addEventListener('dblclick', (e) => {
                // 如果双击的不是控制按钮，切换最大化状态
                if (!e.target.closest('.window-control')) {
                    this.maximizeWindow(windowInfo.id);
                }
            });
        }
        
        // 窗口拖动
        this._initWindowDrag(windowElement, windowInfo);
        
        // 窗口调整大小
        if (windowInfo.options.resizable) {
            this._initWindowResize(windowElement, windowInfo);
        }
    },
    
    // 初始化窗口拖动
    _initWindowDrag: function(windowElement, windowInfo) {
        const titleBar = windowElement.querySelector('.window-titlebar');
        if (!titleBar) return;
        
        let isDragging = false;
        let startX, startY;
        let startLeft, startTop;
        
        titleBar.addEventListener('mousedown', (e) => {
            // 如果点击的是控制按钮，不启动拖动
            if (e.target.closest('.window-control')) return;
            
            // 如果窗口是最大化状态，不启动拖动
            if (windowInfo.isMaximized) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = windowElement.offsetLeft;
            startTop = windowElement.offsetTop;
            
            // 添加拖动中类
            windowElement.classList.add('dragging');
            
            // 阻止默认行为和冒泡
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            // 计算新位置
            const newLeft = startLeft + (e.clientX - startX);
            const newTop = startTop + (e.clientY - startY);
            
            // 更新窗口位置
            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            isDragging = false;
            
            // 移除拖动中类
            windowElement.classList.remove('dragging');
        });
    },
    
    // 初始化窗口调整大小
    _initWindowResize: function(windowElement, windowInfo) {
        const resizeHandle = windowElement.querySelector('.window-resize-handle');
        if (!resizeHandle) return;
        
        let isResizing = false;
        let startX, startY;
        let startWidth, startHeight;
        
        resizeHandle.addEventListener('mousedown', (e) => {
            // 如果窗口是最大化状态，不启动调整大小
            if (windowInfo.isMaximized) return;
            
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = windowElement.offsetWidth;
            startHeight = windowElement.offsetHeight;
            
            // 添加调整大小中类
            windowElement.classList.add('resizing');
            
            // 阻止默认行为和冒泡
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            // 计算新尺寸
            const newWidth = Math.max(windowInfo.options.minWidth, startWidth + (e.clientX - startX));
            const newHeight = Math.max(windowInfo.options.minHeight, startHeight + (e.clientY - startY));
            
            // 更新窗口尺寸
            windowElement.style.width = `${newWidth}px`;
            windowElement.style.height = `${newHeight}px`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isResizing) return;
            
            isResizing = false;
            
            // 移除调整大小中类
            windowElement.classList.remove('resizing');
        });
    },
    
    // 添加窗口到Dock
    _addWindowToDock: function(windowInfo) {
        // 检查Dock中是否已有该应用的图标
        const dockItem = document.querySelector(`.dock-item[data-app="${windowInfo.app}"]`);
        if (dockItem) {
            // 添加运行指示器
            dockItem.classList.add('running');
            
            // 关联窗口ID
            const windowIds = dockItem.getAttribute('data-window-ids') || '';
            const windowIdList = windowIds ? windowIds.split(',') : [];
            
            if (!windowIdList.includes(windowInfo.id)) {
                windowIdList.push(windowInfo.id);
                dockItem.setAttribute('data-window-ids', windowIdList.join(','));
            }
        }
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 监听Dock项点击事件
        document.addEventListener('click', (e) => {
            const dockItem = e.target.closest('.dock-item');
            if (!dockItem) return;
            
            const appId = dockItem.getAttribute('data-app');
            const windowIds = dockItem.getAttribute('data-window-ids');
            
            if (windowIds) {
                // 如果有关联的窗口，恢复最后一个窗口
                const windowIdList = windowIds.split(',');
                const lastWindowId = windowIdList[windowIdList.length - 1];
                
                const windowInfo = this.getWindowInfo(lastWindowId);
                if (windowInfo && windowInfo.isMinimized) {
                    this.restoreWindow(lastWindowId);
                } else if (windowInfo) {
                    this.setActiveWindow(lastWindowId);
                }
            } else {
                // 如果没有关联的窗口，打开新窗口
                this._openAppWindow(appId);
            }
        });
    },
    
    // 打开应用窗口
    _openAppWindow: function(appId) {
        // 根据应用ID打开相应的窗口
        switch (appId) {
            case 'finder':
                if (window.finderManager) {
                    window.finderManager.createWindow();
                }
                break;
                
            case 'settings':
                if (window.settingsManager) {
                    window.settingsManager.createWindow();
                }
                break;
                
            case 'safari':
                this._openSafariWindow();
                break;
                
            default:
                console.log(`应用 ${appId} 的窗口尚未实现`);
        }
    },
    
    // 打开Safari窗口
    _openSafariWindow: function() {
        this.createWindow({
            app: 'safari',
            title: 'Safari',
            width: 900,
            height: 600,
            content: `
                <div class="safari-window">
                    <div class="safari-toolbar">
                        <div class="safari-toolbar-buttons">
                            <div class="safari-toolbar-button safari-back" title="后退">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div class="safari-toolbar-button safari-forward" title="前进">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="safari-toolbar-button safari-reload" title="重新加载">
                                <i class="fas fa-redo"></i>
                            </div>
                        </div>
                        <div class="safari-address-bar">
                            <input type="text" placeholder="搜索或输入网站名称" value="https://www.apple.com">
                        </div>
                        <div class="safari-toolbar-actions">
                            <div class="safari-toolbar-button safari-share" title="共享">
                                <i class="fas fa-share-alt"></i>
                            </div>
                            <div class="safari-toolbar-button safari-tabs" title="标签页">
                                <i class="fas fa-layer-group"></i>
                            </div>
                        </div>
                    </div>
                    <div class="safari-content">
                        <iframe src="https://www.apple.com" frameborder="0"></iframe>
                    </div>
                </div>
            `
        });
    },
    
    // 触发自定义事件
    _triggerEvent: function(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }
};

// 初始化窗口管理器
function initWindowManager() {
    windowManager.init();
    
    // 导出窗口管理器到全局
    window.windowSystem = windowManager;
}

// 当文档加载完成时初始化窗口管理器
document.addEventListener('DOMContentLoaded', () => {
    initWindowManager();
});
