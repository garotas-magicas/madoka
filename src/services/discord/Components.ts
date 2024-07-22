import { BrowserWindow } from "electron";
import RPClient from "./Client";
import { Front } from "../Front";

export default abstract class Components extends RPClient {

    protected async activity(window: BrowserWindow): Promise<void> {
        try {
            const { state, details, largeImageKey } = await Front.getAnime(window);
            this.setActivity({ state, details, largeImageKey })
        } catch (e) {
            this.custom('Buscando anime...')
        }
    }

    protected custom(details: string): void {
        this.setActivity({
            details,
            largeImageKey: 'default',
        })
    }

}