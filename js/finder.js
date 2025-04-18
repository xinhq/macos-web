// finder.js - Finder应用功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Finder功能
    initFinder();
});

/**
 * 初始化Finder功能
 */
function initFinder() {
    // 初始化Finder窗口控制
    initFinderWindowControls();
    
    // 初始化Finder侧边栏
    initFinderSidebar();
    
    // 初始化Finder视图切换
    initFinderViewToggle();
    
    // 初始化Finder文件操作
    initFinderFileOperations();
    
    // 初始化Finder菜单栏
    initFinderMenuBar();
    
    // 初始化Finder路径栏
    initFinderPathBar();
    
    // 初始化Finder上下文菜单
    initFinderContextMenu();
}

/**
 * 初始化Finder窗口控制
 */
function initFinderWindowControls() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    // 初始化窗口控制按钮
    initWindowControls(finderWindow);
    
    // 侧边栏切换按钮
    const sidebarToggle = finderWindow.querySelector('.sidebar-toggle');
    const finderSidebar = finderWindow.querySelector('.finder-sidebar');
    
    if (sidebarToggle && finderSidebar) {
        sidebarToggle.addEventListener('click', function() {
            finderSidebar.classList.toggle('hidden');
            
            // 调整文件区域宽度
            const finderContent = finderWindow.querySelector('.finder-content');
            if (finderContent) {
                finderContent.classList.toggle('full-width');
            }
        });
    }
}

/**
 * 初始化Finder侧边栏
 */
function initFinderSidebar() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const sidebarItems = finderWindow.querySelectorAll('.sidebar-item');
    
    // 为每个侧边栏项添加点击事件
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他项的活动状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前项的活动状态
            this.classList.add('active');
            
            // 获取当前项的标签文本
            const label = this.querySelector('.sidebar-label').textContent;
            
            // 更新路径栏
            updateFinderPathBar(label);
            
            // 更新文件显示
            updateFinderFiles(label);
        });
    });
}

/**
 * 初始化Finder视图切换
 */
function initFinderViewToggle() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const viewButtons = finderWindow.querySelectorAll('.view-button');
    const finderFiles = finderWindow.querySelector('.finder-files');
    
    // 为每个视图按钮添加点击事件
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的活动状态
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            // 更新文件区域的视图类
            if (finderFiles) {
                finderFiles.className = 'finder-files';
                
                if (this.classList.contains('icon-view')) {
                    finderFiles.classList.add('icon-view');
                } else if (this.classList.contains('list-view')) {
                    finderFiles.classList.add('list-view');
                } else if (this.classList.contains('column-view')) {
                    finderFiles.classList.add('column-view');
                }
            }
        });
    });
}

/**
 * 初始化Finder文件操作
 */
function initFinderFileOperations() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const finderFiles = finderWindow.querySelector('.finder-files');
    
    // 如果文件区域不存在，则返回
    if (!finderFiles) return;
    
    // 为文件项添加点击事件
    finderFiles.addEventListener('click', function(e) {
        const fileItem = e.target.closest('.file-item');
        
        if (fileItem) {
            // 移除其他文件项的选中状态
            const allFileItems = finderFiles.querySelectorAll('.file-item');
            allFileItems.forEach(item => item.classList.remove('selected'));
            
            // 添加当前文件项的选中状态
            fileItem.classList.add('selected');
            
            // 如果是双击，则打开文件或文件夹
            if (e.detail === 2) {
                openFinderItem(fileItem);
            }
        }
    });
    
    // 添加新建文件夹按钮事件
    const newFolderButton = finderWindow.querySelector('.new-folder-button');
    
    if (newFolderButton) {
        newFolderButton.addEventListener('click', function() {
            showNewFolderDialog();
        });
    }
}

/**
 * 初始化Finder菜单栏
 */
