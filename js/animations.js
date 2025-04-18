// animations.js - 增强动画和过渡效果

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化动画效果
    initAnimations();
});

/**
 * 初始化动画效果
 */
function initAnimations() {
    // 初始化窗口动画
    initWindowAnimations();
    
    // 初始化Dock动画
    initDockAnimations();
    
    // 初始化菜单动画
    initMenuAnimations();
    
    // 初始化桌面动画
    initDesktopAnimations();
    
    // 初始化登录动画
    initLoginAnimations();
    
    // 初始化应用启动动画
    initAppLaunchAnimations();
}

/**
 * 初始化窗口动画
 */
function initWindowAnimations() {
    // 获取所有窗口
    const windows = document.querySelectorAll('.window');
    
    // 为每个窗口添加动画类
    windows.forEach(window => {
        // 添加初始动画类
        window.classList.add('window-animated');
        
        // 获取窗口控制按钮
        const minimizeButton = window.querySelector('.control.minimize');
        const maximizeButton = window.querySelector('.control.maximize');
        const closeButton = window.querySelector('.control.close');
        
        // 为最小化按钮添加点击事件
        if (minimizeButton) {
            minimizeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 添加最小化动画类
                window.classList.add('window-minimizing');
                
                // 获取对应的Dock图标
                const appId = window.id.replace('-window', '');
                const dockIcon = document.querySelector(`.dock-icon[data-app="${appId}"]`);
                
                // 计算窗口到Dock图标的位置
                if (dockIcon) {
                    const windowRect = window.getBoundingClientRect();
                    const iconRect = dockIcon.getBoundingClientRect();
                    
                    // 设置动画终点
                    const translateX = iconRect.left + iconRect.width / 2 - (windowRect.left + windowRect.width / 2);
                    const translateY = iconRect.top + iconRect.height / 2 - (windowRect.top + windowRect.height / 2);
                    
                    // 应用动画
                    window.style.setProperty('--minimize-translate-x', `${translateX}px`);
                    window.style.setProperty('--minimize-translate-y', `${translateY}px`);
                }
                
                // 动画结束后隐藏窗口
                setTimeout(() => {
                    window.classList.remove('window-minimizing');
                    window.style.display = 'none';
                    
                    // 更新窗口状态
                    window.dataset.state = 'minimized';
                }, 300);
            });
        }
        
        // 为最大化按钮添加点击事件
        if (maximizeButton) {
            maximizeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 切换最大化状态
                if (window.dataset.state === 'maximized') {
                    // 恢复窗口大小
                    window.classList.add('window-unmaximizing');
                    
                    // 恢复窗口位置和大小
                    const originalWidth = window.dataset.originalWidth || '800px';
                    const originalHeight = window.dataset.originalHeight || '600px';
                    const originalLeft = window.dataset.originalLeft || '50%';
                    const originalTop = window.dataset.originalTop || '50%';
                    
                    setTimeout(() => {
                        window.style.width = originalWidth;
                        window.style.height = originalHeight;
                        window.style.left = originalLeft;
                        window.style.top = originalTop;
                        window.style.transform = 'translate(-50%, -50%)';
                        
                        // 更新窗口状态
                        window.dataset.state = 'normal';
                        
                        // 移除动画类
                        window.classList.remove('window-unmaximizing');
                    }, 10);
                } else {
                    // 保存窗口原始大小和位置
                    window.dataset.originalWidth = window.style.width;
                    window.dataset.originalHeight = window.style.height;
                    window.dataset.originalLeft = window.style.left;
                    window.dataset.originalTop = window.style.top;
                    
                    // 最大化窗口
                    window.classList.add('window-maximizing');
                    
                    setTimeout(() => {
                        window.style.width = '100%';
                        window.style.height = 'calc(100% - 25px)';
                        window.style.left = '50%';
                        window.style.top = 'calc(25px + 50%)';
                        window.style.transform = 'translate(-50%, -50%)';
                        
                        // 更新窗口状态
                        window.dataset.state = 'maximized';
                        
                        // 移除动画类
                        window.classList.remove('window-maximizing');
                    }, 10);
                }
            });
        }
        
        // 为关闭按钮添加点击事件
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 添加关闭动画类
                window.classList.add('window-closing');
                
                // 动画结束后移除窗口
                setTimeout(() => {
                    window.style.display = 'none';
                    window.classList.remove('window-closing');
                    
                    // 更新窗口状态
                    window.dataset.state = 'closed';
                }, 300);
            });
        }
    });
    
    // 重写窗口打开函数，添加动画
    if (window.openWindow) {
        const originalOpenWindow = window.openWindow;
        
        window.openWindow = function(windowId) {
            const windowElement = document.getElementById(windowId);
            
            if (windowElement) {
                // 如果窗口已经存在，则显示窗口
                if (windowElement.dataset.state === 'minimized' || windowElement.dataset.state === 'closed') {
                    // 添加打开动画类
                    windowElement.classList.add('window-opening');
                    
                    // 显示窗口
                    windowElement.style.display = 'block';
                    
                    // 更新窗口状态
                    windowElement.dataset.state = 'normal';
                    
                    // 动画结束后移除动画类
                    setTimeout(() => {
                        windowElement.classList.remove('window-opening');
                    }, 300);
                    
                    // 将窗口置于顶层
                    bringWindowToFront(windowElement);
                } else {
                    // 将窗口置于顶层
                    bringWindowToFront(windowElement);
                }
            } else {
                // 如果窗口不存在，则调用原始函数
                originalOpenWindow(windowId);
                
                // 获取新创建的窗口
                const newWindow = document.getElementById(windowId);
                
                if (newWindow) {
                    // 添加打开动画类
                    newWindow.classList.add('window-opening');
                    
                    // 动画结束后移除动画类
                    setTimeout(() => {
                        newWindow.classList.remove('window-opening');
                    }, 300);
                }
            }
        };
    }
}

