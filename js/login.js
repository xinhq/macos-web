// login.js - 登录页面功能实现

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化登录页面
    initLoginPage();
});

/**
 * 初始化登录页面
 */
function initLoginPage() {
    // 更新时间和日期
    updateDateTime();
    
    // 设置定时器，每分钟更新一次时间
    setInterval(updateDateTime, 60000);
    
    // 初始化登录按钮
    initLoginButton();
    
    // 初始化语言选择
    initLanguageSelector();
    
    // 初始化电源按钮
    initPowerButtons();
    
    // 初始化关于对话框
    initAboutDialog();
    
    // 加载保存的用户信息
    loadUserInfo();
    
    // 添加密码输入框回车事件
    initPasswordInput();
}

/**
 * 更新时间和日期
 */
function updateDateTime() {
    const now = new Date();
    
    // 更新时间
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('login-time').textContent = `${hours}:${minutes}`;
    
    // 更新日期
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('zh-CN', options);
    document.getElementById('login-date').textContent = dateString;
}

/**
 * 初始化登录按钮
 */
function initLoginButton() {
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            handleLogin();
        });
    }
}

/**
 * 处理登录操作
 */
function handleLogin() {
    // 获取密码输入
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput ? passwordInput.value : '';
    
    // 在实际应用中，这里会验证密码
    // 在这个演示中，我们接受任何密码
    
    // 显示加载动画
    showLoginAnimation();
    
    // 延迟一段时间后切换到桌面
    setTimeout(function() {
        // 保存用户信息
        saveUserInfo();
        
        // 切换到桌面页面
        window.location.href = 'desktop.html';
    }, 1000);
}

/**
 * 显示登录动画
 */
function showLoginAnimation() {
    // 添加登录中的类
    document.body.classList.add('logging-in');
    
    // 显示登录提示
    const loginHint = document.getElementById('login-hint');
    if (loginHint) {
        loginHint.textContent = '正在登录...';
    }
    
    // 禁用登录按钮
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.disabled = true;
    }
    
    // 禁用密码输入框
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.disabled = true;
    }
}

/**
 * 初始化密码输入框
 */
function initPasswordInput() {
    const passwordInput = document.getElementById('password-input');
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            // 如果按下回车键
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
        
        // 自动聚焦密码输入框
        passwordInput.focus();
    }
}

/**
 * 初始化语言选择
 */
function initLanguageSelector() {
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageButton && languageMenu) {
        // 点击语言按钮显示/隐藏语言菜单
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle('show');
        });
        
        // 点击语言选项
        const languageOptions = languageMenu.querySelectorAll('li');
        
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 获取选中的语言
                const lang = this.dataset.lang;
                
                // 更新语言按钮文本
                const langText = this.textContent;
                const langTextSpan = languageButton.querySelector('.text');
                
                if (langTextSpan) {
                    langTextSpan.textContent = langText;
                }
                
                // 更新选中状态
                languageOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.classList.add('selected');
                
                // 保存语言设置
                localStorage.setItem('language', lang);
                
                // 隐藏语言菜单
                languageMenu.classList.remove('show');
            });
        });
        
        // 点击其他区域关闭语言菜单
        document.addEventListener('click', function() {
            languageMenu.classList.remove('show');
        });
    }
}

/**
 * 初始化电源按钮
 */
function initPowerButtons() {
    // 睡眠按钮
    const sleepButton = document.querySelector('.sleep-button');
    
    if (sleepButton) {
        sleepButton.addEventListener('click', function() {
            // 显示睡眠动画
            document.body.classList.add('sleeping');
            
            // 延迟后恢复
            setTimeout(function() {
                document.body.classList.remove('sleeping');
            }, 2000);
        });
    }
    
    // 重启按钮
    const restartButton = document.querySelector('.restart-button');
    
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            // 显示重启动画
            document.body.classList.add('restarting');
            
            // 延迟后刷新页面
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        });
    }
    
    // 关机按钮
    const shutdownButton = document.querySelector('.shutdown-button');
    
    if (shutdownButton) {
        shutdownButton.addEventListener('click', function() {
            // 显示关机动画
            document.body.classList.add('shutting-down');
            
            // 延迟后显示黑屏
            setTimeout(function() {
                document.body.innerHTML = '<div class="black-screen"></div>';
            }, 2000);
        });
    }
}

/**
 * 初始化关于对话框
 */
function initAboutDialog() {
    const aboutDialog = document.getElementById('about-dialog');
    const closeButton = document.getElementById('about-close-button');
    
    if (aboutDialog && closeButton) {
        // 点击关闭按钮
        closeButton.addEventListener('click', function() {
            aboutDialog.classList.remove('show');
        });
    }
    
    // 添加快捷键显示关于对话框
    document.addEventListener('keydown', function(e) {
        // Alt+A 显示关于对话框
        if (e.altKey && e.key === 'a') {
            aboutDialog.classList.add('show');
        }
        
        // Esc 关闭关于对话框
        if (e.key === 'Escape' && aboutDialog.classList.contains('show')) {
            aboutDialog.classList.remove('show');
        }
    });
}

/**
 * 加载保存的用户信息
 */
function loadUserInfo() {
    // 加载用户名
    const savedUserName = localStorage.getItem('userName');
    
    if (savedUserName) {
        const userNameElement = document.getElementById('user-name');
        
        if (userNameElement) {
            userNameElement.textContent = savedUserName;
        }
    }
    
    // 加载用户头像
    const savedUserAvatar = localStorage.getItem('userAvatar');
    
    if (savedUserAvatar) {
        const userAvatarElement = document.getElementById('user-avatar');
        
        if (userAvatarElement) {
            userAvatarElement.src = savedUserAvatar;
        }
    }
    
    // 加载语言设置
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
        const languageOption = document.querySelector(`li[data-lang="${savedLanguage}"]`);
        
        if (languageOption) {
            // 模拟点击语言选项
            languageOption.click();
        }
    }
}

/**
 * 保存用户信息
 */
function saveUserInfo() {
    // 获取用户名
    const userNameElement = document.getElementById('user-name');
    const userName = userNameElement ? userNameElement.textContent : '';
    
    // 保存用户名
    if (userName) {
        localStorage.setItem('userName', userName);
    }
    
    // 获取密码
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput ? passwordInput.value : '';
    
    // 保存密码（注意：实际应用中不应该这样存储密码）
    if (password) {
        localStorage.setItem('userPassword', password);
    }
}
