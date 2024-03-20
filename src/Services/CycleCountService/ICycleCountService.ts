import { ItemDetailsBO } from '../../BOs/ItemDetailsBO/ItemDetailsBO';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';

export interface ICycleCountService {
  downloadCycleCountItems: (
    itemsCount: number,
    userId: string,
  ) => Promise<ServiceResult<ItemDetailsBO[] | null>>;
  updateCycleCountItems: (
    items: ItemDetailsBO[],
    userId: string,
  ) => Promise<ServiceResult<string[] | null>>;
}
