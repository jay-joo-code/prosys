import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ObjectID from 'bson-objectid'
import React, { useState } from 'react'
import { useCreateInboxTaskAtDate } from 'src/api/task'
import TextField from 'src/components/form-elements/TextField'
import styled from 'styled-components'

interface AddTaskItemProps {
  due: Date
}

const AddTaskItem = ({ due }: AddTaskItemProps) => {
  const { createTask } = useCreateInboxTaskAtDate({ due, isTimed: false })
  const [name, setName] = useState<string>('')

  const handleCreateTask = () => {
    if (name !== '') {
      const newTaskId = new ObjectID().toHexString()
      createTask({
        _id: newTaskId,
        name,
        due,
        createdAt: new Date(),
      })
      setName('')
    }
  }

  return (
    <Container isFocused={false}>
      <AddOutlinedIcon />
      <NameTextField
        placeholder='Add task'
        onEnterPress={handleCreateTask}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </Container>
  )
}

interface IContainerProps {
  isFocused: boolean
}

const Container = styled.div<IContainerProps>`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.grey[100]};

  // isFocused
  background: ${(props) => props.isFocused && props.theme.brand[50]};

  & svg {
    fill: ${(props) => props.theme.text.light};
  }
`

const NameTextField = styled(TextField)`
  width: 100%;
  background: inherit;
  font-size: 1rem;
  padding: 0.2rem 0;
  border: none;
  margin-left: 0.5rem;
`

export default AddTaskItem
