// settings.js - 个性化设置功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化设置功能
    initSettings();
});

/**
 * 初始化设置功能
 */
function initSettings() {
    // 初始化系统偏好设置窗口
    initSettingsWindow();
    
    // 初始化通用设置
    initGeneralSettings();
    
    // 初始化桌面设置
    initDesktopSettings();
    
    // 初始化Dock设置
    initDockSettings();
    
    // 初始化显示设置
    initDisplaySettings();
    
    // 初始化用户设置
    initUserSettings();
    
    // 加载保存的设置
    loadSavedSettings();
}

/**
 * 初始化系统偏好设置窗口
 */
function initSettingsWindow() {
    const settingsWindow = document.getElementById('settings-window');
    
    // 如果设置窗口不存在，则返回
    if (!settingsWindow) return;
    
    // 初始化窗口控制
    initWindowControls(settingsWindow);
    
    // 初始化设置导航
    initSettingsNavigation();
}

/**
 * 初始化设置导航
 */
function initSettingsNavigation() {
    const settingsWindow = document.getElementById('settings-window');
    
    // 如果设置窗口不存在，则返回
    if (!settingsWindow) return;
    
    const settingItems = settingsWindow.querySelectorAll('.setting-item');
    const settingPanes = settingsWindow.querySelectorAll('.setting-pane');
    
    // 为每个设置项添加点击事件
    settingItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他设置项的活动状态
            settingItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前设置项的活动状态
            this.classList.add('active');
            
            // 获取设置面板ID
            const paneId = this.dataset.pane;
            
            // 隐藏所有设置面板
            settingPanes.forEach(pane => {
                pane.style.display = 'none';
            });
            
            // 显示当前设置面板
            const currentPane = document.getElementById(paneId);
            
            if (currentPane) {
                currentPane.style.display = 'block';
            }
        });
    });
}

/**
 * 初始化通用设置
 */
function initGeneralSettings() {
    const generalPane = document.getElementById('general-pane');
    
    // 如果通用设置面板不存在，则返回
    if (!generalPane) return;
    
    // 外观设置
    const appearanceOptions = generalPane.querySelectorAll('input[name="appearance"]');
    
    appearanceOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                // 设置外观
                setAppearance(this.value);
            }
        });
    });
    
    // 强调色设置
    const accentColorOptions = generalPane.querySelectorAll('.accent-color-option');
    
    accentColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他选项的活动状态
            accentColorOptions.forEach(o => o.classList.remove('active'));
            
            // 添加当前选项的活动状态
            this.classList.add('active');
            
            // 设置强调色
            setAccentColor(this.dataset.color);
        });
    });
    
    // 高亮色设置
    const highlightColorOptions = generalPane.querySelectorAll('.highlight-color-option');
    
    highlightColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他选项的活动状态
            highlightColorOptions.forEach(o => o.classList.remove('active'));
            
            // 添加当前选项的活动状态
            this.classList.add('active');
            
            // 设置高亮色
            setHighlightColor(this.dataset.color);
        });
    });
    
    // 侧边栏图标大小设置
    const sidebarIconSizeSlider = generalPane.querySelector('#sidebar-icon-size');
    
    if (sidebarIconSizeSlider) {
        sidebarIconSizeSlider.addEventListener('input', function() {
            // 设置侧边栏图标大小
            setSidebarIconSize(this.value);
            
            // 更新显示值
            const sizeValue = generalPane.querySelector('#sidebar-icon-size-value');
            
            if (sizeValue) {
                sizeValue.textContent = this.value;
            }
        });
    }
}

/**
 * 初始化桌面设置
 */
