// menubar.js - 菜单栏功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单栏
    initializeMenuBar();
});

/**
 * 初始化菜单栏
 */
function initializeMenuBar() {
    // 创建菜单栏
    createMenuBar();
    
    // 添加菜单项
    addMenuItems();
    
    // 初始化菜单交互
    initMenuInteractions();
    
    // 初始化时钟
    initClock();
    
    // 初始化系统图标
    initSystemIcons();
}

/**
 * 创建菜单栏
 */
function createMenuBar() {
    // 检查菜单栏是否已存在
    if (document.getElementById('menu-bar')) {
        return;
    }
    
    // 创建菜单栏容器
    const menuBar = document.createElement('div');
    menuBar.id = 'menu-bar';
    menuBar.className = 'menu-bar';
    
    // 创建左侧菜单
    const leftMenu = document.createElement('div');
    leftMenu.className = 'menu-left';
    leftMenu.id = 'menu-left';
    
    // 创建右侧菜单
    const rightMenu = document.createElement('div');
    rightMenu.className = 'menu-right';
    rightMenu.id = 'menu-right';
    
    // 组装菜单栏
    menuBar.appendChild(leftMenu);
    menuBar.appendChild(rightMenu);
    
    // 添加到文档
    document.body.appendChild(menuBar);
}

/**
 * 添加菜单项
 */
function addMenuItems() {
    // 添加左侧菜单项
    addLeftMenuItems();
    
    // 添加右侧菜单项
    addRightMenuItems();
}

/**
 * 添加左侧菜单项
 */
