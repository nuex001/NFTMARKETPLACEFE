import React, { useRef, useState } from 'react'
import "../../assets/css/create.css"
import { LuUpload } from "react-icons/lu";
import Select from "react-select";
import ipfs from '../../utils/Ipfs';
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers"
// import {readIPFSContent} from '../../utils/utils';
function Create() {
  const labelRef = useRef();
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(false);
  const [biddingState, setBiddingState] = useState(false);
  const [sellingState, setsellingState] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { error, success, contract, nft, owner } = useSelector((state) => state.nftsStore);

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

  const submitToIpfs = async (e) => {
    const formData = new FormData(e.target);
    const files = formData.getAll('file');
    const fileArray = Array.from(files);
    if (fileArray.length < 4 && fileArray.length > 1 || id !== "") {
      const uploadedImages = await Promise.all(
        fileArray.map(async (file) => {
          const { cid } = await ipfs.add(file);
          return cid.toString();
        })
      );

      const enteredId = formData.get('id');
      const name = formData.get('name');

      const data = {
        images: uploadedImages,
        Id: enteredId,
        name: name,
      };

      const { cid } = await ipfs.add(JSON.stringify(data));
      const tokenUrl = cid.toString();
      return tokenUrl;
    }
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const id = e.target.id.value;
      const name = e.target.name.value;
      const time = e.target.time.value;
      const price = e.target.price.value;
      const type = e.target.type.value;
      const details = e.target.details.value;
      const file = e.target.file.value
      if (id.trim() !== "" && name.trim() !== "" && time.trim() !== "" && price.trim() !== "" && type.trim() !== "" && details.trim() !== "" && file.trim() !== "") {

        // const tokenUrl = await submitToIpfs(e);
        // console.log('CID:', tokenUrl);
        // Hardcoded value in Ether
        const valueInEther = 0.00025;

        // Convert Ether to Wei
        const valueInWei = ethers.utils.parseEther(valueInEther.toString())
        const valueAsString = valueInWei.toString();
        const unixTimestamp = Math.floor(new Date(time).getTime() / 1000);
        if (contract) {
          const res = await contract.methods.createToken(
            "tokenUrl", // IPFS
            price,
            type,
            biddingState,
            details,
            unixTimestamp
          ).send(
            {
              from: owner,
              value: valueAsString
            }
          );
          // dispatch(setNft(res));
          console.log(res);
        }
      }else{
        
      }
    } catch (error) {
      console.log(error);
    }
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
      </form>
    </section>
  )
}

export default Create