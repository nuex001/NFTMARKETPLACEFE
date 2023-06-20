import axios from 'axios';

export const readIPFSContent = async (hash) => {
    try {
        // Fetch the content from IPFS
        const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
        if (!response.data.length > 1) {
            throw new Error('Failed to fetch IPFS content');
        }
        const hashedImages = response.data.images;
        console.log(hashedImages);
        console.log(response.data.Id);
        let UnhashedImages = []
        if (hashedImages.length > 1) {
            for (let i = 0; i < hashedImages.length; i++) {
                const url = `https://ipfs.io/ipfs/${hashedImages[i]}`
                UnhashedImages.push(url)
            }

            console.log(UnhashedImages);
            return UnhashedImages;
        }
    } catch (error) {
        console.error('Error reading IPFS content:', error);
    }
}