function addLeftMenuItems() {
    const leftMenu = document.getElementById('menu-left');
    
    if (!leftMenu) {
        return;
    }
    
    // 添加苹果图标
    const appleMenuItem = createMenuItem({
        id: 'apple-menu',
        icon: 'icons/system/apple-logo.svg',
        text: '',
        submenu: [
            { id: 'about', text: '关于本机', action: showAboutThisMac },
            { type: 'separator' },
            { id: 'preferences', text: '系统偏好设置...', action: openSystemPreferences },
            { type: 'separator' },
            { id: 'app-store', text: 'App Store...', action: openAppStore },
            { type: 'separator' },
            { id: 'recent-items', text: '最近使用的项目', submenu: [
                { id: 'clear-recent', text: '清除最近使用的项目', action: clearRecentItems }
            ]},
            { type: 'separator' },
            { id: 'force-quit', text: '强制退出...', action: showForceQuit },
            { type: 'separator' },
            { id: 'sleep', text: '睡眠', action: sleepSystem },
            { id: 'restart', text: '重新启动...', action: restartSystem },
            { id: 'shutdown', text: '关机...', action: shutdownSystem },
            { type: 'separator' },
            { id: 'lock-screen', text: '锁定屏幕', action: lockScreen },
            { id: 'logout', text: '退出登录...', action: logoutUser }
        ]
    });
    
    leftMenu.appendChild(appleMenuItem);
    
    // 添加应用菜单（动态变化）
    const appMenus = {
        finder: [
            {
                id: 'finder-menu',
                text: '访达',
                submenu: [
                    { id: 'about-finder', text: '关于访达', action: showAboutFinder },
                    { type: 'separator' },
                    { id: 'preferences', text: '偏好设置...', action: showFinderPreferences },
                    { type: 'separator' },
                    { id: 'empty-trash', text: '清倒废纸篓...', action: emptyTrash },
                    { id: 'secure-empty-trash', text: '安全清倒废纸篓...', action: secureEmptyTrash },
                    { type: 'separator' },
                    { id: 'services', text: '服务', submenu: [
                        { id: 'no-services', text: '没有可用的服务', disabled: true }
                    ]},
                    { type: 'separator' },
                    { id: 'hide-finder', text: '隐藏访达', action: hideFinder },
                    { id: 'hide-others', text: '隐藏其他', action: hideOthers },
                    { id: 'show-all', text: '显示全部', action: showAll }
                ]
            },
            {
                id: 'file-menu',
                text: '文件',
                submenu: [
                    { id: 'new-finder-window', text: '新建访达窗口', action: newFinderWindow },
                    { id: 'new-folder', text: '新建文件夹', action: newFolder },
                    { id: 'new-folder-with-selection', text: '用所选项目新建文件夹', action: newFolderWithSelection, disabled: true },
                    { id: 'new-smart-folder', text: '新建智能文件夹', action: newSmartFolder },
                    { id: 'new-tab', text: '新建标签页', action: newTab },
                    { type: 'separator' },
                    { id: 'open', text: '打开', action: openItem },
                    { id: 'open-with', text: '打开方式', submenu: [
                        { id: 'choose-app', text: '选择应用程序...', action: chooseApp }
                    ]},
                    { type: 'separator' },
                    { id: 'close-window', text: '关闭窗口', action: closeWindow },
                    { id: 'get-info', text: '显示简介', action: getInfo },
                    { id: 'rename', text: '重命名', action: rename },
                    { type: 'separator' },
                    { id: 'compress', text: '压缩', action: compress },
                    { type: 'separator' },
                    { id: 'duplicate', text: '制作副本', action: duplicate },
                    { id: 'make-alias', text: '制作替身', action: makeAlias },
                    { id: 'quick-look', text: '快速查看', action: quickLook },
                    { type: 'separator' },
                    { id: 'print', text: '打印', action: print }
                ]
            },
            {
                id: 'edit-menu',
                text: '编辑',
                submenu: [
                    { id: 'undo', text: '撤销', action: undo },
                    { id: 'redo', text: '重做', action: redo },
                    { type: 'separator' },
                    { id: 'cut', text: '剪切', action: cut },
                    { id: 'copy', text: '拷贝', action: copy },
                    { id: 'paste', text: '粘贴', action: paste },
                    { id: 'select-all', text: '全选', action: selectAll },
                    { type: 'separator' },
                    { id: 'show-clipboard', text: '显示剪贴板', action: showClipboard },
                    { type: 'separator' },
                    { id: 'start-dictation', text: '开始听写...', action: startDictation },
                    { id: 'emoji', text: '表情与符号', action: showEmoji }
                ]
            },
            {
                id: 'view-menu',
                text: '显示',
                submenu: [
                    { id: 'as-icons', text: '为图标', action: viewAsIcons },
                    { id: 'as-list', text: '为列表', action: viewAsList },
                    { id: 'as-columns', text: '为分栏', action: viewAsColumns },
                    { id: 'as-gallery', text: '为画廊', action: viewAsGallery },
                    { type: 'separator' },
                    { id: 'clean-up', text: '整理', action: cleanUp },
                    { id: 'clean-up-by', text: '整理方式', submenu: [
                        { id: 'clean-by-name', text: '名称', action: cleanByName },
                        { id: 'clean-by-kind', text: '种类', action: cleanByKind },
                        { id: 'clean-by-date', text: '日期', action: cleanByDate },
                        { id: 'clean-by-size', text: '大小', action: cleanBySize }
                    ]},
                    { type: 'separator' },
                    { id: 'show-view-options', text: '显示显示选项', action: showViewOptions },
                    { type: 'separator' },
                    { id: 'hide-sidebar', text: '隐藏边栏', action: toggleSidebar },
                    { id: 'hide-toolbar', text: '隐藏工具栏', action: toggleToolbar },
                    { id: 'hide-path-bar', text: '隐藏路径栏', action: togglePathBar },
                    { id: 'hide-status-bar', text: '隐藏状态栏', action: toggleStatusBar },
                    { type: 'separator' },
                    { id: 'customize-toolbar', text: '自定工具栏...', action: customizeToolbar }
                ]
            },
            {
                id: 'go-menu',
                text: '前往',
                submenu: [
                    { id: 'back', text: '后退', action: goBack },
                    { id: 'forward', text: '前进', action: goForward },
                    { id: 'enclosing-folder', text: '包含文件夹', action: goEnclosingFolder },
                    { type: 'separator' },
                    { id: 'recents', text: '最近访问', action: goRecents },
                    { id: 'documents', text: '文稿', action: goDocuments },
                    { id: 'desktop', text: '桌面', action: goDesktop },
                    { id: 'downloads', text: '下载', action: goDownloads },
                    { id: 'home', text: '个人', action: goHome },
                    { id: 'computer', text: '电脑', action: goComputer },
                    { id: 'airdrop', text: 'AirDrop', action: goAirdrop },
                    { id: 'network', text: '网络', action: goNetwork },
                    { id: 'applications', text: '应用程序', action: goApplications },
                    { id: 'utilities', text: '实用工具', action: goUtilities },
                    { type: 'separator' },
                    { id: 'go-to-folder', text: '前往文件夹...', action: goToFolder },
                    { id: 'connect-to-server', text: '连接服务器...', action: connectToServer },
                    { type: 'separator' },
                    { id: 'apple-website', text: '访问苹果官网', action: visitAppleWebsite }
                ]
            },
            {
                id: 'window-menu',
                text: '窗口',
                submenu: [
                    { id: 'minimize', text: '最小化', action: minimizeWindow },
                    { id: 'zoom', text: '缩放', action: zoomWindow },
                    { type: 'separator' },
                    { id: 'cycle-windows', text: '循环切换窗口', action: cycleWindows },
                    { type: 'separator' },
                    { id: 'bring-all-to-front', text: '前置全部窗口', action: bringAllToFront }
                ]
            },
            {
                id: 'help-menu',
                text: '帮助',
                submenu: [
                    { id: 'finder-help', text: '访达帮助', action: finderHelp },
                    { type: 'separator' },
                    { id: 'github-homepage', text: '访问GitHub主页', action: visitGitHubHomepage }
                ]
            }
        ],
        safari: [
            {
                id: 'safari-menu',
                text: 'Safari',
                submenu: [
                    { id: 'about-safari', text: '关于Safari', action: showAboutSafari },
                    { type: 'separator' },
                    { id: 'preferences', text: '偏好设置...', action: showSafariPreferences },
                    { type: 'separator' },
                    { id: 'services', text: '服务', submenu: [
                        { id: 'no-services', text: '没有可用的服务', disabled: true }
                    ]},
                    { type: 'separator' },
                    { id: 'hide-safari', text: '隐藏Safari', action: hideSafari },
                    { id: 'hide-others', text: '隐藏其他', action: hideOthers },
                    { id: 'show-all', text: '显示全部', action: showAll },
                    { type: 'separator' },
                    { id: 'quit-safari', text: '退出Safari', action: quitSafari }
                ]
            },
            {
                id: 'file-menu',
                text: '文件',
                submenu: [
                    { id: 'new-window', text: '新建窗口', action: newWindow },
                    { id: 'new-private-window', text: '新建隐私窗口', action: newPrivateWindow },
                    { id: 'new-tab', text: '新建标签页', action: newTab },
                    { type: 'separator' },
                    { id: 'open-file', text: '打开文件...', action: openFile },
                    { id: 'open-location', text: '打开位置...', action: openLocation },
                    { type: 'separator' },
                    { id: 'close-window', text: '关闭窗口', action: closeWindow },
                    { id: 'close-tab', text: '关闭标签页', action: closeTab },
                    { type: 'separator' },
                    { id: 'save-as', text: '存储为...', action: saveAs },
                    { id: 'export-as-pdf', text: '导出为PDF...', action: exportAsPdf },
                    { type: 'separator' },
                    { id: 'share', text: '共享', submenu: [
                        { id: 'email-link', text: '用邮件发送此页面的链接', action: emailLink },
                        { id: 'messages', text: '信息', action: shareMessages }
                    ]},
                    { type: 'separator' },
                    { id: 'print', text: '打印...', action: print }
                ]
            },
            {
                id: 'edit-menu',
                text: '编辑',
                submenu: [
                    { id: 'undo', text: '撤销', action: undo },
                    { id: 'redo', text: '重做', action: redo },
                    { type: 'separator' },
                    { id: 'cut', text: '剪切', action: cut },
                    { id: 'copy', text: '拷贝', action: copy },
                    { id: 'paste', text: '粘贴', action: paste },
                    { id: 'paste-and-match-style', text: '粘贴并匹配样式', action: pasteAndMatchStyle },
                    { id: 'delete', text: '删除', action: deleteSelection },
                    { id: 'select-all', text: '全选', action: selectAll },
                    { type: 'separator' },
                    { id: 'find', text: '查找', submenu: [
                        { id: 'find-in-page', text: '在页面中查找...', action: findInPage },
                        { id: 'find-next', text: '查找下一个', action: findNext },
                        { id: 'find-previous', text: '查找上一个', action: findPrevious }
                    ]},
                    { type: 'separator' },
                    { id: 'spelling', text: '拼写和语法', submenu: [
                        { id: 'show-spelling', text: '显示拼写和语法', action: showSpelling },
                        { id: 'check-document', text: '检查文稿现在', action: checkDocument },
                        { id: 'check-spelling-while-typing', text: '键入时检查拼写', action: checkSpellingWhileTyping }
                    ]},
                    { type: 'separator' },
                    { id: 'start-dictation', text: '开始听写...', action: startDictation },
                    { id: 'emoji', text: '表情与符号', action: showEmoji }
                ]
            },
            {
                id: 'view-menu',
                text: '显示',
                submenu: [
                    { id: 'always-show-toolbar', text: '总是显示工具栏', action: toggleAlwaysShowToolbar },
                    { id: 'customize-toolbar', text: '自定工具栏...', action: customizeToolbar },
                    { type: 'separator' },
                    { id: 'show-favorites-bar', text: '显示个人收藏栏', action: toggleFavoritesBar },
                    { id: 'show-tab-bar', text: '显示标签页栏', action: toggleTabBar },
                    { id: 'show-status-bar', text: '显示状态栏', action: toggleStatusBar },
                    { type: 'separator' },
                    { id: 'stop', text: '停止', action: stopLoading },
                    { id: 'reload-page', text: '重新载入页面', action: reloadPage },
                    { type: 'separator' },
                    { id: 'text-size', text: '文本大小', submenu: [
                        { id: 'make-text-bigger', text: '放大文本', action: makeTextBigger },
                        { id: 'make-text-smaller', text: '缩小文本', action: makeTextSmaller },
                        { id: 'actual-size', text: '实际大小', action: actualSize }
                    ]},
                    { type: 'separator' },
                    { id: 'enter-full-screen', text: '进入全屏幕', action: enterFullScreen }
                ]
            },
            {
                id: 'history-menu',
                text: '历史',
                submenu: [
                    { id: 'back', text: '后退', action: goBack },
                    { id: 'forward', text: '前进', action: goForward },
                    { type: 'separator' },
                    { id: 'home-page', text: '主页', action: goHomePage },
                    { type: 'separator' },
                    { id: 'show-history', text: '显示所有历史记录', action: showHistory },
                    { type: 'separator' },
                    { id: 'clear-history', text: '清除历史记录...', action: clearHistory }
                ]
            },
            {
                id: 'bookmarks-menu',
                text: '书签',
                submenu: [
                    { id: 'add-bookmark', text: '添加书签...', action: addBookmark },
                    { id: 'add-bookmarks-for-tabs', text: '为所有标签页添加书签...', action: addBookmarksForTabs },
                    { type: 'separator' },
                    { id: 'show-bookmarks', text: '显示书签', action: showBookmarks },
                    { id: 'show-bookmarks-sidebar', text: '显示书签边栏', action: showBookmarksSidebar },
                    { type: 'separator' },
                    { id: 'bookmarks-menu', text: '书签菜单', submenu: [
                        { id: 'apple', text: 'Apple', action: () => openSafariWithUrl('https://www.apple.com/') },
                        { id: 'github', text: 'GitHub', action: () => openSafariWithUrl('https://github.com/') }
                    ]}
                ]
            },
            {
                id: 'window-menu',
                text: '窗口',
                submenu: [
                    { id: 'minimize', text: '最小化', action: minimizeWindow },
                    { id: 'zoom', text: '缩放', action: zoomWindow },
                    { type: 'separator' },
                    { id: 'show-downloads', text: '下载', action: showDownloads },
                    { type: 'separator' },
                    { id: 'bring-all-to-front', text: '前置全部窗口', action: bringAllToFront }
                ]
            },
            {
                id: 'help-menu',
                text: '帮助',
                submenu: [
                    { id: 'safari-help', text: 'Safari帮助', action: safariHelp },
                    { type: 'separator' },
                    { id: 'github-homepage', text: '访问GitHub主页', action: visitGitHubHomepage }
                ]
            }
        ]
    };
    
    // 默认显示访达菜单
    const activeApp = 'finder';
    
    // 添加应用菜单
    if (appMenus[activeApp]) {
        appMenus[activeApp].forEach(menu => {
            const menuItem = createMenuItem(menu);
            leftMenu.appendChild(menuItem);
        });
    }
    
    // 存储应用菜单配置
    window.appMenus = appMenus;
}