function initFinderMenuBar() {
    // 获取Finder菜单项
    const finderMenu = document.getElementById('finder-menu');
    
    // 如果Finder菜单不存在，则返回
    if (!finderMenu) return;
    
    // 为Finder菜单项添加点击事件
    finderMenu.addEventListener('click', function() {
        toggleFinderDropdown();
    });
    
    // 获取文件菜单项
    const fileMenu = document.getElementById('file-menu');
    
    // 如果文件菜单不存在，则返回
    if (!fileMenu) return;
    
    // 为文件菜单项添加点击事件
    fileMenu.addEventListener('click', function() {
        toggleFileDropdown();
    });
    
    // 获取编辑菜单项
    const editMenu = document.getElementById('edit-menu');
    
    // 如果编辑菜单不存在，则返回
    if (!editMenu) return;
    
    // 为编辑菜单项添加点击事件
    editMenu.addEventListener('click', function() {
        toggleEditDropdown();
    });
    
    // 获取显示菜单项
    const viewMenu = document.getElementById('view-menu');
    
    // 如果显示菜单不存在，则返回
    if (!viewMenu) return;
    
    // 为显示菜单项添加点击事件
    viewMenu.addEventListener('click', function() {
        toggleViewDropdown();
    });
}

/**
 * 初始化Finder路径栏
 */
function initFinderPathBar() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const pathBar = finderWindow.querySelector('.finder-path-bar');
    
    // 如果路径栏不存在，则返回
    if (!pathBar) return;
    
    // 为路径项添加点击事件
    pathBar.addEventListener('click', function(e) {
        const pathItem = e.target.closest('.path-item');
        
        if (pathItem) {
            // 获取路径标签
            const pathLabel = pathItem.querySelector('.path-label').textContent;
            
            // 更新文件显示
            updateFinderFiles(pathLabel);
            
            // 更新路径栏
            updateFinderPathBar(pathLabel);
        }
    });
}

/**
 * 初始化Finder上下文菜单
 */
function initFinderContextMenu() {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const finderFiles = finderWindow.querySelector('.finder-files');
    const contextMenu = document.querySelector('.file-context-menu');
    
    // 如果文件区域或上下文菜单不存在，则返回
    if (!finderFiles || !contextMenu) return;
    
    // 为文件区域添加右键菜单事件
    finderFiles.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // 获取点击的文件项
        const fileItem = e.target.closest('.file-item');
        
        // 如果点击的是文件项，则选中该文件项
        if (fileItem) {
            // 移除其他文件项的选中状态
            const allFileItems = finderFiles.querySelectorAll('.file-item');
            allFileItems.forEach(item => item.classList.remove('selected'));
            
            // 添加当前文件项的选中状态
            fileItem.classList.add('selected');
        }
        
        // 显示上下文菜单
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.classList.add('show');
        
        // 更新上下文菜单内容
        updateContextMenu(fileItem);
    });
    
    // 点击其他区域关闭上下文菜单
    document.addEventListener('click', function() {
        contextMenu.classList.remove('show');
    });
}

/**
 * 更新Finder路径栏
 * @param {string} location - 位置名称
 */
function updateFinderPathBar(location) {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const pathBar = finderWindow.querySelector('.finder-path-bar');
    
    // 如果路径栏不存在，则返回
    if (!pathBar) return;
    
    // 清空路径栏
    pathBar.innerHTML = '';
    
    // 创建路径项
    const pathItem = document.createElement('div');
    pathItem.className = 'path-item active';
    
    // 设置图标
    let iconSrc = 'icons/system/folder.svg';
    
    switch (location) {
        case '隔空投送':
            iconSrc = 'icons/system/airdrop.svg';
            break;
        case '最近':
            iconSrc = 'icons/system/recents.svg';
            break;
        case '应用程序':
            iconSrc = 'icons/system/applications.svg';
            break;
        case '文稿':
            iconSrc = 'icons/system/documents.svg';
            break;
        case '下载':
            iconSrc = 'icons/system/downloads.svg';
            break;
        case 'iCloud':
            iconSrc = 'icons/system/icloud.svg';
            break;
        case 'Macintosh HD':
            iconSrc = 'icons/system/macintosh-hd.svg';
            break;
        case '废纸篓':
            iconSrc = 'icons/system/trash.svg';
            break;
    }
    
    pathItem.innerHTML = `
        <img src="${iconSrc}" alt="${location}" class="path-icon">
        <span class="path-label">${location}</span>
    `;
    
    // 添加到路径栏
    pathBar.appendChild(pathItem);
}

/**
 * 更新Finder文件显示
 * @param {string} location - 位置名称
 */
