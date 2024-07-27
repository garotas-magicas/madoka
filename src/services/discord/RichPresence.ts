import { BrowserWindow } from 'electron';
import Components from './Components';

class RichPresence extends Components {

    constructor() {
        super()
        this.start().ready();
    }

    private ready(): void {
        this.on('ready', () => this.update())
    }

    public update(mainWindow: BrowserWindow | null = null): void {
        if (!mainWindow) return this.custom('Logando...');
        this.activity(mainWindow);
    }

    private start(): this {
        this.login({ clientId: this.CLIENT_ID })
            .catch((e: any) => console.error('[Rich Presence] -> %s', e))
        console.log('[Rich Presence] -> Online!')
        return this;
    }

}

export default RichPresence