/**
 * 将窗口置于顶层
 * @param {HTMLElement} windowElement - 窗口元素
 */
function bringWindowToFront(windowElement) {
    // 获取所有窗口
    const windows = document.querySelectorAll('.window');
    
    // 获取最高的z-index
    let maxZIndex = 0;
    
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex || 0);
        
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    });
    
    // 设置当前窗口的z-index
    windowElement.style.zIndex = maxZIndex + 1;
}

/**
 * 初始化Dock动画
 */
function initDockAnimations() {
    const dock = document.querySelector('.dock');
    
    // 如果Dock不存在，则返回
    if (!dock) return;
    
    // 获取Dock图标
    const dockIcons = dock.querySelectorAll('.dock-icon');
    
    // 为每个Dock图标添加鼠标事件
    dockIcons.forEach(icon => {
        // 鼠标进入事件
        icon.addEventListener('mouseenter', function() {
            // 添加弹跳动画类
            this.classList.add('dock-icon-bounce');
            
            // 动画结束后移除动画类
            setTimeout(() => {
                this.classList.remove('dock-icon-bounce');
            }, 500);
        });
        
        // 点击事件
        icon.addEventListener('click', function() {
            // 添加点击动画类
            this.classList.add('dock-icon-click');
            
            // 动画结束后移除动画类
            setTimeout(() => {
                this.classList.remove('dock-icon-click');
            }, 300);
        });
    });
    
    // 为Dock添加鼠标移动事件，实现图标放大效果
    dock.addEventListener('mousemove', function(e) {
        // 获取鼠标在Dock中的位置
        const dockRect = dock.getBoundingClientRect();
        const mouseX = e.clientX - dockRect.left;
        const mouseY = e.clientY - dockRect.top;
        
        // 获取Dock位置
        const dockPosition = localStorage.getItem('dockPosition') || 'bottom';
        
        // 获取Dock放大效果设置
        const magnificationEnabled = localStorage.getItem('dockMagnification') === 'true';
        
        // 如果放大效果已禁用，则返回
        if (!magnificationEnabled) return;
        
        // 遍历所有Dock图标
        dockIcons.forEach(icon => {
            // 获取图标在Dock中的位置
            const iconRect = icon.getBoundingClientRect();
            const iconX = iconRect.left + iconRect.width / 2 - dockRect.left;
            const iconY = iconRect.top + iconRect.height / 2 - dockRect.top;
            
            // 计算鼠标与图标的距离
            let distance;
            
            if (dockPosition === 'bottom' || dockPosition === 'top') {
                distance = Math.abs(mouseX - iconX);
            } else {
                distance = Math.abs(mouseY - iconY);
            }
            
            // 计算缩放比例
            const maxDistance = 100;
            const maxScale = 1.5;
            const scale = Math.max(1, maxScale - (distance / maxDistance) * (maxScale - 1));
            
            // 应用缩放
            icon.style.transform = `scale(${scale})`;
        });
    });
    
    // 鼠标离开Dock时重置图标大小
    dock.addEventListener('mouseleave', function() {
        dockIcons.forEach(icon => {
            icon.style.transform = 'scale(1)';
        });
    });
}