function updateFinderFiles(location) {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const finderFiles = finderWindow.querySelector('.finder-files');
    
    // 如果文件区域不存在，则返回
    if (!finderFiles) return;
    
    // 清空文件区域
    finderFiles.innerHTML = '';
    
    // 根据位置显示不同的文件
    switch (location) {
        case '隔空投送':
            finderFiles.innerHTML = `
                <div class="airdrop-placeholder">
                    <div class="airdrop-icon">
                        <img src="icons/system/airdrop-large.svg" alt="隔空投送">
                    </div>
                    <p>正在查找可用设备...</p>
                </div>
            `;
            break;
        
        case '最近':
            // 添加最近文件
            addFileItem(finderFiles, 'document.pdf', 'icons/system/pdf.svg');
            addFileItem(finderFiles, 'presentation.key', 'icons/system/keynote.svg');
            addFileItem(finderFiles, 'spreadsheet.numbers', 'icons/system/numbers.svg');
            addFileItem(finderFiles, 'image.jpg', 'icons/system/image.svg');
            break;
        
        case '应用程序':
            // 添加应用程序
            addFileItem(finderFiles, 'Safari', 'icons/apps/safari.png');
            addFileItem(finderFiles, '邮件', 'icons/apps/mail.png');
            addFileItem(finderFiles, '备忘录', 'icons/apps/notes.png');
            addFileItem(finderFiles, '信息', 'icons/apps/messages.png');
            addFileItem(finderFiles, '地图', 'icons/apps/maps.png');
            addFileItem(finderFiles, '照片', 'icons/apps/photos.png');
            addFileItem(finderFiles, '系统偏好设置', 'icons/apps/settings.png');
            break;
        
        case '文稿':
            // 添加文档
            addFileItem(finderFiles, '项目计划.pages', 'icons/system/pages.svg');
            addFileItem(finderFiles, '财务报表.numbers', 'icons/system/numbers.svg');
            addFileItem(finderFiles, '演示文稿.key', 'icons/system/keynote.svg');
            addFileItem(finderFiles, '笔记', 'icons/system/folder.svg', true);
            break;
        
        case '下载':
            // 添加下载文件
            addFileItem(finderFiles, 'installer.dmg', 'icons/system/dmg.svg');
            addFileItem(finderFiles, 'archive.zip', 'icons/system/zip.svg');
            addFileItem(finderFiles, 'document.pdf', 'icons/system/pdf.svg');
            break;
        
        case 'iCloud':
            // 添加iCloud文件
            addFileItem(finderFiles, 'iCloud云盘', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '文稿', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '桌面', 'icons/system/folder.svg', true);
            break;
        
        case 'Macintosh HD':
            // 添加系统文件夹
            addFileItem(finderFiles, '应用程序', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '资源库', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '系统', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '用户', 'icons/system/folder.svg', true);
            break;
        
        case '废纸篓':
            // 显示空废纸篓消息
            finderFiles.innerHTML = `
                <div class="empty-trash-message">
                    <img src="icons/system/trash-empty.svg" alt="空废纸篓" style="width: 64px; height: 64px; opacity: 0.5; margin-bottom: 10px;">
                    <p>废纸篓为空</p>
                </div>
            `;
            break;
        
        default:
            // 默认显示
            addFileItem(finderFiles, '文稿', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '下载', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, '应用程序', 'icons/system/folder.svg', true);
            addFileItem(finderFiles, 'document.pdf', 'icons/system/pdf.svg');
    }
    
    // 更新状态栏信息
    updateFinderStatusBar(finderFiles.querySelectorAll('.file-item').length);
}

/**
 * 添加文件项到Finder文件区域
 * @param {HTMLElement} container - 容器元素
 * @param {string} name - 文件名
 * @param {string} iconSrc - 图标路径
 * @param {boolean} isFolder - 是否为文件夹
 */
function addFileItem(container, name, iconSrc, isFolder = false) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.name = name;
    fileItem.dataset.isFolder = isFolder;
    
    fileItem.innerHTML = `
        <div class="file-icon">
            <img src="${iconSrc}" alt="${name}">
        </div>
        <div class="file-name">${name}</div>
    `;
    
    container.appendChild(fileItem);
}

/**
 * 更新Finder状态栏信息
 * @param {number} itemCount - 项目数量
 */
