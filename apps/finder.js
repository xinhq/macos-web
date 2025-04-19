/**
 * macOS Monterey 网页版 - 访达(Finder)功能
 * 负责访达窗口的交互和功能实现
 */

// 访达管理器
const finderManager = {
    // 当前打开的访达窗口
    windows: [],
    
    // 当前选中的文件
    selectedFiles: [],
    
    // 当前视图模式：icon, list, column, gallery
    viewMode: 'icon',
    
    // 当前路径
    currentPath: '/',
    
    // 文件系统（模拟）
    fileSystem: {
        '/': {
            type: 'directory',
            name: '根目录',
            children: ['桌面', '文档', '下载', '应用程序', '图片', '音乐', '影片']
        },
        '/桌面': {
            type: 'directory',
            name: '桌面',
            children: ['欢迎使用.pdf', 'macOS简介.txt']
        },
        '/文档': {
            type: 'directory',
            name: '文档',
            children: ['我的文档.txt', '项目计划.pdf']
        },
        '/下载': {
            type: 'directory',
            name: '下载',
            children: ['示例文件.zip']
        },
        '/应用程序': {
            type: 'directory',
            name: '应用程序',
            children: ['Safari.app', 'Mail.app', 'Messages.app', 'Photos.app', 'Music.app']
        },
        '/图片': {
            type: 'directory',
            name: '图片',
            children: ['风景.jpg', '家庭.jpg']
        },
        '/音乐': {
            type: 'directory',
            name: '音乐',
            children: ['我的播放列表']
        },
        '/影片': {
            type: 'directory',
            name: '影片',
            children: ['假日视频.mp4']
        },
        '/桌面/欢迎使用.pdf': {
            type: 'file',
            name: '欢迎使用.pdf',
            size: '1.2 MB',
            modified: '2023年4月15日',
            icon: 'icons/pdf.png'
        },
        '/桌面/macOS简介.txt': {
            type: 'file',
            name: 'macOS简介.txt',
            size: '4 KB',
            modified: '2023年4月10日',
            icon: 'icons/text.png'
        },
        '/文档/我的文档.txt': {
            type: 'file',
            name: '我的文档.txt',
            size: '8 KB',
            modified: '2023年3月25日',
            icon: 'icons/text.png'
        },
        '/文档/项目计划.pdf': {
            type: 'file',
            name: '项目计划.pdf',
            size: '2.5 MB',
            modified: '2023年4月1日',
            icon: 'icons/pdf.png'
        },
        '/下载/示例文件.zip': {
            type: 'file',
            name: '示例文件.zip',
            size: '15.7 MB',
            modified: '2023年4月12日',
            icon: 'icons/zip.png'
        },
        '/应用程序/Safari.app': {
            type: 'application',
            name: 'Safari.app',
            size: '256 MB',
            modified: '2023年1月15日',
            icon: 'icons/safari.png'
        },
        '/应用程序/Mail.app': {
            type: 'application',
            name: 'Mail.app',
            size: '128 MB',
            modified: '2023年1月15日',
            icon: 'icons/mail.png'
        },
        '/应用程序/Messages.app': {
            type: 'application',
            name: 'Messages.app',
            size: '96 MB',
            modified: '2023年1月15日',
            icon: 'icons/messages.png'
        },
        '/应用程序/Photos.app': {
            type: 'application',
            name: 'Photos.app',
            size: '320 MB',
            modified: '2023年1月15日',
            icon: 'icons/photos.png'
        },
        '/应用程序/Music.app': {
            type: 'application',
            name: 'Music.app',
            size: '280 MB',
            modified: '2023年1月15日',
            icon: 'icons/music.png'
        },
        '/图片/风景.jpg': {
            type: 'file',
            name: '风景.jpg',
            size: '3.5 MB',
            modified: '2023年2月20日',
            icon: 'icons/image.png'
        },
        '/图片/家庭.jpg': {
            type: 'file',
            name: '家庭.jpg',
            size: '2.8 MB',
            modified: '2023年3月5日',
            icon: 'icons/image.png'
        },
        '/音乐/我的播放列表': {
            type: 'directory',
            name: '我的播放列表',
            children: ['最爱.m3u', '最近添加.m3u']
        },
        '/音乐/我的播放列表/最爱.m3u': {
            type: 'file',
            name: '最爱.m3u',
            size: '2 KB',
            modified: '2023年3月10日',
            icon: 'icons/playlist.png'
        },
        '/音乐/我的播放列表/最近添加.m3u': {
            type: 'file',
            name: '最近添加.m3u',
            size: '1 KB',
            modified: '2023年4月5日',
            icon: 'icons/playlist.png'
        },
        '/影片/假日视频.mp4': {
            type: 'file',
            name: '假日视频.mp4',
            size: '1.2 GB',
            modified: '2023年1月30日',
            icon: 'icons/video.png'
        }
    },
    
    // 初始化访达
    init: function() {
        console.log('访达已初始化');
    },
    
    // 创建新的访达窗口
    createWindow: function(path = '/') {
        // 设置当前路径
        this.currentPath = path;
        
        // 创建窗口内容
        const content = this._createFinderContent();
        
        // 使用窗口系统创建窗口
        if (window.windowSystem) {
            const finderWindow = window.windowSystem.createWindow({
                app: 'finder',
                title: this._getPathName(path),
                width: 800,
                height: 500,
                minWidth: 400,
                minHeight: 300,
                resizable: true,
                maximizable: true,
                minimizable: true,
                content: content
            });
            
            // 保存窗口引用
            this.windows.push({
                id: finderWindow.id,
                path: path
            });
            
            // 初始化窗口事件
            this._initWindowEvents(finderWindow.id);
            
            return finderWindow;
        }
        
        return null;
    },
    
    // 创建访达内容
    _createFinderContent: function() {
        return `
            <div class="finder-window">
                <div class="finder-toolbar">
                    <div class="finder-toolbar-buttons">
                        <div class="finder-toolbar-button back" title="后退">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div class="finder-toolbar-button forward" title="前进">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        <div class="finder-toolbar-divider"></div>
                        <div class="finder-toolbar-button view-mode" title="视图选项">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <div class="finder-toolbar-button action" title="操作">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    <div class="finder-search">
                        <input type="text" placeholder="搜索">
                        <div class="finder-search-icon">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                    <div class="finder-view-options">
                        <div class="finder-view-option icon-view active" title="图标视图">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <div class="finder-view-option list-view" title="列表视图">
                            <i class="fas fa-list"></i>
                        </div>
                        <div class="finder-view-option column-view" title="分栏视图">
                            <i class="fas fa-columns"></i>
                        </div>
                        <div class="finder-view-option gallery-view" title="画廊视图">
                            <i class="fas fa-images"></i>
                        </div>
                    </div>
                </div>
                <div class="finder-content">
                    <div class="finder-sidebar">
                        ${this._createSidebar()}
                    </div>
                    <div class="finder-main">
                        <div class="finder-path">
                            ${this._createPathBar()}
                        </div>
                        <div class="finder-files">
                            ${this._createFilesView()}
                        </div>
                        <div class="finder-status">
                            <div class="finder-status-info">
                                ${this._getDirectoryItemCount()} 个项目
                            </div>
                            <div class="finder-status-items"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建侧边栏
    _createSidebar: function() {
        return `
            <div class="finder-sidebar-section">
                <div class="finder-sidebar-header">收藏</div>
                <div class="finder-sidebar-item ${this.currentPath === '/桌面' ? 'active' : ''}" data-path="/桌面">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-desktop"></i>
                    </div>
                    <div class="finder-sidebar-label">桌面</div>
                </div>
                <div class="finder-sidebar-item ${this.currentPath === '/文档' ? 'active' : ''}" data-path="/文档">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="finder-sidebar-label">文档</div>
                </div>
                <div class="finder-sidebar-item ${this.currentPath === '/下载' ? 'active' : ''}" data-path="/下载">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-download"></i>
                    </div>
                    <div class="finder-sidebar-label">下载</div>
                </div>
                <div class="finder-sidebar-item ${this.currentPath === '/应用程序' ? 'active' : ''}" data-path="/应用程序">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-th"></i>
                    </div>
                    <div class="finder-sidebar-label">应用程序</div>
                </div>
            </div>
            <div class="finder-sidebar-section">
                <div class="finder-sidebar-header">位置</div>
                <div class="finder-sidebar-item ${this.currentPath === '/' ? 'active' : ''}" data-path="/">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-hdd"></i>
                    </div>
                    <div class="finder-sidebar-label">Macintosh HD</div>
                </div>
                <div class="finder-sidebar-item" data-path="/网络">
                    <div class="finder-sidebar-icon">
                        <i class="fas fa-network-wired"></i>
                    </div>
                    <div class="finder-sidebar-label">网络</div>
                </div>
            </div>
            <div class="finder-sidebar-section">
                <div class="finder-sidebar-header">标签</div>
                <div class="finder-sidebar-item" data-path="/标签/最近">
                    <div class="finder-sidebar-icon" style="color: #0071e3;">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="finder-sidebar-label">最近</div>
                </div>
                <div class="finder-sidebar-item" data-path="/标签/文档">
                    <div class="finder-sidebar-icon" style="color: #ff9500;">
                        <i class="fas fa-tag"></i>
                    </div>
                    <div class="finder-sidebar-label">文档</div>
                </div>
                <div class="finder-sidebar-item" data-path="/标签/下载">
                    <div class="finder-sidebar-icon" style="color: #34c759;">
                        <i class="fas fa-tag"></i>
                    </div>
                    <div class="finder-sidebar-label">下载</div>
                </div>
            </div>
        `;
    },
    
    // 创建路径栏
    _createPathBar: function() {
        const pathParts = this.currentPath.split('/').filter(part => part);
        let html = `
            <div class="finder-path-item" data-path="/">
                <i class="fas fa-hdd"></i>
            </div>
        `;
        
        let currentPath = '';
        pathParts.forEach((part, index) => {
            currentPath += '/' + part;
            html += `
                <div class="finder-path-separator">/</div>
                <div class="finder-path-item" data-path="${currentPath}">
                    ${part}
                </div>
            `;
        });
        
        return html;
    },
    
    // 创建文件视图
    _createFilesView: function() {
        const files = this._getDirectoryContents();
        
        if (this.viewMode === 'icon') {
            let html = '';
            files.forEach(file => {
                const fileData = this.fileSystem[`${this.currentPath}/${file}`] || {
                    type: 'directory',
                    name: file,
                    icon: 'icons/folder.png'
                };
                
                const icon = fileData.icon || (fileData.type === 'directory' ? 'icons/folder.png' : 'icons/file.png');
                
                html += `
                    <div class="finder-file-icon" data-path="${this.currentPath}/${file}" data-type="${fileData.type}">
                        <img src="${icon}" alt="${file}">
                        <div class="finder-file-name">${file}</div>
                    </div>
                `;
            });
            
            return html;
        } else if (this.viewMode === 'list') {
            let html = `
                <table class="finder-file-list">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>日期修改</th>
                            <th>大小</th>
                            <th>种类</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            files.forEach(file => {
                const fileData = this.fileSystem[`${this.currentPath}/${file}`] || {
                    type: 'directory',
                    name: file,
                    modified: '—',
                    size: '—',
                    icon: 'icons/folder.png'
                };
                
                const icon = fileData.icon || (fileData.type === 'directory' ? 'icons/folder.png' : 'icons/file.png');
                const kind = fileData.type === 'directory' ? '文件夹' : (fileData.type === 'application' ? '应用程序' : this._getFileKind(file));
                
                html += `
                    <tr data-path="${this.currentPath}/${file}" data-type="${fileData.type}">
                        <td>
                            <img src="${icon}" alt="${file}" class="finder-file-list-icon">
                            ${file}
                        </td>
                        <td>${fileData.modified || '—'}</td>
                        <td>${fileData.size || '—'}</td>
                        <td>${kind}</td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            return html;
        }
        
        return '';
    },
    
    // 获取目录内容
    _getDirectoryContents: function() {
        const directory = this.fileSystem[this.currentPath];
        if (directory && directory.type === 'directory') {
            return directory.children || [];
        }
        return [];
    },
    
    // 获取目录项目数量
    _getDirectoryItemCount: function() {
        return this._getDirectoryContents().length;
    },
    
    // 获取路径名称
    _getPathName: function(path) {
        if (path === '/') {
            return 'Macintosh HD';
        }
        
        const parts = path.split('/');
        return parts[parts.length - 1] || 'Macintosh HD';
    },
    
    // 获取文件类型
    _getFileKind: function(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        
        const kindMap = {
            'txt': '文本文档',
            'pdf': 'PDF 文档',
            'jpg': 'JPEG 图像',
            'jpeg': 'JPEG 图像',
            'png': 'PNG 图像',
            'gif': 'GIF 图像',
            'mp3': 'MP3 音频',
            'mp4': 'MP4 视频',
            'zip': 'ZIP 归档',
            'app': '应用程序',
            'm3u': '播放列表'
        };
        
        return kindMap[extension] || '文档';
    },
    
    // 初始化窗口事件
    _initWindowEvents: function(windowId) {
        // 侧边栏项目点击
        const sidebarItems = document.querySelectorAll(`.window[data-id="${windowId}"] .finder-sidebar-item`);
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                const path = item.getAttribute('data-path');
                this._navigateTo(path, windowId);
            });
        });
        
        // 路径栏项目点击
        const pathItems = document.querySelectorAll(`.window[data-id="${windowId}"] .finder-path-item`);
        pathItems.forEach(item => {
            item.addEventListener('click', () => {
                const path = item.getAttribute('data-path');
                this._navigateTo(path, windowId);
            });
        });
        
        // 文件项目点击
        const fileItems = document.querySelectorAll(`.window[data-id="${windowId}"] .finder-file-icon, .window[data-id="${windowId}"] .finder-file-list tr`);
        fileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 清除其他选中项
                document.querySelectorAll(`.window[data-id="${windowId}"] .finder-file-icon.selected, .window[data-id="${windowId}"] .finder-file-list tr.selected`).forEach(el => {
                    el.classList.remove('selected');
                });
                
                // 选中当前项
                item.classList.add('selected');
                
                // 获取文件路径和类型
                const path = item.getAttribute('data-path');
                const type = item.getAttribute('data-type');
                
                // 添加到选中文件
                this.selectedFiles = [{ path, type }];
            });
            
            item.addEventListener('dblclick', () => {
                const path = item.getAttribute('data-path');
                const type = item.getAttribute('data-type');
                
                if (type === 'directory') {
                    // 导航到目录
                    this._navigateTo(path, windowId);
                } else if (type === 'application') {
                    // 打开应用程序
                    const appName = path.split('/').pop().replace('.app', '').toLowerCase();
                    if (typeof window.openApplication === 'function') {
                        window.openApplication(appName);
                    }
                } else {
                    // 打开文件预览
                    this._openFilePreview(path, windowId);
                }
            });
        });
        
        // 视图选项点击
        const viewOptions = document.querySelectorAll(`.window[data-id="${windowId}"] .finder-view-option`);
        viewOptions.forEach(option => {
            option.addEventListener('click', () => {
                // 清除其他选中项
                document.querySelectorAll(`.window[data-id="${windowId}"] .finder-view-option.active`).forEach(el => {
                    el.classList.remove('active');
                });
                
                // 选中当前项
                option.classList.add('active');
                
                // 设置视图模式
                if (option.classList.contains('icon-view')) {
                    this.viewMode = 'icon';
                } else if (option.classList.contains('list-view')) {
                    this.viewMode = 'list';
                } else if (option.classList.contains('column-view')) {
                    this.viewMode = 'column';
                } else if (option.classList.contains('gallery-view')) {
                    this.viewMode = 'gallery';
                }
                
                // 刷新文件视图
                this._refreshFilesView(windowId);
            });
        });
        
        // 后退按钮点击
        const backButton = document.querySelector(`.window[data-id="${windowId}"] .finder-toolbar-button.back`);
        if (backButton) {
            backButton.addEventListener('click', () => {
                // TODO: 实现后退功能
            });
        }
        
        // 前进按钮点击
        const forwardButton = document.querySelector(`.window[data-id="${windowId}"] .finder-toolbar-button.forward`);
        if (forwardButton) {
            forwardButton.addEventListener('click', () => {
                // TODO: 实现前进功能
            });
        }
        
        // 搜索框输入
        const searchInput = document.querySelector(`.window[data-id="${windowId}"] .finder-search input`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this._searchFiles(searchTerm, windowId);
            });
        }
    },
    
    // 导航到指定路径
    _navigateTo: function(path, windowId) {
        // 更新当前路径
        this.currentPath = path;
        
        // 更新窗口标题
        if (window.windowSystem) {
            window.windowSystem.setWindowTitle(windowId, this._getPathName(path));
        }
        
        // 更新窗口内容
        this._refreshWindowContent(windowId);
    },
    
    // 刷新窗口内容
    _refreshWindowContent: function(windowId) {
        // 更新侧边栏
        const sidebar = document.querySelector(`.window[data-id="${windowId}"] .finder-sidebar`);
        if (sidebar) {
            sidebar.innerHTML = this._createSidebar();
        }
        
        // 更新路径栏
        const pathBar = document.querySelector(`.window[data-id="${windowId}"] .finder-path`);
        if (pathBar) {
            pathBar.innerHTML = this._createPathBar();
        }
        
        // 更新文件视图
        this._refreshFilesView(windowId);
        
        // 更新状态栏
        const statusInfo = document.querySelector(`.window[data-id="${windowId}"] .finder-status-info`);
        if (statusInfo) {
            statusInfo.textContent = `${this._getDirectoryItemCount()} 个项目`;
        }
        
        // 重新初始化事件
        this._initWindowEvents(windowId);
    },
    
    // 刷新文件视图
    _refreshFilesView: function(windowId) {
        const filesContainer = document.querySelector(`.window[data-id="${windowId}"] .finder-files`);
        if (filesContainer) {
            filesContainer.innerHTML = this._createFilesView();
        }
        
        // 重新绑定文件项目事件
        const fileItems = document.querySelectorAll(`.window[data-id="${windowId}"] .finder-file-icon, .window[data-id="${windowId}"] .finder-file-list tr`);
        fileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 清除其他选中项
                document.querySelectorAll(`.window[data-id="${windowId}"] .finder-file-icon.selected, .window[data-id="${windowId}"] .finder-file-list tr.selected`).forEach(el => {
                    el.classList.remove('selected');
                });
                
                // 选中当前项
                item.classList.add('selected');
                
                // 获取文件路径和类型
                const path = item.getAttribute('data-path');
                const type = item.getAttribute('data-type');
                
                // 添加到选中文件
                this.selectedFiles = [{ path, type }];
            });
            
            item.addEventListener('dblclick', () => {
                const path = item.getAttribute('data-path');
                const type = item.getAttribute('data-type');
                
                if (type === 'directory') {
                    // 导航到目录
                    this._navigateTo(path, windowId);
                } else if (type === 'application') {
                    // 打开应用程序
                    const appName = path.split('/').pop().replace('.app', '').toLowerCase();
                    if (typeof window.openApplication === 'function') {
                        window.openApplication(appName);
                    }
                } else {
                    // 打开文件预览
                    this._openFilePreview(path, windowId);
                }
            });
        });
    },
    
    // 搜索文件
    _searchFiles: function(searchTerm, windowId) {
        // TODO: 实现文件搜索功能
    },
    
    // 打开文件预览
    _openFilePreview: function(path, windowId) {
        // TODO: 实现文件预览功能
    }
};

// 初始化访达
function initFinder() {
    finderManager.init();
    
    // 导出访达管理器到全局
    window.finderManager = finderManager;
}

// 当文档加载完成时初始化访达
document.addEventListener('DOMContentLoaded', () => {
    initFinder();
});
