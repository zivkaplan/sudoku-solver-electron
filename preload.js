const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    shouldUseDarkColors: async () => ipcRenderer.invoke("should-use-dark-colors"),
});
