import { ItemBO } from "../../BOs/ItemBO/ItemBO";
import { UserBO } from "../../BOs/UserBO/UserBO";
import { DependencyInjector } from "../../Helpers/DependencyInjector/DependencyInjector";
import HttpClient from "../../Helpers/ServiceHelpers/HttpClient/HttpClient";
import { ServiceResult } from "../../Helpers/ServiceHelpers/ServiceResult/ServiceResult";
import { IInventoryServices } from "./IInventoryServices";

export default class InventoryServices implements IInventoryServices {
  
    public fetchItems = async (
        user: UserBO,
        currentCount: number,
        nextCount: number,
        lastItemId: string,
        lastBarcodeId: string,
        lastDateTime: string
    ): Promise<ServiceResult<ItemBO[] | null>> => {
        try {
            if (!user && !currentCount && !nextCount && !lastItemId && !lastBarcodeId && !lastDateTime) {
                throw new Error("Parameters is of not the expected type");
            }

            let baseURL = DependencyInjector.BaseURL
                + "CatalogItems/CatalogItem.svc/FetchItems/?buisnessunit=" 
                + user.BusinessUnitId + "&FetchCount=" + currentCount + "&LastCount=" 
                + nextCount + "&LastItemID=" + lastItemId + "&LastBarcodeID=" + lastBarcodeId 
                + "&UserID=" + user.UserID + "&datetime=" + lastDateTime ;

            const httpClient = new HttpClient<ItemBO[], any>();
            const response = await httpClient.get(baseURL);

            return response;
        } 
        catch (error: any) {
            return ServiceResult.Failed<null>(
                error instanceof Error ? error.message : "Unexpected Error Occured"
            );
        } 
    }

}