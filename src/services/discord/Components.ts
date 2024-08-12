import { BrowserWindow } from "electron";
import RPClient from "./Client";
import { LocalStorage } from "../LocalStorage";

const errors: Record<string, string> = {
    'anime.not.found': 'Buscando anime...',
    'data.not.found': 'Assistindo anime.'
}

export default abstract class Components extends RPClient {

    protected async activity(window: BrowserWindow): Promise<void> {
        try {
            const { state, details, largeImageKey } = await LocalStorage.getAnime(window);
            this.setActivity({ state, details, largeImageKey, type: 'WATCHING' })
        } catch (e: any) {
            this.errors(e?.message);
        }
    }

    protected custom(details: string): void {
        this.setActivity({
            details,
            type: 'WATCHING',
            largeImageKey: 'default'
        })
    }

    protected errors(type: string): void {
        const message = errors[type] ?? 'Madoka e Homura estão buscando um anime.';
        this.custom(message);
    }


}