export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const getTimeStamp = (date: Date) => {
  return `0${date.getHours()}`.slice(-2) + `0${date.getMinutes()}`.slice(-2)
}
