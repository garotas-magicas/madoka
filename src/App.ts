import RichPresence from './services/discord/RichPresence';
import { app, BrowserWindow } from 'electron';

class App {

  private readonly _app: Electron.App = app;
  private readonly _uri: string = 'https://anime.seiku.fun/';
  private _mainWindow: BrowserWindow | null = null;
  private readonly _rich = new RichPresence();

  constructor() {
    this._app.disableHardwareAcceleration();
    this._app.on('ready', this.window.bind(this));
    this._app.on('window-all-closed', this.close.bind(this));
  }

  private window(): this {
    this._mainWindow = new BrowserWindow({
      title: "Madoka Anime",
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
    this.richPresence();
    return this;
  }

  private load(): void {
    this._mainWindow?.loadURL(this._uri);
  };

  private richPresence(): void {
    setInterval(() => this._rich.update(this._mainWindow), 5 * 1000)
  }

  private close(): this {
    this._app.quit()
    return this;
  }
}

new App();