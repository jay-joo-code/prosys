import React, { memo, useEffect, useState } from 'react'
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
  const [value, setValue] = useState<string>(
    initValue || ''
  )
  const [debouncedValue] = useDebounce(value, 1000)

  useEffect(() => {
    onDebouncedChange(debouncedValue)

    return () => {
      onDebouncedChange(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <input
      {...rest}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export default memo(DebouncedInput)
