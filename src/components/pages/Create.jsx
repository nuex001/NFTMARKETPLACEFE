import React from 'react'
import "../../assets/css/create.css"

function Create() {
  return (
    <section className="create">
        <h1>CREATE NFT</h1>
      <form action="" encType='formdata/multipart'>
        <input type="file" name='file' multiple accept='images/*' style={{boxShadow:"none"}}/>
        <input type="text" name='id' placeholder='id'/>
        <input type="number" name='price' placeholder='price'/>
        <select name="category" id="">
            <option value="mobile">Mobile</option>
            <option value="laptop">laptop</option>
            <option value="kitchenutensils">Kitchen Utensils</option>
        </select>
        <select name="Method" id="">
            <option value="auction">Auction</option>
            <option value="sale">Sale</option>
        </select>
        <p>NOTE: we only accept payment with eth</p>
        <button>Create</button>
      </form>
    </section>
  )
}

export default Create