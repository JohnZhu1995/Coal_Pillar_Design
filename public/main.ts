// 导入app、BrowserWindow模块
// app 控制应用程序的事件生命周期。事件调用app.on('eventName', callback)，方法调用app.functionName(arg)
// BrowserWindow 创建和控制浏览器窗口。new BrowserWindow([options]) 事件和方法调用同app
// Electron参考文档 https://www.electronjs.org/docs
const drawDXF = require("./drawDXF/index.ts");
const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");

function createWindow() {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 1140, // 窗口宽度
        height: 710, // 窗口高度
        minWidth: 1140, // 窗口宽度
        minHeight: 710, // 窗口高度
        autoHideMenuBar: true,
        title: "保护煤柱留设", // 窗口标题,如果由loadURL()加载的HTML文件中含有标签<title>，该属性可忽略
        icon: nativeImage.createFromPath("public/favicon.ico"), // "string" || nativeImage.createFromPath('public/favicon.ico')从位于 path 的文件创建新的 NativeImage 实例
        // resizable: false,
        webPreferences: {
            // 网页功能设置
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用同源策略
            preload: path.join(__dirname, "preload.ts"),
            nodeIntegration: true, // 是否启用node集成 渲染进程的内容有访问node的能力,建议设置为true, 否则在render页面会提示node找不到的错误
        },
    });

    // 加载应用 --打包react应用后，__dirname为当前文件路径
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, './build/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));
    mainWindow.loadURL("http://localhost:3000");

    // 解决应用启动白屏问题
    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // 关闭顶部菜单
    // mainWindow.setMenu(null);

    // release storage when mainWindow is closed
    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    drawDXF();

    // open DevTools when mainWindow is showed
    mainWindow.webContents.openDevTools();
}

// app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    console.log("qpp---whenready");
    createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
