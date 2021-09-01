export type URI = string;

export interface IParticipant {
    name: string;
}

export interface IExternalMedia {
    uri: URI;
}

export interface IUserMedia extends IExternalMedia {
    creation_timestamp: number;
}

export type IPhoto = IUserMedia;

export interface IVideo extends IUserMedia {
    thumbnail: IExternalMedia;
}

export interface IReaction {
    reaction: string;
    actor: string;
}

export interface IShare {
    link: URI;
    share_text?: string;
}

export interface IMessage {
    sender_name: string;
    timestamp_ms: number;
    type: 'Generic' | 'Call' | 'Share';
    is_unsent: boolean;
    content?: string;
    call_duration?: number;
    photos?: IPhoto[];
    videos?: IVideo[];
    gifs?: IExternalMedia[];
    sticker?: IExternalMedia;
    files?: IUserMedia[];
    share?: IShare[];
    reactions?: IReaction[];

}

export interface IMessengerDataFile {
    title: string;
    participants: IParticipant[];
    is_still_participant: boolean;
    messages: IMessage[];
    thread_type: string;
    thread_path: URI;
    magic_words: unknown[];
}