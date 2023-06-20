import React from 'react'

function Header({setAddress}) {
    
    const onSubmit = (e) =>{
        e.preventDefault();
      if (e.target.address.value.trim() !== "") {
         setAddress(e.target.address.value)
      }
    }
    return (
        <header>
            <form action="" onSubmit={onSubmit}>
                <input type="text" name='address' placeholder='0xxx.....'/>
                <button>Check</button>
            </form>
            <h1>Collections</h1>
        </header>
    )
}

export default Header