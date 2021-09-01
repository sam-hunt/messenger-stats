import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { IParsedFile, IAppState } from '../App/app-state.interface';
import { IMessengerDataFile } from './messenger-data-file.interface';
import { parseCalendarCalls } from './parse-calendar-calls';
import { parseCalendarMessages } from './parse-calendar-messages';

const StyledInput = styled.input`
  padding: 50px;
`;

interface IParserProps {
    appState: IAppState;
    setAppState: (appState: IAppState) => void;
}

const Parser = ({ setAppState, appState }: IParserProps) => {

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileList: File[] = Array.from(e.currentTarget.files || []);
        const newAppState: IAppState = {
            files: [],
            calendarMessages: [],
            calendarCalls: [],
        };
        for (let i = 0; i < fileList.length; i++) {
            const file = await fileList[i].text();
            const datafile: IMessengerDataFile = JSON.parse(file);
            const parsedFile: IParsedFile = {
                name: fileList[i].name,
                sizeBytes: fileList[i].size,
                lastModified: new Date(fileList[i].lastModified),
                type: fileList[i].type,
                messengerDataFile: datafile,
                messageCount: datafile.messages.length,
                callCount: datafile.messages.filter(message => message.type === 'Call').length,
                totalCallLength: datafile.messages.reduce((acc, val) => (acc + (val?.call_duration || 0)), 0),
            }
            newAppState.files.push(parsedFile);
        }

        if (newAppState.files) {
            newAppState.calendarMessages = parseCalendarMessages(newAppState.files.map(f => f.messengerDataFile))
            newAppState.calendarCalls = parseCalendarCalls(newAppState.files.map(f => f.messengerDataFile))
        }

        setAppState(newAppState);

    };

    return (
        <>
            <StyledInput type='file' id="bs" onChange={(e) => onChange(e)} multiple accept=".json"></StyledInput>
            {appState.files.map((file, i) =>
                <div key={i}>
                    <h3>{file.name}</h3>
                    <span style={{color: 'blueviolet', fontWeight: 'bold'}}>
                        Title: {file.messengerDataFile?.title}<br/>
                        Participants: {file.messengerDataFile?.participants.map(p => p.name).join(', ')}<br/>
                    </span>
                    <span style={{color: 'green', fontWeight: 'bold'}}>
                        Total messages: {file.messageCount}<br/>
                    </span>
                    <span style={{color: 'blue', fontWeight: 'bold'}}>
                        Total calls: {file.callCount}<br/>
                        Total call length: {((file?.totalCallLength || 0) / 60).toFixed(0)} hours<br/>
                    </span>
                    Size: {Math.ceil(file.sizeBytes/1024)} KB<br/>
                    Last modified {new Date(file.lastModified).toDateString()}<br/>
                    <br/><br/>
                </div>
            )}
        </>
    );
};

export default Parser;