function initDesktopSettings() {
    const desktopPane = document.getElementById('desktop-pane');
    
    // 如果桌面设置面板不存在，则返回
    if (!desktopPane) return;
    
    // 更改壁纸按钮
    const changeWallpaperButton = desktopPane.querySelector('#change-wallpaper-button');
    
    if (changeWallpaperButton) {
        changeWallpaperButton.addEventListener('click', function() {
            // 打开壁纸设置面板
            openWallpaperPanel();
        });
    }
    
    // 桌面图标显示设置
    const showDesktopIconsCheckbox = desktopPane.querySelector('#show-desktop-icons');
    
    if (showDesktopIconsCheckbox) {
        showDesktopIconsCheckbox.addEventListener('change', function() {
            // 设置桌面图标显示
            setDesktopIconsVisibility(this.checked);
        });
    }
    
    // 桌面图标大小设置
    const desktopIconSizeSlider = desktopPane.querySelector('#desktop-icon-size');
    
    if (desktopIconSizeSlider) {
        desktopIconSizeSlider.addEventListener('input', function() {
            // 设置桌面图标大小
            setDesktopIconSize(this.value);
            
            // 更新显示值
            const sizeValue = desktopPane.querySelector('#desktop-icon-size-value');
            
            if (sizeValue) {
                sizeValue.textContent = this.value;
            }
        });
    }
    
    // 桌面图标排列设置
    const iconArrangementOptions = desktopPane.querySelectorAll('input[name="icon-arrangement"]');
    
    iconArrangementOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                // 设置图标排列
                setIconArrangement(this.value);
            }
        });
    });
}

/**
 * 初始化Dock设置
 */
function initDockSettings() {
    const dockPane = document.getElementById('dock-pane');
    
    // 如果Dock设置面板不存在，则返回
    if (!dockPane) return;
    
    // Dock大小设置
    const dockSizeSlider = dockPane.querySelector('#dock-size');
    
    if (dockSizeSlider) {
        dockSizeSlider.addEventListener('input', function() {
            // 设置Dock大小
            setDockSize(this.value);
            
            // 更新显示值
            const sizeValue = dockPane.querySelector('#dock-size-value');
            
            if (sizeValue) {
                sizeValue.textContent = this.value;
            }
        });
    }
    
    // Dock放大效果设置
    const dockMagnificationCheckbox = dockPane.querySelector('#dock-magnification');
    
    if (dockMagnificationCheckbox) {
        dockMagnificationCheckbox.addEventListener('change', function() {
            // 设置Dock放大效果
            setDockMagnification(this.checked);
        });
    }
    
    // Dock放大程度设置
    const dockMagnificationSlider = dockPane.querySelector('#dock-magnification-size');
    
    if (dockMagnificationSlider) {
        dockMagnificationSlider.addEventListener('input', function() {
            // 设置Dock放大程度
            setDockMagnificationSize(this.value);
            
            // 更新显示值
            const sizeValue = dockPane.querySelector('#dock-magnification-size-value');
            
            if (sizeValue) {
                sizeValue.textContent = this.value;
            }
        });
    }
    
    // Dock位置设置
    const dockPositionOptions = dockPane.querySelectorAll('input[name="dock-position"]');
    
    dockPositionOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                // 设置Dock位置
                setDockPosition(this.value);
            }
        });
    });
    
    // Dock自动隐藏设置
    const dockAutoHideCheckbox = dockPane.querySelector('#dock-autohide');
    
    if (dockAutoHideCheckbox) {
        dockAutoHideCheckbox.addEventListener('change', function() {
            // 设置Dock自动隐藏
            setDockAutoHide(this.checked);
        });
    }
}

/**
 * 初始化显示设置
 */
