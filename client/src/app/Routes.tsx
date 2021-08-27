import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import { IRootState } from 'src/types/redux.type'

const Home = React.lazy(() => import('src/pages/home/Home'))
const MobileBlock = React.lazy(() => import('src/pages/mobile-block/MobileBlock'))
const AuthCallback = React.lazy(() => import('src/pages/auth-callback/AuthCallback'))
const Login = React.lazy(() => import('src/pages/login/Login'))
const Logout = React.lazy(() => import('src/pages/logout/Logout'))
const InboxPage = React.lazy(() => import('src/pages/inbox/InboxPage'))
// const ArchivePage = React.lazy(() => import('src/pages/archive/ArchivePage'))
const SpacedRepPage = React.lazy(() => import('src/pages/spaced-rep/SpacedRepPage'))
const WikiPage = React.lazy(() => import('src/pages/wiki/WikiPage'))

interface IRoute {
  path: string
  component: React.FC
  label?: string
  isPublicNav: boolean
  isPrivateNav: boolean
  isPrivateRoute: boolean
  isDesktopOnly: boolean
}

export const routes: IRoute[] = [
  // auth
  {
    path: '/logout',
    component: Logout,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },

  // display
  {
    path: '/mobile-block',
    component: MobileBlock,
    label: 'MobileBlock',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/inbox',
    component: InboxPage,
    label: 'Inbox',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  // {
  //   path: '/archive',
  //   component: ArchivePage,
  //   label: 'Archive',
  //   isPublicNav: false,
  //   isPrivateNav: false,
  //   isPrivateRoute: true,
  //   isDesktopOnly: true,
  // },
  {
    path: '/spaced-rep',
    component: SpacedRepPage,
    label: 'Spaced Repetition',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/wiki',
    component: WikiPage,
    label: 'Wiki',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
]

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  const { accessToken } = useSelector((state: IRootState) => state.authState)

  if (!accessToken || accessToken.length === 0) {
    return <Redirect to='/login' />
  }

  return <Route {...rest} render={() => <Component />} />
}

const DesktopRoute = ({ component: Component, ...rest }: IRoute) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Redirect to='/mobile-block' />
  }

  return <Route {...rest} render={() => <Component />} />
}

const Routes = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map(({ path, component, isPrivateRoute, isDesktopOnly, ...rest }) =>
          isPrivateRoute ? (
            <PrivateRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : isDesktopOnly ? (
            <DesktopRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : (
            <Route key={path} path={path} component={component} />
          )
        )}
      </Switch>
    </Suspense>
  )
}

export default Routes
