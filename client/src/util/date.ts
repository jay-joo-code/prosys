import moment from 'moment'

export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const getDateStamp = (date: Date) => {
  return moment(date).format('MM.DD')
}
