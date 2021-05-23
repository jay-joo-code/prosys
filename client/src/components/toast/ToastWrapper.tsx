import React from 'react'
import styled from 'styled-components'
import { ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './ToastStyles.less'

const ZoomCustom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  appendPosition: false,
  collapse: true,
  collapseDuration: 300,
})

const ToastWrapper = () => {
  return <StyledToastContainer
    position='top-center'
    autoClose={2500}
    hideProgressBar={true}
    newestOnTop={false}
    transition={ZoomCustom}
    rtl={false}
    pauseOnHover
  />
}

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  /* .toast-container */
  /* width: 100%; */

  & .Toastify__toast--success {
    background: ${(props) => props.theme.success}
  }
  & .Toastify__toast--info {
    background: ${(props) => props.theme.info[500]}
  }
  & .Toastify__toast--warning {
    background: ${(props) => props.theme.warning[500]}
  }
  & .Toastify__toast--error {
    background: ${(props) => props.theme.danger[500]}
  }

   /* .toast is passed to toastClassName */
  .toast {
    min-height: 0;
    border-radius: 4px;
    box-shadow: ${(props) => props.theme.shadow};
    display: flex;
    align-items: center;
  }

  button[aria-label="close"] {
    opacity: 1;
    align-self: center;
  }

  /* .body is passed to bodyClassName */
  .body {
    margin: 0;
    padding: .2rem .5rem;
    font-size: .9rem;
    color: ${(props) => props.theme.white};
  }

  /* .progress is passed to progressClassName */
  .progress {}
`

export default ToastWrapper
