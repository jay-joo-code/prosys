import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import React from 'react'
import theme from 'src/app/theme'
import Text from 'src/components/fonts/Text'
import styled from 'styled-components'

interface AddTaskItemProps {
  due: Date
}

const AddTaskItem = ({ due }: AddTaskItemProps) => {
  const handleClick = () => {}

  return (
    <Container isFocused={false} onClick={handleClick}>
      <AddOutlinedIcon />
      <Text variant='p' color={theme.text.light}>
        Add task
      </Text>
    </Container>
  )
}

interface IContainerProps {
  isFocused: boolean
}

const Container = styled.div<IContainerProps>`
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.grey[100]};

  // isFocused
  background: ${(props) =>
    props.isFocused && props.theme.brand[50]};

  & svg {
    margin-right: 0.2rem;
    fill: ${(props) => props.theme.text.light};
  }
`

export default AddTaskItem
