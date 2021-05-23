import isNumeric from './isNumeric'
import substringQuery from './substringQuery'

const parseCourseQuery = (queryRaw: string) => {
  // const test1 = 'cs'
  // const test2 = '1100'

  // const test3 = 'cs 1100'

  // const test4 = 'cs 1100 intro to'
  // const test5 = 'intro to'

  const query = queryRaw?.trim()
  const queryArr = query.split(' ')

  if (!query || query.length === 0 || queryArr.length === 0) return {}

  let subject = ''
  let catalogNbr = ''
  let title = ''

  if (queryArr.length === 1) {
    // single letter
    const firstLetter = queryArr[0]
    if (isNumeric(firstLetter)) {
      // ex) 1100
      catalogNbr = firstLetter
    } else {
      // ex) cs
      subject = firstLetter
      title = firstLetter
    }
  } else if (!isNumeric(subject) && isNumeric(queryArr[1])) {
    // multiple letters, 2nd letter is a number
    // ex) cs 1100 intro to ...
    [subject, catalogNbr] = queryArr
    title = queryArr.slice(2).join(' ')
  } else {
    // multiple letters, 2nd leter is not a number
    // ex) intro to ...
    title = query
  }

  const subjectFilter = subject ? { 'data.subject': subject.toUpperCase() } : {}
  const catalogNbrFilter = catalogNbr ? { 'data.catalogNbr': catalogNbr } : {}
  const titleFilter = title ? { 'data.titleShort': title } : {}

  const filter = {
    ...substringQuery({
      ...catalogNbrFilter,
      ...titleFilter,
    }, ['data.catalogNbr', 'data.titleShort']),
    ...subjectFilter,
  }

  if (subject && catalogNbr) {
    return filter
  } else {
    const filterArr: any[] = []
    Object.entries(filter).forEach(([key, value]) => filterArr.push({ [key]: value }))
    return { $or: filterArr }
  }
}

export default parseCourseQuery
