// preferences.js - 系统偏好设置功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化系统偏好设置
    initializeSystemPreferences();
});

/**
 * 初始化系统偏好设置
 */
function initializeSystemPreferences() {
    // 加载用户设置
    loadUserPreferences();
}

/**
 * 加载用户设置
 */
function loadUserPreferences() {
    // 加载主题设置
    loadThemePreference();
    
    // 加载强调色设置
    loadAccentColorPreference();
    
    // 加载壁纸设置
    loadWallpaperPreference();
    
    // 加载Dock设置
    loadDockPreferences();
}

/**
 * 加载主题设置
 */
function loadThemePreference() {
    const theme = localStorage.getItem('theme') || 'light';
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDark) {
            document.documentElement.classList.add('dark-mode');
        }
    }
}

/**
 * 加载强调色设置
 */
function loadAccentColorPreference() {
    const accentColor = localStorage.getItem('accentColor') || 'blue';
    document.documentElement.setAttribute('data-accent-color', accentColor);
}

/**
 * 加载壁纸设置
 */
function loadWallpaperPreference() {
    // 检查自定义壁纸
    const customWallpaper = localStorage.getItem('customWallpaper');
    
    if (customWallpaper) {
        setCustomWallpaper(customWallpaper);
    } else {
        // 加载预设壁纸
        const wallpaper = localStorage.getItem('wallpaper') || 'wallpaper1.jpg';
        setWallpaper(wallpaper);
    }
}

/**
 * 加载Dock设置
 */