function updateFinderStatusBar(itemCount) {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const statusInfo = finderWindow.querySelector('.status-info');
    
    // 如果状态信息元素不存在，则返回
    if (!statusInfo) return;
    
    // 更新状态信息
    statusInfo.textContent = `${itemCount}项，可用空间15.24GB`;
}

/**
 * 打开Finder项目
 * @param {HTMLElement} fileItem - 文件项元素
 */
function openFinderItem(fileItem) {
    // 获取文件名和类型
    const fileName = fileItem.dataset.name;
    const isFolder = fileItem.dataset.isFolder === 'true';
    
    if (isFolder) {
        // 如果是文件夹，则更新路径栏和文件显示
        updateFinderPathBar(fileName);
        updateFinderFiles(fileName);
    } else {
        // 如果是文件，则根据文件类型打开相应的应用
        openFileWithApp(fileName);
    }
}

/**
 * 使用相应的应用打开文件
 * @param {string} fileName - 文件名
 */
function openFileWithApp(fileName) {
    // 获取文件扩展名
    const extension = fileName.split('.').pop().toLowerCase();
    
    // 根据扩展名打开相应的应用
    switch (extension) {
        case 'pdf':
            // 打开PDF查看器
            openPdfViewer(fileName);
            break;
        
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            // 打开图片查看器
            openImageViewer(fileName);
            break;
        
        case 'key':
            // 打开Keynote
            alert(`Keynote将打开文件：${fileName}`);
            break;
        
        case 'numbers':
            // 打开Numbers
            alert(`Numbers将打开文件：${fileName}`);
            break;
        
        case 'pages':
            // 打开Pages
            alert(`Pages将打开文件：${fileName}`);
            break;
        
        case 'dmg':
            // 打开磁盘映像
            alert(`将挂载磁盘映像：${fileName}`);
            break;
        
        case 'zip':
            // 打开压缩文件
            alert(`将解压文件：${fileName}`);
            break;
        
        default:
            // 默认操作
            alert(`无法打开文件：${fileName}`);
    }
}

/**
 * 打开PDF查看器
 * @param {string} fileName - 文件名
 */
function openPdfViewer(fileName) {
    // 创建PDF查看器窗口
    const pdfWindow = document.createElement('div');
    pdfWindow.className = 'window pdf-window';
    pdfWindow.id = 'pdf-window';
    
    // 设置窗口位置和大小
    pdfWindow.style.width = '800px';
    pdfWindow.style.height = '600px';
    pdfWindow.style.top = '80px';
    pdfWindow.style.left = '160px';
    
    // 添加窗口内容
    pdfWindow.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <div class="control close"></div>
                <div class="control minimize"></div>
                <div class="control maximize"></div>
            </div>
            <div class="window-title">${fileName}</div>
        </div>
        <div class="window-toolbar">
            <div class="toolbar-controls">
                <button class="toolbar-button">
                    <img src="icons/system/zoom-out.svg" alt="缩小">
                </button>
                <button class="toolbar-button">
                    <img src="icons/system/zoom-in.svg" alt="放大">
                </button>
            </div>
            <div class="toolbar-actions">
                <button class="toolbar-button">
                    <img src="icons/system/share.svg" alt="分享">
                </button>
                <button class="toolbar-button">
                    <img src="icons/system/print.svg" alt="打印">
                </button>
            </div>
        </div>
        <div class="window-content">
            <div class="pdf-content">
                <div class="pdf-placeholder">
                    <img src="img/pdf-placeholder.jpg" alt="PDF预览" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
            </div>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(pdfWindow);
    
    // 初始化窗口控制
    initWindowControls(pdfWindow);
    
    // 打开窗口
    openWindow(pdfWindow);
}

/**
 * 打开图片查看器
 * @param {string} fileName - 文件名
 */
