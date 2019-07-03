const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');
const isDev = require('electron-is-dev');




let win


//Setup Logger
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//Setup Update Events

autoUpdater.on('checking-for-update', () => {
 log.info('checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  console.log('updates available');
  console.log('Version', info.version);
  console.log('release date', info.releaseDate);
});

autoUpdater.on('update-not-available', () => {
  console.log('updates not available');
});

autoUpdater.on('download-progress', (process) => {
  console.log(`progress ${Math.floor(process.percent)}`);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('update downloaded');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', () => {
  console.log('error');
});



function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
  
    win = null
  })
}


app.on('ready', () => {
  createWindow
  autoUpdater.checkForUpdates();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
 
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  if (win === null) {
    createWindow()
  }
})

