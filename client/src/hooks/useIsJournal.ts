import useRouter from './useRouter'

const useIsJournal = () => {
  const { pathname } = useRouter()
  return pathname === '/journal'
}

export default useIsJournal
