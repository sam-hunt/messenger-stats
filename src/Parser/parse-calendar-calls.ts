import { ICalendarData } from '../App/app-state.interface';
import { IMessengerDataFile } from './messenger-data-file.interface';

export const parseCalendarCalls = (messengerDataFiles: IMessengerDataFile[]): ICalendarData => {
    if (!messengerDataFiles) {
        return [];
    }
    const callMinutesByDay = new Map<string, number>();
    for (const messengerDataFile of messengerDataFiles) {
        for (const message of messengerDataFile.messages) {
            if (message.call_duration) {
                const date = new Date(message.timestamp_ms);
                const day = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                callMinutesByDay.set(day, (callMinutesByDay.get(day) || 0) + parseFloat((message.call_duration / 60).toFixed(1)));
            }
        }
    }
    const data = [];
    const it = callMinutesByDay.entries();
    let result = it.next();
    while (!result.done) {
        const [day, callMinutes] = result.value;
        data.push({ day, value: callMinutes });
        result = it.next();
    }
    return data.sort((a, b) => a.day > b.day ? 1 : -1);
}