export interface SendMessagePayload {
    to: string;
    template: string;
    variables?: Record<string, any>;
}

export interface ICommunicationProvider {
    send(payload: SendMessagePayload): Promise<any>;
}
