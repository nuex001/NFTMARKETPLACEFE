import React from 'react'
import "../../assets/css/collection.css"
import Collection from '../layouts/myNft/Collection'

function MyNft() {
    return (
        <div className='collections'>
            <header>
                <h1>MyNFTS</h1>
            </header>
            <Collection />
        </div>
    )
}

export default MyNft