import React, { useState } from 'react'
import "../../assets/css/collection.css"
import Header from '../layouts/Collections/Header'
import Collection from '../layouts/Collections/Collection'

function Collections() {
  const [Address, setAddress] = useState("");
  return (
    <div className='collections'>
      <Header setAddress={setAddress} />
      <Collection address={Address} />
    </div>
  )
}

export default Collections