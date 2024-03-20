import {UserBO} from '../../BOs/UserBO/UserBO';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';

export interface ISplashScreenService {
  ValidateUser: (
    username: string,
    password: string,
  ) => Promise<ServiceResult<UserBO[] | null | any>>;
}