/**
 * 添加右侧菜单项
 */
function addRightMenuItems() {
    const rightMenu = document.getElementById('menu-right');
    
    if (!rightMenu) {
        return;
    }
    
    // 添加系统图标
    const systemIcons = [
        { id: 'battery', icon: 'icons/system/battery.svg', text: '100%', action: showBatteryStatus },
        { id: 'wifi', icon: 'icons/system/wifi.svg', text: '', action: showWifiStatus },
        { id: 'bluetooth', icon: 'icons/system/bluetooth.svg', text: '', action: showBluetoothStatus },
        { id: 'volume', icon: 'icons/system/volume.svg', text: '', action: showVolumeControl },
        { id: 'control-center', icon: 'icons/system/control-center.svg', text: '', action: toggleControlCenter }
    ];
    
    systemIcons.forEach(icon => {
        const iconItem = createSystemIcon(icon);
        rightMenu.appendChild(iconItem);
    });
    
    // 添加时钟
    const clockItem = document.createElement('div');
    clockItem.id = 'menu-clock';
    clockItem.className = 'menu-item menu-clock';
    clockItem.addEventListener('click', showCalendar);
    
    rightMenu.appendChild(clockItem);
}

/**
 * 创建菜单项
 * @param {Object} options - 菜单项选项
 * @returns {HTMLElement} 菜单项元素
 */
function createMenuItem(options) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    
    if (options.id) {
        menuItem.id = options.id;
    }
    
    if (options.disabled) {
        menuItem.classList.add('disabled');
    }
    
    // 创建菜单项内容
    if (options.icon) {
        const iconImg = document.createElement('img');
        iconImg.src = options.icon;
        iconImg.alt = options.text || '';
        iconImg.className = 'menu-icon';
        menuItem.appendChild(iconImg);
    } else {
        const menuText = document.createElement('span');
        menuText.className = 'menu-text';
        menuText.textContent = options.text || '';
        menuItem.appendChild(menuText);
    }
    
    // 创建子菜单
    if (options.submenu && options.submenu.length > 0) {
        const submenu = document.createElement('div');
        submenu.className = 'submenu';
        
        options.submenu.forEach(submenuItem => {
            if (submenuItem.type === 'separator') {
                // 添加分隔线
                const separator = document.createElement('div');
                separator.className = 'menu-separator';
                submenu.appendChild(separator);
            } else {
                // 添加子菜单项
                const subItem = document.createElement('div');
                subItem.className = 'submenu-item';
                
                if (submenuItem.id) {
                    subItem.id = submenuItem.id;
                }
                
                if (submenuItem.disabled) {
                    subItem.classList.add('disabled');
                }
                
                // 创建子菜单项内容
                const subItemText = document.createElement('span');
                subItemText.className = 'submenu-text';
                subItemText.textContent = submenuItem.text || '';
                subItem.appendChild(subItemText);
                
                // 添加子菜单项点击事件
                if (submenuItem.action && !submenuItem.disabled) {
                    subItem.addEventListener('click', function(e) {
                        e.stopPropagation();
                        closeAllMenus();
                        
                        if (typeof submenuItem.action === 'function') {
                            submenuItem.action();
                        }
                    });
                }
                
                // 添加子子菜单
                if (submenuItem.submenu && submenuItem.submenu.length > 0) {
                    const subSubmenu = document.createElement('div');
                    subSubmenu.className = 'subsubmenu';
                    
                    // 添加子子菜单项
                    submenuItem.submenu.forEach(subSubmenuItem => {
                        if (subSubmenuItem.type === 'separator') {
                            // 添加分隔线
                            const separator = document.createElement('div');
                            separator.className = 'menu-separator';
                            subSubmenu.appendChild(separator);
                        } else {
                            // 添加子子菜单项
                            const subSubItem = document.createElement('div');
                            subSubItem.className = 'submenu-item';
                            
                            if (subSubmenuItem.id) {
                                subSubItem.id = subSubmenuItem.id;
                            }
                            
                            if (subSubmenuItem.disabled) {
                                subSubItem.classList.add('disabled');
                            }
                            
                            // 创建子子菜单项内容
                            const subSubItemText = document.createElement('span');
                            subSubItemText.className = 'submenu-text';
                            subSubItemText.textContent = subSubmenuItem.text || '';
                            subSubItem.appendChild(subSubItemText);
                            
                            // 添加子子菜单项点击事件
                            if (subSubmenuItem.action && !subSubmenuItem.disabled) {
                                subSubItem.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    closeAllMenus();
                                    
                                    if (typeof subSubmenuItem.action === 'function') {
                                        subSubmenuItem.action();
                                    }
                                });
                            }
                            
                            subSubmenu.appendChild(subSubItem);
                        }
                    });
                    
                    // 添加子子菜单箭头
                    const subArrow = document.createElement('span');
                    subArrow.className = 'submenu-arrow';
                    subArrow.textContent = '›';
                    subItem.appendChild(subArrow);
                    
                    // 添加子子菜单
                    subItem.appendChild(subSubmenu);
                    
                    // 添加子菜单项悬停事件
                    subItem.addEventListener('mouseenter', function() {
                        // 关闭其他子子菜单
                        const otherSubSubmenus = document.querySelectorAll('.subsubmenu.show');
                        otherSubSubmenus.forEach(menu => {
                            if (menu !== subSubmenu) {
                                menu.classList.remove('show');
                            }
                        });
                        
                        // 显示当前子子菜单
                        subSubmenu.classList.add('show');
                    });
                    
                    subItem.addEventListener('mouseleave', function() {
                        // 延迟关闭子子菜单
                        setTimeout(() => {
                            if (!subSubmenu.matches(':hover')) {
                                subSubmenu.classList.remove('show');
                            }
                        }, 100);
                    });
                }
                
                submenu.appendChild(subItem);
            }
        });
        
        // 添加子菜单
        menuItem.appendChild(submenu);
        
        // 添加菜单项点击事件
        menuItem.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 关闭其他菜单
            const otherMenus = document.querySelectorAll('.submenu.show');
            otherMenus.forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('show');
                }
            });
            
            // 切换当前菜单
            submenu.classList.toggle('show');
            
            // 更新活动菜单项
            const activeItems = document.querySelectorAll('.menu-item.active');
            activeItems.forEach(item => {
                if (item !== menuItem) {
                    item.classList.remove('active');
                }
            });
            
            menuItem.classList.toggle('active');
        });
    } else if (options.action) {
        // 添加菜单项点击事件
        menuItem.addEventListener('click', function() {
            closeAllMenus();
            
            if (typeof options.action === 'function') {
                options.action();
            }
        });
    }
    
    return menuItem;
}

