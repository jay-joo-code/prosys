import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Footer from 'src/components/footer/Footer'
import GlobalSnackbar from 'src/components/GlobalSnackbar'
import ToastWrapper from 'src/components/toast/ToastWrapper'
import ToggleBlur from 'src/components/ToggledBlur'
import ScrollToTop from 'src/components/util/ScrollToTop'
import store from 'src/redux/store'
import history from 'src/util/history'
import styled, { ThemeProvider } from 'styled-components'
import Header from '../components/header/Header'
import './normalise.less'
import Routes from './Routes'
import theme from './theme'

const persistor = persistStore(store)

export const queryCache = new QueryCache()

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <ToggleBlur>
                <Container>
                  <Header />
                  <FillHeight>
                    <Routes />
                  </FillHeight>
                  <Footer />
                </Container>
              </ToggleBlur>
              <ToastWrapper />
              <ScrollToTop />
              <GlobalSnackbar />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bg};

  @media (min-width: ${(props) => props.theme.tablet}) {
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

export default App
