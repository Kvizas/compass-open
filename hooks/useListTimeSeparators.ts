
interface TimeSeparators<T> {
  [dateString: string]: T;
}

interface TimeSeparatorSystem<T> {
  separators: TimeSeparators<T>;
  itemDateExtractor: (item: T) => Date;
  dateFormatter: (date: Date) => string;
}

export const useListTimeSeparators = <T extends object>(
  listToSeparate: T[],
  itemDateExtractor: (item: T) => Date,
  dateFormatter: (date: Date) => string,
  itemGroupingDateFormatter: (date: Date) => string = dateFormatter
) => {
  const newSeparators: TimeSeparators<T> = {};

  listToSeparate.forEach((item) => {
    const date = itemGroupingDateFormatter(itemDateExtractor(item));
    if (newSeparators[date]) return;
    newSeparators[date] = item;
  });

  return {
    separators: newSeparators,
    itemDateExtractor,
    dateFormatter,
  } as TimeSeparatorSystem<T>;
};