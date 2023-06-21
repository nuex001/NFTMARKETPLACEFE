import axios from 'axios';


const readIPFSContent = async (hash) => {
    try {
        // Fetch the content from IPFS
        const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
        if (!response.data.length > 1) {
            throw new Error('Failed to fetch IPFS content');
        }
        const hashedImages = response.data.images;
        const unHashedname = response.data.name;
        const unHashedid = response.data.Id;
        let UnhashedImages = []
        if (hashedImages.length > 1) {
            for await (const hashedImage of hashedImages) {
                const url = `https://ipfs.io/ipfs/${hashedImage}`
                UnhashedImages.push(url)
            }

            // console.log(UnhashedImages);
            return { UnhashedImages, unHashedname, unHashedid };
        }
    } catch (error) {
        console.error('Error reading IPFS content:', error);
    }
}



export const convertToDollar = (price) => {
    const perEth = 1786.32
    return price * perEth;
}

export const convertUnitTimestamp = (unixTimestamp) => {
    // Convert Unix timestamp to a Date object
    const date = new Date(unixTimestamp * 1000);

    // // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the target date
    const difference = date.getTime() - currentDate.getTime();

    // Calculate the remaining time in days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Display the countdown
    const aDay = days === 1 ? true : false;
    return `${days}${aDay ? "day" : "days"}: ${hours}: ${minutes}M:${seconds}S`;

}


export const fetchNfts = async (data) => {
    const { contract, res } = data;
    let mainNfts = [];
    for await (const response of res) {
        const currentTime = new Date().getTime();
        const uintTimestamp = Math.floor(currentTime / 1000);
        const timeElapse = uintTimestamp > Number(response.timestamp);
        const tokenUrl = await contract.methods.fetchTokenUrl(response.tokenId).call();
        // console.log(tokenUrl);
        const { UnhashedImages, unHashedname, unHashedid } = await readIPFSContent(tokenUrl);
        //    const ipfsContent = await readIPFSContent(tokenId);
        // console.log(UnhashedImages);
        const nft = {
            tokenId: response.tokenId,
            name: unHashedname,
            cover: UnhashedImages[0],
            name: unHashedname,
            price: Number(response.price),
            timestamp: Number(response.timestamp),
            bidding: response.bidding,
            itemType: response.itemType,
            seller: response.seller,
            owner: response.owner,
            details: response.details,
            sold: response.sold,
            timeElapse: timeElapse,
            started: response.started
        }
        mainNfts.push(nft);
    }
    return mainNfts;
}


export const fetchNft = async (data) => {
    const { contract, res } = data;
    const response = res[0];
    const currentTime = new Date().getTime();
    const uintTimestamp = Math.floor(currentTime / 1000);
    const timeElapse = uintTimestamp > Number(response.timestamp);
    const { UnhashedImages, unHashedname, unHashedid } = await readIPFSContent(res[1]);
    //    const ipfsContent = await readIPFSContent(tokenId);
    // console.log(UnhashedImages);
    const nft = {
        tokenId: response.tokenId,
        id: unHashedid,
        name: unHashedname,
        covers: UnhashedImages,
        price: Number(response.price),
        timestamp: Number(response.timestamp),
        bidding: response.bidding,
        itemType: response.itemType,
        seller: response.seller,
        owner: response.owner,
        details: response.details,
        sold: response.sold,
        timeElapse: timeElapse,
        started: response.started
    }
    return nft;
}


