import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ItenaryContainer from './ItenaryContainer'
import ItenaryPage from './ItenaryPage'
import NotFoundPage from '../common/NotFoundPage'

const ItenaryBody = () => {
  return (
    <>
    <Routes>
      <Route index path="/" element={<ItenaryContainer />} />
      <Route path='/:id' element={<ItenaryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  )
}

export default ItenaryBody