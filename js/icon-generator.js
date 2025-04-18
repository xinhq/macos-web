// icon-generator.js - 生成macOS风格的文件和应用图标

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图标生成器
    initIconGenerator();
});

/**
 * 初始化图标生成器
 */
function initIconGenerator() {
    // 创建系统图标
    createSystemIcons();
    
    // 创建应用图标
    createAppIcons();
    
    // 创建文件类型图标
    createFileTypeIcons();
    
    // 创建文件夹图标
    createFolderIcons();
}

/**
 * 创建系统图标
 */
function createSystemIcons() {
    const systemIcons = [
        { name: 'apple-logo', path: 'icons/system/apple-logo.svg' },
        { name: 'finder', path: 'icons/system/finder.svg' },
        { name: 'trash-empty', path: 'icons/system/trash-empty.svg' },
        { name: 'trash-full', path: 'icons/system/trash-full.svg' },
        { name: 'search', path: 'icons/system/search.svg' },
        { name: 'settings', path: 'icons/system/settings.svg' },
        { name: 'wifi', path: 'icons/system/wifi.svg' },
        { name: 'bluetooth', path: 'icons/system/bluetooth.svg' },
        { name: 'battery', path: 'icons/system/battery.svg' },
        { name: 'volume', path: 'icons/system/volume.svg' },
        { name: 'brightness', path: 'icons/system/brightness.svg' },
        { name: 'notification', path: 'icons/system/notification.svg' },
        { name: 'control-center', path: 'icons/system/control-center.svg' },
        { name: 'siri', path: 'icons/system/siri.svg' },
        { name: 'launchpad', path: 'icons/system/launchpad.svg' },
        { name: 'desktop', path: 'icons/system/desktop.svg' }
    ];
    
    // 生成系统图标SVG
    systemIcons.forEach(icon => {
        generateSystemIconSVG(icon.name);
    });
}

/**
 * 创建应用图标
 */
function createAppIcons() {
    const appIcons = [
        { name: 'finder', path: 'icons/apps/finder.svg', color: '#1E88E5' },
        { name: 'safari', path: 'icons/apps/safari.svg', color: '#2196F3' },
        { name: 'mail', path: 'icons/apps/mail.svg', color: '#42A5F5' },
        { name: 'messages', path: 'icons/apps/messages.svg', color: '#4CAF50' },
        { name: 'maps', path: 'icons/apps/maps.svg', color: '#66BB6A' },
        { name: 'photos', path: 'icons/apps/photos.svg', color: '#FF9800' },
        { name: 'notes', path: 'icons/apps/notes.svg', color: '#FFEB3B' },
        { name: 'reminders', path: 'icons/apps/reminders.svg', color: '#FF5722' },
        { name: 'calendar', path: 'icons/apps/calendar.svg', color: '#F44336' },
        { name: 'contacts', path: 'icons/apps/contacts.svg', color: '#E91E63' },
        { name: 'music', path: 'icons/apps/music.svg', color: '#9C27B0' },
        { name: 'podcasts', path: 'icons/apps/podcasts.svg', color: '#673AB7' },
        { name: 'tv', path: 'icons/apps/tv.svg', color: '#3F51B5' },
        { name: 'app-store', path: 'icons/apps/app-store.svg', color: '#2196F3' },
        { name: 'facetime', path: 'icons/apps/facetime.svg', color: '#4CAF50' },
        { name: 'books', path: 'icons/apps/books.svg', color: '#FF9800' },
        { name: 'calculator', path: 'icons/apps/calculator.svg', color: '#607D8B' },
        { name: 'terminal', path: 'icons/apps/terminal.svg', color: '#212121' }
    ];
    
    // 生成应用图标SVG
    appIcons.forEach(icon => {
        generateAppIconSVG(icon.name, icon.color);
    });
}

/**
 * 创建文件类型图标
 */
