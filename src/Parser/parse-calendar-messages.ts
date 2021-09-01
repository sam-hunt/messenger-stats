import { ICalendarData } from '../App/app-state.interface';
import { IMessengerDataFile } from './messenger-data-file.interface';

export const parseCalendarMessages = (messengerDataFiles: IMessengerDataFile[] | undefined): ICalendarData => {
    if (!messengerDataFiles) {
        return [];
    }
    const messagesByDay = new Map<string, number>();
    for (const messengerDataFile of messengerDataFiles) {
        for (const message of messengerDataFile.messages) {
            const date = new Date(message.timestamp_ms);
            const day = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            messagesByDay.set(day, (messagesByDay.get(day) || 0) + 1)
        }
    }
    const data = [];
    const it = messagesByDay.entries();
    let result = it.next();
    while (!result.done) {
        const [day, messageCount] = result.value;
        data.push({ day, value: messageCount });
        result = it.next();
    }
    return data.sort((a, b) => a.day > b.day ? 1 : -1);
}