function initDisplaySettings() {
    const displayPane = document.getElementById('display-pane');
    
    // 如果显示设置面板不存在，则返回
    if (!displayPane) return;
    
    // 分辨率设置
    const resolutionSelect = displayPane.querySelector('#resolution-select');
    
    if (resolutionSelect) {
        resolutionSelect.addEventListener('change', function() {
            // 设置分辨率
            setResolution(this.value);
        });
    }
    
    // 缩放设置
    const scaleOptions = displayPane.querySelectorAll('input[name="display-scale"]');
    
    scaleOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                // 设置缩放
                setDisplayScale(this.value);
            }
        });
    });
    
    // 亮度设置
    const brightnessSlider = displayPane.querySelector('#brightness-slider');
    
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', function() {
            // 设置亮度
            adjustScreenBrightness(this.value);
            
            // 更新显示值
            const brightnessValue = displayPane.querySelector('#brightness-value');
            
            if (brightnessValue) {
                brightnessValue.textContent = this.value + '%';
            }
        });
    }
    
    // 夜间模式设置
    const nightModeCheckbox = displayPane.querySelector('#night-mode');
    
    if (nightModeCheckbox) {
        nightModeCheckbox.addEventListener('change', function() {
            // 设置夜间模式
            setNightMode(this.checked);
        });
    }
    
    // 夜间模式时间设置
    const nightModeStartTime = displayPane.querySelector('#night-mode-start');
    const nightModeEndTime = displayPane.querySelector('#night-mode-end');
    
    if (nightModeStartTime && nightModeEndTime) {
        nightModeStartTime.addEventListener('change', function() {
            // 设置夜间模式开始时间
            setNightModeTime('start', this.value);
        });
        
        nightModeEndTime.addEventListener('change', function() {
            // 设置夜间模式结束时间
            setNightModeTime('end', this.value);
        });
    }
}

/**
 * 初始化用户设置
 */
function initUserSettings() {
    const userPane = document.getElementById('user-pane');
    
    // 如果用户设置面板不存在，则返回
    if (!userPane) return;
    
    // 用户头像设置
    const changeAvatarButton = userPane.querySelector('#change-avatar-button');
    
    if (changeAvatarButton) {
        changeAvatarButton.addEventListener('click', function() {
            // 创建文件输入元素
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            // 添加文件选择事件
            fileInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 设置用户头像
                        setUserAvatar(e.target.result);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // 触发文件选择
            fileInput.click();
        });
    }
    
    // 用户名设置
    const changeNameButton = userPane.querySelector('#change-name-button');
    
    if (changeNameButton) {
        changeNameButton.addEventListener('click', function() {
            // 获取当前用户名
            const currentName = document.querySelector('.user-name').textContent;
            
            // 弹出输入框
            const newName = prompt('请输入新的用户名', currentName);
            
            if (newName && newName.trim() !== '') {
                // 设置用户名
                setUserName(newName.trim());
            }
        });
    }
    
    // 密码设置
    const changePasswordButton = userPane.querySelector('#change-password-button');
    
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', function() {
            // 弹出输入框
            const currentPassword = prompt('请输入当前密码');
            
            if (currentPassword) {
                const newPassword = prompt('请输入新密码');
                
                if (newPassword) {
                    const confirmPassword = prompt('请再次输入新密码');
                    
                    if (newPassword === confirmPassword) {
                        // 设置密码
                        setUserPassword(newPassword);
                        alert('密码已更改');
                    } else {
                        alert('两次输入的密码不一致');
                    }
                }
            }
        });
    }
    
    // 语言设置
    const languageSelect = userPane.querySelector('#language-select');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            // 设置语言
            setLanguage(this.value);
        });
    }
    
    // 时区设置
    const timezoneSelect = userPane.querySelector('#timezone-select');
    
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', function() {
            // 设置时区
            setTimezone(this.value);
        });
    }
}

/**
 * 加载保存的设置
 */
