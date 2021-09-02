import { IMessengerDataFile } from "../components/Parser/messenger-data-file.interface";

interface ICalendarDatum {
    day: string;
    value: number;
};

export type ICalendarData = ICalendarDatum[];

export interface IParsedFile {
    name: string
    sizeBytes: number;
    lastModified: Date;
    type: string;
    messengerDataFile: IMessengerDataFile;
    messageCount: number;
    callCount: number;
    totalCallMinutes: number;
}

export interface IAppState {
    files: IParsedFile[];
    calendarMessages: ICalendarData;
    calendarCalls: ICalendarData;
}
