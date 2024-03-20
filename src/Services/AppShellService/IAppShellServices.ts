import {ItemBO} from '../../BOs/ItemBO/ItemBO';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';

export interface IAppShellServices {
  updateItemList: (
    itemList: ItemBO[],
    userId: string,
  ) => Promise<ServiceResult<boolean>>;
  getDownloadedCount: (
    last: string,
    user: UserBO,
  ) => Promise<ServiceResult<number | null>>;
  fetchItems: (
    user: UserBO,
    currentCount: number,
    nextCount: number,
    lastItemId: string,
    lastBarCodeId: string,
    lastSyncDate: string,
  ) => Promise<ServiceResult<ItemBO[] | null>>;
}
