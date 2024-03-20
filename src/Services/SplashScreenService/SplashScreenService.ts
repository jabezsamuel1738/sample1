import axios from 'axios';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {DependencyInjector} from '../../Helpers/DependencyInjector/DependencyInjector';
import HttpClient from '../../Helpers/ServiceHelpers/HttpClient/HttpClient';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';
import {ISplashScreenService} from './ISplashScreenService';

export default class SplashScreenService implements ISplashScreenService {
  public ValidateUser = async (
    username: string,
    password: string,
  ): Promise<ServiceResult<UserBO[] | null | any>> => {
    try {
      if (!username && !password) {
        throw new Error('Parameters is of not the expected type');
      }

      const {BaseURL} = DependencyInjector.getInstances();

      let baseURL =
        BaseURL +
        'Invadjustment/Services/InventoryAdjustment.svc/AuthenticateUser/?Username=' +
        username.trim() +
        '&Password=' +
        password.trim();

      const httpClient = new HttpClient<UserBO[], any>();
      const response = await httpClient.get(baseURL);

      return response;
    } catch (error: any) {
      return ServiceResult.Failed<null>(
        error instanceof Error ? error.message : 'Unexpected Error Occured',
      );
    }
  };
}
