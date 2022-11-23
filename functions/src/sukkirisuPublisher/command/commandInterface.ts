export interface CommandInterface {
    getTopic(): string;
    getChannelId(): string;
    getDetail(): object | null;
}
