/**
 * macOS Monterey 网页版 - 控制中心功能
 * 负责控制中心的交互和功能实现
 */

// 控制中心管理器
const controlCenterManager = {
    // 控制中心是否打开
    isOpen: false,
    
    // 系统状态
    systemState: {
        wifi: true,
        bluetooth: false,
        airDrop: true,
        airplay: false,
        doNotDisturb: false,
        darkMode: false,
        nightShift: false,
        brightness: 80,
        volume: 60,
        music: {
            playing: false,
            title: "Monterey",
            artist: "Apple Music",
            artwork: "img/music-artwork.jpg"
        }
    },
    
    // 初始化控制中心
    init: function() {
        console.log('控制中心已初始化');
        
        // 创建控制中心HTML
        this._createControlCenterHTML();
        
        // 添加事件监听
        this._addEventListeners();
        
        // 同步系统状态
        this._syncSystemState();
    },
    
    // 创建控制中心HTML
    _createControlCenterHTML: function() {
        const controlCenter = document.createElement('div');
        controlCenter.id = 'control-center';
        controlCenter.className = 'control-center hidden';
        
        controlCenter.innerHTML = `
            <div class="control-center-grid">
                <div class="control-center-module medium">
                    <div class="control-center-header">
                        <div class="control-center-title">无线局域网与蓝牙</div>
                    </div>
                    <div class="control-center-content">
                        <div class="control-center-buttons">
                            <div class="control-center-button ${this.systemState.wifi ? 'active' : ''}" data-control="wifi">
                                <div class="control-center-button-icon">
                                    <i class="fas fa-wifi"></i>
                                </div>
                                <div class="control-center-button-label">Wi-Fi</div>
                            </div>
                            <div class="control-center-button ${this.systemState.bluetooth ? 'active' : ''}" data-control="bluetooth">
                                <div class="control-center-button-icon">
                                    <i class="fab fa-bluetooth-b"></i>
                                </div>
                                <div class="control-center-button-label">蓝牙</div>
                            </div>
                            <div class="control-center-button ${this.systemState.airDrop ? 'active' : ''}" data-control="airdrop">
                                <div class="control-center-button-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <div class="control-center-button-label">隔空投送</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="control-center-module medium">
                    <div class="control-center-header">
                        <div class="control-center-title">显示器</div>
                    </div>
                    <div class="control-center-content">
                        <div class="control-center-buttons">
                            <div class="control-center-button ${this.systemState.airplay ? 'active' : ''}" data-control="airplay">
                                <div class="control-center-button-icon">
                                    <i class="fas fa-desktop"></i>
                                </div>
                                <div class="control-center-button-label">隔空播放</div>
                            </div>
                            <div class="control-center-button ${this.systemState.nightShift ? 'active' : ''}" data-control="nightshift">
                                <div class="control-center-button-icon">
                                    <i class="fas fa-moon"></i>
                                </div>
                                <div class="control-center-button-label">夜览</div>
                            </div>
                            <div class="control-center-button ${this.systemState.darkMode ? 'active' : ''}" data-control="darkmode">
                                <div class="control-center-button-icon">
                                    <i class="fas fa-adjust"></i>
                                </div>
                                <div class="control-center-button-label">深色模式</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="control-center-module large">
                    <div class="control-center-slider">
                        <div class="control-center-slider-header">
                            <div class="control-center-slider-icon">
                                <i class="fas fa-sun"></i>
                            </div>
                            <div class="control-center-slider-value">${this.systemState.brightness}%</div>
                        </div>
                        <div class="control-center-slider-track" data-control="brightness">
                            <div class="control-center-slider-fill" style="width: ${this.systemState.brightness}%"></div>
                            <div class="control-center-slider-thumb" style="left: ${this.systemState.brightness}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="control-center-module large">
                    <div class="control-center-slider">
                        <div class="control-center-slider-header">
                            <div class="control-center-slider-icon">
                                <i class="fas fa-volume-up"></i>
                            </div>
                            <div class="control-center-slider-value">${this.systemState.volume}%</div>
                        </div>
                        <div class="control-center-slider-track" data-control="volume">
                            <div class="control-center-slider-fill" style="width: ${this.systemState.volume}%"></div>
                            <div class="control-center-slider-thumb" style="left: ${this.systemState.volume}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="control-center-module large">
                    <div class="control-center-header">
                        <div class="control-center-title">正在播放</div>
                    </div>
                    <div class="control-center-content">
                        <div class="control-center-now-playing">
                            <div class="control-center-now-playing-art">
                                <img src="${this.systemState.music.artwork}" alt="Album Art">
                            </div>
                            <div class="control-center-now-playing-info">
                                <div class="control-center-now-playing-title">${this.systemState.music.title}</div>
                                <div class="control-center-now-playing-artist">${this.systemState.music.artist}</div>
                                <div class="control-center-now-playing-controls">
                                    <div class="control-center-now-playing-control" data-control="previous">
                                        <i class="fas fa-step-backward"></i>
                                    </div>
                                    <div class="control-center-now-playing-control" data-control="play">
                                        <i class="fas ${this.systemState.music.playing ? 'fa-pause' : 'fa-play'}"></i>
                                    </div>
                                    <div class="control-center-now-playing-control" data-control="next">
                                        <i class="fas fa-step-forward"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="control-center-module medium">
                    <div class="control-center-switch">
                        <div class="control-center-switch-label">专注模式</div>
                        <label class="control-center-switch-toggle">
                            <input type="checkbox" data-control="donotdisturb" ${this.systemState.doNotDisturb ? 'checked' : ''}>
                            <span class="control-center-switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(controlCenter);
    },
    
    // 添加事件监听
    _addEventListeners: function() {
        // 控制中心按钮点击
        const controlCenterButtons = document.querySelectorAll('.control-center-button');
        controlCenterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const control = button.getAttribute('data-control');
                this._toggleControl(control);
                button.classList.toggle('active');
                e.stopPropagation();
            });
        });
        
        // 控制中心开关切换
        const controlCenterSwitches = document.querySelectorAll('.control-center-switch-toggle input');
        controlCenterSwitches.forEach(switchEl => {
            switchEl.addEventListener('change', (e) => {
                const control = switchEl.getAttribute('data-control');
                this._toggleControl(control, e.target.checked);
                e.stopPropagation();
            });
        });
        
        // 控制中心滑块拖动
        const controlCenterSliders = document.querySelectorAll('.control-center-slider-track');
        controlCenterSliders.forEach(slider => {
            const thumb = slider.querySelector('.control-center-slider-thumb');
            const fill = slider.querySelector('.control-center-slider-fill');
            const control = slider.getAttribute('data-control');
            const valueDisplay = slider.parentElement.querySelector('.control-center-slider-value');
            
            let isDragging = false;
            
            thumb.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.stopPropagation();
            });
            
            slider.addEventListener('mousedown', (e) => {
                // 直接点击滑块轨道时，立即更新位置
                this._updateSliderPosition(slider, e.clientX, control, thumb, fill, valueDisplay);
                isDragging = true;
                e.stopPropagation();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    this._updateSliderPosition(slider, e.clientX, control, thumb, fill, valueDisplay);
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });
        
        // 音乐控制按钮点击
        const musicControls = document.querySelectorAll('.control-center-now-playing-control');
        musicControls.forEach(control => {
            control.addEventListener('click', (e) => {
                const action = control.getAttribute('data-control');
                this._handleMusicControl(action);
                e.stopPropagation();
            });
        });
        
        // 点击控制中心外部关闭
        document.addEventListener('click', (e) => {
            const controlCenter = document.getElementById('control-center');
            const controlCenterButton = document.getElementById('control-center-button');
            
            if (controlCenter && !controlCenter.contains(e.target) && 
                controlCenterButton && !controlCenterButton.contains(e.target)) {
                this.close();
            }
        });
        
        // 点击控制中心按钮打开/关闭控制中心
        const controlCenterButton = document.getElementById('control-center-button');
        if (controlCenterButton) {
            controlCenterButton.addEventListener('click', (e) => {
                this.toggle();
                e.stopPropagation();
            });
        }
        
        // ESC键关闭控制中心
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },
    
    // 更新滑块位置
    _updateSliderPosition: function(slider, clientX, control, thumb, fill, valueDisplay) {
        const rect = slider.getBoundingClientRect();
        let x = clientX - rect.left;
        
        // 限制在滑块范围内
        x = Math.max(0, Math.min(x, rect.width));
        
        // 计算百分比
        const percent = Math.round(x / rect.width * 100);
        
        // 更新滑块位置
        thumb.style.left = `${percent}%`;
        fill.style.width = `${percent}%`;
        
        // 更新显示值
        if (valueDisplay) {
            valueDisplay.textContent = `${percent}%`;
        }
        
        // 更新系统状态
        this._updateControlValue(control, percent);
    },
    
    // 切换控制
    _toggleControl: function(control, value) {
        switch (control) {
            case 'wifi':
                this.systemState.wifi = value !== undefined ? value : !this.systemState.wifi;
                break;
            case 'bluetooth':
                this.systemState.bluetooth = value !== undefined ? value : !this.systemState.bluetooth;
                break;
            case 'airdrop':
                this.systemState.airDrop = value !== undefined ? value : !this.systemState.airDrop;
                break;
            case 'airplay':
                this.systemState.airplay = value !== undefined ? value : !this.systemState.airplay;
                break;
            case 'nightshift':
                this.systemState.nightShift = value !== undefined ? value : !this.systemState.nightShift;
                break;
            case 'darkmode':
                this.systemState.darkMode = value !== undefined ? value : !this.systemState.darkMode;
                this._toggleDarkMode();
                break;
            case 'donotdisturb':
                this.systemState.doNotDisturb = value !== undefined ? value : !this.systemState.doNotDisturb;
                break;
        }
        
        // 同步到系统状态
        this._syncSystemState();
    },
    
    // 更新控制值
    _updateControlValue: function(control, value) {
        switch (control) {
            case 'brightness':
                this.systemState.brightness = value;
                this._updateBrightness(value);
                break;
            case 'volume':
                this.systemState.volume = value;
                break;
        }
        
        // 同步到系统状态
        this._syncSystemState();
    },
    
    // 处理音乐控制
    _handleMusicControl: function(action) {
        switch (action) {
            case 'play':
                this.systemState.music.playing = !this.systemState.music.playing;
                
                // 更新播放按钮图标
                const playButton = document.querySelector('.control-center-now-playing-control[data-control="play"] i');
                if (playButton) {
                    playButton.className = this.systemState.music.playing ? 'fas fa-pause' : 'fas fa-play';
                }
                break;
            case 'previous':
                // 模拟上一曲
                console.log('播放上一曲');
                break;
            case 'next':
                // 模拟下一曲
                console.log('播放下一曲');
                break;
        }
    },
    
    // 切换深色模式
    _toggleDarkMode: function() {
        if (this.systemState.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    },
    
    // 更新亮度
    _updateBrightness: function(value) {
        // 在真实系统中，这会调整屏幕亮度
        // 在网页版中，我们可以模拟亮度调整
        const brightness = value / 100;
        document.documentElement.style.setProperty('--screen-brightness', brightness);
    },
    
    // 同步系统状态
    _syncSystemState: function() {
        // 将系统状态同步到全局
        if (window.system) {
            window.system.state = {
                ...window.system.state,
                ...this.systemState
            };
        }
        
        // 更新菜单栏图标状态
        this._updateMenuBarIcons();
    },
    
    // 更新菜单栏图标状态
    _updateMenuBarIcons: function() {
        // Wi-Fi图标
        const wifiIcon = document.querySelector('#menubar-wifi-icon');
        if (wifiIcon) {
            if (this.systemState.wifi) {
                wifiIcon.classList.remove('disabled');
            } else {
                wifiIcon.classList.add('disabled');
            }
        }
        
        // 蓝牙图标
        const bluetoothIcon = document.querySelector('#menubar-bluetooth-icon');
        if (bluetoothIcon) {
            if (this.systemState.bluetooth) {
                bluetoothIcon.classList.remove('disabled');
            } else {
                bluetoothIcon.classList.add('disabled');
            }
        }
        
        // 专注模式图标
        const dndIcon = document.querySelector('#menubar-dnd-icon');
        if (dndIcon) {
            if (this.systemState.doNotDisturb) {
                dndIcon.classList.remove('hidden');
            } else {
                dndIcon.classList.add('hidden');
            }
        }
    },
    
    // 打开控制中心
    open: function() {
        const controlCenter = document.getElementById('control-center');
        if (controlCenter) {
            controlCenter.classList.remove('hidden');
            this.isOpen = true;
        }
    },
    
    // 关闭控制中心
    close: function() {
        const controlCenter = document.getElementById('control-center');
        if (controlCenter) {
            controlCenter.classList.add('hidden');
            this.isOpen = false;
        }
    },
    
    // 切换控制中心
    toggle: function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
};

// 初始化控制中心
function initControlCenter() {
    controlCenterManager.init();
    
    // 导出控制中心管理器到全局
    window.controlCenterManager = controlCenterManager;
}

// 当文档加载完成时初始化控制中心
document.addEventListener('DOMContentLoaded', () => {
    initControlCenter();
});
