import useRouter from './useRouter'

const useCurrentPsid = () => {
  const { pathname } = useRouter()
  return pathname?.split('/')[2]
}

export default useCurrentPsid
