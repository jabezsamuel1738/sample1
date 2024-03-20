import { ItemBO } from "../../BOs/ItemBO/ItemBO";
import { UserBO } from "../../BOs/UserBO/UserBO";
import { ServiceResult } from "../../Helpers/ServiceHelpers/ServiceResult/ServiceResult";

export interface IInventoryServices {
    fetchItems : (
        user: UserBO,
        currentCount: number,
        nextCount: number,
        lastItemId: string,
        lastBarcodeId: string,
        lastDateTime: string
    ) => Promise<ServiceResult<ItemBO[] | null>>;
}