// 桌面环境核心功能
document.addEventListener('DOMContentLoaded', function() {
    // 系统状态变量
    const system = {
        activeWindow: null,
        windows: [],
        isLaunchpadOpen: false,
        isControlCenterOpen: false,
        isDockHovered: false,
        zIndex: 800
    };

    // 获取DOM元素
    const dock = document.querySelector('.dock');
    const dockApps = document.querySelectorAll('.dock-app');
    const controlCenterIcon = document.querySelector('.menu-bar-icon.control-center');
    const controlCenter = document.getElementById('control-center');
    const launchpadIcon = document.querySelector('.dock-app.launchpad');
    const launchpad = document.getElementById('launchpad');
    const finderIcon = document.querySelector('.dock-app.finder');
    const finderWindow = document.getElementById('finder-window');
    const windowControls = document.querySelectorAll('.window-controls .control');
    const datetime = document.querySelector('.menu-bar-datetime');

    // 初始化函数
    function init() {
        // 初始化窗口管理
        initWindowManagement();
        
        // 初始化Dock栏
        initDock();
        
        // 初始化控制中心
        initControlCenter();
        
        // 初始化Launchpad
        initLaunchpad();
        
        // 初始化菜单栏
        initMenuBar();
        
        // 更新日期时间
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    // 窗口管理系统
    function initWindowManagement() {
        // 注册所有窗口
        const windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            system.windows.push(window);
            
            // 窗口拖动功能
            const header = window.querySelector('.window-header');
            if (header) {
                makeDraggable(window, header);
            }
            
            // 窗口控制按钮功能
            const controls = window.querySelectorAll('.window-controls .control');
            controls.forEach(control => {
                control.addEventListener('click', function() {
                    if (this.classList.contains('close')) {
                        closeWindow(window);
                    } else if (this.classList.contains('minimize')) {
                        minimizeWindow(window);
                    } else if (this.classList.contains('maximize')) {
                        maximizeWindow(window);
                    }
                });
            });
            
            // 窗口点击激活
            window.addEventListener('mousedown', function() {
                activateWindow(window);
            });
        });
    }

    // 使元素可拖动
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        handle.addEventListener('mousedown', dragMouseDown);
        
        function dragMouseDown(e) {
            e.preventDefault();
            // 激活当前窗口
            activateWindow(element);
            
            // 获取鼠标位置
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // 添加鼠标移动和释放事件
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }
        
        function elementDrag(e) {
            e.preventDefault();
            
            // 计算新位置
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // 设置元素的新位置
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // 移除鼠标事件
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
        }
    }

    // 激活窗口
    function activateWindow(window) {
        // 如果已经是激活窗口，不做任何操作
        if (system.activeWindow === window) return;
        
        // 将所有窗口的z-index重置
        system.windows.forEach(win => {
            win.style.zIndex = 800;
        });
        
        // 设置当前窗口的z-index为最高
        system.zIndex += 1;
        window.style.zIndex = system.zIndex;
        
        // 更新激活窗口
        system.activeWindow = window;
    }

    // 打开窗口
    function openWindow(window) {
        if (!window) return;
        
        // 显示窗口
        window.style.display = 'block';
        
        // 激活窗口
        activateWindow(window);
    }

    // 关闭窗口
    function closeWindow(window) {
        if (!window) return;
        
        // 隐藏窗口
        window.style.display = 'none';
        
        // 如果关闭的是当前激活窗口，重置激活窗口
        if (system.activeWindow === window) {
            system.activeWindow = null;
        }
    }

    // 最小化窗口
    function minimizeWindow(window) {
        if (!window) return;
        
        // 实现最小化动画效果
        window.style.transform = 'scale(0.8)';
        window.style.opacity = '0';
        
        // 动画结束后隐藏窗口
        setTimeout(() => {
            window.style.display = 'none';
            window.style.transform = 'scale(1)';
            window.style.opacity = '1';
        }, 300);
        
        // 如果最小化的是当前激活窗口，重置激活窗口
        if (system.activeWindow === window) {
            system.activeWindow = null;
        }
    }

    // 最大化窗口
    function maximizeWindow(window) {
        if (!window) return;
        
        // 检查窗口是否已经最大化
        if (window.classList.contains('maximized')) {
            // 恢复窗口大小
            window.classList.remove('maximized');
            window.style.top = window.dataset.originalTop;
            window.style.left = window.dataset.originalLeft;
            window.style.width = window.dataset.originalWidth;
            window.style.height = window.dataset.originalHeight;
        } else {
            // 保存原始大小和位置
            window.dataset.originalTop = window.style.top;
            window.dataset.originalLeft = window.style.left;
            window.dataset.originalWidth = window.style.width;
            window.dataset.originalHeight = window.style.height;
            
            // 最大化窗口
            window.classList.add('maximized');
            window.style.top = '24px'; // 菜单栏高度
            window.style.left = '0';
            window.style.width = '100%';
            window.style.height = 'calc(100% - 24px)'; // 减去菜单栏高度
        }
    }

    // 初始化Dock栏
    function initDock() {
        // Dock应用点击事件
        dockApps.forEach(app => {
            app.addEventListener('click', function() {
                if (this.classList.contains('finder')) {
                    toggleFinder();
                } else if (this.classList.contains('launchpad')) {
                    toggleLaunchpad();
                } else if (this.classList.contains('settings')) {
                    // 打开设置应用
                    console.log('打开设置应用');
                } else {
                    // 其他应用的处理逻辑
                    console.log('点击了应用:', this.title);
                }
            });
            
            // Dock应用悬停效果
            app.addEventListener('mouseenter', function() {
                system.isDockHovered = true;
                this.style.transform = 'scale(1.2) translateY(-10px)';
            });
            
            app.addEventListener('mouseleave', function() {
                system.isDockHovered = false;
                this.style.transform = '';
            });
        });
    }

    // 初始化控制中心
    function initControlCenter() {
        // 控制中心图标点击事件
        controlCenterIcon.addEventListener('click', function() {
            toggleControlCenter();
        });
        
        // 点击其他区域关闭控制中心
        document.addEventListener('click', function(e) {
            if (system.isControlCenterOpen && 
                !controlCenterIcon.contains(e.target) && 
                !controlCenter.contains(e.target)) {
                toggleControlCenter();
            }
        });
        
        // 控制中心内部交互
        const moduleToggles = controlCenter.querySelectorAll('.module-toggle');
        moduleToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
                const module = this.closest('.control-module');
                const status = module.querySelector('.module-status');
                if (status) {
                    status.textContent = this.classList.contains('active') ? '已开启' : '已关闭';
                }
            });
        });
        
        // 滑块交互
        const sliderThumbs = controlCenter.querySelectorAll('.slider-thumb');
        sliderThumbs.forEach(thumb => {
            thumb.addEventListener('mousedown', function(e) {
                const slider = this.closest('.slider-bar');
                const sliderFill = slider.querySelector('.slider-fill');
                
                function moveSlider(e) {
                    const sliderRect = slider.getBoundingClientRect();
                    let position = (e.clientX - sliderRect.left) / sliderRect.width;
                    position = Math.max(0, Math.min(1, position));
                    
                    const percent = position * 100;
                    sliderFill.style.width = `${percent}%`;
                    thumb.style.left = `${percent}%`;
                }
                
                function stopSlider() {
                    document.removeEventListener('mousemove', moveSlider);
                    document.removeEventListener('mouseup', stopSlider);
                }
                
                document.addEventListener('mousemove', moveSlider);
                document.addEventListener('mouseup', stopSlider);
            });
        });
    }

    // 切换控制中心显示状态
    function toggleControlCenter() {
        system.isControlCenterOpen = !system.isControlCenterOpen;
        controlCenter.style.display = system.isControlCenterOpen ? 'block' : 'none';
    }

    // 初始化Launchpad
    function initLaunchpad() {
        // Launchpad内应用点击事件
        const appIcons = launchpad.querySelectorAll('.app-icon');
        appIcons.forEach(app => {
            app.addEventListener('click', function() {
                // 这里可以添加打开应用的逻辑
                console.log('从Launchpad打开应用:', this.querySelector('.app-name').textContent);
                toggleLaunchpad();
            });
        });
        
        // 点击背景关闭Launchpad
        launchpad.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleLaunchpad();
            }
        });
        
        // 搜索功能
        const searchInput = launchpad.querySelector('.launchpad-search input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const apps = launchpad.querySelectorAll('.app-icon');
                
                apps.forEach(app => {
                    const appName = app.querySelector('.app-name').textContent.toLowerCase();
                    if (searchTerm === '' || appName.includes(searchTerm)) {
                        app.style.display = 'flex';
                    } else {
                        app.style.display = 'none';
                    }
                });
            });
        }
    }

    // 切换Launchpad显示状态
    function toggleLaunchpad() {
        system.isLaunchpadOpen = !system.isLaunchpadOpen;
        launchpad.style.display = system.isLaunchpadOpen ? 'flex' : 'none';
        
        // 如果打开Launchpad，清空搜索框
        if (system.isLaunchpadOpen) {
            const searchInput = launchpad.querySelector('.launchpad-search input');
            if (searchInput) {
                searchInput.value = '';
                // 触发input事件以重置应用显示
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    }

    // 切换Finder显示状态
    function toggleFinder() {
        if (finderWindow.style.display === 'block') {
            activateWindow(finderWindow);
        } else {
            openWindow(finderWindow);
        }
    }

    // 初始化菜单栏
    function initMenuBar() {
        // 菜单项点击事件
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有菜单项的active类
                menuItems.forEach(mi => mi.classList.remove('active'));
                // 为当前点击的菜单项添加active类
                this.classList.add('active');
                
                // 这里可以添加菜单项点击的逻辑
                console.log('点击了菜单项:', this.textContent);
            });
        });
        
        // 菜单栏图标点击事件
        const menuBarIcons = document.querySelectorAll('.menu-bar-icon');
        menuBarIcons.forEach(icon => {
            if (!icon.classList.contains('control-center')) { // 控制中心已经处理过
                icon.addEventListener('click', function() {
                    console.log('点击了菜单栏图标:', this.classList[1]);
                });
            }
        });
    }

    // 更新日期时间
    function updateDateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const day = days[now.getDay()];
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const dateStr = `${day} ${month}月${date}日`;
        
        const dateElement = datetime.querySelector('.date');
        const timeElement = datetime.querySelector('.time');
        
        if (dateElement) dateElement.textContent = dateStr;
        if (timeElement) timeElement.textContent = time;
    }

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // ESC键关闭Launchpad和控制中心
        if (e.key === 'Escape') {
            if (system.isLaunchpadOpen) {
                toggleLaunchpad();
            }
            if (system.isControlCenterOpen) {
                toggleControlCenter();
            }
        }
        
        // Command+Space打开Launchpad (模拟)
        if (e.key === ' ' && (e.metaKey || e.ctrlKey)) {
            toggleLaunchpad();
        }
    });

    // 初始化系统
    init();
});
