// import React, { Component } from 'react'
//func based
import React from 'react'
import spinner from './spinner.gif'

const Spinner =() =>{
  
    return (
      <div className='text-center'>
        <img src={spinner} alt="spinn" style={{height : '50px' , width: '50px'}} />
      </div>
    )
  
}
export default Spinner