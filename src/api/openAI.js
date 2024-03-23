import axios from "axios";
import axiosRetry from "axios-retry";
import {API_KEY} from '@env'

const MAX_REQUESTS = 10; // Maximum number of requests allowed within the time period
const TIME_PERIOD = 60 * 1000; // Time period in milliseconds (e.g., 1 minute)

const client = axios.create({
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  }
});

axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isRetryableError
});

const chatgptendpoint = "https://api.openai.com/v1/chat/completions";
const dalleendpoint = "https://api.openai.com/v1/images/generations";



export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatgptendpoint, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with yes or no`
        }
      ]
    });
    let isArt= res.data?.choices[0]?.message?.content;
    if(isArt.toLowercase().includes('yes')){
      console.log('dall-e api call')
      return dalleApiCall(prompt,messages || []);
    }else{
      console.log('chat gpt api call')
      return chatgptApicall(prompt,messages || []);
    }
    
    
  } catch (error) {
    console.log('error :', error)
    return Promise.resolve({success: false,msg:error.messages})
  }
};

const chatgptApicall = async(prompt,messages)=>{
  try{
    const res = await client.post(chatgptendpoint, {
      model: "gpt-3.5-turbo",
      messages
        
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({role: 'assistant',content: answer.trim()});
    return Promise.resolve({success: true, data:messages})
  }catch(err){
    console.log('error :',err);
    return Promise.resolve({success:false,msg:err.message})
  }
}

const dalleApiCall=async(prompt,messages)=>{
  try {
    const res=await client.post(dalleendpoint, {
      prompt,
      n: 1,
      size: "512x512"
    })

    let url = res?.data?.data[0]?.url;
    console.log('got url of the image: ',url)
    return Promise.resolve({success: true, data:messages})
  } catch (error) {
    console.log('error :',error)
    return Promise.resolve({success:false,msg:err.message})
  }
}