function loadSavedSettings() {
    // 加载外观设置
    const savedAppearance = localStorage.getItem('appearance') || 'auto';
    setAppearance(savedAppearance);
    
    // 更新外观选项
    const appearanceOption = document.querySelector(`input[name="appearance"][value="${savedAppearance}"]`);
    
    if (appearanceOption) {
        appearanceOption.checked = true;
    }
    
    // 加载强调色设置
    const savedAccentColor = localStorage.getItem('accentColor') || 'blue';
    setAccentColor(savedAccentColor);
    
    // 更新强调色选项
    const accentColorOption = document.querySelector(`.accent-color-option[data-color="${savedAccentColor}"]`);
    
    if (accentColorOption) {
        accentColorOption.classList.add('active');
    }
    
    // 加载高亮色设置
    const savedHighlightColor = localStorage.getItem('highlightColor') || 'blue';
    setHighlightColor(savedHighlightColor);
    
    // 更新高亮色选项
    const highlightColorOption = document.querySelector(`.highlight-color-option[data-color="${savedHighlightColor}"]`);
    
    if (highlightColorOption) {
        highlightColorOption.classList.add('active');
    }
    
    // 加载侧边栏图标大小设置
    const savedSidebarIconSize = localStorage.getItem('sidebarIconSize') || '16';
    setSidebarIconSize(savedSidebarIconSize);
    
    // 更新侧边栏图标大小滑块
    const sidebarIconSizeSlider = document.getElementById('sidebar-icon-size');
    const sidebarIconSizeValue = document.getElementById('sidebar-icon-size-value');
    
    if (sidebarIconSizeSlider) {
        sidebarIconSizeSlider.value = savedSidebarIconSize;
    }
    
    if (sidebarIconSizeValue) {
        sidebarIconSizeValue.textContent = savedSidebarIconSize;
    }
    
    // 加载桌面图标显示设置
    const savedDesktopIconsVisibility = localStorage.getItem('showDesktopIcons') !== 'false';
    setDesktopIconsVisibility(savedDesktopIconsVisibility);
    
    // 更新桌面图标显示复选框
    const showDesktopIconsCheckbox = document.getElementById('show-desktop-icons');
    
    if (showDesktopIconsCheckbox) {
        showDesktopIconsCheckbox.checked = savedDesktopIconsVisibility;
    }
    
    // 加载桌面图标大小设置
    const savedDesktopIconSize = localStorage.getItem('desktopIconSize') || '60';
    setDesktopIconSize(savedDesktopIconSize);
    
    // 更新桌面图标大小滑块
    const desktopIconSizeSlider = document.getElementById('desktop-icon-size');
    const desktopIconSizeValue = document.getElementById('desktop-icon-size-value');
    
    if (desktopIconSizeSlider) {
        desktopIconSizeSlider.value = savedDesktopIconSize;
    }
    
    if (desktopIconSizeValue) {
        desktopIconSizeValue.textContent = savedDesktopIconSize;
    }
    
    // 加载Dock大小设置
    const savedDockSize = localStorage.getItem('dockSize') || '60';
    setDockSize(savedDockSize);
    
    // 更新Dock大小滑块
    const dockSizeSlider = document.getElementById('dock-size');
    const dockSizeValue = document.getElementById('dock-size-value');
    
    if (dockSizeSlider) {
        dockSizeSlider.value = savedDockSize;
    }
    
    if (dockSizeValue) {
        dockSizeValue.textContent = savedDockSize;
    }
    
    // 加载Dock放大效果设置
    const savedDockMagnification = localStorage.getItem('dockMagnification') === 'true';
    setDockMagnification(savedDockMagnification);
    
    // 更新Dock放大效果复选框
    const dockMagnificationCheckbox = document.getElementById('dock-magnification');
    
    if (dockMagnificationCheckbox) {
        dockMagnificationCheckbox.checked = savedDockMagnification;
    }
    
    // 加载Dock放大程度设置
    const savedDockMagnificationSize = localStorage.getItem('dockMagnificationSize') || '80';
    setDockMagnificationSize(savedDockMagnificationSize);
    
    // 更新Dock放大程度滑块
    const dockMagnificationSlider = document.getElementById('dock-magnification-size');
    const dockMagnificationSizeValue = document.getElementById('dock-magnification-size-value');
    
    if (dockMagnificationSlider) {
        dockMagnificationSlider.value = savedDockMagnificationSize;
    }
    
    if (dockMagnificationSizeValue) {
        dockMagnificationSizeValue.textContent = savedDockMagnificationSize;
    }
    
    // 加载Dock位置设置
    const savedDockPosition = localStorage.getItem('dockPosition') || 'bottom';
    setDockPosition(savedDockPosition);
    
    // 更新Dock位置选项
    const dockPositionOption = document.querySelector(`input[name="dock-position"][value="${savedDockPosition}"]`);
    
    if (dockPositionOption) {
        dockPositionOption.checked = true;
    }
    
    // 加载Dock自动隐藏设置
    const savedDockAutoHide = localStorage.getItem('dockAutoHide') === 'true';
    setDockAutoHide(savedDockAutoHide);
    
    // 更新Dock自动隐藏复选框
    const dockAutoHideCheckbox = document.getElementById('dock-autohide');
    
    if (dockAutoHideCheckbox) {
        dockAutoHideCheckbox.checked = savedDockAutoHide;
    }
}

