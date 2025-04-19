/**
 * macOS Monterey 网页版 - 系统偏好设置功能
 * 负责系统偏好设置窗口的交互和功能实现
 */

// 系统偏好设置管理器
const settingsManager = {
    // 当前打开的设置窗口
    windows: [],
    
    // 当前活动的设置面板
    activePanel: 'general',
    
    // 当前视图模式：grid, sidebar
    viewMode: 'grid',
    
    // 设置项列表
    settings: [
        { id: 'general', name: '通用', icon: 'icons/settings/general.png', category: 'system' },
        { id: 'appearance', name: '外观', icon: 'icons/settings/appearance.png', category: 'system' },
        { id: 'dock', name: 'Dock与菜单栏', icon: 'icons/settings/dock.png', category: 'system' },
        { id: 'display', name: '显示器', icon: 'icons/settings/display.png', category: 'system' },
        { id: 'wallpaper', name: '桌面与屏幕保护程序', icon: 'icons/settings/wallpaper.png', category: 'system' },
        { id: 'accessibility', name: '辅助功能', icon: 'icons/settings/accessibility.png', category: 'system' },
        { id: 'users', name: '用户与群组', icon: 'icons/settings/users.png', category: 'system' },
        { id: 'siri', name: 'Siri', icon: 'icons/settings/siri.png', category: 'system' },
        { id: 'touchid', name: 'Touch ID', icon: 'icons/settings/touchid.png', category: 'system' },
        { id: 'language', name: '语言与地区', icon: 'icons/settings/language.png', category: 'system' },
        { id: 'datetime', name: '日期与时间', icon: 'icons/settings/datetime.png', category: 'system' },
        { id: 'storage', name: '存储空间', icon: 'icons/settings/storage.png', category: 'system' },
        { id: 'battery', name: '电池', icon: 'icons/settings/battery.png', category: 'system' },
        { id: 'network', name: '网络', icon: 'icons/settings/network.png', category: 'internet' },
        { id: 'bluetooth', name: '蓝牙', icon: 'icons/settings/bluetooth.png', category: 'internet' },
        { id: 'sound', name: '声音', icon: 'icons/settings/sound.png', category: 'hardware' },
        { id: 'keyboard', name: '键盘', icon: 'icons/settings/keyboard.png', category: 'hardware' },
        { id: 'trackpad', name: '触控板', icon: 'icons/settings/trackpad.png', category: 'hardware' },
        { id: 'mouse', name: '鼠标', icon: 'icons/settings/mouse.png', category: 'hardware' },
        { id: 'printers', name: '打印机与扫描仪', icon: 'icons/settings/printers.png', category: 'hardware' },
        { id: 'notifications', name: '通知与专注模式', icon: 'icons/settings/notifications.png', category: 'apps' },
        { id: 'security', name: '安全性与隐私', icon: 'icons/settings/security.png', category: 'apps' },
        { id: 'software', name: '软件更新', icon: 'icons/settings/software.png', category: 'apps' }
    ],
    
    // 初始化系统偏好设置
    init: function() {
        console.log('系统偏好设置已初始化');
    },
    
    // 创建新的系统偏好设置窗口
    createWindow: function(panelId = 'general') {
        // 设置当前活动面板
        this.activePanel = panelId;
        
        // 创建窗口内容
        const content = this._createSettingsContent();
        
        // 使用窗口系统创建窗口
        if (window.windowSystem) {
            const settingsWindow = window.windowSystem.createWindow({
                app: 'settings',
                title: '系统偏好设置',
                width: 700,
                height: 500,
                minWidth: 600,
                minHeight: 400,
                resizable: true,
                maximizable: true,
                minimizable: true,
                content: content
            });
            
            // 保存窗口引用
            this.windows.push({
                id: settingsWindow.id,
                panel: panelId
            });
            
            // 初始化窗口事件
            this._initWindowEvents(settingsWindow.id);
            
            return settingsWindow;
        }
        
        return null;
    },
    
    // 创建系统偏好设置内容
    _createSettingsContent: function() {
        return `
            <div class="settings-window">
                <div class="settings-header">
                    <div class="settings-search">
                        <input type="text" placeholder="搜索">
                        <div class="settings-search-icon">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                    <div class="settings-view-toggle">
                        <div class="settings-view-option grid-view ${this.viewMode === 'grid' ? 'active' : ''}" title="图标视图">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <div class="settings-view-option sidebar-view ${this.viewMode === 'sidebar' ? 'active' : ''}" title="侧边栏视图">
                            <i class="fas fa-list"></i>
                        </div>
                    </div>
                </div>
                <div class="settings-content">
                    ${this.viewMode === 'grid' ? this._createGridView() : this._createSidebarView()}
                </div>
            </div>
        `;
    },
    
    // 创建网格视图
    _createGridView: function() {
        let html = `<div class="settings-grid">`;
        
        this.settings.forEach(setting => {
            html += `
                <div class="settings-item" data-id="${setting.id}">
                    <div class="settings-item-icon">
                        <img src="${setting.icon}" alt="${setting.name}">
                    </div>
                    <div class="settings-item-name">${setting.name}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        
        return html;
    },
    
    // 创建侧边栏视图
    _createSidebarView: function() {
        let html = `
            <div class="settings-sidebar">
                <div class="settings-sidebar-section">
                    <div class="settings-sidebar-header">系统</div>
                    ${this._createSidebarItems('system')}
                </div>
                <div class="settings-sidebar-section">
                    <div class="settings-sidebar-header">互联网与无线</div>
                    ${this._createSidebarItems('internet')}
                </div>
                <div class="settings-sidebar-section">
                    <div class="settings-sidebar-header">硬件</div>
                    ${this._createSidebarItems('hardware')}
                </div>
                <div class="settings-sidebar-section">
                    <div class="settings-sidebar-header">应用与服务</div>
                    ${this._createSidebarItems('apps')}
                </div>
            </div>
            <div class="settings-panel">
                ${this._createSettingsPanel(this.activePanel)}
            </div>
        `;
        
        return html;
    },
    
    // 创建侧边栏项目
    _createSidebarItems: function(category) {
        let html = '';
        
        this.settings.filter(setting => setting.category === category).forEach(setting => {
            html += `
                <div class="settings-sidebar-item ${setting.id === this.activePanel ? 'active' : ''}" data-id="${setting.id}">
                    <div class="settings-sidebar-icon">
                        <img src="${setting.icon}" alt="${setting.name}">
                    </div>
                    <div class="settings-sidebar-label">${setting.name}</div>
                </div>
            `;
        });
        
        return html;
    },
    
    // 创建设置面板
    _createSettingsPanel: function(panelId) {
        switch (panelId) {
            case 'general':
                return this._createGeneralPanel();
            case 'appearance':
                return this._createAppearancePanel();
            case 'wallpaper':
                return this._createWallpaperPanel();
            case 'dock':
                return this._createDockPanel();
            case 'display':
                return this._createDisplayPanel();
            case 'sound':
                return this._createSoundPanel();
            default:
                return this._createDefaultPanel(panelId);
        }
    },
    
    // 创建通用设置面板
    _createGeneralPanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">通用</div>
                <div class="settings-panel-description">配置系统的通用设置</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">外观</div>
                <div class="settings-option">
                    <div class="settings-option-label">外观：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="appearance-select">
                            <option value="light">浅色</option>
                            <option value="dark">深色</option>
                            <option value="auto">自动</option>
                        </select>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">强调色：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="accent-color-select">
                            <option value="blue">蓝色</option>
                            <option value="purple">紫色</option>
                            <option value="pink">粉色</option>
                            <option value="red">红色</option>
                            <option value="orange">橙色</option>
                            <option value="yellow">黄色</option>
                            <option value="green">绿色</option>
                            <option value="graphite">石墨色</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">侧边栏图标大小</div>
                <div class="settings-option">
                    <div class="settings-option-label">大小：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="sidebar-size-select">
                            <option value="small">小</option>
                            <option value="medium" selected>中</option>
                            <option value="large">大</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">最近使用的项目</div>
                <div class="settings-option">
                    <div class="settings-option-label">在"最近使用的项目"中显示：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="recent-items-select">
                            <option value="5">5 个</option>
                            <option value="10" selected>10 个</option>
                            <option value="15">15 个</option>
                            <option value="20">20 个</option>
                            <option value="30">30 个</option>
                            <option value="50">50 个</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-option">
                    <div class="settings-option-label">在文档中询问是否保存更改：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">关闭文档时保存到 iCloud：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">在浏览器中打开"安全"文件：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建外观设置面板
    _createAppearancePanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">外观</div>
                <div class="settings-panel-description">自定义系统的外观</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">外观</div>
                <div class="settings-option">
                    <div class="settings-option-label">自动切换外观：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="auto-appearance-toggle">
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">外观：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="theme-select">
                            <option value="light">浅色</option>
                            <option value="dark">深色</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">强调色</div>
                <div class="settings-option">
                    <div class="settings-option-label">颜色：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="accent-select">
                            <option value="blue">蓝色</option>
                            <option value="purple">紫色</option>
                            <option value="pink">粉色</option>
                            <option value="red">红色</option>
                            <option value="orange">橙色</option>
                            <option value="yellow">黄色</option>
                            <option value="green">绿色</option>
                            <option value="graphite">石墨色</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">高亮显示颜色</div>
                <div class="settings-option">
                    <div class="settings-option-label">颜色：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="highlight-select">
                            <option value="blue">蓝色</option>
                            <option value="purple">紫色</option>
                            <option value="pink">粉色</option>
                            <option value="red">红色</option>
                            <option value="orange">橙色</option>
                            <option value="yellow">黄色</option>
                            <option value="green">绿色</option>
                            <option value="graphite">石墨色</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建壁纸设置面板
    _createWallpaperPanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">桌面与屏幕保护程序</div>
                <div class="settings-panel-description">自定义桌面背景和屏幕保护程序</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">桌面图片</div>
                <div class="settings-wallpaper-grid">
                    <div class="settings-wallpaper-item active" data-wallpaper="img/wallpaper-monterey.jpg">
                        <img src="img/wallpaper-monterey.jpg" alt="Monterey">
                    </div>
                    <div class="settings-wallpaper-item" data-wallpaper="img/wallpaper-bigsur.jpg">
                        <img src="img/wallpaper-bigsur.jpg" alt="Big Sur">
                    </div>
                    <div class="settings-wallpaper-item" data-wallpaper="img/wallpaper-catalina.jpg">
                        <img src="img/wallpaper-catalina.jpg" alt="Catalina">
                    </div>
                    <div class="settings-wallpaper-item" data-wallpaper="img/wallpaper-mojave.jpg">
                        <img src="img/wallpaper-mojave.jpg" alt="Mojave">
                    </div>
                    <div class="settings-wallpaper-item" data-wallpaper="img/wallpaper-mojave-dark.jpg">
                        <img src="img/wallpaper-mojave-dark.jpg" alt="Mojave Dark">
                    </div>
                    <div class="settings-wallpaper-item" data-wallpaper="img/wallpaper-highsierra.jpg">
                        <img src="img/wallpaper-highsierra.jpg" alt="High Sierra">
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">屏幕保护程序</div>
                <div class="settings-option">
                    <div class="settings-option-label">开始时间：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="screensaver-time-select">
                            <option value="1">1 分钟</option>
                            <option value="5">5 分钟</option>
                            <option value="10">10 分钟</option>
                            <option value="15">15 分钟</option>
                            <option value="30">30 分钟</option>
                            <option value="60">1 小时</option>
                            <option value="never">从不</option>
                        </select>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">在屏幕保护程序开始后要求输入密码：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建Dock设置面板
    _createDockPanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">Dock与菜单栏</div>
                <div class="settings-panel-description">自定义Dock、菜单栏和控制中心</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">Dock大小</div>
                <div class="settings-option">
                    <div class="settings-option-label">大小：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 50%;"></div>
                        </div>
                        <span>小</span>
                        <span>大</span>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">Dock放大</div>
                <div class="settings-option">
                    <div class="settings-option-label">放大：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="dock-magnification-toggle" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">放大程度：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 70%;"></div>
                        </div>
                        <span>小</span>
                        <span>大</span>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">位置</div>
                <div class="settings-option">
                    <div class="settings-option-label">屏幕上的位置：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="dock-position-select">
                            <option value="bottom">底部</option>
                            <option value="left">左侧</option>
                            <option value="right">右侧</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-option">
                    <div class="settings-option-label">自动隐藏和显示Dock：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="dock-autohide-toggle">
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">在Dock中显示最近使用的应用程序：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="dock-recent-apps-toggle" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">将窗口最小化到应用程序图标：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="dock-minimize-to-app-toggle">
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建显示器设置面板
    _createDisplayPanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">显示器</div>
                <div class="settings-panel-description">调整显示器设置</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">分辨率</div>
                <div class="settings-option">
                    <div class="settings-option-label">分辨率：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="resolution-select">
                            <option value="default">默认</option>
                            <option value="scaled">缩放</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">亮度</div>
                <div class="settings-option">
                    <div class="settings-option-label">亮度：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 80%;"></div>
                        </div>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">自动调节亮度：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="auto-brightness-toggle" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">夜览</div>
                <div class="settings-option">
                    <div class="settings-option-label">夜览：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="night-shift-toggle">
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">时间表：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="night-shift-schedule-select">
                            <option value="sunset">日落到日出</option>
                            <option value="custom">自定义</option>
                            <option value="none">关闭</option>
                        </select>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">色温：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 60%;"></div>
                        </div>
                        <span>较冷</span>
                        <span>较暖</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建声音设置面板
    _createSoundPanel: function() {
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">声音</div>
                <div class="settings-panel-description">调整系统声音设置</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">音量</div>
                <div class="settings-option">
                    <div class="settings-option-label">输出音量：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 70%;"></div>
                        </div>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">静音：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="mute-toggle">
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">在菜单栏中显示音量：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="show-volume-toggle" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">声音效果</div>
                <div class="settings-option">
                    <div class="settings-option-label">提示音：</div>
                    <div class="settings-option-control">
                        <select class="settings-select" id="alert-sound-select">
                            <option value="bloom">Bloom</option>
                            <option value="bounce">Bounce</option>
                            <option value="glass">Glass</option>
                            <option value="note">Note</option>
                            <option value="purr">Purr</option>
                            <option value="submarine">Submarine</option>
                        </select>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">提示音音量：</div>
                    <div class="settings-option-control">
                        <div class="settings-slider">
                            <div class="settings-slider-thumb" style="left: 60%;"></div>
                        </div>
                    </div>
                </div>
                <div class="settings-option">
                    <div class="settings-option-label">用户界面声音效果：</div>
                    <div class="settings-option-control">
                        <label class="settings-switch">
                            <input type="checkbox" id="ui-sound-toggle" checked>
                            <span class="settings-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 创建默认设置面板
    _createDefaultPanel: function(panelId) {
        const setting = this.settings.find(s => s.id === panelId);
        const name = setting ? setting.name : panelId;
        
        return `
            <div class="settings-panel-header">
                <div class="settings-panel-title">${name}</div>
                <div class="settings-panel-description">此设置面板尚未实现</div>
            </div>
            
            <div class="settings-section">
                <div class="settings-section-title">开发中</div>
                <div class="settings-option">
                    <div class="settings-option-label">此设置面板正在开发中，敬请期待。</div>
                </div>
            </div>
        `;
    },
    
    // 初始化窗口事件
    _initWindowEvents: function(windowId) {
        // 视图切换
        const gridViewBtn = document.querySelector(`.window[data-id="${windowId}"] .settings-view-option.grid-view`);
        const sidebarViewBtn = document.querySelector(`.window[data-id="${windowId}"] .settings-view-option.sidebar-view`);
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.viewMode = 'grid';
                this._refreshWindowContent(windowId);
            });
        }
        
        if (sidebarViewBtn) {
            sidebarViewBtn.addEventListener('click', () => {
                this.viewMode = 'sidebar';
                this._refreshWindowContent(windowId);
            });
        }
        
        // 网格视图中的设置项点击
        const settingsItems = document.querySelectorAll(`.window[data-id="${windowId}"] .settings-item`);
        settingsItems.forEach(item => {
            item.addEventListener('click', () => {
                const panelId = item.getAttribute('data-id');
                this.activePanel = panelId;
                
                // 如果是网格视图，切换到侧边栏视图
                if (this.viewMode === 'grid') {
                    this.viewMode = 'sidebar';
                }
                
                this._refreshWindowContent(windowId);
            });
        });
        
        // 侧边栏视图中的设置项点击
        const sidebarItems = document.querySelectorAll(`.window[data-id="${windowId}"] .settings-sidebar-item`);
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                const panelId = item.getAttribute('data-id');
                this.activePanel = panelId;
                
                // 更新侧边栏选中状态
                sidebarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // 更新面板内容
                const panel = document.querySelector(`.window[data-id="${windowId}"] .settings-panel`);
                if (panel) {
                    panel.innerHTML = this._createSettingsPanel(panelId);
                }
                
                // 初始化面板事件
                this._initPanelEvents(windowId, panelId);
            });
        });
        
        // 初始化当前面板事件
        this._initPanelEvents(windowId, this.activePanel);
        
        // 搜索框事件
        const searchInput = document.querySelector(`.window[data-id="${windowId}"] .settings-search input`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this._handleSearch(e.target.value, windowId);
            });
        }
    },
    
    // 初始化面板事件
    _initPanelEvents: function(windowId, panelId) {
        switch (panelId) {
            case 'wallpaper':
                this._initWallpaperEvents(windowId);
                break;
            case 'appearance':
                this._initAppearanceEvents(windowId);
                break;
            case 'dock':
                this._initDockEvents(windowId);
                break;
            case 'general':
                this._initGeneralEvents(windowId);
                break;
            case 'display':
                this._initDisplayEvents(windowId);
                break;
            case 'sound':
                this._initSoundEvents(windowId);
                break;
        }
    },
    
    // 初始化壁纸面板事件
    _initWallpaperEvents: function(windowId) {
        const wallpaperItems = document.querySelectorAll(`.window[data-id="${windowId}"] .settings-wallpaper-item`);
        wallpaperItems.forEach(item => {
            item.addEventListener('click', () => {
                // 更新选中状态
                wallpaperItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // 设置壁纸
                const wallpaperPath = item.getAttribute('data-wallpaper');
                if (window.system) {
                    window.system.setWallpaper(wallpaperPath);
                }
            });
        });
    },
    
    // 初始化外观面板事件
    _initAppearanceEvents: function(windowId) {
        const autoAppearanceToggle = document.querySelector(`.window[data-id="${windowId}"] #auto-appearance-toggle`);
        const themeSelect = document.querySelector(`.window[data-id="${windowId}"] #theme-select`);
        
        if (autoAppearanceToggle) {
            autoAppearanceToggle.addEventListener('change', (e) => {
                if (themeSelect) {
                    themeSelect.disabled = e.target.checked;
                }
            });
        }
        
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                const isDark = e.target.value === 'dark';
                if (window.system) {
                    if (isDark && !document.body.classList.contains('dark-mode')) {
                        window.system.toggleDarkMode();
                    } else if (!isDark && document.body.classList.contains('dark-mode')) {
                        window.system.toggleDarkMode();
                    }
                }
            });
            
            // 设置初始值
            if (document.body.classList.contains('dark-mode')) {
                themeSelect.value = 'dark';
            } else {
                themeSelect.value = 'light';
            }
        }
    },
    
    // 初始化Dock面板事件
    _initDockEvents: function(windowId) {
        const dockPositionSelect = document.querySelector(`.window[data-id="${windowId}"] #dock-position-select`);
        const dockAutoHideToggle = document.querySelector(`.window[data-id="${windowId}"] #dock-autohide-toggle`);
        
        if (dockPositionSelect) {
            dockPositionSelect.addEventListener('change', (e) => {
                const position = e.target.value;
                const dock = document.getElementById('dock-container');
                
                if (dock) {
                    // 移除所有位置类
                    dock.classList.remove('dock-bottom', 'dock-left', 'dock-right');
                    
                    // 添加新位置类
                    dock.classList.add(`dock-${position}`);
                }
            });
        }
        
        if (dockAutoHideToggle) {
            dockAutoHideToggle.addEventListener('change', (e) => {
                const autoHide = e.target.checked;
                const dock = document.getElementById('dock-container');
                
                if (dock) {
                    if (autoHide) {
                        dock.classList.add('dock-autohide');
                    } else {
                        dock.classList.remove('dock-autohide');
                    }
                }
            });
        }
    },
    
    // 初始化通用面板事件
    _initGeneralEvents: function(windowId) {
        const appearanceSelect = document.querySelector(`.window[data-id="${windowId}"] #appearance-select`);
        
        if (appearanceSelect) {
            appearanceSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                
                if (value === 'dark' && !document.body.classList.contains('dark-mode')) {
                    if (window.system) {
                        window.system.toggleDarkMode();
                    }
                } else if (value === 'light' && document.body.classList.contains('dark-mode')) {
                    if (window.system) {
                        window.system.toggleDarkMode();
                    }
                }
            });
            
            // 设置初始值
            if (document.body.classList.contains('dark-mode')) {
                appearanceSelect.value = 'dark';
            } else {
                appearanceSelect.value = 'light';
            }
        }
    },
    
    // 初始化显示器面板事件
    _initDisplayEvents: function(windowId) {
        const brightnessSlider = document.querySelector(`.window[data-id="${windowId}"] .settings-section-title:contains('亮度') + .settings-option .settings-slider`);
        
        if (brightnessSlider) {
            const thumb = brightnessSlider.querySelector('.settings-slider-thumb');
            
            if (thumb) {
                // 拖动亮度滑块
                let isDragging = false;
                
                thumb.addEventListener('mousedown', () => {
                    isDragging = true;
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        const rect = brightnessSlider.getBoundingClientRect();
                        let x = e.clientX - rect.left;
                        
                        // 限制在滑块范围内
                        x = Math.max(0, Math.min(x, rect.width));
                        
                        // 更新滑块位置
                        const percent = x / rect.width * 100;
                        thumb.style.left = `${percent}%`;
                        
                        // 更新亮度
                        if (window.system) {
                            window.system.state.brightness = Math.round(percent);
                        }
                    }
                });
                
                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });
            }
        }
    },
    
    // 初始化声音面板事件
    _initSoundEvents: function(windowId) {
        const volumeSlider = document.querySelector(`.window[data-id="${windowId}"] .settings-section-title:contains('音量') + .settings-option .settings-slider`);
        const muteToggle = document.querySelector(`.window[data-id="${windowId}"] #mute-toggle`);
        
        if (volumeSlider) {
            const thumb = volumeSlider.querySelector('.settings-slider-thumb');
            
            if (thumb) {
                // 拖动音量滑块
                let isDragging = false;
                
                thumb.addEventListener('mousedown', () => {
                    isDragging = true;
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        const rect = volumeSlider.getBoundingClientRect();
                        let x = e.clientX - rect.left;
                        
                        // 限制在滑块范围内
                        x = Math.max(0, Math.min(x, rect.width));
                        
                        // 更新滑块位置
                        const percent = x / rect.width * 100;
                        thumb.style.left = `${percent}%`;
                        
                        // 更新音量
                        if (window.system) {
                            window.system.state.volume = Math.round(percent);
                        }
                        
                        // 如果音量大于0，取消静音
                        if (muteToggle && percent > 0) {
                            muteToggle.checked = false;
                        }
                    }
                });
                
                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });
            }
        }
        
        if (muteToggle) {
            muteToggle.addEventListener('change', (e) => {
                const isMuted = e.target.checked;
                
                // 如果静音，将音量滑块设置为0
                if (isMuted && volumeSlider) {
                    const thumb = volumeSlider.querySelector('.settings-slider-thumb');
                    if (thumb) {
                        thumb.style.left = '0%';
                    }
                    
                    if (window.system) {
                        window.system.state.volume = 0;
                    }
                }
            });
        }
    },
    
    // 处理搜索
    _handleSearch: function(searchTerm, windowId) {
        if (!searchTerm) {
            // 清空搜索，恢复正常视图
            this._refreshWindowContent(windowId);
            return;
        }
        
        searchTerm = searchTerm.toLowerCase();
        
        // 搜索设置项
        const results = this.settings.filter(setting => 
            setting.name.toLowerCase().includes(searchTerm)
        );
        
        // 显示搜索结果
        this._showSearchResults(results, windowId);
    },
    
    // 显示搜索结果
    _showSearchResults: function(results, windowId) {
        const content = document.querySelector(`.window[data-id="${windowId}"] .settings-content`);
        if (!content) return;
        
        let html = `<div class="settings-grid">`;
        
        results.forEach(setting => {
            html += `
                <div class="settings-item" data-id="${setting.id}">
                    <div class="settings-item-icon">
                        <img src="${setting.icon}" alt="${setting.name}">
                    </div>
                    <div class="settings-item-name">${setting.name}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        
        content.innerHTML = html;
        
        // 添加点击事件
        const settingsItems = document.querySelectorAll(`.window[data-id="${windowId}"] .settings-item`);
        settingsItems.forEach(item => {
            item.addEventListener('click', () => {
                const panelId = item.getAttribute('data-id');
                this.activePanel = panelId;
                
                // 切换到侧边栏视图
                this.viewMode = 'sidebar';
                
                this._refreshWindowContent(windowId);
            });
        });
    },
    
    // 刷新窗口内容
    _refreshWindowContent: function(windowId) {
        const window = document.querySelector(`.window[data-id="${windowId}"]`);
        if (!window) return;
        
        const content = window.querySelector('.window-content');
        if (!content) return;
        
        content.innerHTML = this._createSettingsContent();
        
        // 重新初始化事件
        this._initWindowEvents(windowId);
    }
};

// 初始化系统偏好设置
function initSettings() {
    settingsManager.init();
    
    // 导出系统偏好设置管理器到全局
    window.settingsManager = settingsManager;
}

// 当文档加载完成时初始化系统偏好设置
document.addEventListener('DOMContentLoaded', () => {
    initSettings();
});
