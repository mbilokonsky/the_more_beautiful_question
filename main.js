const path = require("path")
const { app, BrowserWindow, ipcMain, dialog } = require('electron')

if (require('electron-squirrel-startup')) return app.quit();

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

async function handlePromptSubmission(prompt) {
  console.log("Prompt received: <", prompt, ">")
}

let mainWindow;
const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setTitle("always the more beautiful answer who asks the more beautiful question")
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  mainWindow = createMainWindow()
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('dialog:submitPrompt', handlePromptSubmission)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow()
    } 
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})