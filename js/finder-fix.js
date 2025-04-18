// 修改openFinder函数，确保只有在点击时才显示访达窗口
function openFinder() {
    const finderWindow = document.getElementById('finder-window');
    
    if (finderWindow) {
        // 添加show类来显示访达窗口
        finderWindow.classList.add('show');
        
        // 设置应用正在运行
        if (typeof setAppRunning === 'function') {
            setAppRunning('finder', true);
        }
    } else {
        console.error('访达窗口元素未找到');
    }
}

// 导出函数供其他模块使用
window.openFinder = openFinder;
