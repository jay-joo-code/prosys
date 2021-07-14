import useRouter from './useRouter'

const useIsSpacedRep = () => {
  const { pathname } = useRouter()
  return pathname === '/archive'
}

export default useIsSpacedRep
