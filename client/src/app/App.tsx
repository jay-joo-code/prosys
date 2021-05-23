import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Footer from 'src/components/footer/Footer'
import ToastWrapper from 'src/components/toast/ToastWrapper'
import ScrollToTop from 'src/components/util/ScrollToTop'
import store from 'src/redux/store'
import history from 'src/util/history'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../components/header/Header'
import Routes from './Routes'
import theme from './theme'

import './normalise.less'

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  /* min-height: 100%; */
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bg};

  @media (min-width: ${(props) => props.theme.medium}) {
    width: initial;
    max-width: initial;
    overflow-x: initial;
  }
`

const FillHeight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;

  & > div {
    flex: 2;
  }
`

const persistor = persistStore(store)

export const queryCache = new QueryCache({
  // defaultConfig: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //   },
  // },
})

const App = () => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Container>
                <Header />
                <FillHeight>
                  <Routes />
                </FillHeight>
                <Footer />
              </Container>
              <ToastWrapper />
              <ScrollToTop />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
