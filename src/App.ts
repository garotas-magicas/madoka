import { app, BrowserWindow } from 'electron';

class App {

  private readonly _app: Electron.App = app;
  private readonly _uri: string = 'https://anime.seiku.fun/';
  private _mainWindow: BrowserWindow | null = null;

  constructor() {
    this._app.disableHardwareAcceleration();
    this._app.on('ready', this.window.bind(this));
    this._app.on('window-all-closed', this.close.bind(this));
  }

  private window(): this {
    this._mainWindow = new BrowserWindow({
      title: "seiku loves nica",
      titleBarStyle: 'hidden',
      width: 1280,
      height: 720,
      frame: true,
      resizable: false,
      center: true,
      movable: true,
      autoHideMenuBar: true
    });
    this.load();
    return this;
  }

  private load(): this {
    this._mainWindow?.loadURL(this._uri)
      .then(() => this._mainWindow?.show());
    return this;
  };

  private close(): this {
    this._app.quit()
    return this;
  }
}

new App();