/**
 * 设置外观
 * @param {string} appearance - 外观模式（light/dark/auto）
 */
function setAppearance(appearance) {
    const body = document.body;
    
    // 添加过渡效果
    body.classList.add('theme-transitioning');
    
    // 根据外观模式设置深色模式
    switch (appearance) {
        case 'light':
            body.classList.remove('dark-mode');
            break;
        
        case 'dark':
            body.classList.add('dark-mode');
            break;
        
        case 'auto':
            // 根据系统偏好设置
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            break;
    }
    
    // 移除过渡效果
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
    }, 500);
    
    // 保存设置
    localStorage.setItem('appearance', appearance);
}

/**
 * 设置强调色
 * @param {string} color - 颜色名称
 */
function setAccentColor(color) {
    const root = document.documentElement;
    
    // 设置CSS变量
    switch (color) {
        case 'blue':
            root.style.setProperty('--macos-blue', '#0071e3');
            root.style.setProperty('--macos-light-blue', '#147ce5');
            root.style.setProperty('--macos-dark-blue', '#0068d0');
            break;
        
        case 'purple':
            root.style.setProperty('--macos-blue', '#9c27b0');
            root.style.setProperty('--macos-light-blue', '#ab47bc');
            root.style.setProperty('--macos-dark-blue', '#8e24aa');
            break;
        
        case 'pink':
            root.style.setProperty('--macos-blue', '#e91e63');
            root.style.setProperty('--macos-light-blue', '#ec407a');
            root.style.setProperty('--macos-dark-blue', '#d81b60');
            break;
        
        case 'red':
            root.style.setProperty('--macos-blue', '#f44336');
            root.style.setProperty('--macos-light-blue', '#ef5350');
            root.style.setProperty('--macos-dark-blue', '#e53935');
            break;
        
        case 'orange':
            root.style.setProperty('--macos-blue', '#ff9800');
            root.style.setProperty('--macos-light-blue', '#ffa726');
            root.style.setProperty('--macos-dark-blue', '#fb8c00');
            break;
        
        case 'yellow':
            root.style.setProperty('--macos-blue', '#ffc107');
            root.style.setProperty('--macos-light-blue', '#ffca28');
            root.style.setProperty('--macos-dark-blue', '#ffb300');
            break;
        
        case 'green':
            root.style.setProperty('--macos-blue', '#4caf50');
            root.style.setProperty('--macos-light-blue', '#66bb6a');
            root.style.setProperty('--macos-dark-blue', '#43a047');
            break;
    }
    
    // 保存设置
    localStorage.setItem('accentColor', color);
}

/**
 * 设置高亮色
 * @param {string} color - 颜色名称
 */
function setHighlightColor(color) {
    // 在实际应用中，这里会设置文本选择和高亮的颜色
    // 在这个演示中，我们只保存设置
    localStorage.setItem('highlightColor', color);
}

/**
 * 设置侧边栏图标大小
 * @param {string} size - 图标大小（像素）
 */
function setSidebarIconSize(size) {
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    
    sidebarIcons.forEach(icon => {
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
    });
    
    // 保存设置
    localStorage.setItem('sidebarIconSize', size);
}

/**
 * 设置桌面图标显示
 * @param {boolean} visible - 是否显示
 */
function setDesktopIconsVisibility(visible) {
    const desktopIcons = document.querySelector('.desktop-icons');
    
    if (desktopIcons) {
        desktopIcons.style.display = visible ? 'flex' : 'none';
    }
    
    // 保存设置
    localStorage.setItem('showDesktopIcons', visible);
}

/**
 * 设置桌面图标大小
 * @param {string} size - 图标大小（像素）
 */
function setDesktopIconSize(size) {
    const desktopIconImgs = document.querySelectorAll('.desktop-icon-img');
    
    desktopIconImgs.forEach(img => {
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
    });
    
    // 保存设置
    localStorage.setItem('desktopIconSize', size);
}