function openImageViewer(fileName) {
    // 创建图片查看器窗口
    const imageWindow = document.createElement('div');
    imageWindow.className = 'window image-window';
    imageWindow.id = 'image-window';
    
    // 设置窗口位置和大小
    imageWindow.style.width = '800px';
    imageWindow.style.height = '600px';
    imageWindow.style.top = '80px';
    imageWindow.style.left = '160px';
    
    // 添加窗口内容
    imageWindow.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <div class="control close"></div>
                <div class="control minimize"></div>
                <div class="control maximize"></div>
            </div>
            <div class="window-title">${fileName}</div>
        </div>
        <div class="window-toolbar">
            <div class="toolbar-controls">
                <button class="toolbar-button">
                    <img src="icons/system/zoom-out.svg" alt="缩小">
                </button>
                <button class="toolbar-button">
                    <img src="icons/system/zoom-in.svg" alt="放大">
                </button>
            </div>
            <div class="toolbar-actions">
                <button class="toolbar-button">
                    <img src="icons/system/share.svg" alt="分享">
                </button>
                <button class="toolbar-button">
                    <img src="icons/system/edit.svg" alt="编辑">
                </button>
            </div>
        </div>
        <div class="window-content">
            <div class="image-content">
                <div class="image-placeholder">
                    <img src="img/image-placeholder.jpg" alt="图片预览" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
            </div>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(imageWindow);
    
    // 初始化窗口控制
    initWindowControls(imageWindow);
    
    // 打开窗口
    openWindow(imageWindow);
}

/**
 * 显示新建文件夹对话框
 */
function showNewFolderDialog() {
    const newFolderDialog = document.querySelector('.new-folder-dialog');
    
    // 如果对话框不存在，则创建
    if (!newFolderDialog) {
        // 创建对话框
        const dialog = document.createElement('div');
        dialog.className = 'new-folder-dialog';
        
        dialog.innerHTML = `
            <div class="dialog-title">新建文件夹</div>
            <input type="text" class="folder-name-input" placeholder="输入文件夹名称" value="未命名文件夹">
            <div class="dialog-buttons">
                <button class="dialog-button cancel-button">取消</button>
                <button class="dialog-button create-button">创建</button>
            </div>
        `;
        
        // 添加到文档
        document.body.appendChild(dialog);
        
        // 添加事件监听器
        const cancelButton = dialog.querySelector('.cancel-button');
        const createButton = dialog.querySelector('.create-button');
        const folderNameInput = dialog.querySelector('.folder-name-input');
        
        // 取消按钮
        cancelButton.addEventListener('click', function() {
            dialog.classList.remove('show');
        });
        
        // 创建按钮
        createButton.addEventListener('click', function() {
            const folderName = folderNameInput.value.trim();
            
            if (folderName) {
                // 创建新文件夹
                createNewFolder(folderName);
                
                // 关闭对话框
                dialog.classList.remove('show');
            }
        });
        
        // 回车键创建
        folderNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                createButton.click();
            }
        });
        
        // 显示对话框
        dialog.classList.add('show');
        
        // 选中输入框文本
        folderNameInput.select();
    } else {
        // 显示对话框
        newFolderDialog.classList.add('show');
        
        // 选中输入框文本
        const folderNameInput = newFolderDialog.querySelector('.folder-name-input');
        folderNameInput.select();
    }
}

/**
 * 创建新文件夹
 * @param {string} folderName - 文件夹名称
 */
function createNewFolder(folderName) {
    const finderWindow = document.getElementById('finder-window');
    
    // 如果Finder窗口不存在，则返回
    if (!finderWindow) return;
    
    const finderFiles = finderWindow.querySelector('.finder-files');
    
    // 如果文件区域不存在，则返回
    if (!finderFiles) return;
    
    // 添加新文件夹
    addFileItem(finderFiles, folderName, 'icons/system/folder.svg', true);
    
    // 更新状态栏信息
    updateFinderStatusBar(finderFiles.querySelectorAll('.file-item').length);
}

/**
 * 更新上下文菜单内容
 * @param {HTMLElement} fileItem - 文件项元素
 */
