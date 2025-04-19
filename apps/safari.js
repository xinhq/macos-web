/**
 * macOS Monterey 网页版 - Safari应用
 * 负责Safari浏览器的功能实现
 */

// Safari管理器
const safariManager = {
    // 标签页计数器
    tabCounter: 0,
    
    // 标签页列表
    tabs: [],
    
    // 当前活动标签页ID
    activeTabId: null,
    
    // 初始化Safari
    init: function() {
        console.log('Safari管理器已初始化');
    },
    
    // 创建Safari窗口
    createWindow: function() {
        // 如果窗口管理器不存在，无法创建窗口
        if (!window.windowSystem) {
            console.error('窗口管理器不存在，无法创建Safari窗口');
            return;
        }
        
        // 创建窗口
        const windowInfo = window.windowSystem.createWindow({
            app: 'safari',
            title: 'Safari',
            width: 900,
            height: 600,
            content: this._createSafariContent()
        });
        
        // 初始化Safari功能
        this._initSafari(windowInfo.id);
        
        return windowInfo;
    },
    
    // 创建Safari内容
    _createSafariContent: function() {
        // 生成初始标签页ID
        const initialTabId = `safari-tab-${++this.tabCounter}`;
        
        // 保存标签页信息
        this.tabs.push({
            id: initialTabId,
            title: '新标签页',
            url: 'about:blank',
            isLoading: false
        });
        
        // 设置为活动标签页
        this.activeTabId = initialTabId;
        
        return `
            <div class="safari-window">
                <div class="safari-tabs-container">
                    <div class="safari-tab active" data-tab-id="${initialTabId}">
                        <div class="safari-tab-title">新标签页</div>
                        <div class="safari-tab-close">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <div class="safari-new-tab">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="safari-toolbar">
                    <div class="safari-toolbar-buttons">
                        <div class="safari-toolbar-button safari-back disabled" title="后退">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div class="safari-toolbar-button safari-forward disabled" title="前进">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        <div class="safari-toolbar-button safari-reload" title="重新加载">
                            <i class="fas fa-redo"></i>
                        </div>
                    </div>
                    <div class="safari-address-bar">
                        <input type="text" placeholder="搜索或输入网站名称" value="">
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
                <div class="safari-bookmark-bar">
                    <div class="safari-bookmark" data-url="https://www.apple.com">
                        <div class="safari-bookmark-icon">
                            <i class="fab fa-apple"></i>
                        </div>
                        <span>Apple</span>
                    </div>
                    <div class="safari-bookmark" data-url="https://www.google.com">
                        <div class="safari-bookmark-icon">
                            <i class="fab fa-google"></i>
                        </div>
                        <span>Google</span>
                    </div>
                    <div class="safari-bookmark" data-url="https://www.youtube.com">
                        <div class="safari-bookmark-icon">
                            <i class="fab fa-youtube"></i>
                        </div>
                        <span>YouTube</span>
                    </div>
                    <div class="safari-bookmark" data-url="https://www.github.com">
                        <div class="safari-bookmark-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <span>GitHub</span>
                    </div>
                </div>
                <div class="safari-content" data-active-tab="${initialTabId}">
                    <div class="safari-tab-content" data-tab-id="${initialTabId}">
                        ${this._createStartPage()}
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建起始页
    _createStartPage: function() {
        return `
            <div class="safari-start-page">
                <div class="safari-search-container">
                    <input type="text" class="safari-search-box" placeholder="搜索或输入网站名称">
                </div>
                <div class="safari-favorites">
                    <div class="safari-favorite" data-url="https://www.apple.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-apple fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">Apple</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.google.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-google fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">Google</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.youtube.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-youtube fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">YouTube</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.github.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-github fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">GitHub</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.twitter.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-twitter fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">Twitter</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.facebook.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-facebook fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">Facebook</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.instagram.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-instagram fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">Instagram</div>
                    </div>
                    <div class="safari-favorite" data-url="https://www.linkedin.com">
                        <div class="safari-favorite-icon">
                            <i class="fab fa-linkedin fa-2x"></i>
                        </div>
                        <div class="safari-favorite-title">LinkedIn</div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 初始化Safari功能
    _initSafari: function(windowId) {
        const windowElement = document.querySelector(`.window[data-id="${windowId}"]`);
        if (!windowElement) return;
        
        const safariWindow = windowElement.querySelector('.safari-window');
        if (!safariWindow) return;
        
        // 初始化标签页功能
        this._initTabs(safariWindow, windowId);
        
        // 初始化工具栏功能
        this._initToolbar(safariWindow, windowId);
        
        // 初始化书签功能
        this._initBookmarks(safariWindow, windowId);
        
        // 初始化起始页功能
        this._initStartPage(safariWindow, windowId);
    },
    
    // 初始化标签页功能
    _initTabs: function(safariWindow, windowId) {
        // 获取标签页容器
        const tabsContainer = safariWindow.querySelector('.safari-tabs-container');
        if (!tabsContainer) return;
        
        // 获取新建标签页按钮
        const newTabButton = tabsContainer.querySelector('.safari-new-tab');
        if (newTabButton) {
            newTabButton.addEventListener('click', () => {
                this._createNewTab(safariWindow, windowId);
            });
        }
        
        // 标签页点击事件
        tabsContainer.addEventListener('click', (e) => {
            // 关闭标签页
            const closeButton = e.target.closest('.safari-tab-close');
            if (closeButton) {
                const tab = closeButton.closest('.safari-tab');
                if (tab) {
                    const tabId = tab.getAttribute('data-tab-id');
                    this._closeTab(safariWindow, windowId, tabId);
                    e.stopPropagation();
                    return;
                }
            }
            
            // 切换标签页
            const tab = e.target.closest('.safari-tab');
            if (tab) {
                const tabId = tab.getAttribute('data-tab-id');
                this._switchTab(safariWindow, windowId, tabId);
            }
        });
    },
    
    // 创建新标签页
    _createNewTab: function(safariWindow, windowId) {
        // 生成新标签页ID
        const newTabId = `safari-tab-${++this.tabCounter}`;
        
        // 获取标签页容器
        const tabsContainer = safariWindow.querySelector('.safari-tabs-container');
        if (!tabsContainer) return;
        
        // 获取新建标签页按钮
        const newTabButton = tabsContainer.querySelector('.safari-new-tab');
        if (!newTabButton) return;
        
        // 创建新标签页元素
        const newTab = document.createElement('div');
        newTab.className = 'safari-tab';
        newTab.setAttribute('data-tab-id', newTabId);
        newTab.innerHTML = `
            <div class="safari-tab-title">新标签页</div>
            <div class="safari-tab-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        // 插入到新建标签页按钮之前
        tabsContainer.insertBefore(newTab, newTabButton);
        
        // 获取内容容器
        const contentContainer = safariWindow.querySelector('.safari-content');
        if (!contentContainer) return;
        
        // 创建新标签页内容
        const newTabContent = document.createElement('div');
        newTabContent.className = 'safari-tab-content';
        newTabContent.setAttribute('data-tab-id', newTabId);
        newTabContent.innerHTML = this._createStartPage();
        
        // 添加到内容容器
        contentContainer.appendChild(newTabContent);
        
        // 保存标签页信息
        this.tabs.push({
            id: newTabId,
            title: '新标签页',
            url: 'about:blank',
            isLoading: false
        });
        
        // 切换到新标签页
        this._switchTab(safariWindow, windowId, newTabId);
        
        // 初始化新标签页的起始页功能
        this._initStartPage(safariWindow, windowId, newTabId);
    },
    
    // 关闭标签页
    _closeTab: function(safariWindow, windowId, tabId) {
        // 获取标签页元素
        const tab = safariWindow.querySelector(`.safari-tab[data-tab-id="${tabId}"]`);
        if (!tab) return;
        
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 检查是否是活动标签页
        const isActive = tab.classList.contains('active');
        
        // 获取标签页索引
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        if (tabIndex === -1) return;
        
        // 从标签页列表中移除
        this.tabs.splice(tabIndex, 1);
        
        // 移除标签页元素
        tab.remove();
        
        // 移除标签页内容元素
        tabContent.remove();
        
        // 如果是活动标签页，切换到其他标签页
        if (isActive && this.tabs.length > 0) {
            // 优先切换到右侧标签页，如果没有则切换到左侧标签页
            const nextTabIndex = Math.min(tabIndex, this.tabs.length - 1);
            this._switchTab(safariWindow, windowId, this.tabs[nextTabIndex].id);
        }
        
        // 如果没有标签页了，关闭窗口
        if (this.tabs.length === 0) {
            window.windowSystem.closeWindow(windowId);
        }
    },
    
    // 切换标签页
    _switchTab: function(safariWindow, windowId, tabId) {
        // 获取所有标签页
        const tabs = safariWindow.querySelectorAll('.safari-tab');
        
        // 获取所有标签页内容
        const tabContents = safariWindow.querySelectorAll('.safari-tab-content');
        
        // 取消所有标签页的活动状态
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 隐藏所有标签页内容
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // 激活目标标签页
        const targetTab = safariWindow.querySelector(`.safari-tab[data-tab-id="${tabId}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // 显示目标标签页内容
        const targetContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
        
        // 更新内容容器的活动标签页属性
        const contentContainer = safariWindow.querySelector('.safari-content');
        if (contentContainer) {
            contentContainer.setAttribute('data-active-tab', tabId);
        }
        
        // 更新活动标签页ID
        this.activeTabId = tabId;
        
        // 更新地址栏
        this._updateAddressBar(safariWindow, tabId);
        
        // 更新导航按钮状态
        this._updateNavigationButtons(safariWindow, tabId);
    },
    
    // 初始化工具栏功能
    _initToolbar: function(safariWindow, windowId) {
        // 获取工具栏
        const toolbar = safariWindow.querySelector('.safari-toolbar');
        if (!toolbar) return;
        
        // 获取地址栏
        const addressBar = toolbar.querySelector('.safari-address-bar input');
        if (addressBar) {
            // 地址栏输入事件
            addressBar.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const url = addressBar.value.trim();
                    if (url) {
                        this._navigateToUrl(safariWindow, windowId, url);
                    }
                }
            });
        }
        
        // 获取后退按钮
        const backButton = toolbar.querySelector('.safari-back');
        if (backButton) {
            backButton.addEventListener('click', () => {
                if (!backButton.classList.contains('disabled')) {
                    this._goBack(safariWindow, windowId);
                }
            });
        }
        
        // 获取前进按钮
        const forwardButton = toolbar.querySelector('.safari-forward');
        if (forwardButton) {
            forwardButton.addEventListener('click', () => {
                if (!forwardButton.classList.contains('disabled')) {
                    this._goForward(safariWindow, windowId);
                }
            });
        }
        
        // 获取刷新按钮
        const reloadButton = toolbar.querySelector('.safari-reload');
        if (reloadButton) {
            reloadButton.addEventListener('click', () => {
                this._reloadPage(safariWindow, windowId);
            });
        }
    },
    
    // 导航到URL
    _navigateToUrl: function(safariWindow, windowId, url) {
        // 获取当前活动标签页ID
        const tabId = this.activeTabId;
        if (!tabId) return;
        
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 格式化URL
        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // 如果是搜索查询，使用Google搜索
            if (url.includes(' ') || !url.includes('.')) {
                formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            } else {
                formattedUrl = `https://${url}`;
            }
        }
        
        // 更新标签页信息
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        if (tabIndex !== -1) {
            this.tabs[tabIndex].url = formattedUrl;
            this.tabs[tabIndex].isLoading = true;
        }
        
        // 创建iframe
        tabContent.innerHTML = `<iframe src="${formattedUrl}" frameborder="0"></iframe>`;
        
        // 获取iframe
        const iframe = tabContent.querySelector('iframe');
        
        // 添加加载指示器
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'safari-loading-indicator';
        loadingIndicator.style.width = '0%';
        tabContent.appendChild(loadingIndicator);
        
        // 模拟加载进度
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // 加载完成后移除加载指示器
                setTimeout(() => {
                    loadingIndicator.remove();
                    
                    // 更新标签页信息
                    if (tabIndex !== -1) {
                        this.tabs[tabIndex].isLoading = false;
                    }
                    
                    // 更新标签页标题
                    this._updateTabTitle(safariWindow, tabId, this._getPageTitle(formattedUrl));
                    
                    // 更新导航按钮状态
                    this._updateNavigationButtons(safariWindow, tabId);
                }, 200);
            }
            
            loadingIndicator.style.width = `${progress}%`;
        }, 100);
        
        // 更新地址栏
        const addressBar = safariWindow.querySelector('.safari-address-bar input');
        if (addressBar) {
            addressBar.value = formattedUrl;
        }
    },
    
    // 后退
    _goBack: function(safariWindow, windowId) {
        // 获取当前活动标签页ID
        const tabId = this.activeTabId;
        if (!tabId) return;
        
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 获取iframe
        const iframe = tabContent.querySelector('iframe');
        if (iframe) {
            // 在真实浏览器中，这里会调用iframe.contentWindow.history.back()
            // 但由于安全限制，我们只能模拟这个行为
            console.log('后退');
        }
    },
    
    // 前进
    _goForward: function(safariWindow, windowId) {
        // 获取当前活动标签页ID
        const tabId = this.activeTabId;
        if (!tabId) return;
        
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 获取iframe
        const iframe = tabContent.querySelector('iframe');
        if (iframe) {
            // 在真实浏览器中，这里会调用iframe.contentWindow.history.forward()
            // 但由于安全限制，我们只能模拟这个行为
            console.log('前进');
        }
    },
    
    // 刷新页面
    _reloadPage: function(safariWindow, windowId) {
        // 获取当前活动标签页ID
        const tabId = this.activeTabId;
        if (!tabId) return;
        
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 获取iframe
        const iframe = tabContent.querySelector('iframe');
        if (iframe) {
            // 重新加载iframe
            const src = iframe.src;
            iframe.src = src;
        }
    },
    
    // 更新地址栏
    _updateAddressBar: function(safariWindow, tabId) {
        // 获取标签页信息
        const tabInfo = this.tabs.find(t => t.id === tabId);
        if (!tabInfo) return;
        
        // 获取地址栏
        const addressBar = safariWindow.querySelector('.safari-address-bar input');
        if (addressBar) {
            addressBar.value = tabInfo.url !== 'about:blank' ? tabInfo.url : '';
        }
    },
    
    // 更新导航按钮状态
    _updateNavigationButtons: function(safariWindow, tabId) {
        // 获取标签页内容元素
        const tabContent = safariWindow.querySelector(`.safari-tab-content[data-tab-id="${tabId}"]`);
        if (!tabContent) return;
        
        // 获取iframe
        const iframe = tabContent.querySelector('iframe');
        
        // 获取后退按钮
        const backButton = safariWindow.querySelector('.safari-back');
        if (backButton) {
            // 在真实浏览器中，这里会检查iframe.contentWindow.history.length
            // 但由于安全限制，我们只能模拟这个行为
            backButton.classList.add('disabled');
        }
        
        // 获取前进按钮
        const forwardButton = safariWindow.querySelector('.safari-forward');
        if (forwardButton) {
            // 在真实浏览器中，这里会检查iframe.contentWindow.history.length
            // 但由于安全限制，我们只能模拟这个行为
            forwardButton.classList.add('disabled');
        }
    },
    
    // 更新标签页标题
    _updateTabTitle: function(safariWindow, tabId, title) {
        // 获取标签页元素
        const tab = safariWindow.querySelector(`.safari-tab[data-tab-id="${tabId}"]`);
        if (!tab) return;
        
        // 获取标签页标题元素
        const titleElement = tab.querySelector('.safari-tab-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
        
        // 更新标签页信息
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        if (tabIndex !== -1) {
            this.tabs[tabIndex].title = title;
        }
        
        // 如果是活动标签页，更新窗口标题
        if (tabId === this.activeTabId) {
            const windowId = safariWindow.closest('.window').getAttribute('data-id');
            window.windowSystem.setWindowTitle(windowId, `${title} - Safari`);
        }
    },
    
    // 获取页面标题
    _getPageTitle: function(url) {
        // 从URL中提取域名作为标题
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '');
        } catch (e) {
            return url;
        }
    },
    
    // 初始化书签功能
    _initBookmarks: function(safariWindow, windowId) {
        // 获取书签栏
        const bookmarkBar = safariWindow.querySelector('.safari-bookmark-bar');
        if (!bookmarkBar) return;
        
        // 书签点击事件
        bookmarkBar.addEventListener('click', (e) => {
            const bookmark = e.target.closest('.safari-bookmark');
            if (bookmark) {
                const url = bookmark.getAttribute('data-url');
                if (url) {
                    this._navigateToUrl(safariWindow, windowId, url);
                }
            }
        });
    },
    
    // 初始化起始页功能
    _initStartPage: function(safariWindow, windowId, specificTabId = null) {
        // 获取标签页内容元素
        const tabContents = specificTabId 
            ? [safariWindow.querySelector(`.safari-tab-content[data-tab-id="${specificTabId}"]`)]
            : safariWindow.querySelectorAll('.safari-tab-content');
        
        tabContents.forEach(tabContent => {
            if (!tabContent) return;
            
            // 获取起始页
            const startPage = tabContent.querySelector('.safari-start-page');
            if (!startPage) return;
            
            // 获取搜索框
            const searchBox = startPage.querySelector('.safari-search-box');
            if (searchBox) {
                // 搜索框输入事件
                searchBox.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const query = searchBox.value.trim();
                        if (query) {
                            this._navigateToUrl(safariWindow, windowId, query);
                        }
                    }
                });
            }
            
            // 获取收藏夹
            const favorites = startPage.querySelectorAll('.safari-favorite');
            favorites.forEach(favorite => {
                favorite.addEventListener('click', () => {
                    const url = favorite.getAttribute('data-url');
                    if (url) {
                        this._navigateToUrl(safariWindow, windowId, url);
                    }
                });
            });
        });
    }
};

// 初始化Safari管理器
function initSafari() {
    safariManager.init();
    
    // 导出Safari管理器到全局
    window.safariManager = safariManager;
}

// 当文档加载完成时初始化Safari管理器
document.addEventListener('DOMContentLoaded', () => {
    initSafari();
});
