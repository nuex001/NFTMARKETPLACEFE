import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

function FetchNfts() {
    const dispatch = useDispatch();
    const { error, success, contract, provider, nfts } = useSelector((state) => state.nftsStore);
    // let  = [];
    const [mainNfts, setMainNfts] = useState([])

    const fetchNfts = async () => {
        const res = await contract.methods.fetchMarketItem().call();
        for await (const response of res) {
            // response.price.toString().slice(1, response.price.toString().length) removing the n following the backend
            const nft = {
                tokenId: response.tokenId,
                price: response.price.toString().slice(0, response.price.toString().length),
                timestamp: response.timestamp.toString().slice(0, response.timestamp.toString().length),
                bidding: response.bidding,
                itemType: response.itemType,
                sold: response.sold,
                seller: response.seller,
                owner: response.owner,
                details: response.details
            }
            setMainNfts(
                nft,
                ...mainNfts
            )
            // mainNfts.push(nft)
        }
    }
    useEffect(() => {
        if (mainNfts) {
            console.log(mainNfts);;
        }
    }, [mainNfts])
    useEffect(() => {
        if (contract) {
            fetchNfts();
        }
    }, [contract])
    return mainNfts;
}

export default FetchNfts