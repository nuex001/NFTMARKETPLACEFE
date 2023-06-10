import React from 'react'
import "../../assets/css/collection.css"
import Header from '../layouts/Collections/Header'
import Collection from '../layouts/Collections/Collection'

function Collections() {
  return (
    <div className='collections'>
        <Header/>
        <Collection/>
    </div>
  )
}

export default Collections