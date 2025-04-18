# 增强版macOS网页项目结构

本文档详细说明了增强版macOS网页项目的文件结构和各个文件的用途，帮助您理解项目组织方式。

## 项目根目录

```
enhanced-macos-web/
├── index.html              # 登录页面
├── desktop.html            # 桌面环境主页面
├── css/                    # 样式文件目录
├── js/                     # JavaScript文件目录
├── img/                    # 图片资源目录
├── icons/                  # 应用图标目录
├── apps/                   # 应用程序模块目录
└── fonts/                  # 字体文件目录
```

## CSS目录结构

```
css/
├── base.css                # 基础样式和变量定义
├── login.css               # 登录页面样式
├── desktop.css             # 桌面环境基础样式
├── dock.css                # Dock栏样式
├── menubar.css             # 顶部菜单栏样式
├── finder.css              # Finder应用样式
├── launchpad.css           # Launchpad样式
├── control-center.css      # 控制中心样式
├── windows.css             # 窗口系统样式
├── animations.css          # 动画效果样式
├── themes.css              # 主题和个性化样式
└── apps/                   # 各应用的样式
    ├── safari.css          # Safari浏览器样式
    ├── notes.css           # 备忘录应用样式
    ├── calendar.css        # 日历应用样式
    ├── calculator.css      # 计算器应用样式
    └── settings.css        # 系统偏好设置样式
```

## JavaScript目录结构

```
js/
├── login.js                # 登录页面脚本
├── desktop.js              # 桌面环境主脚本
├── dock.js                 # Dock栏功能
├── menubar.js              # 顶部菜单栏功能
├── finder.js               # Finder应用功能
├── launchpad.js            # Launchpad功能
├── control-center.js       # 控制中心功能
├── window-manager.js       # 窗口管理系统
├── wallpaper.js            # 壁纸管理功能
├── settings.js             # 系统设置功能
├── animations.js           # 动画效果实现
├── utils.js                # 通用工具函数
└── apps/                   # 各应用的脚本
    ├── safari.js           # Safari浏览器功能
    ├── notes.js            # 备忘录应用功能
    ├── calendar.js         # 日历应用功能
    ├── calculator.js       # 计算器应用功能
    └── settings-app.js     # 系统偏好设置应用功能
```

## 应用程序目录结构

```
apps/
├── finder/                 # Finder应用
│   ├── index.html          # Finder HTML结构
│   ├── sidebar.html        # 侧边栏组件
│   └── views/              # 不同视图模式
│       ├── icon-view.html  # 图标视图
│       └── list-view.html  # 列表视图
├── safari/                 # Safari浏览器
│   └── index.html          # Safari HTML结构
├── notes/                  # 备忘录应用
│   └── index.html          # 备忘录HTML结构
├── calendar/               # 日历应用
│   └── index.html          # 日历HTML结构
├── calculator/             # 计算器应用
│   └── index.html          # 计算器HTML结构
├── settings/               # 系统偏好设置
│   ├── index.html          # 设置主页面
│   ├── general.html        # 通用设置
│   ├── appearance.html     # 外观设置
│   ├── dock.html           # Dock设置
│   └── wallpaper.html      # 壁纸设置
└── launchpad/              # Launchpad
    └── index.html          # Launchpad HTML结构
```

## 图片资源目录结构

```
img/
├── wallpapers/             # 壁纸图片
│   ├── default.jpg         # 默认壁纸
│   ├── monterey.jpg        # Monterey壁纸
│   └── dynamic/            # 动态壁纸
├── login-bg.jpg            # 登录背景
└── ui/                     # UI元素图片
    ├── buttons/            # 按钮图片
    ├── indicators/         # 指示器图片
    └── cursors/            # 鼠标指针图片
```

## 图标目录结构

```
icons/
├── system/                 # 系统图标
│   ├── apple-logo.svg      # 苹果logo
│   ├── wifi.svg            # Wi-Fi图标
│   ├── battery.svg         # 电池图标
│   └── search.svg          # 搜索图标
└── apps/                   # 应用图标
    ├── finder.png          # Finder图标
    ├── safari.png          # Safari图标
    ├── notes.png           # 备忘录图标
    ├── calendar.png        # 日历图标
    ├── calculator.png      # 计算器图标
    ├── settings.png        # 系统偏好设置图标
    ├── launchpad.png       # Launchpad图标
    └── trash.png           # 废纸篓图标
```

## 字体目录结构

```
fonts/
├── SF-Pro.woff2            # San Francisco Pro字体
├── SF-Pro-Display.woff2    # San Francisco Pro Display字体
└── SF-Mono.woff2           # San Francisco Mono字体
```

## 文件用途说明

### HTML文件

- **index.html**: 登录页面，包含用户头像、用户名和登录按钮
- **desktop.html**: 桌面环境主页面，包含所有桌面元素和应用窗口

### 核心CSS文件

- **base.css**: 定义全局变量、重置样式和通用样式
- **login.css**: 登录页面的样式，包括背景、登录框和按钮样式
- **desktop.css**: 桌面环境的基础样式，包括背景和整体布局
- **dock.css**: Dock栏的样式，包括背景、图标和动画效果
- **menubar.css**: 顶部菜单栏的样式，包括菜单项和状态图标
- **windows.css**: 窗口系统的样式，包括窗口框架、标题栏和控制按钮
- **animations.css**: 所有动画效果的定义，包括过渡、变换和关键帧动画

### 核心JavaScript文件

- **login.js**: 处理登录页面的交互，包括验证和跳转
- **desktop.js**: 桌面环境的主脚本，初始化各个组件
- **dock.js**: 实现Dock栏功能，包括图标交互和应用启动
- **menubar.js**: 实现顶部菜单栏功能，包括菜单展开和状态图标交互
- **window-manager.js**: 窗口管理系统，处理窗口的打开、关闭、最小化、最大化和层级管理
- **wallpaper.js**: 壁纸管理功能，包括切换和自定义上传
- **settings.js**: 系统设置功能，处理用户偏好的保存和应用

## 开发指南

在开发过程中，请遵循以下原则：

1. **模块化开发**: 每个功能模块应该相对独立，便于维护和扩展
2. **渐进式增强**: 先实现基本功能，再添加高级特性
3. **响应式设计**: 确保在不同屏幕尺寸上都有良好的显示效果
4. **性能优化**: 注意代码效率，特别是动画和交互部分
5. **代码注释**: 为复杂逻辑添加清晰的注释，便于理解和维护

按照项目结构逐步实现各个部分，从基础的HTML结构开始，然后添加样式和交互功能，最后实现高级特性和优化。
