import useRouter from './useRouter'

const useIsArchive = () => {
  const { pathname } = useRouter()
  return pathname === '/cards'
}

export default useIsArchive