/**
 * 创建系统图标
 * @param {Object} options - 图标选项
 * @returns {HTMLElement} 图标元素
 */
function createSystemIcon(options) {
    const iconItem = document.createElement('div');
    iconItem.className = 'menu-item system-icon';
    
    if (options.id) {
        iconItem.id = `menu-${options.id}`;
    }
    
    // 创建图标
    if (options.icon) {
        const iconImg = document.createElement('img');
        iconImg.src = options.icon;
        iconImg.alt = options.text || '';
        iconImg.className = 'icon-image';
        iconItem.appendChild(iconImg);
    }
    
    // 创建文本
    if (options.text) {
        const iconText = document.createElement('span');
        iconText.className = 'icon-text';
        iconText.textContent = options.text;
        iconItem.appendChild(iconText);
    }
    
    // 添加点击事件
    if (options.action) {
        iconItem.addEventListener('click', function() {
            if (typeof options.action === 'function') {
                options.action();
            }
        });
    }
    
    return iconItem;
}

/**
 * 初始化菜单交互
 */
function initMenuInteractions() {
    // 点击文档关闭所有菜单
    document.addEventListener('click', function(e) {
        // 检查点击是否在菜单外
        if (!e.target.closest('.menu-item') && !e.target.closest('.submenu') && !e.target.closest('.subsubmenu')) {
            closeAllMenus();
        }
    });
    
    // 菜单项悬停事件
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // 检查是否有活动菜单
            const activeItem = document.querySelector('.menu-item.active');
            
            if (activeItem && activeItem !== item) {
                // 关闭活动菜单
                const activeSubmenu = activeItem.querySelector('.submenu');
                
                if (activeSubmenu) {
                    activeSubmenu.classList.remove('show');
                }
                
                activeItem.classList.remove('active');
                
                // 打开当前菜单
                const submenu = item.querySelector('.submenu');
                
                if (submenu) {
                    submenu.classList.add('show');
                    item.classList.add('active');
                }
            }
        });
    });
}

/**
 * 关闭所有菜单
 */
function closeAllMenus() {
    // 关闭所有子菜单
    const submenus = document.querySelectorAll('.submenu.show');
    submenus.forEach(menu => {
        menu.classList.remove('show');
    });
    
    // 关闭所有子子菜单
    const subSubmenus = document.querySelectorAll('.subsubmenu.show');
    subSubmenus.forEach(menu => {
        menu.classList.remove('show');
    });
    
    // 移除活动菜单项
    const activeItems = document.querySelectorAll('.menu-item.active');
    activeItems.forEach(item => {
        item.classList.remove('active');
    });
}

/**
 * 初始化时钟
 */
function initClock() {
    // 更新时钟
    updateClock();
    
    // 每分钟更新一次
    setInterval(updateClock, 60000);
}

/**
 * 更新时钟
 */
