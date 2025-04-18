# 开发环境设置指南

本文档将指导您为增强版macOS网页项目设置开发环境。即使您没有编程经验，按照以下步骤操作也能轻松完成环境搭建。

## 1. 安装代码编辑器 - Visual Studio Code

Visual Studio Code (VS Code) 是一个轻量级但功能强大的代码编辑器，非常适合前端开发。

### 下载和安装步骤：

1. 访问 [VS Code官网](https://code.visualstudio.com/)
2. 点击"下载"按钮，选择适合您操作系统的版本
3. 下载完成后运行安装程序
4. 按照安装向导的提示完成安装

### 推荐安装的VS Code扩展：

安装完成后，打开VS Code，按照以下步骤安装有用的扩展：

1. 点击左侧边栏的"扩展"图标（或按Ctrl+Shift+X）
2. 在搜索框中搜索并安装以下扩展：
   - **Live Server**：提供实时预览功能
   - **HTML CSS Support**：增强HTML和CSS编辑体验
   - **Auto Rename Tag**：自动重命名配对的HTML标签
   - **Prettier - Code formatter**：代码格式化工具
   - **JavaScript (ES6) code snippets**：JS代码片段

## 2. 设置项目文件夹

为项目创建一个专门的文件夹，并在VS Code中打开：

1. 在您的电脑上创建一个名为`enhanced-macos-web`的文件夹
2. 打开VS Code
3. 点击"文件" > "打开文件夹"
4. 选择刚才创建的`enhanced-macos-web`文件夹

## 3. 创建基本项目结构

在VS Code中，我们将创建基本的项目结构：

1. 右键点击左侧的资源管理器面板，选择"新建文件夹"，创建以下文件夹：
   - `css`：存放样式文件
   - `js`：存放JavaScript文件
   - `img`：存放图片资源
   - `icons`：存放应用图标
   - `apps`：存放各个应用的代码
   - `fonts`：存放字体文件

2. 右键点击左侧的资源管理器面板，选择"新建文件"，创建以下文件：
   - `index.html`：登录页面
   - `desktop.html`：桌面环境页面
   - `css/base.css`：基础样式
   - `css/login.css`：登录页面样式
   - `css/desktop.css`：桌面环境样式
   - `js/login.js`：登录页面脚本
   - `js/desktop.js`：桌面环境脚本

## 4. 设置Live Server

Live Server扩展可以提供实时预览功能，让您在编辑代码时立即看到效果：

1. 确保已安装Live Server扩展
2. 在VS Code底部状态栏，点击"Go Live"按钮
3. 这将启动一个本地服务器，并在浏览器中打开您的项目

## 5. 浏览器开发工具

现代浏览器内置的开发工具对前端开发非常有帮助：

1. 推荐使用Google Chrome或Mozilla Firefox浏览器
2. 在浏览器中打开开发者工具：
   - Chrome：按F12或右键点击页面 > "检查"
   - Firefox：按F12或右键点击页面 > "检查元素"

3. 开发者工具的主要功能：
   - **Elements/Inspector**：查看和编辑HTML和CSS
   - **Console**：查看JavaScript输出和错误
   - **Network**：监控网络请求
   - **Application**：管理存储和缓存

## 6. 版本控制（可选但推荐）

使用Git进行版本控制可以帮助您跟踪代码变更：

1. 下载并安装[Git](https://git-scm.com/)
2. 在VS Code中，点击左侧的"源代码管理"图标
3. 点击"初始化存储库"按钮
4. 定期提交您的更改，添加有意义的提交消息

## 7. 图像编辑工具（可选）

对于创建和编辑图标和图像，您可能需要一个图像编辑工具：

1. 免费选项：
   - [GIMP](https://www.gimp.org/)
   - [Inkscape](https://inkscape.org/)（适合矢量图形）
   - [Figma](https://www.figma.com/)（在线工具，有免费版）

2. 付费选项：
   - Adobe Photoshop
   - Adobe Illustrator

## 8. 在线资源

以下在线资源对开发过程很有帮助：

1. **文档参考**：
   - [MDN Web文档](https://developer.mozilla.org/)：HTML、CSS和JavaScript的权威参考
   - [W3Schools](https://www.w3schools.com/)：Web技术教程和参考

2. **设计参考**：
   - [Apple人机界面指南](https://developer.apple.com/design/human-interface-guidelines/)
   - [macOS Monterey官方页面](https://www.apple.com/macos/monterey/)

3. **图标和资源**：
   - [SF Symbols](https://developer.apple.com/sf-symbols/)：Apple设计的图标集
   - [Unsplash](https://unsplash.com/)：免费高质量图片（可用于壁纸）

## 9. 测试设备

为了确保您的项目在不同环境下都能正常工作，建议在多种设备和浏览器上进行测试：

1. 桌面浏览器：Chrome、Firefox、Safari、Edge
2. 移动设备：使用浏览器的响应式设计模式或实际移动设备

## 10. 开始编码

环境设置完成后，您就可以开始编码了！从创建基本的HTML结构开始，然后逐步添加样式和功能。

记住，编程是一个渐进的过程，从简单开始，逐步构建复杂功能。如果遇到问题，不要犹豫查阅文档或在线搜索解决方案。
