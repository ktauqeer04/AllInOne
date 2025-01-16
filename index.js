import axios from "axios";
import express from "express"
const app = express();

app.get('/fetch', async (req, res) => {

    try {
        const response = await axios.get('https://api.linkedin.com/v2/userinfo', 
            {
                headers:{
                    Authorization: 'Bearer AQX3m1AEkMkoxruC92muoxCYPZkK4GYzwrYn9DWGWSDgEcI8CaPoA_8WoW72V7pIFCLc_oindIeBvtnVLq1LZyiWv86UboSdfBnyeXaWXAJsSbXwYkpZIgv65gPU7h5kw18k63zBY21h34dzVvndMj-mPwL6Q2JfWJvKZqg_UZ2HZTkj2_5A-I65ZpkA1lm9jETDjLcQ1esxQREMoHBC9wMcOLr-5FSF3MrZ2Yey_Tvonw0wO8kPSiJVvuS0n15kn_84qrYtWUAaG2IK2pmvoRZldrra53nnm21wn3SVH4UAwDGukHHwUOAZ8jL4OTjBDvVS0nhGx9I4URLBIBz0nhY7Xd4XNw'
                }
            }
        );

        if(!response || !response.data){
            return res.status(404).json({
                message:"not found"
            })
        }
        return res.status(200).json({
            message: response.data
        })        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            message: error.response?.data || 'Internal Server Error'
        });
    }

})

const data = {
    "author": "urn:li:person:qZ_RvOTLxM", // Ensure this matches your LinkedIn user
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": "Hello World! This is my first post on LinkedIn using LinkedIn's API key!"
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
};

app.post('/post', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.linkedin.com/v2/ugcPosts',
            data,
            {
                headers: {
                    'Authorization': `Bearer AQX3m1AEkMkoxruC92muoxCYPZkK4GYzwrYn9DWGWSDgEcI8CaPoA_8WoW72V7pIFCLc_oindIeBvtnVLq1LZyiWv86UboSdfBnyeXaWXAJsSbXwYkpZIgv65gPU7h5kw18k63zBY21h34dzVvndMj-mPwL6Q2JfWJvKZqg_UZ2HZTkj2_5A-I65ZpkA1lm9jETDjLcQ1esxQREMoHBC9wMcOLr-5FSF3MrZ2Yey_Tvonw0wO8kPSiJVvuS0n15kn_84qrYtWUAaG2IK2pmvoRZldrra53nnm21wn3SVH4UAwDGukHHwUOAZ8jL4OTjBDvVS0nhGx9I4URLBIBz0nhY7Xd4XNw`, // Replace with a valid token
                    'X-Restli-Protocol-Version': '2.0.0',
                    'Content-Type': 'application/json'
                }
            }
        );

        return res.status(200).json({
            message: response.data.id
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            message: error.response?.data || 'Internal Server Error'
        });
    }
});


app.listen(3000, () => {
    console.log(`App is listening on port 3000`);
})