function loadDockPreferences() {
    // 加载Dock位置
    const dockPosition = localStorage.getItem('dockPosition') || 'bottom';
    
    if (typeof setDockPosition === 'function') {
        setDockPosition(dockPosition);
    }
    
    // 加载Dock大小
    const dockSize = localStorage.getItem('dockSize') || '50';
    
    if (typeof setDockSize === 'function') {
        setDockSize(dockSize);
    }
    
    // 加载Dock自动隐藏
    const dockAutoHide = localStorage.getItem('dockAutoHide') === 'true';
    
    if (typeof setDockAutoHide === 'function') {
        setDockAutoHide(dockAutoHide);
    }
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
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="show-scroll-bars" checked>
                            <label for="show-scroll-bars">始终显示滚动条</label>
                        </div>
                        <div class="preference-option">
                            <label>点按滚动条:</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="scroll-to-spot" name="scroll-behavior" checked>
                                    <label for="scroll-to-spot">点按滚动条时跳到点按位置</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="scroll-to-next-page" name="scroll-behavior">
                                    <label for="scroll-to-next-page">点按滚动条时跳到下一页</label>
                                </div>
                            </div>
                        </div>
                        <div class="preference-option">
                            <label>默认网页浏览器:</label>
                            <select class="browser-select">
                                <option value="safari" selected>Safari</option>
                            </select>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-appearance" style="display: none;">
                        <h2>外观</h2>
                        <div class="preference-option">
                            <label>主题:</label>
                            <div class="theme-options">
                                <div class="theme-option" data-theme="light">
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
                        <div class="preference-option">
                            <label>减弱动画效果:</label>
                            <div class="toggle-switch" data-feature="reduce-motion"></div>
                        </div>
                        <div class="preference-option">
                            <label>增强对比度:</label>
                            <div class="toggle-switch" data-feature="increase-contrast"></div>
                        </div>
                        <div class="preference-option">
                            <label>减少透明度:</label>
                            <div class="toggle-switch" data-feature="reduce-transparency"></div>
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
                                <div class="position-option" data-position="bottom">
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
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="show-recent-apps" checked>
                            <label for="show-recent-apps">在程序坞中显示最近使用的应用程序</label>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="minimize-to-app-icon" checked>
                            <label for="minimize-to-app-icon">将窗口最小化到应用程序图标</label>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="animate-opening" checked>
                            <label for="animate-opening">打开应用程序时显示动画</label>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-wallpaper" style="display: none;">
                        <h2>桌面与屏幕保护程序</h2>
                        <div class="wallpaper-options">
                            <h3>桌面图片</h3>
                            <div class="wallpaper-grid">
                                <div class="wallpaper-item" data-wallpaper="wallpaper1.jpg">
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
                        <div class="screen-saver-options">
                            <h3>屏幕保护程序</h3>
                            <div class="screen-saver-grid">
                                <div class="screen-saver-item">
                                    <div class="screen-saver-preview">
                                        <span>照片拼贴</span>
                                    </div>
                                </div>
                                <div class="screen-saver-item">
                                    <div class="screen-saver-preview">
                                        <span>浮动文字</span>
                                    </div>
                                </div>
                                <div class="screen-saver-item">
                                    <div class="screen-saver-preview">
                                        <span>幻灯片</span>
                                    </div>
                                </div>
                            </div>
                            <div class="screen-saver-settings">
                                <div class="preference-option">
                                    <label>开始时间:</label>
                                    <select class="screen-saver-time-select">
                                        <option value="1">1分钟</option>
                                        <option value="5">5分钟</option>
                                        <option value="10">10分钟</option>
                                        <option value="15">15分钟</option>
                                        <option value="30" selected>30分钟</option>
                                        <option value="60">1小时</option>
                                        <option value="never">从不</option>
                                    </select>
                                </div>
                                <div class="preference-option checkbox-option">
                                    <input type="checkbox" id="show-clock" checked>
                                    <label for="show-clock">显示时钟</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-displays" style="display: none;">
                        <h2>显示器</h2>
                        <div class="preference-option">
                            <label>分辨率:</label>
                            <select class="resolution-select">
                                <option value="default" selected>默认</option>
                                <option value="scaled">缩放</option>
                            </select>
                        </div>
                        <div class="preference-option">
                            <label>亮度:</label>
                            <div class="brightness-slider-container">
                                <img src="icons/system/brightness-low.svg" alt="低亮度" class="slider-icon">
                                <input type="range" min="0" max="100" value="80" class="brightness-slider">
                                <img src="icons/system/brightness-high.svg" alt="高亮度" class="slider-icon">
                            </div>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="auto-brightness" checked>
                            <label for="auto-brightness">自动调节亮度</label>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="true-tone" checked>
                            <label for="true-tone">True Tone</label>
                        </div>
                        <div class="preference-option">
                            <label>夜览:</label>
                            <div class="toggle-switch" data-feature="night-shift"></div>
                        </div>
                        <div class="night-shift-options">
                            <div class="preference-option">
                                <label>时间表:</label>
                                <select class="night-shift-schedule-select">
                                    <option value="sunset-to-sunrise" selected>日落到日出</option>
                                    <option value="custom">自定</option>
                                    <option value="off">关闭</option>
                                </select>
                            </div>
                            <div class="preference-option">
                                <label>色温:</label>
                                <div class="color-temperature-slider-container">
                                    <span>较不暖</span>
                                    <input type="range" min="0" max="100" value="50" class="color-temperature-slider">
                                    <span>较暖</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="preference-panel" id="panel-sound" style="display: none;">
                        <h2>声音</h2>
                        <div class="preference-option">
                            <label>输出音量:</label>
                            <div class="volume-slider-container">
                                <img src="icons/system/volume-low.svg" alt="低音量" class="slider-icon">
                                <input type="range" min="0" max="100" value="50" class="volume-slider">
                                <img src="icons/system/volume-high.svg" alt="高音量" class="slider-icon">
                            </div>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="mute" checked>
                            <label for="mute">静音</label>
                        </div>
                        <div class="preference-option">
                            <label>提示音音量:</label>
                            <div class="alert-volume-slider-container">
                                <img src="icons/system/volume-low.svg" alt="低音量" class="slider-icon">
                                <input type="range" min="0" max="100" value="50" class="alert-volume-slider">
                                <img src="icons/system/volume-high.svg" alt="高音量" class="slider-icon">
                            </div>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="play-feedback" checked>
                            <label for="play-feedback">界面更改时播放声音反馈</label>
                        </div>
                        <div class="preference-option checkbox-option">
                            <input type="checkbox" id="play-startup" checked>
                            <label for="play-startup">启动时播放声音</label>
                        </div>
                        <div class="preference-option">
                            <label>提示音:</label>
                            <select class="alert-sound-select">
                                <option value="boop" selected>Boop</option>
                                <option value="blow">Blow</option>
                                <option value="glass">Glass</option>
                                <option value="hero">Hero</option>
                            </select>
                            <button class="play-sound-button">播放</button>
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
    
    // 设置默认活动项
    const defaultItem = document.querySelector('.preference-item[data-pref="general"]');
    
    if (defaultItem) {
        defaultItem.classList.add('active');
    }
    
    // 初始化外观设置
    initAppearanceSettings();
    
    // 初始化Dock设置
    initDockSettings();
    
    // 初始化壁纸设置
    initWallpaperSettings();
    
    // 初始化显示器设置
    initDisplaySettings();
    
    // 初始化声音设置
    initSoundSettings();
    
    // 初始化搜索功能
    initSearchFunctionality();
}

