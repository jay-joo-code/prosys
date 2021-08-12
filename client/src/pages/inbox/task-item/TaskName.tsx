import React from 'react'
import Text from 'src/components/fonts/Text'
import OutsideClickListener from 'src/components/util/OutsideClickListener'
import { ITask } from 'src/types/task.type'
import styled from 'styled-components'

interface TaskNameProps {
  task: ITask
}

const TaskName = ({ task }: TaskNameProps) => {
  const handleClick = () => {}

  const handleOutsideClick = () => {}

  return (
    <FullWidthParent>
      <OutsideClickListener onOutsideClick={handleOutsideClick} isListening>
        <Container onClick={handleClick}>
          <Text variant='p'>{task.name}</Text>
        </Container>
      </OutsideClickListener>
    </FullWidthParent>
  )
}

const FullWidthParent = styled.div`
  flex: 2;
  overflow: hidden;

  & > div {
    width: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 1rem;
`

export default TaskName
