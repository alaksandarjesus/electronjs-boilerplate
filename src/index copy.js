const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: '100vw',
    height: '100vh',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:false
    },
  });
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
 // mainWindow.webContents.openDevTools();

  mainWindow.setMenuBarVisibility(false)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

        //Ref: https://stackoverflow.com/questions/53530726/how-to-launch-my-electron-app-from-a-website

        
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
var link;

// This will catch clicks on links such as <a href="foobar://abc=1">open in foobar</a>
app.on('open-url', function (event, data) {
  event.preventDefault();
  console.log("data", data)
  link = data;
});

app.setAsDefaultProtocolClient('foobar');

// Export so you can access it from the renderer thread
module.exports.getLink = () => link;