import { BrowserWindow } from "electron";

type Result = {
    props: Props;
}

type Props = {
    pageProps: PageProps;
}

type PageProps = {
    data: Data
}

type Data = {
    code: number;
    meta: Meta;
    message: string;
    data: AnimeData[];
}

type Meta = {
    timestamp: number;
    totalOfEpisodes: number;
    totalOfPages: number;
    pageNumber: number;
    order: string;
    hasNextPage: boolean
}

type AnimeData = {
    id_series_episodios: number;
    se_pgad: number;
    id_serie: number;
    premiere_last_ep: number;
    n_episodio: string;
    titulo_episodio: string;
    sinopse_episodio: string;
    link: string;
    v_stream: any;
    aviso: string;
    generate_id: string;
    data_registro: string;
    anime: Anime
    thumbnail: string
}

type Anime = {
    titulo: string;
    slug_serie: string;
    generate_id: string;
}

type Response = {
    state: string;
    details: string;
    largeImageKey: string
}

export class Front {

    public static async getAnime(window: BrowserWindow): Promise<Response> {
        const html = await window.webContents.executeJavaScript('document.documentElement.outerHTML');
        return this.parseData(this.extractData(html), window.getTitle());
    }

    private static parseData(data: string, info: string): Response {
        try {
            const json: Result = JSON.parse(data);
            const anime = json.props.pageProps.data;
            const [title, episode] = info.split('-');

            if(!episode) {
                return {
                    state: 'Anime pausado', 
                    details: `Anime: ${title}`,
                    largeImageKey: `https://cdn.nicashow.fun/images/animes/thumbnail/${anime.data[0].anime.slug_serie}.jpg`
                }
            }

            return {
                state: `Episódio ${episode} de ${anime.meta.totalOfEpisodes}`,
                details: `${anime.data[0].anime.titulo} - ${title}`,
                largeImageKey: `https://cdn.nicashow.fun/images/${anime.data[0].anime.slug_serie}/${episode.trim()}.jpg`
            }

        } catch (e: any) {
            throw new Error('anime.not.found')
        }
    }

    private static extractData(data: string): string {
        return data
            .split('__NEXT_DATA__')[1]
            .split(`type="application/json">`)[1]
            .split('</script>')[0]
    }
}