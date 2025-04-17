// 登录界面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录按钮元素
    const loginBtn = document.getElementById('login-btn');
    
    // 如果找到登录按钮，添加点击事件
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // 跳转到桌面页面
            window.location.href = 'desktop.html';
        });
    }
    
    // 语言选择功能
    const languageOptions = document.querySelectorAll('.language-options a');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除所有语言选项的active类
            languageOptions.forEach(opt => opt.classList.remove('active'));
            // 为当前点击的选项添加active类
            this.classList.add('active');
            // 这里可以添加语言切换的逻辑
        });
    });
    
    // 显示关于信息的功能（可以通过某个按钮触发）
    // 这里仅作为示例，实际上可能需要一个按钮来触发
    function toggleAboutInfo() {
        const aboutInfo = document.querySelector('.about-macos');
        if (aboutInfo) {
            aboutInfo.style.display = aboutInfo.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    // 可以添加键盘快捷键，例如按下'i'键显示关于信息
    document.addEventListener('keydown', function(e) {
        if (e.key === 'i' && e.altKey) {
            toggleAboutInfo();
        }
    });
});
