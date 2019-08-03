import { INITIALISE_TIMER } from './channel';

export interface ChannelListenner {
  channel: string;
  listener: (event: any, arg: any) => void;
}

export const listeners: Array<ChannelListenner> = [
  {
    channel: INITIALISE_TIMER,
    listener: (event: any, arg: any) => {
      console.log(INITIALISE_TIMER);
    }
  }
];
