const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');


require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

// Set ENV <--
// process.env.NODE_ENV = 'production'

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // quit
    mainWindow.on('closed', () => {
        app.quit();
    });

    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
})

//Create menu template
const mainMenuTemplate = [
    {
        label: 'Inicio',
        submenu: [
            {
                label: 'Sair',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

// catch cards_container
ipcMain.on('cards_container', (e, container) => {
    mainWindow.webContents.send('cards_container:add', container);
})

// If mac, add empty object to menu
if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}