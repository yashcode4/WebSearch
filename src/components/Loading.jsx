import React from 'react'
import {Circles as Loader} from 'react-loader-spinner';

export const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <Loader type="Puff" color="#00BFFF" height={500} width={80} />        
    </div>
  )
}
