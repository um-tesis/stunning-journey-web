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
    background: '#000',
    color: '#FFF',
  },
};
