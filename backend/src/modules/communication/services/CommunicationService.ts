import { MetaProvider } from "../providers/meta/MetaProvider";

export class CommunicationService {
    private provider = new MetaProvider();

    async sendTemplate(data: any) {
        return this.provider.send(data);
    }
}
