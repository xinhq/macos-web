// dock.js - Dock栏功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Dock栏
    initializeDock();
});

/**
 * 初始化Dock栏
 */
function initializeDock() {
    // 创建Dock栏
    createDock();
    
    // 添加Dock栏应用图标
    addDockIcons();
    
    // 初始化Dock栏交互
    initDockInteractions();
    
    // 加载用户设置
    loadDockSettings();
}

/**
 * 创建Dock栏
 */
function createDock() {
    // 检查Dock栏是否已存在
    if (document.getElementById('dock')) {
        return;
    }
    
    // 创建Dock栏容器
    const dock = document.createElement('div');
    dock.id = 'dock';
    dock.className = 'dock dock-bottom';
    
    // 创建Dock栏内容
    const dockContent = document.createElement('div');
    dockContent.className = 'dock-content';
    
    // 创建应用区域
    const dockApps = document.createElement('div');
    dockApps.className = 'dock-apps';
    dockApps.id = 'dock-apps';
    
    // 创建分隔线
    const dockDivider = document.createElement('div');
    dockDivider.className = 'dock-divider';
    
    // 创建文件区域
    const dockFiles = document.createElement('div');
    dockFiles.className = 'dock-files';
    dockFiles.id = 'dock-files';
    
    // 组装Dock栏
    dockContent.appendChild(dockApps);
    dockContent.appendChild(dockDivider);
    dockContent.appendChild(dockFiles);
    dock.appendChild(dockContent);
    
    // 添加到文档
    document.body.appendChild(dock);
}

/**
 * 添加Dock栏图标
 */
function addDockIcons() {
    // 应用图标
    const appIcons = [
        { id: 'finder', name: '访达', icon: 'icons/apps/finder.svg', action: openFinder },
        { id: 'safari', name: 'Safari', icon: 'icons/apps/safari.svg', action: openSafari },
        { id: 'mail', name: '邮件', icon: 'icons/apps/mail.svg', action: openMail },
        { id: 'messages', name: '信息', icon: 'icons/apps/messages.svg', action: openMessages },
        { id: 'maps', name: '地图', icon: 'icons/apps/maps.svg', action: openMaps },
        { id: 'photos', name: '照片', icon: 'icons/apps/photos.svg', action: openPhotos },
        { id: 'launchpad', name: '启动台', icon: 'icons/system/launchpad.svg', action: openLaunchpad }
    ];
    
    // 文件图标
    const fileIcons = [
        { id: 'downloads', name: '下载', icon: 'icons/folders/folder-downloads.svg', action: openDownloads },
        { id: 'applications', name: '应用程序', icon: 'icons/folders/folder-applications.svg', action: openApplications },
        { id: 'documents', name: '文稿', icon: 'icons/folders/folder-documents.svg', action: openDocuments },
        { id: 'trash', name: '废纸篓', icon: 'icons/system/trash-empty.svg', action: openTrash }
    ];
    
    // 添加应用图标
    const dockApps = document.getElementById('dock-apps');
    
    if (dockApps) {
        appIcons.forEach(app => {
            addDockIcon(dockApps, app);
        });
    }
    
    // 添加文件图标
    const dockFiles = document.getElementById('dock-files');
    
    if (dockFiles) {
        fileIcons.forEach(file => {
            addDockIcon(dockFiles, file);
        });
    }
}

/**
 * 添加Dock栏图标
 * @param {HTMLElement} container - 容器元素
 * @param {Object} icon - 图标信息
 */
function addDockIcon(container, icon) {
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'dock-icon';
    iconContainer.id = `dock-${icon.id}`;
    iconContainer.setAttribute('data-name', icon.name);
    
    // 创建图标图像
    const iconImage = document.createElement('img');
    iconImage.src = icon.icon;
    iconImage.alt = icon.name;
    iconImage.className = 'dock-icon-image';
    
    // 创建图标指示点
    const iconDot = document.createElement('div');
    iconDot.className = 'dock-icon-dot';
    
    // 创建图标标签
    const iconLabel = document.createElement('div');
    iconLabel.className = 'dock-icon-label';
    iconLabel.textContent = icon.name;
    
    // 添加到图标容器
    iconContainer.appendChild(iconImage);
    iconContainer.appendChild(iconDot);
    iconContainer.appendChild(iconLabel);
    
    // 添加点击事件
    iconContainer.addEventListener('click', function() {
        // 执行图标操作
        if (typeof icon.action === 'function') {
            icon.action();
        }
        
        // 显示运行指示点
        iconDot.classList.add('active');
    });
    
    // 添加到容器
    container.appendChild(iconContainer);
}

