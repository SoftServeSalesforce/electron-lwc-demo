const electron = require('electron');
const {app, BrowserWindow} = electron;
const PORT = 3001;

app.on('ready', _=>{
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`http://localhost:${PORT}/`);

    mainWindow.on('close', _=> {
        mainWindow = null
    });
})