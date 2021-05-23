import React from 'react'
import styled from 'styled-components'
import DefaultForm from './DefaultForm'

const Container = styled.div`
  width: 350px;
`

const FormTest = () => {
  return (
    <Container>
      <DefaultForm />
    </Container>
  )
}

export default FormTest