function updateClock() {
    const clockElement = document.getElementById('menu-clock');
    
    if (clockElement) {
        const now = new Date();
        
        // 格式化时间
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? '下午' : '上午';
        const hours12 = hours % 12 || 12;
        
        // 更新时钟文本
        clockElement.textContent = `${ampm} ${hours12}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
}

/**
 * 初始化系统图标
 */
function initSystemIcons() {
    // 更新电池状态
    updateBatteryStatus();
    
    // 每分钟更新一次
    setInterval(updateBatteryStatus, 60000);
}

/**
 * 更新电池状态
 */
function updateBatteryStatus() {
    const batteryElement = document.getElementById('menu-battery');
    
    if (batteryElement) {
        const batteryText = batteryElement.querySelector('.icon-text');
        
        if (batteryText) {
            // 模拟电池电量
            const batteryLevel = Math.floor(Math.random() * 20) + 80;
            batteryText.textContent = `${batteryLevel}%`;
        }
    }
}

/**
 * 切换控制中心
 */
function toggleControlCenter() {
    // 检查控制中心是否已存在
    let controlCenter = document.getElementById('control-center');
    
    if (controlCenter) {
        // 关闭控制中心
        controlCenter.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            controlCenter.remove();
        }, 300);
    } else {
        // 创建控制中心
        controlCenter = document.createElement('div');
        controlCenter.id = 'control-center';
        controlCenter.className = 'control-center';
        
        // 创建控制中心内容
        const controlContent = document.createElement('div');
        controlContent.className = 'control-content';
        
        // 创建控制中心模块
        const modules = [
            {
                title: '显示器',
                icon: 'icons/system/display.svg',
                content: `
                    <div class="control-slider">
                        <div class="slider-icon">
                            <img src="icons/system/brightness.svg" alt="亮度">
                        </div>
                        <input type="range" min="0" max="100" value="80" class="brightness-slider">
                    </div>
                `
            },
            {
                title: '声音',
                icon: 'icons/system/volume.svg',
                content: `
                    <div class="control-slider">
                        <div class="slider-icon">
                            <img src="icons/system/volume.svg" alt="音量">
                        </div>
                        <input type="range" min="0" max="100" value="50" class="volume-slider">
                    </div>
                `
            },
            {
                title: '无线',
                icon: 'icons/system/wifi.svg',
                content: `
                    <div class="control-toggles">
                        <div class="control-toggle">
                            <div class="toggle-label">Wi-Fi</div>
                            <div class="toggle-switch active" data-feature="wifi"></div>
                        </div>
                        <div class="control-toggle">
                            <div class="toggle-label">蓝牙</div>
                            <div class="toggle-switch active" data-feature="bluetooth"></div>
                        </div>
                        <div class="control-toggle">
                            <div class="toggle-label">AirDrop</div>
                            <div class="toggle-switch" data-feature="airdrop"></div>
                        </div>
                    </div>
                `
            },
            {
                title: '勿扰模式',
                icon: 'icons/system/do-not-disturb.svg',
                content: `
                    <div class="control-toggle single-toggle">
                        <div class="toggle-label">勿扰模式</div>
                        <div class="toggle-switch" data-feature="do-not-disturb"></div>
                    </div>
                `
            },
            {
                title: '键盘亮度',
                icon: 'icons/system/keyboard.svg',
                content: `
                    <div class="control-slider">
                        <div class="slider-icon">
                            <img src="icons/system/keyboard-brightness.svg" alt="键盘亮度">
                        </div>
                        <input type="range" min="0" max="100" value="60" class="keyboard-brightness-slider">
                    </div>
                `
            },
            {
                title: '播放控制',
                icon: 'icons/system/music.svg',
                content: `
                    <div class="media-controls">
                        <div class="media-info">
                            <div class="media-title">未播放</div>
                            <div class="media-artist">无音乐</div>
                        </div>
                        <div class="media-buttons">
                            <button class="media-button previous">
                                <span class="icon">⏮</span>
                            </button>
                            <button class="media-button play">
                                <span class="icon">▶</span>
                            </button>
                            <button class="media-button next">
                                <span class="icon">⏭</span>
                            </button>
                        </div>
                    </div>
                `
            }
        ];
        
        // 添加模块
        modules.forEach(module => {
            const moduleElement = document.createElement('div');
            moduleElement.className = 'control-module';
            
            // 创建模块标题
            const moduleHeader = document.createElement('div');
            moduleHeader.className = 'module-header';
            
            const moduleIcon = document.createElement('img');
            moduleIcon.src = module.icon;
            moduleIcon.alt = module.title;
            moduleIcon.className = 'module-icon';
            
            const moduleTitle = document.createElement('div');
            moduleTitle.className = 'module-title';
            moduleTitle.textContent = module.title;
            
            moduleHeader.appendChild(moduleIcon);
            moduleHeader.appendChild(moduleTitle);
            
            // 创建模块内容
            const moduleContent = document.createElement('div');
            moduleContent.className = 'module-content';
            moduleContent.innerHTML = module.content;
            
            // 组装模块
            moduleElement.appendChild(moduleHeader);
            moduleElement.appendChild(moduleContent);
            
            // 添加到控制中心
            controlContent.appendChild(moduleElement);
        });
        
        // 组装控制中心
        controlCenter.appendChild(controlContent);
        
        // 添加到文档
        document.body.appendChild(controlCenter);
        
        // 显示控制中心
        setTimeout(() => {
            controlCenter.classList.add('show');
        }, 10);
        
        // 初始化控制中心功能
        initControlCenterFunctionality();
        
        // 添加点击外部关闭事件
        controlCenter.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleControlCenter();
            }
        });
    }
}

/**
 * 初始化控制中心功能
 */
function initControlCenterFunctionality() {
    // 亮度滑块
    const brightnessSlider = document.querySelector('.brightness-slider');
    
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', function() {
            // 模拟亮度调整
            const brightness = this.value;
            document.documentElement.style.setProperty('--screen-brightness', `${brightness}%`);
        });
    }
    
    // 音量滑块
    const volumeSlider = document.querySelector('.volume-slider');
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            // 模拟音量调整
            const volume = this.value;
            console.log(`音量设置为: ${volume}%`);
        });
    }
    
    // 键盘亮度滑块
    const keyboardBrightnessSlider = document.querySelector('.keyboard-brightness-slider');
    
    if (keyboardBrightnessSlider) {
        keyboardBrightnessSlider.addEventListener('input', function() {
            // 模拟键盘亮度调整
            const brightness = this.value;
            console.log(`键盘亮度设置为: ${brightness}%`);
        });
    }
    
    // 开关按钮
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // 切换开关状态
            this.classList.toggle('active');
            
            // 获取功能
            const feature = this.getAttribute('data-feature');
            
            // 模拟功能切换
            console.log(`${feature} 已${this.classList.contains('active') ? '开启' : '关闭'}`);
        });
    });
    
    // 媒体控制按钮
    const playButton = document.querySelector('.media-button.play');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // 切换播放状态
            const icon = this.querySelector('.icon');
            
            if (icon.textContent === '▶') {
                icon.textContent = '⏸';
                
                // 更新媒体信息
                const mediaTitle = document.querySelector('.media-title');
                const mediaArtist = document.querySelector('.media-artist');
                
                if (mediaTitle) {
                    mediaTitle.textContent = '示例音乐';
                }
                
                if (mediaArtist) {
                    mediaArtist.textContent = '示例艺术家';
                }
            } else {
                icon.textContent = '▶';
            }
        });
    }
}

/**
 * 显示日历
 */
function showCalendar() {
    // 检查日历是否已存在
    let calendar = document.getElementById('calendar-widget');
    
    if (calendar) {
        // 关闭日历
        calendar.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            calendar.remove();
        }, 300);
    } else {
        // 创建日历
        calendar = document.createElement('div');
        calendar.id = 'calendar-widget';
        calendar.className = 'calendar-widget';
        
        // 获取当前日期
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const currentDate = now.getDate();
        const currentDay = now.getDay();
        
        // 获取月份名称
        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        
        // 创建日历标题
        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        
        const dateInfo = document.createElement('div');
        dateInfo.className = 'date-info';
        
        const dayName = document.createElement('div');
        dayName.className = 'day-name';
        dayName.textContent = dayNames[currentDay];
        
        const dateNumber = document.createElement('div');
        dateNumber.className = 'date-number';
        dateNumber.textContent = currentDate;
        
        dateInfo.appendChild(dayName);
        dateInfo.appendChild(dateNumber);
        
        const monthYear = document.createElement('div');
        monthYear.className = 'month-year';
        monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        calendarHeader.appendChild(dateInfo);
        calendarHeader.appendChild(monthYear);
        
        // 创建日历内容
        const calendarContent = document.createElement('div');
        calendarContent.className = 'calendar-content';
        
        // 创建星期标题
        const weekHeader = document.createElement('div');
        weekHeader.className = 'week-header';
        
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        
        weekDays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'week-day';
            dayElement.textContent = day;
            weekHeader.appendChild(dayElement);
        });
        
        calendarContent.appendChild(weekHeader);
        
        // 创建日期网格
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        // 获取月份第一天是星期几
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
        // 获取月份天数
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // 获取上个月天数
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        
        // 添加上个月的日期
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day prev-month';
            dayElement.textContent = daysInPrevMonth - i;
            daysGrid.appendChild(dayElement);
        }
        
        // 添加当前月的日期
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            if (i === currentDate) {
                dayElement.classList.add('current');
            }
            
            dayElement.textContent = i;
            daysGrid.appendChild(dayElement);
        }
        
        // 添加下个月的日期
        const totalCells = 42; // 6行7列
        const remainingCells = totalCells - (firstDay + daysInMonth);
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day next-month';
            dayElement.textContent = i;
            daysGrid.appendChild(dayElement);
        }
        
        calendarContent.appendChild(daysGrid);
        
        // 组装日历
        calendar.appendChild(calendarHeader);
        calendar.appendChild(calendarContent);
        
        // 添加到文档
        document.body.appendChild(calendar);
        
        // 显示日历
        setTimeout(() => {
            calendar.classList.add('show');
        }, 10);
        
        // 添加点击外部关闭事件
        calendar.addEventListener('click', function(e) {
            if (e.target === this) {
                showCalendar();
            }
        });
    }
}

/**
 * 显示电池状态
 */
function showBatteryStatus() {
    alert('电池状态: 已连接电源，电池电量 100%');
}

/**
 * 显示Wi-Fi状态
 */
function showWifiStatus() {
    alert('Wi-Fi: 已连接到 "macOS-Web"');
}

/**
 * 显示蓝牙状态
 */
function showBluetoothStatus() {
    alert('蓝牙: 已开启');
}

/**
 * 显示音量控制
 */
function showVolumeControl() {
    // 创建音量控制滑块
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '100';
    volumeSlider.value = '50';
    volumeSlider.className = 'volume-slider';
    
    volumeControl.appendChild(volumeSlider);
    
    // 添加到文档
    document.body.appendChild(volumeControl);
    
    // 显示音量控制
    setTimeout(() => {
        volumeControl.classList.add('show');
    }, 10);
    
    // 添加点击外部关闭事件
    document.addEventListener('click', function closeVolumeControl(e) {
        if (!volumeControl.contains(e.target) && e.target !== document.getElementById('menu-volume')) {
            volumeControl.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                volumeControl.remove();
                document.removeEventListener('click', closeVolumeControl);
            }, 300);
        }
    });
}

/**
 * 显示"关于本机"对话框
 */
function showAboutThisMac() {
    // 创建对话框
    const dialog = document.createElement('div');
    dialog.className = 'dialog about-dialog';
    
    // 创建对话框内容
    dialog.innerHTML = `
        <div class="dialog-content">
            <div class="about-header">
                <img src="icons/system/apple-logo.svg" alt="Apple" class="about-logo">
                <h2>macOS</h2>
                <p>版本 12.0 (Monterey)</p>
            </div>
            <div class="about-info">
                <p><strong>MacBook Pro</strong></p>
                <p>处理器: Apple M1</p>
                <p>内存: 16 GB</p>
                <p>启动磁盘: Macintosh HD</p>
                <p>序列号: FVFGC123456789</p>
            </div>
            <div class="about-footer">
                <p>© 2023 Apple Inc. 保留所有权利。</p>
                <button class="dialog-button">关闭</button>
            </div>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(dialog);
    
    // 显示对话框
    setTimeout(() => {
        dialog.classList.add('show');
    }, 10);
    
    // 添加关闭按钮事件
    const closeButton = dialog.querySelector('.dialog-button');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            dialog.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                dialog.remove();
            }, 300);
        });
    }
    
    // 添加点击外部关闭事件
    dialog.addEventListener('click', function(e) {
        if (e.target === this) {
            dialog.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                dialog.remove();
            }, 300);
        }
    });
}

