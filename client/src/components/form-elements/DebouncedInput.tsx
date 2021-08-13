import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'

interface DebouncedInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onDebouncedChange: (value: string) => void
  initValue?: string
}

const DebouncedInput = ({
  initValue,
  onDebouncedChange,
  ...rest
}: DebouncedInputProps) => {
  const [value, setValue] = useState<string>(initValue || '')
  const [debouncedValue] = useDebounce(value, 1000)

  useEffect(() => {
    onDebouncedChange(debouncedValue)

    return () => {
      onDebouncedChange(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <StyledInput
      {...rest}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

const StyledInput = styled.input`
  background: inherit;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
`

export default memo(DebouncedInput)
