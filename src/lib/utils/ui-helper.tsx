export const classNamesFilter = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