function createFileTypeIcons() {
    const fileTypeIcons = [
        { name: 'generic', path: 'icons/files/generic.svg', color: '#90CAF9' },
        { name: 'text', path: 'icons/files/text.svg', color: '#90CAF9' },
        { name: 'image', path: 'icons/files/image.svg', color: '#81C784' },
        { name: 'audio', path: 'icons/files/audio.svg', color: '#FFD54F' },
        { name: 'video', path: 'icons/files/video.svg', color: '#FF8A65' },
        { name: 'pdf', path: 'icons/files/pdf.svg', color: '#EF5350' },
        { name: 'archive', path: 'icons/files/archive.svg', color: '#9575CD' },
        { name: 'code', path: 'icons/files/code.svg', color: '#7986CB' },
        { name: 'html', path: 'icons/files/html.svg', color: '#FF7043' },
        { name: 'css', path: 'icons/files/css.svg', color: '#42A5F5' },
        { name: 'js', path: 'icons/files/js.svg', color: '#FFCA28' },
        { name: 'json', path: 'icons/files/json.svg', color: '#8D6E63' },
        { name: 'xml', path: 'icons/files/xml.svg', color: '#78909C' },
        { name: 'markdown', path: 'icons/files/markdown.svg', color: '#42A5F5' },
        { name: 'font', path: 'icons/files/font.svg', color: '#EC407A' },
        { name: 'executable', path: 'icons/files/executable.svg', color: '#66BB6A' }
    ];
    
    // 生成文件类型图标SVG
    fileTypeIcons.forEach(icon => {
        generateFileIconSVG(icon.name, icon.color);
    });
}

/**
 * 创建文件夹图标
 */
function createFolderIcons() {
    const folderIcons = [
        { name: 'folder', path: 'icons/folders/folder.svg', color: '#90CAF9' },
        { name: 'folder-documents', path: 'icons/folders/folder-documents.svg', color: '#90CAF9' },
        { name: 'folder-downloads', path: 'icons/folders/folder-downloads.svg', color: '#90CAF9' },
        { name: 'folder-desktop', path: 'icons/folders/folder-desktop.svg', color: '#90CAF9' },
        { name: 'folder-pictures', path: 'icons/folders/folder-pictures.svg', color: '#90CAF9' },
        { name: 'folder-music', path: 'icons/folders/folder-music.svg', color: '#90CAF9' },
        { name: 'folder-movies', path: 'icons/folders/folder-movies.svg', color: '#90CAF9' },
        { name: 'folder-applications', path: 'icons/folders/folder-applications.svg', color: '#90CAF9' },
        { name: 'folder-cloud', path: 'icons/folders/folder-cloud.svg', color: '#90CAF9' },
        { name: 'folder-shared', path: 'icons/folders/folder-shared.svg', color: '#90CAF9' }
    ];
    
    // 生成文件夹图标SVG
    folderIcons.forEach(icon => {
        generateFolderIconSVG(icon.name, icon.color);
    });
}

/**
 * 生成系统图标SVG
 * @param {string} name - 图标名称
 */
function generateSystemIconSVG(name) {
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    // 根据图标名称设置路径
    switch (name) {
        case 'apple-logo':
            // 苹果Logo
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', 'M12 2C9.5 2 8 3.5 8 6.5C8 9.5 9.5 11 12 11C14.5 11 16 9.5 16 6.5C16 3.5 14.5 2 12 2Z');
            path1.setAttribute('fill', 'currentColor');
            path1.setAttribute('stroke', 'none');
            
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'M16 6.5C16 9.5 18 11 18 14C18 17 16 22 12 22C8 22 6 17 6 14C6 11 8 9.5 8 6.5');
            path2.setAttribute('fill', 'none');
            
            svg.appendChild(path1);
            svg.appendChild(path2);
            break;
            
        case 'finder':
            // Finder图标
            const finderPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            finderPath.setAttribute('d', 'M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z');
            finderPath.setAttribute('fill', '#1E88E5');
            finderPath.setAttribute('stroke', 'none');
            
            const finderFace = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            finderFace.setAttribute('d', 'M8 10C8 8.89543 8.89543 8 10 8H14C15.1046 8 16 8.89543 16 10V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V10Z');
            finderFace.setAttribute('fill', 'white');
            finderFace.setAttribute('stroke', 'none');
            
            svg.appendChild(finderPath);
            svg.appendChild(finderFace);
            break;
            
        case 'trash-empty':
            // 空垃圾桶图标
            const trashPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trashPath.setAttribute('d', 'M3 6H5H21');
            
            const trashPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trashPath2.setAttribute('d', 'M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6');
            
            const trashPath3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trashPath3.setAttribute('d', 'M10 11V17');
            
            const trashPath4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trashPath4.setAttribute('d', 'M14 11V17');
            
            const trashPath5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trashPath5.setAttribute('d', 'M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6');
            
            svg.appendChild(trashPath);
            svg.appendChild(trashPath2);
            svg.appendChild(trashPath3);
            svg.appendChild(trashPath4);
            svg.appendChild(trashPath5);
            break;
            
        // 其他系统图标...
        default:
            // 默认图标
            const defaultPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            defaultPath.setAttribute('cx', '12');
            defaultPath.setAttribute('cy', '12');
            defaultPath.setAttribute('r', '10');
            
            svg.appendChild(defaultPath);
    }
    
    // 将SVG转换为字符串
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    // 创建Blob对象
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    
    // 创建URL
    const url = URL.createObjectURL(blob);
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    // 创建图标图像
    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    img.className = 'icon-image';
    
    // 创建图标名称
    const iconName = document.createElement('div');
    iconName.className = 'icon-name';
    iconName.textContent = name;
    
    // 添加到容器
    iconContainer.appendChild(img);
    iconContainer.appendChild(iconName);
    
    // 添加下载按钮
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.textContent = '下载';
    downloadButton.addEventListener('click', function() {
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
    });
    
    iconContainer.appendChild(downloadButton);
    
    // 添加到图标生成器容器
    const iconGeneratorContainer = document.querySelector('.icon-generator-container');
    
    if (iconGeneratorContainer) {
        iconGeneratorContainer.appendChild(iconContainer);
    }
}