/**
 * 设置图标排列
 * @param {string} arrangement - 排列方式（grid/name/kind/date/size）
 */
function setIconArrangement(arrangement) {
    // 在实际应用中，这里会重新排列桌面图标
    // 在这个演示中，我们只保存设置
    localStorage.setItem('iconArrangement', arrangement);
}

/**
 * 设置Dock大小
 * @param {string} size - Dock大小（像素）
 */
function setDockSize(size) {
    const root = document.documentElement;
    
    // 设置CSS变量
    root.style.setProperty('--dock-height', `${size}px`);
    
    // 保存设置
    localStorage.setItem('dockSize', size);
}

/**
 * 设置Dock放大效果
 * @param {boolean} enabled - 是否启用
 */
function setDockMagnification(enabled) {
    const dock = document.querySelector('.dock');
    
    if (dock) {
        if (enabled) {
            dock.classList.add('magnify');
        } else {
            dock.classList.remove('magnify');
        }
    }
    
    // 保存设置
    localStorage.setItem('dockMagnification', enabled);
}

/**
 * 设置Dock放大程度
 * @param {string} size - 放大大小（像素）
 */
function setDockMagnificationSize(size) {
    // 在实际应用中，这里会调整Dock放大效果的程度
    // 在这个演示中，我们只保存设置
    localStorage.setItem('dockMagnificationSize', size);
}

/**
 * 设置Dock位置
 * @param {string} position - 位置（bottom/left/right）
 */
function setDockPosition(position) {
    const dockContainer = document.querySelector('.dock-container');
    const dock = document.querySelector('.dock');
    
    if (!dockContainer || !dock) return;
    
    // 移除现有位置类
    dockContainer.classList.remove('dock-bottom', 'dock-left', 'dock-right');
    dock.classList.remove('dock-bottom', 'dock-left', 'dock-right');
    
    // 添加新位置类
    dockContainer.classList.add(`dock-${position}`);
    dock.classList.add(`dock-${position}`);
    
    // 保存设置
    localStorage.setItem('dockPosition', position);
}

/**
 * 设置Dock自动隐藏
 * @param {boolean} enabled - 是否启用
 */
function setDockAutoHide(enabled) {
    const dock = document.querySelector('.dock');
    
    if (dock) {
        if (enabled) {
            // 添加鼠标离开事件
            document.addEventListener('mousemove', handleDockAutoHide);
            
            // 初始状态为隐藏
            dock.classList.add('hide');
        } else {
            // 移除鼠标离开事件
            document.removeEventListener('mousemove', handleDockAutoHide);
            
            // 显示Dock
            dock.classList.remove('hide');
        }
    }
    
    // 保存设置
    localStorage.setItem('dockAutoHide', enabled);
}

/**
 * 处理Dock自动隐藏
 * @param {MouseEvent} e - 鼠标事件
 */
function handleDockAutoHide(e) {
    const dock = document.querySelector('.dock');
    const dockContainer = document.querySelector('.dock-container');
    
    if (!dock || !dockContainer) return;
    
    // 获取Dock位置
    const position = localStorage.getItem('dockPosition') || 'bottom';
    
    // 获取Dock容器位置
    const rect = dockContainer.getBoundingClientRect();
    
    // 根据Dock位置判断鼠标是否在Dock区域
    let isInDockArea = false;
    
    switch (position) {
        case 'bottom':
            isInDockArea = e.clientY >= window.innerHeight - 10;
            break;
        
        case 'left':
            isInDockArea = e.clientX <= 10;
            break;
        
        case 'right':
            isInDockArea = e.clientX >= window.innerWidth - 10;
            break;
    }
    
    // 根据鼠标位置显示或隐藏Dock
    if (isInDockArea || dockContainer.contains(e.target)) {
        dock.classList.remove('hide');
    } else {
        dock.classList.add('hide');
    }
}

/**
 * 设置分辨率
 * @param {string} resolution - 分辨率
 */
function setResolution(resolution) {
    // 在实际应用中，这里会调整屏幕分辨率
    // 在这个演示中，我们只保存设置
    localStorage.setItem('resolution', resolution);
}

