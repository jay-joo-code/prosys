import { addDays } from 'date-fns'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useState } from 'react'
import { getDates } from 'src/util/date'
import styled from 'styled-components'
import TaskBatchItem from './TaskBatchItem'

const TaskBatchList = () => {
  const [dates, setDates] = useState<Date[]>(getDates(new Date(), addDays(new Date(), 3)))

  const addDates = () => {
    const newDates = [...dates]
    newDates.push(addDays(dates[dates?.length - 1], 1))
    setDates(newDates)
  }

  return (
    <Container>
      <InfiniteScroll
        dataLength={dates.length + 1}
        next={addDates}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <TaskBatchItem due={null} />
        {dates?.map((date) => (
          <TaskBatchItem key={date.toISOString()} due={date} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}

const Container = styled.div``

export default TaskBatchList
