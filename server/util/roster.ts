import axios from 'axios'
import { ISemesterSlug, ISubjectSlug } from './../types/roster'

const BASE_URL = 'https://classes.cornell.edu/api/2.0'

export const fetchSubjects = async (semester: ISemesterSlug) => {
  try {
    const result = await axios.get(`${BASE_URL}/config/subjects.json?roster=${semester}`)

    if (result.status !== 200) {
      return []
    }
    return result.data.data.subjects
  } catch (error) {
    return error.response
  }
}

export const fetchClasses = async (semester: ISemesterSlug, subjectSlug: ISubjectSlug) => {
  try {
    const result = await axios.get(`${BASE_URL}/search/classes.json?roster=${semester}&subject=${subjectSlug}`)

    if (result.status !== 200) {
      return []
    }
    return result.data.data.classes
  } catch (error) {
    return error.response
  }
}

export const fetchAllClassesBySubject = (subjectSlug: ISubjectSlug): Promise<any[]> => new Promise((resolve, reject) => {
  (async () => {
    const slugs = ['FA19', 'SP20', 'FA20', 'SP21']

    const promises = slugs.map((slug) => new Promise<any[]>((resolve, reject) => {
      (async () => {
        try {
          resolve((await axios.get(`${BASE_URL}/search/classes.json?roster=${slug}&subject=${subjectSlug}`)).data.data.classes)
        } catch (error) {
          resolve([])
        }
      })()
    }))

    Promise.all(promises)
      .then((classesBySemester: any[][]) => {
        const crseIds = {}
        const mergedClasses: any[] = []
        classesBySemester.forEach((classes: any[]) => {
          classes.forEach((classData) => {
            if (!crseIds[classData.crseId]) {
              // if this class has not been added before,
              // add it
              crseIds[classData.crseId] = classData.crseId
              mergedClasses.push(classData)
            }
          })
        })
        resolve(mergedClasses)
      })
      .catch((e) => reject(e))
  })()
})

export const fetchAllClasses = (): Promise<any[]> => new Promise((resolve) => {
  (async () => {
    const subjects = await fetchSubjects('SP21')
    let allClasses: any[] = []
    const promises = subjects.map(({ value }, idx): Promise<void> => new Promise((resolve) => {
      setTimeout(() => {
        (async () => {
          const classes = await fetchAllClassesBySubject(value)
          allClasses = allClasses.concat(classes)
          console.log(`Fetched ${classes.length} ${value} courses`)
          resolve()
        })()
      }, 1000 * idx)
    }))
    await Promise.all(promises)
    resolve(allClasses)
  })()
})
