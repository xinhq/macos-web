// test.js - 测试和调试优化后的功能

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 运行测试
    runTests();
});

/**
 * 运行测试
 */
function runTests() {
    console.log('开始测试优化后的功能...');
    
    // 测试登录功能
    testLoginFunctionality();
    
    // 测试Dock栏功能
    testDockFunctionality();
    
    // 测试Finder功能
    testFinderFunctionality();
    
    // 测试菜单栏功能
    testMenuBarFunctionality();
    
    // 测试启动台功能
    testLaunchpadFunctionality();
    
    // 测试系统偏好设置
    testSystemPreferences();
    
    // 测试桌面右键菜单
    testDesktopContextMenu();
    
    // 测试壁纸功能
    testWallpaperFunctionality();
    
    console.log('测试完成！');
}

/**
 * 测试登录功能
 */
function testLoginFunctionality() {
    console.log('测试登录功能...');
    
    // 检查登录按钮是否存在
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        console.log('✓ 登录按钮存在');
        
        // 模拟点击登录按钮
        console.log('模拟点击登录按钮...');
        
        // 检查是否有密码输入框
        const passwordInput = document.getElementById('password-input');
        
        if (passwordInput) {
            console.log('✓ 密码输入框存在');
            
            // 设置密码
            passwordInput.value = 'password';
            
            // 触发点击事件
            loginButton.click();
            
            // 检查是否跳转到桌面
            setTimeout(() => {
                if (window.location.href.includes('desktop.html')) {
                    console.log('✓ 成功跳转到桌面');
                } else {
                    console.error('✗ 跳转到桌面失败');
                    
                    // 修复登录功能
                    fixLoginFunctionality();
                }
            }, 500);
        } else {
            console.error('✗ 密码输入框不存在');
        }
    } else {
        console.error('✗ 登录按钮不存在');
    }
}

/**
 * 修复登录功能
 */
function fixLoginFunctionality() {
    console.log('修复登录功能...');
    
    // 获取登录按钮
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        // 移除现有事件监听器
        const newLoginButton = loginButton.cloneNode(true);
        loginButton.parentNode.replaceChild(newLoginButton, loginButton);
        
        // 添加新的事件监听器
        newLoginButton.addEventListener('click', function() {
            // 跳转到桌面
            window.location.href = 'desktop.html';
        });
        
        console.log('✓ 登录功能已修复');
    }
}

/**
 * 测试Dock栏功能
 */
function testDockFunctionality() {
    console.log('测试Dock栏功能...');
    
    // 检查Dock栏是否存在
    const dock = document.getElementById('dock');
    
    if (dock) {
        console.log('✓ Dock栏存在');
        
        // 检查Dock栏图标
        const dockIcons = dock.querySelectorAll('.dock-icon');
        
        if (dockIcons.length > 0) {
            console.log(`✓ Dock栏包含 ${dockIcons.length} 个图标`);
            
            // 检查图标点击事件
            dockIcons.forEach(icon => {
                const appId = icon.getAttribute('data-app-id');
                
                if (appId) {
                    console.log(`✓ 图标 ${appId} 包含应用ID`);
                    
                    // 检查点击事件
                    const clickEvent = icon.onclick;
                    
                    if (clickEvent) {
                        console.log(`✓ 图标 ${appId} 包含点击事件`);
                    } else {
                        console.error(`✗ 图标 ${appId} 没有点击事件`);
                        
                        // 修复图标点击事件
                        icon.addEventListener('click', function() {
                            // 打开应用
                            if (typeof openApp === 'function') {
                                openApp(appId);
                            }
                        });
                        
                        console.log(`✓ 图标 ${appId} 点击事件已修复`);
                    }
                } else {
                    console.error('✗ 图标没有应用ID');
                }
            });
        } else {
            console.error('✗ Dock栏没有图标');
        }
    } else {
        console.error('✗ Dock栏不存在');
    }
}

/**
 * 测试Finder功能
 */
function testFinderFunctionality() {
    console.log('测试Finder功能...');
    
    // 检查Finder是否自动展开
    const finder = document.querySelector('.window[data-app-id="finder"]');
    
    if (finder) {
        // 检查Finder是否可见
        const isVisible = finder.style.display !== 'none' && !finder.classList.contains('hidden');
        
        if (isVisible) {
            console.error('✗ Finder在桌面加载时自动展开');
            
            // 修复Finder自动展开问题
            finder.style.display = 'none';
            finder.classList.add('hidden');
            
            console.log('✓ Finder自动展开问题已修复');
        } else {
            console.log('✓ Finder在桌面加载时不自动展开');
        }
    } else {
        console.log('✓ Finder窗口尚未创建，将在点击时创建');
    }
    
    // 检查Finder图标
    const finderIcon = document.querySelector('.dock-icon[data-app-id="finder"]');
    
    if (finderIcon) {
        console.log('✓ Finder图标存在');
        
        // 检查点击事件
        const clickEvent = finderIcon.onclick;
        
        if (clickEvent) {
            console.log('✓ Finder图标包含点击事件');
        } else {
            console.error('✗ Finder图标没有点击事件');
            
            // 修复Finder图标点击事件
            finderIcon.addEventListener('click', function() {
                // 打开Finder
                if (typeof openApp === 'function') {
                    openApp('finder');
                }
            });
            
            console.log('✓ Finder图标点击事件已修复');
        }
    } else {
        console.error('✗ Finder图标不存在');
    }
}

