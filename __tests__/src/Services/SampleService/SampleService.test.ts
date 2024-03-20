import axios from 'axios'
import { getBalance } from '../../../../src/Services/ApiService/BankingService/BankingService'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getBalance function', () => {
    it('fetches user balance successfully', async () => {
      const userId = 5;
      const expectedBalance = 10000; // Expected balance amount
      const mockResponse = {
        data: {
          amount: expectedBalance,
          status : 200
        }
      };

      // Mock Axios.get to return mockResponse when called
      mockedAxios.get.mockImplementation(() => Promise.resolve(mockResponse));
  
      // Call getBalance function
      const balance = await getBalance(userId);
  
      // Assert the balance
      expect(balance).toEqual(expectedBalance);

    });
  
    it('handles errors properly', async () => {
      const userId = 5;
      const errorMessage = 'Error fetching balance';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));
      await expect(getBalance(userId)).rejects.toThrow(errorMessage);
    });
  });