/**
 * 初始化外观设置
 */
function initAppearanceSettings() {
    // 外观选择
    const appearanceSelect = document.querySelector('.appearance-select');
    
    if (appearanceSelect) {
        // 设置初始值
        const savedTheme = localStorage.getItem('theme') || 'light';
        appearanceSelect.value = savedTheme;
        
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
            
            // 更新主题选项
            updateThemeOptions(theme);
        });
    }
    
    // 强调色选择
    const accentColors = document.querySelectorAll('.accent-color');
    
    if (accentColors.length > 0) {
        // 设置初始值
        const savedAccentColor = localStorage.getItem('accentColor') || 'blue';
        
        accentColors.forEach(color => {
            const colorValue = color.getAttribute('data-color');
            
            if (colorValue === savedAccentColor) {
                color.classList.add('active');
            }
            
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
    }
    
    // 主题选择
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (themeOptions.length > 0) {
        // 设置初始值
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        themeOptions.forEach(option => {
            const themeValue = option.getAttribute('data-theme');
            
            if (themeValue === savedTheme) {
                option.classList.add('active');
            }
            
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
    }
    
    // 辅助功能开关
    const accessibilityToggles = document.querySelectorAll('.toggle-switch[data-feature]');
    
    accessibilityToggles.forEach(toggle => {
        const feature = toggle.getAttribute('data-feature');
        
        // 设置初始值
        const enabled = localStorage.getItem(`accessibility-${feature}`) === 'true';
        
        if (enabled) {
            toggle.classList.add('active');
            document.documentElement.setAttribute(`data-${feature}`, 'true');
        }
        
        toggle.addEventListener('click', function() {
            // 切换状态
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            
            // 更新设置
            localStorage.setItem(`accessibility-${feature}`, isActive.toString());
            
            // 更新文档属性
            if (isActive) {
                document.documentElement.setAttribute(`data-${feature}`, 'true');
            } else {
                document.documentElement.removeAttribute(`data-${feature}`);
            }
        });
    });
}

/**
 * 更新主题选项
 * @param {string} theme - 主题
 */
function updateThemeOptions(theme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        const themeValue = option.getAttribute('data-theme');
        
        if (themeValue === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

/**
 * 初始化Dock设置
 */
function initDockSettings() {
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
    
    if (positionOptions.length > 0) {
        // 设置初始值
        const savedPosition = localStorage.getItem('dockPosition') || 'bottom';
        
        positionOptions.forEach(option => {
            const position = option.getAttribute('data-position');
            
            if (position === savedPosition) {
                option.classList.add('active');
            }
            
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
    }
    
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
    
    // 其他Dock选项
    const dockCheckboxes = document.querySelectorAll('#panel-dock .checkbox-option input[type="checkbox"]:not(#dock-autohide)');
    
    dockCheckboxes.forEach(checkbox => {
        const id = checkbox.id;
        
        // 设置初始值
        const checked = localStorage.getItem(`dock-${id}`) !== 'false';
        checkbox.checked = checked;
        
        checkbox.addEventListener('change', function() {
            const checked = this.checked;
            
            // 保存设置
            localStorage.setItem(`dock-${id}`, checked.toString());
        });
    });
}

/**
 * 初始化壁纸设置
 */
function initWallpaperSettings() {
    // 壁纸选择
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    
    if (wallpaperItems.length > 0) {
        // 设置初始值
        const savedWallpaper = localStorage.getItem('wallpaper') || 'wallpaper1.jpg';
        
        wallpaperItems.forEach(item => {
            const wallpaper = item.getAttribute('data-wallpaper');
            
            if (wallpaper === savedWallpaper) {
                item.classList.add('active');
            }
            
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
                setWallpaper(wallpaper);
                
                // 保存设置
                localStorage.setItem('wallpaper', wallpaper);
                
                // 清除自定义壁纸
                localStorage.removeItem('customWallpaper');
            });
        });
    }
    
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
                        setCustomWallpaper(e.target.result);
                        
                        // 保存设置
                        localStorage.setItem('customWallpaper', e.target.result);
                        
                        // 移除壁纸项活动状态
                        wallpaperItems.forEach(item => {
                            item.classList.remove('active');
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // 触发文件选择
            fileInput.click();
        });
    }
    
    // 屏幕保护程序设置
    const screenSaverItems = document.querySelectorAll('.screen-saver-item');
    
    screenSaverItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他活动状态
            screenSaverItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // 添加活动状态
            this.classList.add('active');
        });
    });
    
    // 屏幕保护程序时间选择
    const screenSaverTimeSelect = document.querySelector('.screen-saver-time-select');
    
    if (screenSaverTimeSelect) {
        // 设置初始值
        const savedTime = localStorage.getItem('screenSaverTime') || '30';
        screenSaverTimeSelect.value = savedTime;
        
        screenSaverTimeSelect.addEventListener('change', function() {
            const time = this.value;
            
            // 保存设置
            localStorage.setItem('screenSaverTime', time);
        });
    }
    
    // 显示时钟选项
    const showClockCheckbox = document.getElementById('show-clock');
    
    if (showClockCheckbox) {
        // 设置初始值
        const showClock = localStorage.getItem('showClock') !== 'false';
        showClockCheckbox.checked = showClock;
        
        showClockCheckbox.addEventListener('change', function() {
            const showClock = this.checked;
            
            // 保存设置
            localStorage.setItem('showClock', showClock.toString());
        });
    }
}

