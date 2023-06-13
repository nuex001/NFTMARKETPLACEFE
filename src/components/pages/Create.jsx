import React, { useRef, useState } from 'react'
import "../../assets/css/create.css"
import { LuUpload } from "react-icons/lu";
import Select from "react-select";


function Create() {
  const labelRef = useRef();
  const [imgPreview, setImgPreview] = useState(false);
  const [biddingState, setBiddingState] = useState(false);
  const [sellingState, setsellingState] = useState(false);

  const options = [
    { value: "laptop", label: "Laptop" },
    { value: "mobile", label: "Mobile Device" },
    { value: "desktop", label: "Desktop" },
    { value: "kitchen", label: "Kitchen utensils" },
  ];

  const onChangeFile = (e) => {
    // console.log(e.target.files.length);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  }

  const setFormStateFunc = (e) => {
    e.preventDefault();
    const txt = e.target.textContent.toLowerCase();
    if (txt === "bidding") {
      setBiddingState(true);
      setsellingState(false);
    } else if (txt === "selling") {
      setsellingState(true);
      setBiddingState(false);
    }
  }
  const goBack = (e) => {
    e.preventDefault();
    setBiddingState(false);
    setsellingState(false);
  }


  const onSubmit = (e) => {
    e.preventDefault();
  }

  //SELECT STYLES
  const style = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "none" : "none",
      boxShadow: " 0px 2px 3px 0px rgba(225, 225, 225, 0.5)",
      background: "var(--backgrond)",
      '&:hover': {
        border: state.isFocused ? "none;" : "none;",
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--bg)",
    }),
    option: (styles) => ({
      ...styles,
      background: "var(--bg)",
      color: "var(--text)",
    }),
    singleValue: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "var(--text)" : "var(--text)",
    }),
  }

  return (
    <section className="create">
      <h1>CREATE NFT</h1>
      <form action="" encType='formdata/multipart' onSubmit={onSubmit}>

        <div className="box">
          <label htmlFor="file" ref={labelRef}>
            {
              imgPreview ?
                <img src={imgPreview} alt="" />
                :
                <LuUpload className='icon' />
            }
          </label>
          <input type="file" name='file' multiple accept='images/*' id='file' style={{ display: "none" }} onChange={onChangeFile} />
        </div>
        <div className="box">
          {!biddingState && !sellingState &&
            <div className="btnCont">
              <button onClick={setFormStateFunc}>Bidding</button>
              <button onClick={setFormStateFunc}>Selling</button>
            </div>
          }
          {
            // biddingState && !sellingState &&
            biddingState &&
            <div className="cont">
              <button onClick={goBack}>Back</button>
              <div className="row">
                <label htmlFor="id">Device Id</label>
                <input type="text" name='id' id='id' placeholder='input Id' />
              </div>
              <div className="row">
                <label htmlFor="name">Device Name</label>
                <input type="text" name='name' id='name' placeholder='input device name' />
              </div>
              <div className="row">
                <label htmlFor="time">Auction Time</label>
                <input type="datetime-local" name='time' id='time' />
              </div>
              <div className="row">
                <label htmlFor="price">Price</label>
                <input type="number" name='price' id='price' placeholder='input price' />
              </div>
              <div className="row">
                <label htmlFor="type">Category</label>
                <Select
                  name="type"
                  id="type"
                  options={options}
                  className="selectInput"
                  styles={style}
                />
              </div>
              <div className="row">
                <label htmlFor="details">DETAILS</label>
                <textarea name="details" id="details"></textarea>
              </div>
              <div className="row">
                <button >Submit</button>
              </div>
            </div>
          }
          {
            sellingState &&
            <div className="cont">
              <button onClick={goBack}>Back</button>
              <div className="row">
                <label htmlFor="id">Device Id</label>
                <input type="text" name='id' id='id' placeholder='input Id' />
              </div>
              <div className="row">
                <label htmlFor="name">Device Name</label>
                <input type="text" name='name' id='name' placeholder='input device name' />
              </div>
              <div className="row">
                <label htmlFor="price">Price</label>
                <input type="number" name='price' id='price' placeholder='input price' />
              </div>
              <div className="row">
                <label htmlFor="details">DETAILS</label>
                <textarea name="details" id="details"></textarea>
              </div>
              <div className="row">
                <label htmlFor="type">Category</label>
                <Select
                  name="type"
                  id="type"
                  options={options}
                  className="selectInput"
                  styles={style}
                />
              </div>
              <div className="row">
                <button >Submit</button>
              </div>
            </div>
          }

        </div>
        {/* <input type="file" name='file' multiple accept='images/*' style={{boxShadow:"none"}}/>
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
        <button>Create</button> */}
      </form>
    </section>
  )
}

export default Create