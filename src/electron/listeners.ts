import axios from 'axios';
import * as fs from 'fs';
import { DOMParser } from 'xmldom';

import { INITIALISE_TIMER } from './channel';

export interface ChannelListenner {
  channel: string;
  listener: (event: any, arg: any) => void;
}

export const listeners: Array<ChannelListenner> = [
  {
    channel: INITIALISE_TIMER,
    listener: initialiseTimerListener
  }
];

function initialiseTimerListener(event: any, arg: number = 600) {
  console.log(INITIALISE_TIMER);
  fetchPageData();
}

interface OccupationCeilingRecord {
  occupationId: string | null;
  description: string | null;
  occupationCeilingValue: string | null;
  invitationValue: string | null;
}

let timer: NodeJS.Timeout;
export function fetchPageData() {
  const url = 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect/occupation-ceilings';
  axios.get<string>(url).then(response => {
    const { data } = response;
    console.log(`STATUS: ${response.status}`);
    const pageDom = new DOMParser().parseFromString(data, 'text/xml');
    const containerDom = pageDom.getElementById('ctl00_PlaceHolderMain_ctl04__ControlWrapper_RichHtmlField');
    const tableDom = containerDom!.getElementsByTagName('table')[0];
    const trList = tableDom.childNodes[0].childNodes;

    const invitationDate = trList[0].childNodes[3].textContent;
    const date = new Date(invitationDate || '').toISOString().slice(0, 10);

    const length = trList.length;
    let result: Array<OccupationCeilingRecord> = [];
    for (let i = 1; i < length; i++) {
      const tdList = trList[i].childNodes;
      result.push({
        occupationId: tdList[0].textContent,
        description: tdList[1].textContent,
        occupationCeilingValue: tdList[2].textContent,
        invitationValue: tdList[3].textContent
      });
    }
    const newData = [{ date, records: result }];
    const path = './occupationData.json';
    fs.writeFile(path, JSON.stringify(newData), 'utf8', () => {
      console.log(`${path} saved`);
    });
  });
}