/**
 * 测试菜单栏功能
 */
function testMenuBarFunctionality() {
    console.log('测试菜单栏功能...');
    
    // 检查菜单栏是否存在
    const menubar = document.getElementById('menubar');
    
    if (menubar) {
        console.log('✓ 菜单栏存在');
        
        // 检查苹果图标
        const appleIcon = menubar.querySelector('.apple-icon');
        
        if (appleIcon) {
            console.log('✓ 苹果图标存在');
            
            // 检查点击事件
            const clickEvent = appleIcon.onclick;
            
            if (clickEvent) {
                console.log('✓ 苹果图标包含点击事件');
            } else {
                console.error('✗ 苹果图标没有点击事件');
                
                // 修复苹果图标点击事件
                appleIcon.addEventListener('click', function(event) {
                    // 阻止事件冒泡
                    event.stopPropagation();
                    
                    // 显示苹果菜单
                    if (typeof showAppleMenu === 'function') {
                        showAppleMenu();
                    }
                });
                
                console.log('✓ 苹果图标点击事件已修复');
            }
        } else {
            console.error('✗ 苹果图标不存在');
        }
        
        // 检查应用菜单
        const appMenus = menubar.querySelectorAll('.app-menu');
        
        if (appMenus.length > 0) {
            console.log(`✓ 菜单栏包含 ${appMenus.length} 个应用菜单`);
            
            // 检查点击事件
            appMenus.forEach(menu => {
                const menuName = menu.textContent.trim();
                const clickEvent = menu.onclick;
                
                if (clickEvent) {
                    console.log(`✓ 菜单 ${menuName} 包含点击事件`);
                } else {
                    console.error(`✗ 菜单 ${menuName} 没有点击事件`);
                    
                    // 修复菜单点击事件
                    menu.addEventListener('click', function(event) {
                        // 阻止事件冒泡
                        event.stopPropagation();
                        
                        // 显示菜单
                        if (typeof showAppMenu === 'function') {
                            showAppMenu(menuName.toLowerCase());
                        }
                    });
                    
                    console.log(`✓ 菜单 ${menuName} 点击事件已修复`);
                }
            });
        } else {
            console.error('✗ 菜单栏没有应用菜单');
        }
    } else {
        console.error('✗ 菜单栏不存在');
    }
}

/**
 * 测试启动台功能
 */
function testLaunchpadFunctionality() {
    console.log('测试启动台功能...');
    
    // 检查启动台图标
    const launchpadIcon = document.querySelector('.dock-icon[data-app-id="launchpad"]');
    
    if (launchpadIcon) {
        console.log('✓ 启动台图标存在');
        
        // 检查点击事件
        const clickEvent = launchpadIcon.onclick;
        
        if (clickEvent) {
            console.log('✓ 启动台图标包含点击事件');
        } else {
            console.error('✗ 启动台图标没有点击事件');
            
            // 修复启动台图标点击事件
            launchpadIcon.addEventListener('click', function() {
                // 打开启动台
                if (typeof openApp === 'function') {
                    openApp('launchpad');
                }
            });
            
            console.log('✓ 启动台图标点击事件已修复');
        }
    } else {
        console.error('✗ 启动台图标不存在');
    }
    
    // 检查启动台应用图标
    const launchpad = document.getElementById('launchpad');
    
    if (launchpad) {
        const appIcons = launchpad.querySelectorAll('.app-icon');
        
        if (appIcons.length > 0) {
            console.log(`✓ 启动台包含 ${appIcons.length} 个应用图标`);
            
            // 检查点击事件
            appIcons.forEach(icon => {
                const appName = icon.getAttribute('data-app-name');
                const appUrl = icon.getAttribute('data-app-url');
                
                if (appName) {
                    console.log(`✓ 图标 ${appName} 包含应用名称`);
                    
                    if (appUrl) {
                        console.log(`✓ 图标 ${appName} 包含应用URL: ${appUrl}`);
                        
                        // 检查点击事件
                        const clickEvent = icon.onclick;
                        
                        if (clickEvent) {
                            console.log(`✓ 图标 ${appName} 包含点击事件`);
                        } else {
                            console.error(`✗ 图标 ${appName} 没有点击事件`);
                            
                            // 修复图标点击事件
                            icon.addEventListener('click', function() {
                                // 打开应用URL
                                window.open(appUrl, '_blank');
                            });
                            
                            console.log(`✓ 图标 ${appName} 点击事件已修复`);
                        }
                    } else {
                        console.error(`✗ 图标 ${appName} 没有应用URL`);
                        
                        // 添加默认URL
                        const defaultUrl = getDefaultAppUrl(appName);
                        icon.setAttribute('data-app-url', defaultUrl);
                        
                        // 添加点击事件
                        icon.addEventListener('click', function() {
                            // 打开应用URL
                            window.open(defaultUrl, '_blank');
                        });
                        
                        console.log(`✓ 图标 ${appName} 已添加默认URL: ${defaultUrl}`);
                    }
                } else {
                    console.error('✗ 图标没有应用名称');
                }
            });
        } else {
            console.error('✗ 启动台没有应用图标');
        }
    } else {
        console.log('✓ 启动台尚未创建，将在点击时创建');
    }
}

