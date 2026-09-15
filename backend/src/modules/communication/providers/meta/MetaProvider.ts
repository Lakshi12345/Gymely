import { ICommunicationProvider, SendMessagePayload } from "../../types/provider.interface";

export class MetaProvider implements ICommunicationProvider {
    async send(payload: SendMessagePayload) {
        console.log(payload);

        return true;
    }
}
