const path = require("path");
const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron/main");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
    // win.webContents.openDevTools();
};

ipcMain.handle("should-use-dark-colors", () => {
    return nativeTheme.shouldUseDarkColors;
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