/**
 * 生成应用图标SVG
 * @param {string} name - 图标名称
 * @param {string} color - 图标颜色
 */
function generateAppIconSVG(name, color) {
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '64');
    svg.setAttribute('height', '64');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('fill', 'none');
    
    // 创建圆角矩形背景
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('x', '4');
    background.setAttribute('y', '4');
    background.setAttribute('width', '56');
    background.setAttribute('height', '56');
    background.setAttribute('rx', '12');
    background.setAttribute('fill', color);
    
    svg.appendChild(background);
    
    // 根据应用名称添加图标
    switch (name) {
        case 'finder':
            // Finder笑脸
            const face = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            face.setAttribute('d', 'M20 24C20 22.8954 20.8954 22 22 22H42C43.1046 22 44 22.8954 44 24V44C44 45.1046 43.1046 46 42 46H22C20.8954 46 20 45.1046 20 44V24Z');
            face.setAttribute('fill', 'white');
            
            const leftEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            leftEye.setAttribute('cx', '28');
            leftEye.setAttribute('cy', '32');
            leftEye.setAttribute('r', '3');
            leftEye.setAttribute('fill', color);
            
            const rightEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            rightEye.setAttribute('cx', '36');
            rightEye.setAttribute('cy', '32');
            rightEye.setAttribute('r', '3');
            rightEye.setAttribute('fill', color);
            
            const mouth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            mouth.setAttribute('d', 'M28 38C28 38 30 40 32 40C34 40 36 38 36 38');
            mouth.setAttribute('stroke', color);
            mouth.setAttribute('stroke-width', '2');
            mouth.setAttribute('stroke-linecap', 'round');
            
            svg.appendChild(face);
            svg.appendChild(leftEye);
            svg.appendChild(rightEye);
            svg.appendChild(mouth);
            break;
            
        case 'safari':
            // Safari指南针
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '32');
            circle.setAttribute('cy', '32');
            circle.setAttribute('r', '16');
            circle.setAttribute('fill', 'white');
            
            const needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            needle.setAttribute('d', 'M24 24L40 40M40 24L24 40');
            needle.setAttribute('stroke', color);
            needle.setAttribute('stroke-width', '2');
            needle.setAttribute('stroke-linecap', 'round');
            
            svg.appendChild(circle);
            svg.appendChild(needle);
            break;
            
        case 'mail':
            // 邮件图标
            const envelope = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            envelope.setAttribute('x', '16');
            envelope.setAttribute('y', '20');
            envelope.setAttribute('width', '32');
            envelope.setAttribute('height', '24');
            envelope.setAttribute('rx', '2');
            envelope.setAttribute('fill', 'white');
            
            const flap = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            flap.setAttribute('d', 'M16 22L32 34L48 22');
            flap.setAttribute('stroke', color);
            flap.setAttribute('stroke-width', '2');
            flap.setAttribute('fill', 'none');
            
            svg.appendChild(envelope);
            svg.appendChild(flap);
            break;
            
        // 其他应用图标...
        default:
            // 默认应用图标
            const defaultIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            defaultIcon.setAttribute('cx', '32');
            defaultIcon.setAttribute('cy', '32');
            defaultIcon.setAttribute('r', '16');
            defaultIcon.setAttribute('fill', 'white');
            
            svg.appendChild(defaultIcon);
    }
    
    // 将SVG转换为字符串
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    // 创建Blob对象
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    
    // 创建URL
    const url = URL.createObjectURL(blob);
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    // 创建图标图像
    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    img.className = 'icon-image';
    
    // 创建图标名称
    const iconName = document.createElement('div');
    iconName.className = 'icon-name';
    iconName.textContent = name;
    
    // 添加到容器
    iconContainer.appendChild(img);
    iconContainer.appendChild(iconName);
    
    // 添加下载按钮
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.textContent = '下载';
    downloadButton.addEventListener('click', function() {
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
    });
    
    iconContainer.appendChild(downloadButton);
    
    // 添加到图标生成器容器
    const iconGeneratorContainer = document.querySelector('.icon-generator-container');
    
    if (iconGeneratorContainer) {
        iconGeneratorContainer.appendChild(iconContainer);
    }
}