/**
 * 初始化菜单动画
 */
function initMenuAnimations() {
    // 获取所有下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    
    // 为每个下拉菜单添加过渡动画
    dropdowns.forEach(dropdown => {
        dropdown.classList.add('dropdown-animated');
    });
    
    // 获取控制中心
    const controlCenter = document.querySelector('.control-center');
    
    if (controlCenter) {
        controlCenter.classList.add('dropdown-animated');
    }
    
    // 获取通知中心
    const notificationCenter = document.querySelector('.notification-center');
    
    if (notificationCenter) {
        notificationCenter.classList.add('dropdown-animated');
    }
    
    // 重写菜单显示函数，添加动画
    if (window.toggleControlCenter) {
        const originalToggleControlCenter = window.toggleControlCenter;
        
        window.toggleControlCenter = function() {
            const controlCenter = document.querySelector('.control-center');
            
            if (controlCenter) {
                // 隐藏其他下拉菜单
                hideAllDropdowns();
                
                // 切换控制中心
                if (controlCenter.classList.contains('show')) {
                    controlCenter.classList.add('dropdown-hiding');
                    
                    setTimeout(() => {
                        controlCenter.classList.remove('show');
                        controlCenter.classList.remove('dropdown-hiding');
                    }, 300);
                } else {
                    controlCenter.classList.add('dropdown-showing');
                    controlCenter.classList.add('show');
                    
                    setTimeout(() => {
                        controlCenter.classList.remove('dropdown-showing');
                    }, 300);
                }
            }
        };
    }
    
    if (window.toggleNotificationCenter) {
        const originalToggleNotificationCenter = window.toggleNotificationCenter;
        
        window.toggleNotificationCenter = function() {
            const notificationCenter = document.querySelector('.notification-center');
            
            if (notificationCenter) {
                // 隐藏其他下拉菜单
                hideAllDropdowns();
                
                // 切换通知中心
                if (notificationCenter.classList.contains('show')) {
                    notificationCenter.classList.add('dropdown-hiding');
                    
                    setTimeout(() => {
                        notificationCenter.classList.remove('show');
                        notificationCenter.classList.remove('dropdown-hiding');
                    }, 300);
                } else {
                    notificationCenter.classList.add('dropdown-showing');
                    notificationCenter.classList.add('show');
                    
                    setTimeout(() => {
                        notificationCenter.classList.remove('dropdown-showing');
                    }, 300);
                }
            } else {
                alert('打开通知中心');
            }
        };
    }
}

/**
 * 隐藏所有下拉菜单
 */
function hideAllDropdowns() {
    // 隐藏所有下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    
    dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.add('dropdown-hiding');
            
            setTimeout(() => {
                dropdown.classList.remove('show');
                dropdown.classList.remove('dropdown-hiding');
            }, 300);
        }
    });
    
    // 隐藏控制中心
    const controlCenter = document.querySelector('.control-center');
    
    if (controlCenter && controlCenter.classList.contains('show')) {
        controlCenter.classList.add('dropdown-hiding');
        
        setTimeout(() => {
            controlCenter.classList.remove('show');
            controlCenter.classList.remove('dropdown-hiding');
        }, 300);
    }
    
    // 隐藏通知中心
    const notificationCenter = document.querySelector('.notification-center');
    
    if (notificationCenter && notificationCenter.classList.contains('show')) {
        notificationCenter.classList.add('dropdown-hiding');
        
        setTimeout(() => {
            notificationCenter.classList.remove('show');
            notificationCenter.classList.remove('dropdown-hiding');
        }, 300);
    }
}