/**
 * 打开系统偏好设置
 */
function openSystemPreferences() {
    // 创建系统偏好设置窗口
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
                <div class="preferences-search">
                    <input type="text" placeholder="搜索" class="preferences-search-input">
                </div>
                <div class="preferences-grid">
                    <div class="preferences-section">
                        <h3>外观</h3>
                        <div class="preferences-items">
                            <div class="preference-item" data-pref="general">
                                <img src="icons/preferences/general.svg" alt="通用">
                                <span>通用</span>
                            </div>
                            <div class="preference-item" data-pref="appearance">
                                <img src="icons/preferences/appearance.svg" alt="外观">
                                <span>外观</span>
                            </div>
                            <div class="preference-item" data-pref="dock">
                                <img src="icons/preferences/dock.svg" alt="程序坞">
                                <span>程序坞与菜单栏</span>
                            </div>
                            <div class="preference-item" data-pref="wallpaper">
                                <img src="icons/preferences/wallpaper.svg" alt="壁纸">
                                <span>桌面与屏幕保护程序</span>
                            </div>
                        </div>
                    </div>
                    <div class="preferences-section">
                        <h3>个人</h3>
                        <div class="preferences-items">
                            <div class="preference-item" data-pref="users">
                                <img src="icons/preferences/users.svg" alt="用户">
                                <span>用户与群组</span>
                            </div>
                            <div class="preference-item" data-pref="language">
                                <img src="icons/preferences/language.svg" alt="语言">
                                <span>语言与地区</span>
                            </div>
                            <div class="preference-item" data-pref="security">
                                <img src="icons/preferences/security.svg" alt="安全">
                                <span>安全性与隐私</span>
                            </div>
                        </div>
                    </div>
                    <div class="preferences-section">
                        <h3>硬件</h3>
                        <div class="preferences-items">
                            <div class="preference-item" data-pref="displays">
                                <img src="icons/preferences/displays.svg" alt="显示器">
                                <span>显示器</span>
                            </div>
                            <div class="preference-item" data-pref="energy">
                                <img src="icons/preferences/energy.svg" alt="节能">
                                <span>节能</span>
                            </div>
                            <div class="preference-item" data-pref="keyboard">
                                <img src="icons/preferences/keyboard.svg" alt="键盘">
                                <span>键盘</span>
                            </div>
                            <div class="preference-item" data-pref="mouse">
                                <img src="icons/preferences/mouse.svg" alt="鼠标">
                                <span>鼠标</span>
                            </div>
                            <div class="preference-item" data-pref="sound">
                                <img src="icons/preferences/sound.svg" alt="声音">
                                <span>声音</span>
                            </div>
                        </div>
                    </div>
                    <div class="preferences-section">
                        <h3>网络</h3>
                        <div class="preferences-items">
                            <div class="preference-item" data-pref="network">
                                <img src="icons/preferences/network.svg" alt="网络">
                                <span>网络</span>
                            </div>
                            <div class="preference-item" data-pref="bluetooth">
                                <img src="icons/preferences/bluetooth.svg" alt="蓝牙">
                                <span>蓝牙</span>
                            </div>
                            <div class="preference-item" data-pref="sharing">
                                <img src="icons/preferences/sharing.svg" alt="共享">
                                <span>共享</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="preferences-content">
                    <div class="preference-panel" id="panel-general">
                        <h2>通用</h2>
                        <div class="preference-option">
                            <label>外观:</label>
                            <select class="appearance-select">
                                <option value="light">浅色</option>
                                <option value="dark">深色</option>
                                <option value="auto">自动</option>
                            </select>
                        </div>
                        <div class="preference-option">
                            <label>强调色:</label>
                            <div class="accent-colors">
                                <div class="accent-color" style="background-color: #0070c9;" data-color="blue"></div>
                                <div class="accent-color" style="background-color: #ff5e3a;" data-color="red"></div>
                                <div class="accent-color" style="background-color: #ff9500;" data-color="orange"></div>
                                <div class="accent-color" style="background-color: #ffcc00;" data-color="yellow"></div>
                                <div class="accent-color" style="background-color: #4cd964;" data-color="green"></div>
                                <div class="accent-color" style="background-color: #5856d6;" data-color="purple"></div>
                                <div class="accent-color" style="background-color: #ff2d55;" data-color="pink"></div>
                            </div>
                        </div>
                        <div class="preference-option">
                            <label>侧边栏图标大小:</label>
                            <select class="sidebar-size-select">
                                <option value="small">小</option>
                                <option value="medium" selected>中</option>
                                <option value="large">大</option>
                            </select>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-appearance" style="display: none;">
                        <h2>外观</h2>
                        <div class="preference-option">
                            <label>主题:</label>
                            <div class="theme-options">
                                <div class="theme-option active" data-theme="light">
                                    <div class="theme-preview light-theme"></div>
                                    <span>浅色</span>
                                </div>
                                <div class="theme-option" data-theme="dark">
                                    <div class="theme-preview dark-theme"></div>
                                    <span>深色</span>
                                </div>
                                <div class="theme-option" data-theme="auto">
                                    <div class="theme-preview auto-theme"></div>
                                    <span>自动</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-dock" style="display: none;">
                        <h2>程序坞与菜单栏</h2>
                        <div class="preference-option">
                            <label>大小:</label>
                            <input type="range" min="0" max="100" value="50" class="dock-size-slider">
                            <div class="slider-labels">
                                <span>小</span>
                                <span>大</span>
                            </div>
                        </div>
                        <div class="preference-option">
                            <label>放大:</label>
                            <input type="range" min="0" max="100" value="0" class="dock-magnification-slider">
                            <div class="slider-labels">
                                <span>关</span>
                                <span>最大</span>
                            </div>
                        </div>
                        <div class="preference-option">
                            <label>位置:</label>
                            <div class="dock-position-options">
                                <div class="position-option active" data-position="bottom">
                                    <span>底部</span>
                                </div>
                                <div class="position-option" data-position="left">
                                    <span>左侧</span>
                                </div>
                                <div class="position-option" data-position="right">
                                    <span>右侧</span>
                                </div>
                            </div>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="dock-autohide">
                            <label for="dock-autohide">自动隐藏和显示程序坞</label>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-wallpaper" style="display: none;">
                        <h2>桌面与屏幕保护程序</h2>
                        <div class="wallpaper-options">
                            <h3>桌面图片</h3>
                            <div class="wallpaper-grid">
                                <div class="wallpaper-item active" data-wallpaper="wallpaper1.jpg">
                                    <img src="img/wallpapers/thumb-1.jpg" alt="壁纸1">
                                </div>
                                <div class="wallpaper-item" data-wallpaper="wallpaper2.jpg">
                                    <img src="img/wallpapers/thumb-2.jpg" alt="壁纸2">
                                </div>
                                <div class="wallpaper-item" data-wallpaper="wallpaper3.jpg">
                                    <img src="img/wallpapers/thumb-3.jpg" alt="壁纸3">
                                </div>
                                <div class="wallpaper-item" data-wallpaper="wallpaper4.jpg">
                                    <img src="img/wallpapers/thumb-4.jpg" alt="壁纸4">
                                </div>
                                <div class="wallpaper-item" data-wallpaper="wallpaper5.jpg">
                                    <img src="img/wallpapers/thumb-5.jpg" alt="壁纸5">
                                </div>
                                <div class="wallpaper-item" data-wallpaper="wallpaper6.jpg">
                                    <img src="img/wallpapers/thumb-6.jpg" alt="壁纸6">
                                </div>
                            </div>
                            <div class="wallpaper-actions">
                                <button class="wallpaper-button">选择文件夹...</button>
                                <button class="wallpaper-button">添加图片...</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    
    // 初始化系统偏好设置功能
    setTimeout(() => {
        initSystemPreferencesFunctionality();
    }, 100);
    
    // 设置应用正在运行
    if (typeof setAppRunning === 'function') {
        setAppRunning('system-preferences', true);
    }
}

