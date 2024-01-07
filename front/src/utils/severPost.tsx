import axios from 'axios';

const url = 'http://localhost:80/'
export async function serverPost(post ="", data = {}) {
  // Default options are marked with *
  console.log(url+post);
  try {
    const response = await axios.post( url+"api/"+post , data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${post}: ${error}`);
  }
}