/**
 * 初始化桌面动画
 */
function initDesktopAnimations() {
    // 获取桌面背景
    const desktopBackground = document.querySelector('.desktop-background');
    
    if (desktopBackground) {
        // 添加过渡动画
        desktopBackground.classList.add('background-transition');
    }
    
    // 获取桌面图标
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    // 为每个桌面图标添加动画
    desktopIcons.forEach(icon => {
        // 添加动画类
        icon.classList.add('desktop-icon-animated');
        
        // 鼠标进入事件
        icon.addEventListener('mouseenter', function() {
            this.classList.add('desktop-icon-hover');
        });
        
        // 鼠标离开事件
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('desktop-icon-hover');
        });
        
        // 点击事件
        icon.addEventListener('click', function() {
            this.classList.add('desktop-icon-click');
            
            setTimeout(() => {
                this.classList.remove('desktop-icon-click');
            }, 300);
        });
    });
}

/**
 * 初始化登录动画
 */
function initLoginAnimations() {
    // 获取登录按钮
    const loginButton = document.querySelector('.login-button');
    
    if (loginButton) {
        // 添加点击事件
        loginButton.addEventListener('click', function() {
            // 获取登录屏幕和桌面屏幕
            const loginScreen = document.querySelector('.login-screen');
            const desktopScreen = document.querySelector('.desktop-screen');
            
            if (loginScreen && desktopScreen) {
                // 添加过渡动画类
                loginScreen.classList.add('login-fade-out');
                desktopScreen.classList.add('desktop-fade-in');
                
                // 延迟显示桌面
                setTimeout(() => {
                    loginScreen.style.display = 'none';
                    desktopScreen.style.display = 'block';
                    
                    // 移除动画类
                    loginScreen.classList.remove('login-fade-out');
                    desktopScreen.classList.remove('desktop-fade-in');
                }, 1000);
            }
        });
    }
}

/**
 * 初始化应用启动动画
 */
function initAppLaunchAnimations() {
    // 获取所有应用图标
    const appIcons = document.querySelectorAll('.dock-icon, .launchpad-icon, .desktop-icon');
    
    // 为每个应用图标添加点击事件
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 获取应用ID
            const appId = this.dataset.app;
            
            if (appId) {
                // 创建应用启动动画
                createAppLaunchAnimation(this, appId);
            }
        });
    });
}

/**
 * 创建应用启动动画
 * @param {HTMLElement} iconElement - 图标元素
 * @param {string} appId - 应用ID
 */
function createAppLaunchAnimation(iconElement, appId) {
    // 获取图标位置
    const iconRect = iconElement.getBoundingClientRect();
    
    // 创建动画元素
    const animationElement = document.createElement('div');
    animationElement.className = 'app-launch-animation';
    
    // 设置动画元素初始位置和大小
    animationElement.style.left = `${iconRect.left}px`;
    animationElement.style.top = `${iconRect.top}px`;
    animationElement.style.width = `${iconRect.width}px`;
    animationElement.style.height = `${iconRect.height}px`;
    
    // 添加图标图像
    const iconImage = iconElement.querySelector('img');
    
    if (iconImage) {
        const animationImage = document.createElement('img');
        animationImage.src = iconImage.src;
        animationImage.alt = iconImage.alt;
        
        animationElement.appendChild(animationImage);
    }
    
    // 添加到文档
    document.body.appendChild(animationElement);
    
    // 触发动画
    setTimeout(() => {
        animationElement.classList.add('app-launching');
    }, 10);
    
    // 动画结束后移除元素
    setTimeout(() => {
        document.body.removeChild(animationElement);
    }, 500);
}

// 导出函数供其他模块使用
window.hideAllDropdowns = hideAllDropdowns;
window.bringWindowToFront = bringWindowToFront;
window.createAppLaunchAnimation = createAppLaunchAnimation;
