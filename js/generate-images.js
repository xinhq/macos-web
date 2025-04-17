/* 创建简单的背景图像 */
function createGradientBackground(width, height, color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // 创建渐变
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.9);
}

/* 创建简单的图标 */
function createIcon(size, color, symbol) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 绘制圆角矩形
    const radius = size / 5;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    
    // 填充颜色
    ctx.fillStyle = color;
    ctx.fill();
    
    // 添加文字
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, size/2, size/2);
    
    return canvas.toDataURL('image/png');
}

/* 创建默认头像 */
function createAvatar(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // 绘制圆形背景
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fillStyle = '#e0e0e0';
    ctx.fill();
    
    // 绘制头部
    ctx.beginPath();
    ctx.arc(size/2, size*0.4, size*0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#a0a0a0';
    ctx.fill();
    
    // 绘制身体
    ctx.beginPath();
    ctx.moveTo(size*0.3, size*0.7);
    ctx.quadraticCurveTo(size/2, size*0.8, size*0.7, size*0.7);
    ctx.quadraticCurveTo(size*0.85, size, size*0.5, size);
    ctx.quadraticCurveTo(size*0.15, size, size*0.3, size*0.7);
    ctx.fillStyle = '#a0a0a0';
    ctx.fill();
    
    return canvas.toDataURL('image/png');
}

// 生成并下载所有图像
window.onload = function() {
    // 创建图像存储对象
    const images = {
        backgrounds: {
            'login-bg.jpg': createGradientBackground(1920, 1080, '#2c5364', '#203a43'),
            'desktop-bg.jpg': createGradientBackground(1920, 1080, '#4ca1af', '#c4e0e5')
        },
        icons: {
            'finder.png': createIcon(128, '#1e88e5', 'F'),
            'launchpad.png': createIcon(128, '#9c27b0', 'L'),
            'safari.png': createIcon(128, '#03a9f4', 'S'),
            'mail.png': createIcon(128, '#4caf50', 'M'),
            'photos.png': createIcon(128, '#f44336', 'P'),
            'messages.png': createIcon(128, '#00bcd4', 'M'),
            'maps.png': createIcon(128, '#ff9800', 'M'),
            'music.png': createIcon(128, '#e91e63', '♫'),
            'appstore.png': createIcon(128, '#2196f3', 'A'),
            'settings.png': createIcon(128, '#607d8b', '⚙'),
            'trash.png': createIcon(128, '#9e9e9e', 'T'),
            'facetime.png': createIcon(128, '#4caf50', 'F'),
            'calendar.png': createIcon(128, '#ff9800', 'C'),
            'contacts.png': createIcon(128, '#9c27b0', 'C'),
            'notes.png': createIcon(128, '#ffc107', 'N'),
            'reminders.png': createIcon(128, '#f44336', 'R'),
            'podcasts.png': createIcon(128, '#9c27b0', 'P'),
            'tv.png': createIcon(128, '#03a9f4', 'TV'),
            'news.png': createIcon(128, '#f44336', 'N'),
            'home.png': createIcon(128, '#4caf50', 'H'),
            'stocks.png': createIcon(128, '#607d8b', '$'),
            'books.png': createIcon(128, '#ff9800', 'B'),
            'calculator.png': createIcon(128, '#607d8b', '=')
        },
        other: {
            'default-avatar.png': createAvatar(256)
        }
    };
    
    // 创建下载链接
    const downloadSection = document.createElement('div');
    document.body.appendChild(downloadSection);
    
    // 添加状态信息
    const statusElement = document.createElement('p');
    statusElement.textContent = '正在生成图像...';
    downloadSection.appendChild(statusElement);
    
    // 创建图像列表
    const imageList = document.createElement('ul');
    downloadSection.appendChild(imageList);
    
    // 处理所有图像类别
    Object.entries(images).forEach(([category, categoryImages]) => {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `<strong>${category}</strong>`;
        imageList.appendChild(categoryItem);
        
        const subList = document.createElement('ul');
        categoryItem.appendChild(subList);
        
        // 处理每个图像
        Object.entries(categoryImages).forEach(([filename, dataUrl]) => {
            const listItem = document.createElement('li');
            
            // 创建下载链接
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            link.textContent = filename;
            link.style.marginRight = '10px';
            listItem.appendChild(link);
            
            // 显示图像预览
            const preview = document.createElement('img');
            preview.src = dataUrl;
            preview.style.maxHeight = '50px';
            preview.style.maxWidth = '50px';
            preview.style.verticalAlign = 'middle';
            listItem.appendChild(preview);
            
            subList.appendChild(listItem);
        });
    });
    
    statusElement.textContent = '图像生成完成！点击链接下载图像。';
};