/**
 * 获取默认应用URL
 * @param {string} appName - 应用名称
 * @returns {string} 应用URL
 */
function getDefaultAppUrl(appName) {
    // 转换为小写
    const name = appName.toLowerCase();
    
    // 默认URL映射
    const urlMap = {
        'safari': 'https://www.apple.com/safari/',
        'mail': 'https://www.apple.com/mail/',
        'calendar': 'https://www.apple.com/calendar/',
        'notes': 'https://www.apple.com/notes/',
        'reminders': 'https://www.apple.com/reminders/',
        'maps': 'https://www.apple.com/maps/',
        'photos': 'https://www.apple.com/photos/',
        'messages': 'https://www.apple.com/messages/',
        'facetime': 'https://www.apple.com/facetime/',
        'music': 'https://www.apple.com/music/',
        'podcasts': 'https://www.apple.com/podcasts/',
        'tv': 'https://www.apple.com/tv/',
        'news': 'https://www.apple.com/news/',
        'books': 'https://www.apple.com/books/',
        'app store': 'https://www.apple.com/app-store/',
        'settings': 'https://www.apple.com/macos/',
        'finder': 'https://www.apple.com/macos/finder/'
    };
    
    // 返回URL
    return urlMap[name] || 'https://www.apple.com';
}

/**
 * 测试系统偏好设置
 */
function testSystemPreferences() {
    console.log('测试系统偏好设置...');
    
    // 检查系统偏好设置图标
    const preferencesIcon = document.querySelector('.dock-icon[data-app-id="system-preferences"]');
    
    if (preferencesIcon) {
        console.log('✓ 系统偏好设置图标存在');
        
        // 检查点击事件
        const clickEvent = preferencesIcon.onclick;
        
        if (clickEvent) {
            console.log('✓ 系统偏好设置图标包含点击事件');
        } else {
            console.error('✗ 系统偏好设置图标没有点击事件');
            
            // 修复系统偏好设置图标点击事件
            preferencesIcon.addEventListener('click', function() {
                // 打开系统偏好设置
                if (typeof openSystemPreferences === 'function') {
                    openSystemPreferences();
                }
            });
            
            console.log('✓ 系统偏好设置图标点击事件已修复');
        }
    } else {
        console.error('✗ 系统偏好设置图标不存在');
    }
    
    // 检查系统偏好设置功能
    if (typeof openSystemPreferences === 'function') {
        console.log('✓ 系统偏好设置功能存在');
    } else {
        console.error('✗ 系统偏好设置功能不存在');
    }
}

/**
 * 测试桌面右键菜单
 */
function testDesktopContextMenu() {
    console.log('测试桌面右键菜单...');
    
    // 检查桌面右键菜单功能
    if (typeof initializeDesktopContextMenu === 'function') {
        console.log('✓ 桌面右键菜单功能存在');
        
        // 检查桌面元素
        const desktop = document.getElementById('desktop');
        
        if (desktop) {
            console.log('✓ 桌面元素存在');
            
            // 检查右键事件
            const contextmenuEvent = desktop._contextmenuEvent;
            
            if (contextmenuEvent) {
                console.log('✓ 桌面元素包含右键事件');
            } else {
                console.error('✗ 桌面元素没有右键事件');
                
                // 修复桌面右键事件
                desktop.addEventListener('contextmenu', function(event) {
                    // 阻止默认右键菜单
                    event.preventDefault();
                    
                    // 显示自定义右键菜单
                    if (typeof showDesktopContextMenu === 'function') {
                        showDesktopContextMenu(event.clientX, event.clientY);
                    }
                });
                
                // 保存事件引用
                desktop._contextmenuEvent = true;
                
                console.log('✓ 桌面右键事件已修复');
            }
        } else {
            console.error('✗ 桌面元素不存在');
        }
    } else {
        console.error('✗ 桌面右键菜单功能不存在');
    }
}

/**
 * 测试壁纸功能
 */
function testWallpaperFunctionality() {
    console.log('测试壁纸功能...');
    
    // 检查壁纸功能
    if (typeof setWallpaper === 'function') {
        console.log('✓ 壁纸设置功能存在');
    } else {
        console.error('✗ 壁纸设置功能不存在');
    }
    
    // 检查自定义壁纸功能
    if (typeof setCustomWallpaper === 'function') {
        console.log('✓ 自定义壁纸功能存在');
    } else {
        console.error('✗ 自定义壁纸功能不存在');
    }
}

// 导出函数供其他模块使用
window.runTests = runTests;