/**
 * 初始化Dock栏交互
 */
function initDockInteractions() {
    // 获取所有Dock图标
    const dockIcons = document.querySelectorAll('.dock-icon');
    
    // 添加悬停效果
    dockIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // 添加悬停类
            this.classList.add('hover');
            
            // 应用放大效果
            applyMagnificationEffect(dockIcons, this);
        });
        
        icon.addEventListener('mouseleave', function() {
            // 移除悬停类
            this.classList.remove('hover');
            
            // 重置放大效果
            resetMagnificationEffect(dockIcons);
        });
    });
    
    // 添加Dock栏悬停事件
    const dock = document.getElementById('dock');
    
    if (dock) {
        dock.addEventListener('mousemove', function(e) {
            // 获取鼠标在Dock栏中的位置
            const dockRect = this.getBoundingClientRect();
            const mouseX = e.clientX - dockRect.left;
            const mouseY = e.clientY - dockRect.top;
            
            // 应用连续放大效果
            applyContinuousMagnification(dockIcons, mouseX, mouseY);
        });
        
        dock.addEventListener('mouseleave', function() {
            // 重置放大效果
            resetMagnificationEffect(dockIcons);
        });
    }
}

/**
 * 应用放大效果
 * @param {NodeList} icons - 所有图标
 * @param {HTMLElement} currentIcon - 当前图标
 */
function applyMagnificationEffect(icons, currentIcon) {
    // 获取放大设置
    const magnificationEnabled = localStorage.getItem('dockMagnification') !== 'false';
    
    if (!magnificationEnabled) {
        return;
    }
    
    // 获取当前图标索引
    let currentIndex = -1;
    
    icons.forEach((icon, index) => {
        if (icon === currentIcon) {
            currentIndex = index;
        }
    });
    
    if (currentIndex === -1) {
        return;
    }
    
    // 应用放大效果
    icons.forEach((icon, index) => {
        // 计算与当前图标的距离
        const distance = Math.abs(index - currentIndex);
        
        // 计算缩放比例
        let scale = 1;
        
        if (distance === 0) {
            // 当前图标最大
            scale = 1.5;
        } else if (distance === 1) {
            // 相邻图标稍大
            scale = 1.2;
        } else if (distance === 2) {
            // 再相邻图标略大
            scale = 1.1;
        }
        
        // 应用缩放
        icon.style.transform = `scale(${scale})`;
    });
}

/**
 * 应用连续放大效果
 * @param {NodeList} icons - 所有图标
 * @param {number} mouseX - 鼠标X坐标
 * @param {number} mouseY - 鼠标Y坐标
 */
function applyContinuousMagnification(icons, mouseX, mouseY) {
    // 获取放大设置
    const magnificationEnabled = localStorage.getItem('dockMagnification') !== 'false';
    
    if (!magnificationEnabled) {
        return;
    }
    
    // 获取Dock位置
    const dockPosition = localStorage.getItem('dockPosition') || 'bottom';
    
    // 应用放大效果
    icons.forEach(icon => {
        // 获取图标位置
        const iconRect = icon.getBoundingClientRect();
        const dock = document.getElementById('dock');
        const dockRect = dock.getBoundingClientRect();
        
        // 计算图标中心
        let iconCenterX, iconCenterY;
        
        if (dockPosition === 'bottom' || dockPosition === 'top') {
            iconCenterX = iconRect.left + iconRect.width / 2 - dockRect.left;
            iconCenterY = iconRect.top + iconRect.height / 2 - dockRect.top;
        } else {
            iconCenterX = iconRect.left + iconRect.width / 2 - dockRect.left;
            iconCenterY = iconRect.top + iconRect.height / 2 - dockRect.top;
        }
        
        // 计算与鼠标的距离
        let distance;
        
        if (dockPosition === 'bottom' || dockPosition === 'top') {
            distance = Math.abs(mouseX - iconCenterX);
        } else {
            distance = Math.abs(mouseY - iconCenterY);
        }
        
        // 计算缩放比例
        const maxDistance = 100; // 最大影响距离
        const maxScale = 1.5; // 最大缩放比例
        
        let scale = 1;
        
        if (distance < maxDistance) {
            // 距离越近，缩放越大
            scale = 1 + (maxScale - 1) * (1 - distance / maxDistance);
        }
        
        // 应用缩放
        icon.style.transform = `scale(${scale})`;
    });
}

