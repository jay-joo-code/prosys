import moment from 'moment'

export const isDateBeforeToday = (date: Date): boolean => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const getDateStamp = (date: Date | null): string => {
  if (!date) return ''
  return moment(date).format('MM.DD')
}

export const getDay = (date: Date) => {
  return moment(date).format('ddd')
}
