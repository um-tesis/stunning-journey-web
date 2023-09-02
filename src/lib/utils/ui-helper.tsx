import {dmSans} from '@/assets/styles/theme';
import {DateTime} from 'luxon';

export const classNamesFilter = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export const capitalizeTheFirstLetterOfEachWord = (words: string) => {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
};

export const toastOptions = {
  style: {
    fontFamily: dmSans.style.fontFamily,
    background: '#000',
    color: '#FFF',
  },
};

export const convertDateFromIso = (date: string) => {
  return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
};

export const convertJsDateToIso = (date: Date) => {
  return DateTime.fromJSDate(date).toISO();
};