/**
 * 重置放大效果
 * @param {NodeList} icons - 所有图标
 */
function resetMagnificationEffect(icons) {
    icons.forEach(icon => {
        icon.style.transform = 'scale(1)';
    });
}

/**
 * 加载Dock栏设置
 */
function loadDockSettings() {
    // 加载Dock位置
    const dockPosition = localStorage.getItem('dockPosition') || 'bottom';
    setDockPosition(dockPosition);
    
    // 加载Dock大小
    const dockSize = localStorage.getItem('dockSize') || '50';
    setDockSize(dockSize);
    
    // 加载Dock自动隐藏
    const dockAutoHide = localStorage.getItem('dockAutoHide') === 'true';
    setDockAutoHide(dockAutoHide);
}

/**
 * 设置Dock栏位置
 * @param {string} position - 位置
 */
function setDockPosition(position) {
    const dock = document.getElementById('dock');
    
    if (dock) {
        // 移除所有位置类
        dock.classList.remove('dock-bottom', 'dock-left', 'dock-right');
        
        // 添加新位置类
        dock.classList.add(`dock-${position}`);
    }
}

/**
 * 设置Dock栏大小
 * @param {string|number} size - 大小
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
 * 设置Dock栏自动隐藏
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
 * 显示应用正在运行
 * @param {string} appId - 应用ID
 * @param {boolean} running - 是否正在运行
 */
function setAppRunning(appId, running) {
    const dockIcon = document.getElementById(`dock-${appId}`);
    
    if (dockIcon) {
        const iconDot = dockIcon.querySelector('.dock-icon-dot');
        
        if (iconDot) {
            if (running) {
                iconDot.classList.add('active');
            } else {
                iconDot.classList.remove('active');
            }
        }
    }
}

/**
 * 打开访达
 */
function openFinder() {
    if (typeof window.openFinder === 'function') {
        window.openFinder();
    } else {
        console.error('访达打开函数未找到');
        alert('访达功能尚未实现');
    }
    
    // 设置应用正在运行
    setAppRunning('finder', true);
}

/**
 * 打开Safari
 */
function openSafari() {
    // 创建Safari窗口
    createWindow({
        title: 'Safari',
        width: 900,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/safari.svg',
        content: `
            <div class="safari-container">
                <div class="safari-toolbar">
                    <div class="safari-controls">
                        <button class="safari-button back-button" title="后退">
                            <span class="icon">←</span>
                        </button>
                        <button class="safari-button forward-button" title="前进">
                            <span class="icon">→</span>
                        </button>
                        <button class="safari-button reload-button" title="重新加载">
                            <span class="icon">↻</span>
                        </button>
                    </div>
                    <div class="safari-address-bar">
                        <input type="text" class="safari-address-input" value="https://www.apple.com/cn/" placeholder="搜索或输入网站名称">
                    </div>
                    <div class="safari-actions">
                        <button class="safari-button share-button" title="分享">
                            <span class="icon">↗</span>
                        </button>
                        <button class="safari-button tabs-button" title="标签页">
                            <span class="icon">⧉</span>
                        </button>
                    </div>
                </div>
                <div class="safari-content">
                    <iframe src="https://www.apple.com/cn/" class="safari-iframe"></iframe>
                </div>
            </div>
        `
    });
    
    // 初始化Safari功能
    setTimeout(() => {
        initSafariFunctionality();
    }, 100);
    
    // 设置应用正在运行
    setAppRunning('safari', true);
}

/**
 * 初始化Safari功能
 */
