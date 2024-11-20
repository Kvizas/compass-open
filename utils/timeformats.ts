const addDay = (d: Date) => new Date(d.getTime() + 24 * 60 * 60 * 1000);
const removeDay = (d: Date) => new Date(d.getTime() - 24 * 60 * 60 * 1000);

export const toPovilasTimeFormat = (date: Date) => {
  let dateString;

  const dateWithoutHours = new Date(date).setHours(0, 0, 0, 0);
  const todayWithoutHours = new Date().setHours(0, 0, 0, 0);
  const tommorowWithoutHours = addDay(new Date()).setHours(0, 0, 0, 0);
  const yesterdayWithoutHours = removeDay(new Date()).setHours(0, 0, 0, 0);

  if (dateWithoutHours == todayWithoutHours) dateString = "Today";
  else if (dateWithoutHours == tommorowWithoutHours) dateString = "Tomorrow";
  else if (dateWithoutHours == yesterdayWithoutHours) dateString = "Yesterday";
  else
    dateString = `${date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
      ...(date.getFullYear() == new Date().getFullYear() ? {} : { year: "numeric" }),
    })}`;

  return `${dateString}, ${date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  })}`;
};