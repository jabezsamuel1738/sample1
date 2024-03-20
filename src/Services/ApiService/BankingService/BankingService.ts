import axios from 'axios';

export const getBalance = async (userId: number) => {
  try {
    const token = 'Ragul523';
    const response = await axios.get(`http://192.168.221.12:5163/api/getBalance/${userId}`, {
      headers: {
        accesstoken: token,
        apikey: "dGhpcyBpcyBhIGR1bW15IGFwaSBrZXk="
      },
    });
    return response.data.amount;
  } catch (error) {
    throw error;
  }
};
