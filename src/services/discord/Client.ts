import { Client, register } from '../../libs/RPC/src/index';

export default abstract class RPClient extends Client {

    protected readonly CLIENT_ID: string = '1255108777875869858'

    constructor() {
        super({ transport: 'ipc' })
        register(this.CLIENT_ID)
    }
}