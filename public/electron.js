const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { app, BrowserWindow, session } = electron;

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 900, height: 680 });

  const url = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(url);

  // if (isDev) {
  // Open the DevTools.
  // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  mainWindow.webContents.openDevTools();
  // }
  mainWindow.on("closed", () => (mainWindow = null));
}

// function initSession() {
//   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         "Content-Security-Policy": ["default-src 'none'"]
//       }
//     });
//   });
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
