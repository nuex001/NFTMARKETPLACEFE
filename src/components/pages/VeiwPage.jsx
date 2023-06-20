import React, { useState, useEffect, useRef } from 'react'
import "../../assets/css/view.css"
import { AiFillPicture } from 'react-icons/ai';
import Recent from '../layouts/Home/Recent'
import { useDispatch, useSelector } from "react-redux";
import { setNft } from "../../redux/nftsStore"
import Spinner from '../Spinner';
import { useParams, useNavigate } from "react-router-dom";
// import { fetchIpfsHash } from '../../utils/utils';


function VeiwPage() {
    const display = useRef();
    const { tokenId } = useParams();

    const [auction, setAuction] = useState(false);
    const dispatch = useDispatch();
    const { error, success, contract, nft } = useSelector((state) => state.nftsStore);
    // 
    const fetchNftDetails = async (tokenId) => {
        const res = await contract.methods.fetchNFTsDetails(tokenId).call();
        dispatch(setNft(res));
        console.log(res);
        // if(res){
        //     fetchIpfsHash(res)
        // }
    }
    useEffect(() => {
        if (contract) {
            fetchNftDetails(tokenId);
        }
    }, [contract])

    const toggleImg = (e) => {
        const dataSrc = e.target.getAttribute("data-src");
        display.current.style = `background-image:url('${dataSrc}')`
        console.log(dataSrc);
    }

    return (
        <>
            <div className="view">
                {nft
                    ?
                    <>
                        <div className="display">
                            <div className="mainDiv" ref={display} style={{ backgroundImage: "url('/nft6.jpg')" }}></div>
                            <div className="sidebar">
                                <img src="/nft6.jpg" alt="" data-src="/nft6.jpg" onClick={toggleImg} />
                                <img src="/nft7.jpg" alt="" data-src="/nft7.jpg" onClick={toggleImg} />
                                <img src="/nft8.jpg" alt="" data-src="/nft8.jpg" onClick={toggleImg} />
                                <img src="/nft9.jpg" alt="" data-src="/nft9.jpg" onClick={toggleImg} />
                            </div>
                        </div>
                        <div className="details">
                            <div className="head">
                                <h1>
                                    Mobile Devices
                                    <span>
                                        Iphone 6s
                                    </span>
                                </h1>
                                <h1>
                                    Remaining Time
                                    <span>
                                        11:23:3S
                                    </span>
                                </h1>
                            </div>
                            <h2>DETAILS :</h2>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem hic error aspernatur commodi a, sint blanditiis nemo quidem obcaecati tempore beatae voluptas alias fuga expedita dolore asperiores eius illum nesciunt!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem hic error aspernatur commodi a, sint blanditiis nemo quidem obcaecati tempore beatae voluptas alias fuga expedita dolore asperiores eius illum nesciunt!
                            </p>
                            <h2>ID :123456789</h2>
                            <div className="footer">
                                <div className="box">
                                    <h3>
                                        Current price
                                    </h3>
                                    <h2>3.05ETH <span>$321,23</span></h2>
                                </div>
                                <button>BID NOW</button>
                            </div>
                        </div>
                    </>
                    :
                    <AiFillPicture className='icon' />
                }
            </div>
            <Recent />
        </>
    )
}

export default VeiwPage


/**
 * name
 * details
 * id - imel 
 * for ipfs
 */