/**
 * 初始化系统偏好设置功能
 */
function initSystemPreferencesFunctionality() {
    // 偏好设置项点击事件
    const preferenceItems = document.querySelectorAll('.preference-item');
    
    preferenceItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取偏好设置ID
            const prefId = this.getAttribute('data-pref');
            
            // 隐藏所有面板
            const panels = document.querySelectorAll('.preference-panel');
            panels.forEach(panel => {
                panel.style.display = 'none';
            });
            
            // 显示选中面板
            const selectedPanel = document.getElementById(`panel-${prefId}`);
            
            if (selectedPanel) {
                selectedPanel.style.display = 'block';
            }
            
            // 更新活动项
            preferenceItems.forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
    
    // 外观选择
    const appearanceSelect = document.querySelector('.appearance-select');
    
    if (appearanceSelect) {
        appearanceSelect.addEventListener('change', function() {
            const theme = this.value;
            
            // 更新主题
            if (theme === 'dark') {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else if (theme === 'light') {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                // 自动模式
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (prefersDark) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
                
                localStorage.setItem('theme', 'auto');
            }
        });
    }
    
    // 强调色选择
    const accentColors = document.querySelectorAll('.accent-color');
    
    accentColors.forEach(color => {
        color.addEventListener('click', function() {
            // 移除其他活动状态
            accentColors.forEach(c => {
                c.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取颜色
            const accentColor = this.getAttribute('data-color');
            
            // 更新强调色
            document.documentElement.setAttribute('data-accent-color', accentColor);
            localStorage.setItem('accentColor', accentColor);
        });
    });
    
    // 主题选择
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他活动状态
            themeOptions.forEach(o => {
                o.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取主题
            const theme = this.getAttribute('data-theme');
            
            // 更新主题
            if (theme === 'dark') {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else if (theme === 'light') {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                // 自动模式
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (prefersDark) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
                
                localStorage.setItem('theme', 'auto');
            }
            
            // 更新外观选择
            if (appearanceSelect) {
                appearanceSelect.value = theme;
            }
        });
    });
    
    // Dock大小滑块
    const dockSizeSlider = document.querySelector('.dock-size-slider');
    
    if (dockSizeSlider) {
        // 设置初始值
        const savedDockSize = localStorage.getItem('dockSize') || '50';
        dockSizeSlider.value = savedDockSize;
        
        dockSizeSlider.addEventListener('input', function() {
            const size = this.value;
            
            // 更新Dock大小
            if (typeof setDockSize === 'function') {
                setDockSize(size);
            }
            
            // 保存设置
            localStorage.setItem('dockSize', size);
        });
    }
    
    // Dock放大滑块
    const dockMagnificationSlider = document.querySelector('.dock-magnification-slider');
    
    if (dockMagnificationSlider) {
        // 设置初始值
        const magnificationEnabled = localStorage.getItem('dockMagnification') !== 'false';
        dockMagnificationSlider.value = magnificationEnabled ? '50' : '0';
        
        dockMagnificationSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const enabled = value > 0;
            
            // 更新Dock放大
            localStorage.setItem('dockMagnification', enabled.toString());
        });
    }
    
    // Dock位置选项
    const positionOptions = document.querySelectorAll('.position-option');
    
    positionOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他活动状态
            positionOptions.forEach(o => {
                o.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取位置
            const position = this.getAttribute('data-position');
            
            // 更新Dock位置
            if (typeof setDockPosition === 'function') {
                setDockPosition(position);
            }
            
            // 保存设置
            localStorage.setItem('dockPosition', position);
        });
    });
    
    // Dock自动隐藏选项
    const dockAutohideCheckbox = document.getElementById('dock-autohide');
    
    if (dockAutohideCheckbox) {
        // 设置初始值
        const autohide = localStorage.getItem('dockAutoHide') === 'true';
        dockAutohideCheckbox.checked = autohide;
        
        dockAutohideCheckbox.addEventListener('change', function() {
            const autohide = this.checked;
            
            // 更新Dock自动隐藏
            if (typeof setDockAutoHide === 'function') {
                setDockAutoHide(autohide);
            }
            
            // 保存设置
            localStorage.setItem('dockAutoHide', autohide.toString());
        });
    }
    
    // 壁纸选择
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    
    wallpaperItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他活动状态
            wallpaperItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取壁纸
            const wallpaper = this.getAttribute('data-wallpaper');
            
            // 更新壁纸
            if (typeof setWallpaper === 'function') {
                setWallpaper(wallpaper);
            }
            
            // 保存设置
            localStorage.setItem('wallpaper', wallpaper);
        });
    });
    
    // 壁纸添加按钮
    const addWallpaperButton = document.querySelector('.wallpaper-button:nth-child(2)');
    
    if (addWallpaperButton) {
        addWallpaperButton.addEventListener('click', function() {
            // 创建文件输入
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            // 添加文件选择事件
            fileInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 设置自定义壁纸
                        if (typeof setCustomWallpaper === 'function') {
                            setCustomWallpaper(e.target.result);
                        }
                        
                        // 保存设置
                        localStorage.setItem('customWallpaper', e.target.result);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // 触发文件选择
            fileInput.click();
        });
    }
}

/**
 * 打开App Store
 */