function initSafariFunctionality() {
    // 地址栏输入
    const addressInput = document.querySelector('.safari-address-input');
    
    if (addressInput) {
        addressInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // 获取URL
                let url = this.value.trim();
                
                // 确保URL格式正确
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    // 检查是否是域名格式
                    if (url.includes('.') && !url.includes(' ')) {
                        url = 'https://' + url;
                    } else {
                        // 作为搜索查询
                        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
                    }
                }
                
                // 更新地址栏
                this.value = url;
                
                // 导航到URL
                const iframe = document.querySelector('.safari-iframe');
                
                if (iframe) {
                    iframe.src = url;
                }
            }
        });
    }
    
    // 后退按钮
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 尝试后退
                try {
                    iframe.contentWindow.history.back();
                } catch (e) {
                    console.error('无法访问iframe历史记录:', e);
                }
            }
        });
    }
    
    // 前进按钮
    const forwardButton = document.querySelector('.forward-button');
    
    if (forwardButton) {
        forwardButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 尝试前进
                try {
                    iframe.contentWindow.history.forward();
                } catch (e) {
                    console.error('无法访问iframe历史记录:', e);
                }
            }
        });
    }
    
    // 重新加载按钮
    const reloadButton = document.querySelector('.reload-button');
    
    if (reloadButton) {
        reloadButton.addEventListener('click', function() {
            const iframe = document.querySelector('.safari-iframe');
            
            if (iframe) {
                // 重新加载
                iframe.src = iframe.src;
            }
        });
    }
}

/**
 * 打开邮件
 */
function openMail() {
    // 创建邮件窗口
    createWindow({
        title: '邮件',
        width: 800,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/mail.svg',
        content: `
            <div class="mail-container">
                <div class="mail-sidebar">
                    <div class="sidebar-section">
                        <div class="sidebar-item active">
                            <span class="icon">📥</span>
                            <span>收件箱</span>
                            <span class="badge">3</span>
                        </div>
                        <div class="sidebar-item">
                            <span class="icon">📤</span>
                            <span>已发送</span>
                        </div>
                        <div class="sidebar-item">
                            <span class="icon">📝</span>
                            <span>草稿</span>
                            <span class="badge">1</span>
                        </div>
                        <div class="sidebar-item">
                            <span class="icon">🗑️</span>
                            <span>已删除</span>
                        </div>
                    </div>
                </div>
                <div class="mail-list">
                    <div class="mail-item unread">
                        <div class="mail-sender">Apple</div>
                        <div class="mail-subject">欢迎使用macOS网页版</div>
                        <div class="mail-preview">感谢您使用macOS网页版，这是一个基于Web技术的macOS模拟器...</div>
                        <div class="mail-time">09:15</div>
                    </div>
                    <div class="mail-item unread">
                        <div class="mail-sender">系统管理员</div>
                        <div class="mail-subject">您的账户已设置完成</div>
                        <div class="mail-preview">您的macOS网页版账户已经设置完成，您可以开始使用所有功能...</div>
                        <div class="mail-time">昨天</div>
                    </div>
                    <div class="mail-item unread">
                        <div class="mail-sender">Safari团队</div>
                        <div class="mail-subject">探索网络的新方式</div>
                        <div class="mail-preview">Safari浏览器提供了最佳的网络浏览体验，快来尝试吧...</div>
                        <div class="mail-time">周一</div>
                    </div>
                </div>
                <div class="mail-content">
                    <div class="mail-header">
                        <div class="mail-subject-large">欢迎使用macOS网页版</div>
                        <div class="mail-info">
                            <span class="mail-sender-large">Apple</span>
                            <span class="mail-to">发送至: 您 &lt;user@example.com&gt;</span>
                            <span class="mail-date">今天 09:15</span>
                        </div>
                    </div>
                    <div class="mail-body">
                        <p>尊敬的用户，</p>
                        <p>感谢您使用macOS网页版，这是一个基于Web技术的macOS模拟器。</p>
                        <p>在这个模拟环境中，您可以体验macOS的主要功能和界面，包括：</p>
                        <ul>
                            <li>访达文件浏览</li>
                            <li>应用程序使用</li>
                            <li>系统设置调整</li>
                            <li>基本的文件操作</li>
                        </ul>
                        <p>我们希望您喜欢这个项目，如有任何问题或建议，请随时联系我们。</p>
                        <p>祝您使用愉快！</p>
                        <p>Apple团队</p>
                    </div>
                </div>
            </div>
        `
    });
    
    // 设置应用正在运行
    setAppRunning('mail', true);
}

/**
 * 打开信息
 */
