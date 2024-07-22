import { Client, register } from "discord-rpc";

export default abstract class RPClient extends Client {

    protected readonly CLIENT_ID: string = process.env.CLIENT_ID!

    constructor() {
        super({ transport: 'ipc' })
        register(this.CLIENT_ID)
    }
}