/**
 * 初始化显示器设置
 */
function initDisplaySettings() {
    // 分辨率选择
    const resolutionSelect = document.querySelector('.resolution-select');
    
    if (resolutionSelect) {
        // 设置初始值
        const savedResolution = localStorage.getItem('resolution') || 'default';
        resolutionSelect.value = savedResolution;
        
        resolutionSelect.addEventListener('change', function() {
            const resolution = this.value;
            
            // 保存设置
            localStorage.setItem('resolution', resolution);
        });
    }
    
    // 亮度滑块
    const brightnessSlider = document.querySelector('.brightness-slider');
    
    if (brightnessSlider) {
        // 设置初始值
        const savedBrightness = localStorage.getItem('brightness') || '80';
        brightnessSlider.value = savedBrightness;
        
        brightnessSlider.addEventListener('input', function() {
            const brightness = this.value;
            
            // 更新亮度
            document.documentElement.style.setProperty('--screen-brightness', `${brightness}%`);
            
            // 保存设置
            localStorage.setItem('brightness', brightness);
        });
    }
    
    // 自动亮度选项
    const autoBrightnessCheckbox = document.getElementById('auto-brightness');
    
    if (autoBrightnessCheckbox) {
        // 设置初始值
        const autoBrightness = localStorage.getItem('autoBrightness') !== 'false';
        autoBrightnessCheckbox.checked = autoBrightness;
        
        autoBrightnessCheckbox.addEventListener('change', function() {
            const autoBrightness = this.checked;
            
            // 保存设置
            localStorage.setItem('autoBrightness', autoBrightness.toString());
            
            // 禁用/启用亮度滑块
            if (brightnessSlider) {
                brightnessSlider.disabled = autoBrightness;
            }
        });
        
        // 初始禁用状态
        if (brightnessSlider) {
            brightnessSlider.disabled = autoBrightnessCheckbox.checked;
        }
    }
    
    // True Tone选项
    const trueToneCheckbox = document.getElementById('true-tone');
    
    if (trueToneCheckbox) {
        // 设置初始值
        const trueTone = localStorage.getItem('trueTone') !== 'false';
        trueToneCheckbox.checked = trueTone;
        
        trueToneCheckbox.addEventListener('change', function() {
            const trueTone = this.checked;
            
            // 保存设置
            localStorage.setItem('trueTone', trueTone.toString());
        });
    }
    
    // 夜览开关
    const nightShiftToggle = document.querySelector('.toggle-switch[data-feature="night-shift"]');
    
    if (nightShiftToggle) {
        // 设置初始值
        const nightShift = localStorage.getItem('nightShift') === 'true';
        
        if (nightShift) {
            nightShiftToggle.classList.add('active');
            document.documentElement.setAttribute('data-night-shift', 'true');
        }
        
        nightShiftToggle.addEventListener('click', function() {
            // 切换状态
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            
            // 更新设置
            localStorage.setItem('nightShift', isActive.toString());
            
            // 更新文档属性
            if (isActive) {
                document.documentElement.setAttribute('data-night-shift', 'true');
            } else {
                document.documentElement.removeAttribute('data-night-shift');
            }
        });
    }
    
    // 夜览时间表选择
    const nightShiftScheduleSelect = document.querySelector('.night-shift-schedule-select');
    
    if (nightShiftScheduleSelect) {
        // 设置初始值
        const savedSchedule = localStorage.getItem('nightShiftSchedule') || 'sunset-to-sunrise';
        nightShiftScheduleSelect.value = savedSchedule;
        
        nightShiftScheduleSelect.addEventListener('change', function() {
            const schedule = this.value;
            
            // 保存设置
            localStorage.setItem('nightShiftSchedule', schedule);
        });
    }
    
    // 色温滑块
    const colorTemperatureSlider = document.querySelector('.color-temperature-slider');
    
    if (colorTemperatureSlider) {
        // 设置初始值
        const savedTemperature = localStorage.getItem('colorTemperature') || '50';
        colorTemperatureSlider.value = savedTemperature;
        
        colorTemperatureSlider.addEventListener('input', function() {
            const temperature = this.value;
            
            // 更新色温
            document.documentElement.style.setProperty('--color-temperature', temperature);
            
            // 保存设置
            localStorage.setItem('colorTemperature', temperature);
        });
    }
}

