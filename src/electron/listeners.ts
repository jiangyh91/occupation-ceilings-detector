import axios from 'axios';
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

let timer: NodeJS.Timeout;
export function fetchPageData() {
  const url = 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect/occupation-ceilings';
  axios.get<string>(url).then(response => {
    const { data } = response;
    console.log(`STATUS: ${response.status}`);
    const pageDom = new DOMParser().parseFromString(data, 'text/xml');
    const containerDom = pageDom.getElementById('ctl00_PlaceHolderMain_ctl04__ControlWrapper_RichHtmlField');
    if (containerDom == null) {
      console.log('Get containerDom failed');
      return;
    }
    const tableDom = containerDom.getElementsByTagName('table')[0];
    const invitationDate = tableDom.children[0].children[0].children[3].innerHTML;
    const date = new Date(invitationDate).toISOString().slice(0, 10);
  });
}
