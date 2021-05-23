import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Checkbox, { HookedCheckbox } from 'src/components/form-elements/Checkbox'
import Input, { HookedInput } from 'src/components/form-elements/TextField'
import RadioGroup, { HookedRadioGroup } from 'src/components/form-elements/RadioGroup'
import Select, { HookedSelect, ISelectOption } from 'src/components/form-elements/Select'
import Textarea, { HookedTextarea } from 'src/components/form-elements/Textarea'
import { FlexRow } from 'src/components/layout/Flex'
import styled from 'styled-components'
import * as yup from 'yup'
import Datepicker, { HookedDatePicker } from 'src/components/form-elements/DatePicker'
import DateRangePicker, { HookedDateRangePicker, IDates } from 'src/components/form-elements/DateRangePicker'
import Incrementor, { HookedIncrementor } from 'src/components/form-elements/Incrementor'

const schema = yup.object().shape({
  inputName: yup.string().required('This is a required field'),
  textareaName: yup.string().required('This is a required field'),
  checkboxName: yup.boolean().oneOf([true], 'Must check this checkbox'),
  selectName: yup.object()
    .required('Must select an option'),
  radioGroupName: yup.string()
    .typeError('Must choose an option')
    .required('Must choose an option'),
  datePickerName: yup.date().typeError('Must pick a date'),
  dateRangePickerName: yup.object()
    .shape({
      startDate: yup.date().typeError('Must pick a start date'),
      endDate: yup.date().typeError('Must pick an end date'),
    })
    .typeError('Must select a date range')
    .required('Must select a date range'),
  incrementorName: yup.number().min(3, 'Minimum 3 required'),
})

interface IFormData {
  inputName: string
  textareaName: string
  checkboxName: boolean
  selectName: ISelectOption,
  radioGroupName: string,
  datePickerName: Date,
  dateRangePickerName: IDates
  incrementorName: number
}

const DefaultForm = () => {
  const methods = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      inputName: 'default text',
      textareaName: 'default text',
      checkboxName: false,
      selectName: undefined,
      radioGroupName: undefined,
      datePickerName: undefined,
      dateRangePickerName: {
        startDate: new Date(),
        endDate: new Date(),
      },
      incrementorName: 2,
    },
  })
  const { handleSubmit, watch } = methods

  // console.log('watch(incrementorName) :>> ', watch('incrementorName'))
  // console.log('errors :>> ', errors)

  const onSubmit = (data: IFormData) => {
    console.log('onSubmit', data)
  }

  // local states
  const [inputValue, setInputValue] = useState<string>('')
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('')
  const [radioValue, setRadioValue] = useState<string>('')
  const [datePickerValue, setDatePickerValue] = useState<Date>(new Date())
  const [dateRangePickerValue, setDateRangePickerValue] = useState<IDates>({
    startDate: new Date(),
    endDate: new Date(),
  })
  const [incrementorValue, setIncrementorValue] = useState<number>(0)

  // console.log('dateRangePickerValue :>> ', dateRangePickerValue)

  return (
    <Container>
      <FormProvider {...methods} >
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* local state */}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />

          {/* react-hook-form */}
          <HookedInput
            label='inputName'
            name='inputName'
            fullWidth
          />

          {/* local state */}
          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            minRows={3}
            maxRows={5}
          />

          {/* react-hook-form */}
          <HookedTextarea
            label='textareaName'
            name='textareaName'
            minRows={3}
            maxRows={5}
          />

          {/* local state */}
          <Checkbox
            label='checkboxName'
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />

          {/* react-hook-form */}
          <HookedCheckbox
            label='checkboxName'
            name='checkboxName'
          />

          {/* local state */}
          <Select
            value={selected}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
            onChange={(option) => setSelected(option.value)}
          />

          {/* react-hook-form */}
          <HookedSelect
            name='selectName'
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* local state */}
          <RadioGroup
            value={radioValue}
            setValue={(newValue) => setRadioValue(newValue)}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* react-hook-form */}
          <HookedRadioGroup
            name='radioGroupName'
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />

          {/* local state */}
          <Datepicker
            date={datePickerValue}
            setDate={setDatePickerValue}
          />

          {/* react-hook-form */}
          <HookedDatePicker
            name='datePickerName'
          />

          {/* local state */}
          <DateRangePicker
            dates={dateRangePickerValue}
            setDates={setDateRangePickerValue}
          />

          {/* react-hook-form */}
          <HookedDateRangePicker
            name='dateRangePickerName'
          />

          {/* local state */}
          <Incrementor
            value={incrementorValue}
            label='incrementorName'
            onChange={setIncrementorValue}
          />

          {/* react-hook-form */}
          <HookedIncrementor
            name='incrementorName'
            label='incrementorName'
          />

          <FlexRow justifyEnd>
            <Button
              type='submit'
            >Submit
            </Button>
          </FlexRow>
        </Form>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;

  /* datepickers need at least 340px width */
  min-width: 340px; 
`

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }
`

export default DefaultForm
