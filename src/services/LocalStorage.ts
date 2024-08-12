import { BrowserWindow } from "electron";

type Result = {
    animeTitle: string;
    episodeNumber: string;
    url: string;
    slug: string
}

type Response = {
    state: string;
    details: string;
    largeImageKey: string
}

export class LocalStorage {

    public static async getAnime(window: BrowserWindow): Promise<Response> {
        const data = await window.webContents.executeJavaScript("localStorage.getItem('currentWatching')", true);
        if (!data) throw new Error('data.not.found');
        return this.setStatus(JSON.parse(data));
    }

    private static setStatus(data: Result): Response {
        try {

            const { animeTitle, episodeNumber, slug } = data;
            if (!animeTitle) throw new Error('data.not.found');
        
            /*
            if (!episode) {
                return {
                    state: 'Anime pausado',
                    details: `Anime: ${title}`,
                    largeImageKey: `https://cdn.nicashow.fun/images/animes/thumbnail/${anime.data[0].anime.slug_serie}.jpg`
                }
            }
            */

            return {
                state: `Episódio ${episodeNumber} `,
                details: `${slug.replace('-', ' ').toLocaleUpperCase()} - ${animeTitle}`,
                largeImageKey: `https://cdn.nicashow.fun/images/${slug}/${episodeNumber}.jpg`
            }

        } catch (e: any) {
            throw new Error('anime.not.found')
        }
    }
}