function openMessages() {
    // 创建信息窗口
    createWindow({
        title: '信息',
        width: 700,
        height: 500,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/messages.svg',
        content: `
            <div class="messages-container">
                <div class="messages-sidebar">
                    <div class="messages-search">
                        <input type="text" placeholder="搜索" class="messages-search-input">
                    </div>
                    <div class="messages-conversations">
                        <div class="conversation-item active">
                            <div class="conversation-avatar">
                                <img src="icons/system/user.svg" alt="系统">
                            </div>
                            <div class="conversation-info">
                                <div class="conversation-name">系统通知</div>
                                <div class="conversation-preview">欢迎使用信息应用</div>
                            </div>
                            <div class="conversation-time">现在</div>
                        </div>
                        <div class="conversation-item">
                            <div class="conversation-avatar">
                                <img src="icons/system/user.svg" alt="朋友">
                            </div>
                            <div class="conversation-info">
                                <div class="conversation-name">朋友</div>
                                <div class="conversation-preview">你好，最近怎么样？</div>
                            </div>
                            <div class="conversation-time">昨天</div>
                        </div>
                        <div class="conversation-item">
                            <div class="conversation-avatar">
                                <img src="icons/system/user.svg" alt="家人">
                            </div>
                            <div class="conversation-info">
                                <div class="conversation-name">家人</div>
                                <div class="conversation-preview">晚餐准备好了</div>
                            </div>
                            <div class="conversation-time">周一</div>
                        </div>
                    </div>
                </div>
                <div class="messages-content">
                    <div class="messages-header">
                        <div class="conversation-avatar">
                            <img src="icons/system/user.svg" alt="系统">
                        </div>
                        <div class="conversation-name-large">系统通知</div>
                        <div class="messages-actions">
                            <button class="messages-action-button">
                                <span class="icon">📞</span>
                            </button>
                            <button class="messages-action-button">
                                <span class="icon">📹</span>
                            </button>
                            <button class="messages-action-button">
                                <span class="icon">ⓘ</span>
                            </button>
                        </div>
                    </div>
                    <div class="messages-chat">
                        <div class="message-item system">
                            <div class="message-bubble">
                                欢迎使用信息应用！
                            </div>
                            <div class="message-time">09:30</div>
                        </div>
                        <div class="message-item system">
                            <div class="message-bubble">
                                您可以在这里与朋友和家人聊天。
                            </div>
                            <div class="message-time">09:30</div>
                        </div>
                        <div class="message-item user">
                            <div class="message-bubble">
                                谢谢！我该如何添加新联系人？
                            </div>
                            <div class="message-time">09:31</div>
                        </div>
                        <div class="message-item system">
                            <div class="message-bubble">
                                您可以点击左上角的"新建对话"按钮，然后输入联系人的电话号码或电子邮件地址。
                            </div>
                            <div class="message-time">09:32</div>
                        </div>
                    </div>
                    <div class="messages-input">
                        <button class="messages-input-button">
                            <span class="icon">😊</span>
                        </button>
                        <input type="text" placeholder="iMessage" class="messages-input-field">
                        <button class="messages-input-button">
                            <span class="icon">🎤</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    });
    
    // 设置应用正在运行
    setAppRunning('messages', true);
}

/**
 * 打开地图
 */
function openMaps() {
    // 创建地图窗口
    createWindow({
        title: '地图',
        width: 800,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/maps.svg',
        content: `
            <div class="maps-container">
                <div class="maps-sidebar">
                    <div class="maps-search">
                        <input type="text" placeholder="搜索地图" class="maps-search-input">
                    </div>
                    <div class="maps-bookmarks">
                        <div class="maps-section-title">收藏</div>
                        <div class="maps-bookmark-item">
                            <span class="icon">🏠</span>
                            <span>家</span>
                        </div>
                        <div class="maps-bookmark-item">
                            <span class="icon">💼</span>
                            <span>工作</span>
                        </div>
                        <div class="maps-section-title">最近</div>
                        <div class="maps-bookmark-item">
                            <span class="icon">🍽️</span>
                            <span>餐厅</span>
                        </div>
                        <div class="maps-bookmark-item">
                            <span class="icon">🛒</span>
                            <span>超市</span>
                        </div>
                    </div>
                </div>
                <div class="maps-content">
                    <div class="maps-toolbar">
                        <button class="maps-tool-button">
                            <span class="icon">➕</span>
                        </button>
                        <button class="maps-tool-button">
                            <span class="icon">➖</span>
                        </button>
                        <button class="maps-tool-button">
                            <span class="icon">🧭</span>
                        </button>
                        <button class="maps-tool-button">
                            <span class="icon">📍</span>
                        </button>
                    </div>
                    <div class="maps-view">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        `
    });
    
    // 设置应用正在运行
    setAppRunning('maps', true);
}

/**
 * 打开照片
 */
function openPhotos() {
    // 创建照片窗口
    createWindow({
        title: '照片',
        width: 900,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/photos.svg',
        content: `
            <div class="photos-container">
                <div class="photos-sidebar">
                    <div class="photos-section">
                        <div class="photos-section-title">资料库</div>
                        <div class="photos-sidebar-item active">
                            <span class="icon">🖼️</span>
                            <span>照片</span>
                        </div>
                        <div class="photos-sidebar-item">
                            <span class="icon">📅</span>
                            <span>回忆</span>
                        </div>
                        <div class="photos-sidebar-item">
                            <span class="icon">👤</span>
                            <span>人物</span>
                        </div>
                    </div>
                    <div class="photos-section">
                        <div class="photos-section-title">相簿</div>
                        <div class="photos-sidebar-item">
                            <span class="icon">📱</span>
                            <span>我的相簿</span>
                        </div>
                        <div class="photos-sidebar-item">
                            <span class="icon">🌄</span>
                            <span>风景</span>
                        </div>
                        <div class="photos-sidebar-item">
                            <span class="icon">🎭</span>
                            <span>肖像</span>
                        </div>
                    </div>
                </div>
                <div class="photos-content">
                    <div class="photos-toolbar">
                        <div class="photos-view-options">
                            <button class="photos-view-button active">
                                <span class="icon">📅</span>
                            </button>
                            <button class="photos-view-button">
                                <span class="icon">🖼️</span>
                            </button>
                        </div>
                        <div class="photos-actions">
                            <button class="photos-action-button">
                                <span class="icon">➕</span>
                            </button>
                            <button class="photos-action-button">
                                <span class="icon">ⓘ</span>
                            </button>
                            <button class="photos-action-button">
                                <span class="icon">↗</span>
                            </button>
                        </div>
                    </div>
                    <div class="photos-grid">
                        <div class="photos-date-section">
                            <div class="photos-date-title">今天</div>
                            <div class="photos-grid-row">
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🏞️</span>
                                    </div>
                                </div>
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌃</span>
                                    </div>
                                </div>
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌄</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="photos-date-section">
                            <div class="photos-date-title">昨天</div>
                            <div class="photos-grid-row">
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌅</span>
                                    </div>
                                </div>
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌆</span>
                                    </div>
                                </div>
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌇</span>
                                    </div>
                                </div>
                                <div class="photo-item">
                                    <div class="photo-placeholder">
                                        <span class="icon">🌉</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    
    // 设置应用正在运行
    setAppRunning('photos', true);
}

/**
 * 打开启动台
 */
function openLaunchpad() {
    // 创建启动台容器
    const launchpad = document.createElement('div');
    launchpad.className = 'launchpad';
    launchpad.id = 'launchpad';
    
    // 创建搜索框
    const searchContainer = document.createElement('div');
    searchContainer.className = 'launchpad-search';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索';
    searchInput.className = 'launchpad-search-input';
    
    searchContainer.appendChild(searchInput);
    
    // 创建应用网格
    const appGrid = document.createElement('div');
    appGrid.className = 'launchpad-grid';
    
    // 添加应用图标
    const apps = [
        { name: '访达', icon: 'icons/apps/finder.svg', action: openFinder, url: 'https://www.apple.com/cn/macos/finder/' },
        { name: 'Safari', icon: 'icons/apps/safari.svg', action: openSafari, url: 'https://www.apple.com/cn/safari/' },
        { name: '邮件', icon: 'icons/apps/mail.svg', action: openMail, url: 'https://www.apple.com/cn/macos/mail/' },
        { name: '信息', icon: 'icons/apps/messages.svg', action: openMessages, url: 'https://www.apple.com/cn/macos/messages/' },
        { name: '地图', icon: 'icons/apps/maps.svg', action: openMaps, url: 'https://www.apple.com/cn/maps/' },
        { name: '照片', icon: 'icons/apps/photos.svg', action: openPhotos, url: 'https://www.apple.com/cn/macos/photos/' },
        { name: '备忘录', icon: 'icons/apps/notes.svg', action: null, url: 'https://www.apple.com/cn/macos/notes/' },
        { name: '提醒事项', icon: 'icons/apps/reminders.svg', action: null, url: 'https://www.apple.com/cn/macos/reminders/' },
        { name: '日历', icon: 'icons/apps/calendar.svg', action: null, url: 'https://www.apple.com/cn/macos/calendar/' },
        { name: '联系人', icon: 'icons/apps/contacts.svg', action: null, url: 'https://www.apple.com/cn/macos/contacts/' },
        { name: '音乐', icon: 'icons/apps/music.svg', action: null, url: 'https://www.apple.com/cn/music/' },
        { name: '播客', icon: 'icons/apps/podcasts.svg', action: null, url: 'https://www.apple.com/cn/apple-podcasts/' },
        { name: 'TV', icon: 'icons/apps/tv.svg', action: null, url: 'https://www.apple.com/cn/apple-tv-plus/' },
        { name: 'App Store', icon: 'icons/apps/app-store.svg', action: null, url: 'https://www.apple.com/cn/app-store/' },
        { name: 'FaceTime', icon: 'icons/apps/facetime.svg', action: null, url: 'https://www.apple.com/cn/macos/facetime/' },
        { name: '图书', icon: 'icons/apps/books.svg', action: null, url: 'https://www.apple.com/cn/apple-books/' },
        { name: '计算器', icon: 'icons/apps/calculator.svg', action: null, url: 'https://support.apple.com/zh-cn/guide/calculator/welcome/mac' },
        { name: '终端', icon: 'icons/apps/terminal.svg', action: null, url: 'https://support.apple.com/zh-cn/guide/terminal/welcome/mac' },
        { name: '系统偏好设置', icon: 'icons/system/settings.svg', action: openSystemPreferences, url: 'https://support.apple.com/zh-cn/guide/system-preferences/welcome/mac' }
    ];
    
    apps.forEach(app => {
        const appItem = document.createElement('div');
        appItem.className = 'launchpad-item';
        
        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt = app.name;
        appIcon.className = 'launchpad-icon';
        
        const appName = document.createElement('div');
        appName.className = 'launchpad-label';
        appName.textContent = app.name;
        
        appItem.appendChild(appIcon);
        appItem.appendChild(appName);
        
        // 添加点击事件
        appItem.addEventListener('click', function() {
            // 关闭启动台
            closeLaunchpad();
            
            // 执行应用操作
            if (typeof app.action === 'function') {
                app.action();
            } else if (app.url) {
                // 如果没有操作但有URL，打开Safari并导航到URL
                openSafariWithUrl(app.url);
            }
        });
        
        appGrid.appendChild(appItem);
    });
    
    // 组装启动台
    launchpad.appendChild(searchContainer);
    launchpad.appendChild(appGrid);
    
    // 添加到文档
    document.body.appendChild(launchpad);
    
    // 显示启动台
    setTimeout(() => {
        launchpad.classList.add('show');
    }, 10);
    
    // 添加点击背景关闭事件
    launchpad.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLaunchpad();
        }
    });
    
    // 添加ESC键关闭事件
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLaunchpad();
        }
    });
    
    // 添加搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // 过滤应用
        const appItems = document.querySelectorAll('.launchpad-item');
        
        appItems.forEach(item => {
            const appName = item.querySelector('.launchpad-label').textContent.toLowerCase();
            
            if (searchTerm === '' || appName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // 自动聚焦搜索框
    searchInput.focus();
}

/**
 * 关闭启动台
 */
function closeLaunchpad() {
    const launchpad = document.getElementById('launchpad');
    
    if (launchpad) {
        launchpad.classList.remove('show');
        
        // 延迟移除元素
        setTimeout(() => {
            launchpad.remove();
        }, 300);
    }
}

/**
 * 使用Safari打开URL
 * @param {string} url - 要打开的URL
 */
function openSafariWithUrl(url) {
    // 创建Safari窗口
    createWindow({
        title: 'Safari',
        width: 900,
        height: 600,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/apps/safari.svg',
        content: `
            <div class="safari-container">
                <div class="safari-toolbar">
                    <div class="safari-controls">
                        <button class="safari-button back-button" title="后退">
                            <span class="icon">←</span>
                        </button>
                        <button class="safari-button forward-button" title="前进">
                            <span class="icon">→</span>
                        </button>
                        <button class="safari-button reload-button" title="重新加载">
                            <span class="icon">↻</span>
                        </button>
                    </div>
                    <div class="safari-address-bar">
                        <input type="text" class="safari-address-input" value="${url}" placeholder="搜索或输入网站名称">
                    </div>
                    <div class="safari-actions">
                        <button class="safari-button share-button" title="分享">
                            <span class="icon">↗</span>
                        </button>
                        <button class="safari-button tabs-button" title="标签页">
                            <span class="icon">⧉</span>
                        </button>
                    </div>
                </div>
                <div class="safari-content">
                    <iframe src="${url}" class="safari-iframe"></iframe>
                </div>
            </div>
        `
    });
    
    // 初始化Safari功能
    setTimeout(() => {
        initSafariFunctionality();
    }, 100);
    
    // 设置应用正在运行
    setAppRunning('safari', true);
}

/**
 * 打开下载文件夹
 */
function openDownloads() {
    // 打开访达并导航到下载文件夹
    openFinder();
    
    // 延迟加载文件夹内容
    setTimeout(() => {
        // 更新路径栏
        if (typeof updatePathBar === 'function') {
            updatePathBar('/Users/Guest/Downloads');
        }
        
        // 加载文件夹内容
        if (typeof loadFolderContent === 'function') {
            loadFolderContent('/Users/Guest/Downloads');
        }
    }, 100);
}

/**
 * 打开应用程序文件夹
 */
function openApplications() {
    // 打开访达并导航到应用程序文件夹
    openFinder();
    
    // 延迟加载文件夹内容
    setTimeout(() => {
        // 更新路径栏
        if (typeof updatePathBar === 'function') {
            updatePathBar('/Applications');
        }
        
        // 加载文件夹内容
        if (typeof loadFolderContent === 'function') {
            loadFolderContent('/Applications');
        }
    }, 100);
}

/**
 * 打开文稿文件夹
 */
function openDocuments() {
    // 打开访达并导航到文稿文件夹
    openFinder();
    
    // 延迟加载文件夹内容
    setTimeout(() => {
        // 更新路径栏
        if (typeof updatePathBar === 'function') {
            updatePathBar('/Users/Guest/Documents');
        }
        
        // 加载文件夹内容
        if (typeof loadFolderContent === 'function') {
            loadFolderContent('/Users/Guest/Documents');
        }
    }, 100);
}

/**
 * 打开废纸篓
 */
function openTrash() {
    // 创建废纸篓窗口
    createWindow({
        title: '废纸篓',
        width: 700,
        height: 500,
        resizable: true,
        maximizable: true,
        minimizable: true,
        icon: 'icons/system/trash-empty.svg',
        content: `
            <div class="finder-container">
                <div class="finder-sidebar">
                    <div class="sidebar-section">
                        <div class="sidebar-title">收藏</div>
                        <div class="sidebar-item" data-path="/Users/Guest/Desktop">
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
                    </div>
                    <div class="sidebar-section">
                        <div class="sidebar-title">位置</div>
                        <div class="sidebar-item active" data-path="/Trash">
                            <img src="icons/system/trash-empty.svg" alt="废纸篓">
                            <span>废纸篓</span>
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
                        </div>
                        <div class="toolbar-actions">
                            <button class="toolbar-button empty-trash-button" title="清空废纸篓">
                                <span class="icon">🗑️</span>
                            </button>
                        </div>
                    </div>
                    <div class="finder-path-bar">
                        <span class="path-item">废纸篓</span>
                    </div>
                    <div class="finder-items">
                        <div class="empty-trash-message">
                            <img src="icons/system/trash-empty.svg" alt="空废纸篓" class="empty-trash-icon">
                            <p>废纸篓为空</p>
                        </div>
                    </div>
                    <div class="finder-status-bar">
                        <span class="status-items">0 个项目</span>
                    </div>
                </div>
            </div>
        `
    });
    
    // 初始化废纸篓功能
    setTimeout(() => {
        // 清空废纸篓按钮
        const emptyTrashButton = document.querySelector('.empty-trash-button');
        
        if (emptyTrashButton) {
            emptyTrashButton.addEventListener('click', function() {
                // 显示确认对话框
                if (confirm('确定要清空废纸篓吗？此操作不可撤销。')) {
                    // 废纸篓已经是空的，只需显示提示
                    alert('废纸篓已清空');
                }
            });
        }
    }, 100);
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
        alert(`无法创建窗口：${options.title}`);
    }
}

// 导出函数供其他模块使用
window.initializeDock = initializeDock;
window.setAppRunning = setAppRunning;
window.openFinder = openFinder;
window.openSafari = openSafari;
window.openMail = openMail;
window.openMessages = openMessages;
window.openMaps = openMaps;
window.openPhotos = openPhotos;
window.openLaunchpad = openLaunchpad;
window.openSystemPreferences = openSystemPreferences;