/**
 * 生成文件图标SVG
 * @param {string} name - 图标名称
 * @param {string} color - 图标颜色
 */
function generateFileIconSVG(name, color) {
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '64');
    svg.setAttribute('height', '64');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('fill', 'none');
    
    // 创建文件背景
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    background.setAttribute('d', 'M16 8C16 6.89543 16.8954 6 18 6H38L48 16V56C48 57.1046 47.1046 58 46 58H18C16.8954 58 16 57.1046 16 56V8Z');
    background.setAttribute('fill', color);
    
    // 创建文件折角
    const corner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    corner.setAttribute('d', 'M38 6L48 16H40C38.8954 16 38 15.1046 38 14V6Z');
    corner.setAttribute('fill', 'white');
    corner.setAttribute('fill-opacity', '0.5');
    
    svg.appendChild(background);
    svg.appendChild(corner);
    
    // 根据文件类型添加图标
    switch (name) {
        case 'text':
            // 文本文件
            const textLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            textLine1.setAttribute('x', '24');
            textLine1.setAttribute('y', '28');
            textLine1.setAttribute('width', '16');
            textLine1.setAttribute('height', '2');
            textLine1.setAttribute('rx', '1');
            textLine1.setAttribute('fill', 'white');
            
            const textLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            textLine2.setAttribute('x', '24');
            textLine2.setAttribute('y', '32');
            textLine2.setAttribute('width', '16');
            textLine2.setAttribute('height', '2');
            textLine2.setAttribute('rx', '1');
            textLine2.setAttribute('fill', 'white');
            
            const textLine3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            textLine3.setAttribute('x', '24');
            textLine3.setAttribute('y', '36');
            textLine3.setAttribute('width', '16');
            textLine3.setAttribute('height', '2');
            textLine3.setAttribute('rx', '1');
            textLine3.setAttribute('fill', 'white');
            
            svg.appendChild(textLine1);
            svg.appendChild(textLine2);
            svg.appendChild(textLine3);
            break;
            
        case 'image':
            // 图像文件
            const imageIcon = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            imageIcon.setAttribute('x', '24');
            imageIcon.setAttribute('y', '28');
            imageIcon.setAttribute('width', '16');
            imageIcon.setAttribute('height', '12');
            imageIcon.setAttribute('rx', '2');
            imageIcon.setAttribute('fill', 'white');
            
            const imageSun = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            imageSun.setAttribute('cx', '28');
            imageSun.setAttribute('cy', '32');
            imageSun.setAttribute('r', '2');
            imageSun.setAttribute('fill', color);
            
            const imageMountain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            imageMountain.setAttribute('d', 'M24 36L28 32L32 36L40 36');
            imageMountain.setAttribute('stroke', color);
            imageMountain.setAttribute('stroke-width', '1');
            
            svg.appendChild(imageIcon);
            svg.appendChild(imageSun);
            svg.appendChild(imageMountain);
            break;
            
        // 其他文件类型图标...
        default:
            // 默认文件图标
            const defaultIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            defaultIcon.setAttribute('x', '32');
            defaultIcon.setAttribute('y', '36');
            defaultIcon.setAttribute('text-anchor', 'middle');
            defaultIcon.setAttribute('fill', 'white');
            defaultIcon.setAttribute('font-size', '12');
            defaultIcon.setAttribute('font-family', 'Arial, sans-serif');
            defaultIcon.textContent = name.substring(0, 3).toUpperCase();
            
            svg.appendChild(defaultIcon);
    }
    
    // 将SVG转换为字符串
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    // 创建Blob对象
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    
    // 创建URL
    const url = URL.createObjectURL(blob);
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    // 创建图标图像
    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    img.className = 'icon-image';
    
    // 创建图标名称
    const iconName = document.createElement('div');
    iconName.className = 'icon-name';
    iconName.textContent = name;
    
    // 添加到容器
    iconContainer.appendChild(img);
    iconContainer.appendChild(iconName);
    
    // 添加下载按钮
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.textContent = '下载';
    downloadButton.addEventListener('click', function() {
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
    });
    
    iconContainer.appendChild(downloadButton);
    
    // 添加到图标生成器容器
    const iconGeneratorContainer = document.querySelector('.icon-generator-container');
    
    if (iconGeneratorContainer) {
        iconGeneratorContainer.appendChild(iconContainer);
    }
}