/**
 * 初始化声音设置
 */
function initSoundSettings() {
    // 音量滑块
    const volumeSlider = document.querySelector('.volume-slider');
    
    if (volumeSlider) {
        // 设置初始值
        const savedVolume = localStorage.getItem('volume') || '50';
        volumeSlider.value = savedVolume;
        
        volumeSlider.addEventListener('input', function() {
            const volume = this.value;
            
            // 保存设置
            localStorage.setItem('volume', volume);
        });
    }
    
    // 静音选项
    const muteCheckbox = document.getElementById('mute');
    
    if (muteCheckbox) {
        // 设置初始值
        const mute = localStorage.getItem('mute') === 'true';
        muteCheckbox.checked = mute;
        
        muteCheckbox.addEventListener('change', function() {
            const mute = this.checked;
            
            // 保存设置
            localStorage.setItem('mute', mute.toString());
            
            // 禁用/启用音量滑块
            if (volumeSlider) {
                volumeSlider.disabled = mute;
            }
        });
        
        // 初始禁用状态
        if (volumeSlider) {
            volumeSlider.disabled = muteCheckbox.checked;
        }
    }
    
    // 提示音音量滑块
    const alertVolumeSlider = document.querySelector('.alert-volume-slider');
    
    if (alertVolumeSlider) {
        // 设置初始值
        const savedAlertVolume = localStorage.getItem('alertVolume') || '50';
        alertVolumeSlider.value = savedAlertVolume;
        
        alertVolumeSlider.addEventListener('input', function() {
            const alertVolume = this.value;
            
            // 保存设置
            localStorage.setItem('alertVolume', alertVolume);
        });
    }
    
    // 声音反馈选项
    const playFeedbackCheckbox = document.getElementById('play-feedback');
    
    if (playFeedbackCheckbox) {
        // 设置初始值
        const playFeedback = localStorage.getItem('playFeedback') !== 'false';
        playFeedbackCheckbox.checked = playFeedback;
        
        playFeedbackCheckbox.addEventListener('change', function() {
            const playFeedback = this.checked;
            
            // 保存设置
            localStorage.setItem('playFeedback', playFeedback.toString());
        });
    }
    
    // 启动声音选项
    const playStartupCheckbox = document.getElementById('play-startup');
    
    if (playStartupCheckbox) {
        // 设置初始值
        const playStartup = localStorage.getItem('playStartup') !== 'false';
        playStartupCheckbox.checked = playStartup;
        
        playStartupCheckbox.addEventListener('change', function() {
            const playStartup = this.checked;
            
            // 保存设置
            localStorage.setItem('playStartup', playStartup.toString());
        });
    }
    
    // 提示音选择
    const alertSoundSelect = document.querySelector('.alert-sound-select');
    
    if (alertSoundSelect) {
        // 设置初始值
        const savedAlertSound = localStorage.getItem('alertSound') || 'boop';
        alertSoundSelect.value = savedAlertSound;
        
        alertSoundSelect.addEventListener('change', function() {
            const alertSound = this.value;
            
            // 保存设置
            localStorage.setItem('alertSound', alertSound);
        });
    }
    
    // 播放声音按钮
    const playSoundButton = document.querySelector('.play-sound-button');
    
    if (playSoundButton) {
        playSoundButton.addEventListener('click', function() {
            // 获取选中的提示音
            const alertSound = alertSoundSelect ? alertSoundSelect.value : 'boop';
            
            // 播放声音
            playAlertSound(alertSound);
        });
    }
}

