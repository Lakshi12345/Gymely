export interface EmailAddress {
    address: string;
    name?: string;
}

export interface EmailAttachment {
    name: string;
    mimeType: string;
    content: string;
}

export interface EmailPayload {
    to: EmailAddress[];
    cc?: EmailAddress[];
    bcc?: EmailAddress[];
    replyTo?: EmailAddress[];
    subject: string;
    html?: string;
    text?: string;
    attachments?: EmailAttachment[];
    headers?: Record<string, string>;
    trackOpens?: boolean;
    trackClicks?: boolean;
}