function openAppStore() {
    // 创建App Store窗口
    createWindow({
        title: 'App Store',
        width: 900,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/app-store.svg',
        content: `
            <div class="app-store-container">
                <div class="app-store-sidebar">
                    <div class="sidebar-item active">
                        <span class="icon">🏠</span>
                        <span>发现</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="icon">🎮</span>
                        <span>游戏</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="icon">📱</span>
                        <span>应用程序</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="icon">🔄</span>
                        <span>更新</span>
                    </div>
                </div>
                <div class="app-store-content">
                    <div class="app-store-header">
                        <div class="header-banner">
                            <h2>探索 App Store</h2>
                            <p>发现适用于 macOS 的最佳应用程序</p>
                        </div>
                    </div>
                    <div class="app-store-featured">
                        <h3>精选应用</h3>
                        <div class="featured-apps">
                            <div class="featured-app">
                                <div class="app-icon">
                                    <img src="icons/apps/safari.svg" alt="Safari">
                                </div>
                                <div class="app-info">
                                    <div class="app-name">Safari</div>
                                    <div class="app-category">网页浏览器</div>
                                    <button class="app-download-button">获取</button>
                                </div>
                            </div>
                            <div class="featured-app">
                                <div class="app-icon">
                                    <img src="icons/apps/mail.svg" alt="Mail">
                                </div>
                                <div class="app-info">
                                    <div class="app-name">邮件</div>
                                    <div class="app-category">电子邮件</div>
                                    <button class="app-download-button">获取</button>
                                </div>
                            </div>
                            <div class="featured-app">
                                <div class="app-icon">
                                    <img src="icons/apps/photos.svg" alt="Photos">
                                </div>
                                <div class="app-info">
                                    <div class="app-name">照片</div>
                                    <div class="app-category">照片与视频</div>
                                    <button class="app-download-button">获取</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="app-store-categories">
                        <h3>应用分类</h3>
                        <div class="category-grid">
                            <div class="category-item">
                                <span class="icon">🎮</span>
                                <span>游戏</span>
                            </div>
                            <div class="category-item">
                                <span class="icon">🎨</span>
                                <span>创意</span>
                            </div>
                            <div class="category-item">
                                <span class="icon">💼</span>
                                <span>工作</span>
                            </div>
                            <div class="category-item">
                                <span class="icon">🎓</span>
                                <span>教育</span>
                            </div>
                            <div class="category-item">
                                <span class="icon">🎬</span>
                                <span>娱乐</span>
                            </div>
                            <div class="category-item">
                                <span class="icon">🛠️</span>
                                <span>工具</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    
    // 设置应用正在运行
    if (typeof setAppRunning === 'function') {
        setAppRunning('app-store', true);
    }
}

/**
 * 清除最近使用的项目
 */
function clearRecentItems() {
    alert('已清除最近使用的项目');
}

/**
 * 显示强制退出对话框
 */
function showForceQuit() {
    // 创建强制退出对话框
    const dialog = document.createElement('div');
    dialog.className = 'dialog force-quit-dialog';
    
    // 创建对话框内容
    dialog.innerHTML = `
        <div class="dialog-content">
            <h2>强制退出应用程序</h2>
            <div class="app-list">
                <div class="app-item">
                    <span>访达</span>
                    <button class="force-quit-button" data-app="finder">强制退出</button>
                </div>
                <div class="app-item">
                    <span>Safari</span>
                    <button class="force-quit-button" data-app="safari">强制退出</button>
                </div>
                <div class="app-item">
                    <span>系统偏好设置</span>
                    <button class="force-quit-button" data-app="system-preferences">强制退出</button>
                </div>
            </div>
            <div class="dialog-buttons">
                <button class="dialog-button cancel-button">取消</button>
            </div>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(dialog);
    
    // 显示对话框
    setTimeout(() => {
        dialog.classList.add('show');
    }, 10);
    
    // 添加强制退出按钮事件
    const forceQuitButtons = dialog.querySelectorAll('.force-quit-button');
    
    forceQuitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            
            // 关闭应用
            if (app === 'finder') {
                if (typeof hideFinder === 'function') {
                    hideFinder();
                }
            } else if (app === 'safari') {
                if (typeof quitSafari === 'function') {
                    quitSafari();
                }
            } else if (app === 'system-preferences') {
                // 关闭系统偏好设置窗口
                const windows = document.querySelectorAll('.window');
                
                windows.forEach(window => {
                    if (window.querySelector('.window-title').textContent === '系统偏好设置') {
                        window.remove();
                    }
                });
            }
            
            // 更新应用状态
            if (typeof setAppRunning === 'function') {
                setAppRunning(app, false);
            }
            
            // 关闭对话框
            dialog.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                dialog.remove();
            }, 300);
        });
    });
    
    // 添加取消按钮事件
    const cancelButton = dialog.querySelector('.cancel-button');
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            dialog.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                dialog.remove();
            }, 300);
        });
    }
    
    // 添加点击外部关闭事件
    dialog.addEventListener('click', function(e) {
        if (e.target === this) {
            dialog.classList.remove('show');
            
            // 延迟移除元素
            setTimeout(() => {
                dialog.remove();
            }, 300);
        }
    });
}

/**
 * 睡眠系统
 */
function sleepSystem() {
    // 创建睡眠效果
    const sleepOverlay = document.createElement('div');
    sleepOverlay.className = 'sleep-overlay';
    
    // 添加到文档
    document.body.appendChild(sleepOverlay);
    
    // 显示睡眠效果
    setTimeout(() => {
        sleepOverlay.classList.add('show');
    }, 10);
    
    // 添加点击唤醒事件
    sleepOverlay.addEventListener('click', function() {
        this.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            this.remove();
        }, 300);
    });
}

/**
 * 重新启动系统
 */
function restartSystem() {
    if (confirm('确定要重新启动吗？')) {
        // 重新加载页面
        window.location.reload();
    }
}

/**
 * 关机系统
 */
function shutdownSystem() {
    if (confirm('确定要关机吗？')) {
        // 创建关机效果
        const shutdownOverlay = document.createElement('div');
        shutdownOverlay.className = 'shutdown-overlay';
        
        // 添加到文档
        document.body.appendChild(shutdownOverlay);
        
        // 显示关机效果
        setTimeout(() => {
            shutdownOverlay.classList.add('show');
            
            // 延迟重定向到登录页面
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 10);
    }
}

/**
 * 锁定屏幕
 */
function lockScreen() {
    // 创建锁屏效果
    const lockOverlay = document.createElement('div');
    lockOverlay.className = 'lock-overlay';
    
    // 创建锁屏内容
    lockOverlay.innerHTML = `
        <div class="lock-content">
            <div class="lock-time"></div>
            <div class="lock-date"></div>
            <div class="lock-user">
                <img src="icons/system/user.svg" alt="用户" class="user-avatar">
                <div class="user-name">访客用户</div>
                <input type="password" class="lock-password" placeholder="输入密码...">
            </div>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(lockOverlay);
    
    // 更新时间和日期
    updateLockTime();
    
    // 显示锁屏效果
    setTimeout(() => {
        lockOverlay.classList.add('show');
    }, 10);
    
    // 添加密码输入事件
    const passwordInput = lockOverlay.querySelector('.lock-password');
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // 解锁屏幕
                lockOverlay.classList.remove('show');
                
                // 延迟移除元素
                setTimeout(() => {
                    lockOverlay.remove();
                }, 300);
            }
        });
    }
    
    /**
     * 更新锁屏时间
     */
    function updateLockTime() {
        const timeElement = lockOverlay.querySelector('.lock-time');
        const dateElement = lockOverlay.querySelector('.lock-date');
        
        if (timeElement && dateElement) {
            const now = new Date();
            
            // 格式化时间
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? '下午' : '上午';
            const hours12 = hours % 12 || 12;
            
            timeElement.textContent = `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
            
            // 格式化日期
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('zh-CN', options);
        }
        
        // 每分钟更新一次
        setTimeout(updateLockTime, 60000);
    }
}

/**
 * 退出登录
 */
function logoutUser() {
    if (confirm('确定要退出登录吗？')) {
        // 重定向到登录页面
        window.location.href = 'index.html';
    }
}

/**
 * 访问苹果官网
 */
function visitAppleWebsite() {
    // 打开Safari并导航到苹果官网
    openSafariWithUrl('https://www.apple.com/cn/');
}

/**
 * 访问GitHub主页
 */
function visitGitHubHomepage() {
    // 打开Safari并导航到GitHub主页
    openSafariWithUrl('https://github.com/');
}

// 导出函数供其他模块使用
window.initializeMenuBar = initializeMenuBar;
window.closeAllMenus = closeAllMenus;
window.toggleControlCenter = toggleControlCenter;
window.showCalendar = showCalendar;
window.openSystemPreferences = openSystemPreferences;
window.visitAppleWebsite = visitAppleWebsite;
window.visitGitHubHomepage = visitGitHubHomepage;
