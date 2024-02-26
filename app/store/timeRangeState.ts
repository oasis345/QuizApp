import { atom } from 'recoil';
import { localStorageEffect } from './utils';

interface TimeRange {
  startTime: number;
  endTime: number;
}

export const timeRangeState = atom<TimeRange>({
  key: 'timeRange',
  default: {
    startTime: 0,
    endTime: 0,
  },
  effects: [localStorageEffect('TimeRange')],
});