/**
 * 播放提示音
 * @param {string} sound - 提示音
 */
function playAlertSound(sound) {
    // 创建音频元素
    const audio = document.createElement('audio');
    
    // 设置音频源
    audio.src = `sounds/${sound}.mp3`;
    
    // 播放音频
    audio.play();
}

/**
 * 初始化搜索功能
 */
function initSearchFunctionality() {
    const searchInput = document.querySelector('.preferences-search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // 搜索偏好设置项
            const preferenceItems = document.querySelectorAll('.preference-item');
            
            preferenceItems.forEach(item => {
                const itemText = item.querySelector('span').textContent.toLowerCase();
                
                if (searchTerm === '' || itemText.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // 如果搜索词为空，显示所有部分
            if (searchTerm === '') {
                const sections = document.querySelectorAll('.preferences-section');
                
                sections.forEach(section => {
                    section.style.display = '';
                });
            } else {
                // 隐藏没有匹配项的部分
                const sections = document.querySelectorAll('.preferences-section');
                
                sections.forEach(section => {
                    const visibleItems = section.querySelectorAll('.preference-item[style=""]');
                    
                    if (visibleItems.length === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = '';
                    }
                });
            }
        });
    }
}

/**
 * 设置壁纸
 * @param {string} wallpaper - 壁纸文件名
 */
function setWallpaper(wallpaper) {
    // 更新壁纸
    document.documentElement.style.setProperty('--wallpaper', `url('img/wallpapers/${wallpaper}')`);
}

/**
 * 设置自定义壁纸
 * @param {string} dataUrl - 壁纸数据URL
 */
function setCustomWallpaper(dataUrl) {
    // 更新壁纸
    document.documentElement.style.setProperty('--wallpaper', `url('${dataUrl}')`);
}

/**
 * 设置Dock位置
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
 * 设置Dock大小
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
 * 设置Dock自动隐藏
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

// 导出函数供其他模块使用
window.initializeSystemPreferences = initializeSystemPreferences;
window.openSystemPreferences = openSystemPreferences;
window.setWallpaper = setWallpaper;
window.setCustomWallpaper = setCustomWallpaper;
window.setDockPosition = setDockPosition;
window.setDockSize = setDockSize;
window.setDockAutoHide = setDockAutoHide;