/**
 * 设置显示缩放
 * @param {string} scale - 缩放比例
 */
function setDisplayScale(scale) {
    // 在实际应用中，这里会调整屏幕缩放
    // 在这个演示中，我们只保存设置
    localStorage.setItem('displayScale', scale);
}

/**
 * 设置夜间模式
 * @param {boolean} enabled - 是否启用
 */
function setNightMode(enabled) {
    // 在实际应用中，这里会调整屏幕色温
    // 在这个演示中，我们只保存设置
    localStorage.setItem('nightMode', enabled);
}

/**
 * 设置夜间模式时间
 * @param {string} type - 时间类型（start/end）
 * @param {string} time - 时间
 */
function setNightModeTime(type, time) {
    // 在实际应用中，这里会设置夜间模式的时间
    // 在这个演示中，我们只保存设置
    localStorage.setItem(`nightMode${type.charAt(0).toUpperCase() + type.slice(1)}Time`, time);
}

/**
 * 设置用户头像
 * @param {string} src - 头像数据URL
 */
function setUserAvatar(src) {
    const userAvatars = document.querySelectorAll('.user-avatar img');
    
    userAvatars.forEach(avatar => {
        avatar.src = src;
    });
    
    // 保存设置
    localStorage.setItem('userAvatar', src);
}

/**
 * 设置用户名
 * @param {string} name - 用户名
 */
function setUserName(name) {
    const userNames = document.querySelectorAll('.user-name');
    
    userNames.forEach(userName => {
        userName.textContent = name;
    });
    
    // 保存设置
    localStorage.setItem('userName', name);
}

/**
 * 设置用户密码
 * @param {string} password - 密码
 */
function setUserPassword(password) {
    // 在实际应用中，这里会加密并保存密码
    // 在这个演示中，我们只保存设置（注意：实际应用中不应该这样存储密码）
    localStorage.setItem('userPassword', password);
}

/**
 * 设置语言
 * @param {string} language - 语言代码
 */
function setLanguage(language) {
    // 在实际应用中，这里会切换界面语言
    // 在这个演示中，我们只保存设置
    localStorage.setItem('language', language);
}

/**
 * 设置时区
 * @param {string} timezone - 时区
 */
function setTimezone(timezone) {
    // 在实际应用中，这里会调整系统时区
    // 在这个演示中，我们只保存设置
    localStorage.setItem('timezone', timezone);
}

/**
 * 显示设置面板
 * @param {string} paneId - 面板ID
 */
function showSettingsPane(paneId) {
    // 获取设置窗口
    const settingsWindow = document.getElementById('settings-window');
    
    // 如果设置窗口不存在，则打开设置窗口
    if (!settingsWindow || settingsWindow.style.display === 'none' || !settingsWindow.style.display) {
        openSettings();
    }
    
    // 获取设置项和面板
    const settingItems = document.querySelectorAll('.setting-item');
    const settingPanes = document.querySelectorAll('.setting-pane');
    
    // 查找对应的设置项
    const targetItem = document.querySelector(`.setting-item[data-pane="${paneId}-pane"]`);
    
    if (targetItem) {
        // 移除其他设置项的活动状态
        settingItems.forEach(item => item.classList.remove('active'));
        
        // 添加当前设置项的活动状态
        targetItem.classList.add('active');
        
        // 隐藏所有设置面板
        settingPanes.forEach(pane => {
            pane.style.display = 'none';
        });
        
        // 显示当前设置面板
        const currentPane = document.getElementById(`${paneId}-pane`);
        
        if (currentPane) {
            currentPane.style.display = 'block';
        }
    }
}

// 导出函数供其他模块使用
window.showSettingsPane = showSettingsPane;
window.setAppearance = setAppearance;
window.setAccentColor = setAccentColor;
window.setDockSize = setDockSize;
window.setDockMagnification = setDockMagnification;
window.setDockPosition = setDockPosition;
window.setDockAutoHide = setDockAutoHide;
window.setUserAvatar = setUserAvatar;
window.setUserName = setUserName;
