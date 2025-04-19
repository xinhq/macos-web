/**
 * macOS Monterey 网页版 - 动画和视觉效果
 * 负责实现各种动画和过渡效果
 */

// 动画管理器
const animationManager = {
    // 初始化动画
    init: function() {
        console.log('动画管理器已初始化');
        
        // 添加亮度调整覆盖层
        this._createBrightnessOverlay();
        
        // 初始化窗口动画
        this._initWindowAnimations();
        
        // 初始化Dock动画
        this._initDockAnimations();
        
        // 初始化菜单动画
        this._initMenuAnimations();
        
        // 初始化深色模式过渡
        this._initDarkModeTransition();
    },
    
    // 创建亮度调整覆盖层
    _createBrightnessOverlay: function() {
        const overlay = document.createElement('div');
        overlay.className = 'brightness-overlay';
        overlay.id = 'brightness-overlay';
        document.body.appendChild(overlay);
        
        // 设置初始亮度
        this.setBrightness(80);
    },
    
    // 初始化窗口动画
    _initWindowAnimations: function() {
        // 监听窗口创建事件
        document.addEventListener('window-created', (e) => {
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                // 添加打开动画
                windowElement.style.animation = 'windowOpen var(--window-animation-speed) var(--animation-easing)';
                
                // 动画结束后清除动画属性
                windowElement.addEventListener('animationend', () => {
                    windowElement.style.animation = '';
                }, { once: true });
            }
        });
        
        // 监听窗口关闭事件
        document.addEventListener('window-closing', (e) => {
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                // 添加关闭动画
                windowElement.classList.add('closing');
                
                // 动画结束后移除窗口
                windowElement.addEventListener('animationend', () => {
                    windowElement.remove();
                }, { once: true });
            }
        });
        
        // 监听窗口最小化事件
        document.addEventListener('window-minimizing', (e) => {
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                // 添加最小化动画
                windowElement.classList.add('minimizing');
                
                // 动画结束后隐藏窗口
                windowElement.addEventListener('animationend', () => {
                    windowElement.style.display = 'none';
                    windowElement.classList.remove('minimizing');
                }, { once: true });
            }
        });
        
        // 监听窗口恢复事件
        document.addEventListener('window-restoring', (e) => {
            const windowId = e.detail.windowId;
            const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
            
            if (windowElement) {
                // 显示窗口
                windowElement.style.display = 'flex';
                
                // 添加恢复动画
                windowElement.style.animation = 'windowOpen var(--window-animation-speed) var(--animation-easing)';
                
                // 动画结束后清除动画属性
                windowElement.addEventListener('animationend', () => {
                    windowElement.style.animation = '';
                }, { once: true });
            }
        });
    },
    
    // 初始化Dock动画
    _initDockAnimations: function() {
        // 获取Dock元素
        const dock = document.getElementById('dock');
        if (!dock) return;
        
        // 获取所有Dock项
        const dockItems = dock.querySelectorAll('.dock-item');
        
        // 为每个Dock项添加鼠标悬停效果
        dockItems.forEach(item => {
            // 鼠标进入时
            item.addEventListener('mouseenter', () => {
                this._updateDockMagnification(dock, item);
            });
            
            // 鼠标移动时
            item.addEventListener('mousemove', (e) => {
                this._updateDockMagnification(dock, item, e);
            });
        });
        
        // 鼠标离开Dock时重置所有项
        dock.addEventListener('mouseleave', () => {
            dockItems.forEach(item => {
                item.style.transform = '';
                item.style.margin = '';
            });
        });
        
        // 为Dock添加鼠标移动事件，实现连续的放大效果
        dock.addEventListener('mousemove', (e) => {
            this._updateDockMagnification(dock, null, e);
        });
    },
    
    // 更新Dock放大效果
    _updateDockMagnification: function(dock, activeItem, event) {
        // 获取所有Dock项
        const dockItems = dock.querySelectorAll('.dock-item');
        
        // 如果提供了事件对象，使用鼠标位置计算放大效果
        if (event) {
            const dockRect = dock.getBoundingClientRect();
            const mouseX = event.clientX;
            
            dockItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemX = itemRect.left + itemRect.width / 2;
                
                // 计算鼠标与项目中心的距离
                const distance = Math.abs(mouseX - itemX);
                
                // 根据距离计算缩放比例
                let scale = 1;
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    // 距离越近，缩放越大
                    scale = 1 + (1 - distance / maxDistance) * 0.5;
                }
                
                // 应用缩放
                item.style.transform = `scale(${scale})`;
                
                // 根据缩放调整边距
                const margin = scale > 1 ? `0 ${(scale - 1) * 10}px` : '';
                item.style.margin = margin;
            });
        }
        // 如果只提供了活动项，只放大该项
        else if (activeItem) {
            activeItem.style.transform = 'scale(1.5)';
            activeItem.style.margin = '0 10px';
        }
    },
    
    // 添加Dock弹跳动画
    addDockBounce: function(appId) {
        const dockItem = document.querySelector(`.dock-item[data-app="${appId}"]`);
        if (dockItem) {
            // 移除现有的弹跳类
            dockItem.classList.remove('bounce');
            
            // 触发重绘
            void dockItem.offsetWidth;
            
            // 添加弹跳类
            dockItem.classList.add('bounce');
            
            // 动画结束后移除类
            dockItem.addEventListener('animationend', () => {
                dockItem.classList.remove('bounce');
            }, { once: true });
        }
    },
    
    // 初始化菜单动画
    _initMenuAnimations: function() {
        // 监听菜单打开事件
        document.addEventListener('menu-opened', (e) => {
            const menuId = e.detail.menuId;
            const menuElement = document.getElementById(menuId);
            
            if (menuElement) {
                // 添加打开动画
                menuElement.style.animation = 'menuFadeIn var(--menu-animation-speed) ease';
                
                // 动画结束后清除动画属性
                menuElement.addEventListener('animationend', () => {
                    menuElement.style.animation = '';
                }, { once: true });
            }
        });
        
        // 监听菜单关闭事件
        document.addEventListener('menu-closing', (e) => {
            const menuId = e.detail.menuId;
            const menuElement = document.getElementById(menuId);
            
            if (menuElement) {
                // 添加关闭动画
                menuElement.classList.add('closing');
                
                // 动画结束后移除菜单
                menuElement.addEventListener('animationend', () => {
                    menuElement.remove();
                }, { once: true });
            }
        });
    },
    
    // 初始化深色模式过渡
    _initDarkModeTransition: function() {
        // 监听深色模式切换事件
        document.addEventListener('dark-mode-toggle', (e) => {
            const isDarkMode = e.detail.isDarkMode;
            
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    },
    
    // 设置亮度
    setBrightness: function(value) {
        const overlay = document.getElementById('brightness-overlay');
        if (overlay) {
            // 将亮度值转换为背景颜色透明度
            // 亮度值越低，透明度越高（越暗）
            const alpha = (100 - value) / 100 * 0.7; // 最大暗化70%
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
        }
    },
    
    // 添加窗口打开动画
    addWindowOpenAnimation: function(windowElement) {
        if (windowElement) {
            // 添加打开动画
            windowElement.style.animation = 'windowOpen var(--window-animation-speed) var(--animation-easing)';
            
            // 动画结束后清除动画属性
            windowElement.addEventListener('animationend', () => {
                windowElement.style.animation = '';
            }, { once: true });
        }
    },
    
    // 添加窗口关闭动画
    addWindowCloseAnimation: function(windowElement, callback) {
        if (windowElement) {
            // 添加关闭动画
            windowElement.classList.add('closing');
            
            // 动画结束后执行回调
            windowElement.addEventListener('animationend', () => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, { once: true });
        }
    },
    
    // 添加通知动画
    addNotificationAnimation: function(notificationElement) {
        if (notificationElement) {
            // 添加打开动画
            notificationElement.style.animation = 'notificationSlideIn 0.3s ease';
            
            // 动画结束后清除动画属性
            notificationElement.addEventListener('animationend', () => {
                notificationElement.style.animation = '';
            }, { once: true });
        }
    },
    
    // 添加通知关闭动画
    addNotificationCloseAnimation: function(notificationElement, callback) {
        if (notificationElement) {
            // 添加关闭动画
            notificationElement.classList.add('closing');
            
            // 动画结束后执行回调
            notificationElement.addEventListener('animationend', () => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, { once: true });
        }
    },
    
    // 添加对话框动画
    addDialogAnimation: function(dialogElement) {
        if (dialogElement) {
            // 添加打开动画
            dialogElement.style.animation = 'dialogOpen 0.2s ease';
            
            // 动画结束后清除动画属性
            dialogElement.addEventListener('animationend', () => {
                dialogElement.style.animation = '';
            }, { once: true });
        }
    },
    
    // 添加对话框关闭动画
    addDialogCloseAnimation: function(dialogElement, callback) {
        if (dialogElement) {
            // 添加关闭动画
            dialogElement.classList.add('closing');
            
            // 动画结束后执行回调
            dialogElement.addEventListener('animationend', () => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, { once: true });
        }
    },
    
    // 添加启动台打开动画
    addLaunchpadOpenAnimation: function() {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            // 显示启动台
            launchpad.classList.remove('hidden');
            
            // 添加打开动画
            launchpad.style.animation = 'launchpadFadeIn 0.3s ease';
            
            // 动画结束后清除动画属性
            launchpad.addEventListener('animationend', () => {
                launchpad.style.animation = '';
            }, { once: true });
            
            // 为应用图标添加动画
            const apps = launchpad.querySelectorAll('.launchpad-app');
            apps.forEach((app, index) => {
                app.style.animationDelay = `${0.03 * index}s`;
            });
        }
    },
    
    // 添加启动台关闭动画
    addLaunchpadCloseAnimation: function(callback) {
        const launchpad = document.getElementById('launchpad');
        if (launchpad) {
            // 添加关闭动画
            launchpad.style.animation = 'launchpadFadeIn 0.3s ease reverse';
            
            // 动画结束后执行回调
            launchpad.addEventListener('animationend', () => {
                launchpad.classList.add('hidden');
                if (typeof callback === 'function') {
                    callback();
                }
            }, { once: true });
        }
    }
};

// 初始化动画管理器
function initAnimations() {
    animationManager.init();
    
    // 导出动画管理器到全局
    window.animationManager = animationManager;
}

// 当文档加载完成时初始化动画管理器
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});