/**
 * 生成文件夹图标SVG
 * @param {string} name - 图标名称
 * @param {string} color - 图标颜色
 */
function generateFolderIconSVG(name, color) {
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '64');
    svg.setAttribute('height', '64');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('fill', 'none');
    
    // 创建文件夹背景
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    background.setAttribute('d', 'M12 16C12 14.8954 12.8954 14 14 14H28L32 18H50C51.1046 18 52 18.8954 52 20V48C52 49.1046 51.1046 50 50 50H14C12.8954 50 12 49.1046 12 48V16Z');
    background.setAttribute('fill', color);
    
    svg.appendChild(background);
    
    // 根据文件夹类型添加图标
    switch (name) {
        case 'folder-documents':
            // 文档文件夹
            const docIcon = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            docIcon.setAttribute('x', '28');
            docIcon.setAttribute('y', '28');
            docIcon.setAttribute('width', '8');
            docIcon.setAttribute('height', '10');
            docIcon.setAttribute('rx', '1');
            docIcon.setAttribute('fill', 'white');
            
            const docLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            docLine1.setAttribute('x', '30');
            docLine1.setAttribute('y', '30');
            docLine1.setAttribute('width', '4');
            docLine1.setAttribute('height', '1');
            docLine1.setAttribute('fill', color);
            
            const docLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            docLine2.setAttribute('x', '30');
            docLine2.setAttribute('y', '32');
            docLine2.setAttribute('width', '4');
            docLine2.setAttribute('height', '1');
            docLine2.setAttribute('fill', color);
            
            const docLine3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            docLine3.setAttribute('x', '30');
            docLine3.setAttribute('y', '34');
            docLine3.setAttribute('width', '4');
            docLine3.setAttribute('height', '1');
            docLine3.setAttribute('fill', color);
            
            svg.appendChild(docIcon);
            svg.appendChild(docLine1);
            svg.appendChild(docLine2);
            svg.appendChild(docLine3);
            break;
            
        case 'folder-pictures':
            // 图片文件夹
            const picIcon = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            picIcon.setAttribute('x', '28');
            picIcon.setAttribute('y', '28');
            picIcon.setAttribute('width', '8');
            picIcon.setAttribute('height', '8');
            picIcon.setAttribute('rx', '1');
            picIcon.setAttribute('fill', 'white');
            
            const picSun = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            picSun.setAttribute('cx', '30');
            picSun.setAttribute('cy', '30');
            picSun.setAttribute('r', '1');
            picSun.setAttribute('fill', color);
            
            const picMountain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            picMountain.setAttribute('d', 'M28 34L30 32L32 34L36 34');
            picMountain.setAttribute('stroke', color);
            picMountain.setAttribute('stroke-width', '0.5');
            
            svg.appendChild(picIcon);
            svg.appendChild(picSun);
            svg.appendChild(picMountain);
            break;
            
        // 其他文件夹类型图标...
        default:
            // 默认不添加额外图标
            break;
    }
    
    // 将SVG转换为字符串
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    // 创建Blob对象
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    
    // 创建URL
    const url = URL.createObjectURL(blob);
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    // 创建图标图像
    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    img.className = 'icon-image';
    
    // 创建图标名称
    const iconName = document.createElement('div');
    iconName.className = 'icon-name';
    iconName.textContent = name;
    
    // 添加到容器
    iconContainer.appendChild(img);
    iconContainer.appendChild(iconName);
    
    // 添加下载按钮
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.textContent = '下载';
    downloadButton.addEventListener('click', function() {
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
    });
    
    iconContainer.appendChild(downloadButton);
    
    // 添加到图标生成器容器
    const iconGeneratorContainer = document.querySelector('.icon-generator-container');
    
    if (iconGeneratorContainer) {
        iconGeneratorContainer.appendChild(iconContainer);
    }
}

// 导出函数供其他模块使用
window.createSystemIcons = createSystemIcons;
window.createAppIcons = createAppIcons;
window.createFileTypeIcons = createFileTypeIcons;
window.createFolderIcons = createFolderIcons;