function updateContextMenu(fileItem) {
    const contextMenu = document.querySelector('.file-context-menu');
    
    // 如果上下文菜单不存在，则返回
    if (!contextMenu) return;
    
    // 清空上下文菜单
    contextMenu.innerHTML = '';
    
    if (fileItem) {
        // 文件项上下文菜单
        const fileName = fileItem.dataset.name;
        const isFolder = fileItem.dataset.isFolder === 'true';
        
        // 添加菜单项
        addContextMenuItem(contextMenu, '打开', function() {
            openFinderItem(fileItem);
        });
        
        if (isFolder) {
            addContextMenuItem(contextMenu, '在新窗口中打开', function() {
                alert(`在新窗口中打开文件夹：${fileName}`);
            });
        } else {
            addContextMenuItem(contextMenu, '打开方式', function() {
                alert(`选择应用打开文件：${fileName}`);
            });
        }
        
        addContextMenuDivider(contextMenu);
        
        addContextMenuItem(contextMenu, '获取信息', function() {
            alert(`显示${isFolder ? '文件夹' : '文件'}信息：${fileName}`);
        });
        
        addContextMenuItem(contextMenu, '重命名', function() {
            alert(`重命名${isFolder ? '文件夹' : '文件'}：${fileName}`);
        });
        
        addContextMenuDivider(contextMenu);
        
        addContextMenuItem(contextMenu, '复制', function() {
            alert(`复制${isFolder ? '文件夹' : '文件'}：${fileName}`);
        });
        
        addContextMenuItem(contextMenu, '移动到废纸篓', function() {
            alert(`移动${isFolder ? '文件夹' : '文件'}到废纸篓：${fileName}`);
        });
    } else {
        // 空白区域上下文菜单
        addContextMenuItem(contextMenu, '新建文件夹', function() {
            showNewFolderDialog();
        });
        
        addContextMenuItem(contextMenu, '排序方式', function() {
            alert('选择排序方式');
        });
        
        addContextMenuDivider(contextMenu);
        
        addContextMenuItem(contextMenu, '粘贴', function() {
            alert('粘贴项目');
        });
    }
}

/**
 * 添加上下文菜单项
 * @param {HTMLElement} menu - 菜单元素
 * @param {string} text - 菜单项文本
 * @param {Function} callback - 点击回调函数
 */
function addContextMenuItem(menu, text, callback) {
    const menuItem = document.createElement('div');
    menuItem.className = 'context-menu-item';
    menuItem.textContent = text;
    
    menuItem.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // 隐藏菜单
        menu.classList.remove('show');
        
        // 执行回调
        if (typeof callback === 'function') {
            callback();
        }
    });
    
    menu.appendChild(menuItem);
}

/**
 * 添加上下文菜单分隔线
 * @param {HTMLElement} menu - 菜单元素
 */
function addContextMenuDivider(menu) {
    const divider = document.createElement('div');
    divider.className = 'context-menu-divider';
    
    menu.appendChild(divider);
}

/**
 * 切换Finder下拉菜单
 */
function toggleFinderDropdown() {
    const finderDropdown = document.getElementById('finder-dropdown');
    
    if (finderDropdown) {
        // 隐藏其他下拉菜单
        hideAllDropdowns();
        
        // 切换当前下拉菜单
        finderDropdown.classList.toggle('show');
    }
}

/**
 * 切换文件下拉菜单
 */
function toggleFileDropdown() {
    const fileDropdown = document.getElementById('file-dropdown');
    
    if (fileDropdown) {
        // 隐藏其他下拉菜单
        hideAllDropdowns();
        
        // 切换当前下拉菜单
        fileDropdown.classList.toggle('show');
    }
}

/**
 * 切换编辑下拉菜单
 */
function toggleEditDropdown() {
    const editDropdown = document.getElementById('edit-dropdown');
    
    if (editDropdown) {
        // 隐藏其他下拉菜单
        hideAllDropdowns();
        
        // 切换当前下拉菜单
        editDropdown.classList.toggle('show');
    }
}

/**
 * 切换显示下拉菜单
 */
function toggleViewDropdown() {
    const viewDropdown = document.getElementById('view-dropdown');
    
    if (viewDropdown) {
        // 隐藏其他下拉菜单
        hideAllDropdowns();
        
        // 切换当前下拉菜单
        viewDropdown.classList.toggle('show');
    }
}

/**
 * 隐藏所有下拉菜单
 */
function hideAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
}

// 点击其他区域关闭下拉菜单
document.addEventListener('click', function(e) {
    // 如果点击的不是菜单项
    if (!e.target.closest('.menu-item')) {
        hideAllDropdowns();
    }
});

// 导出函数供其他模块使用
window.toggleFinderDropdown = toggleFinderDropdown;
window.toggleFileDropdown = toggleFileDropdown;
window.toggleEditDropdown = toggleEditDropdown;
window.toggleViewDropdown = toggleViewDropdown;
