import axios from 'axios';
import {ApiResponseBO} from '../../BOs/ApiResponseBO/ApiResponseBO';
import {ItemBO} from '../../BOs/ItemBO/ItemBO';
import {UserBO} from '../../BOs/UserBO/UserBO';
import {HttpStatus} from '../../Helpers/Constants/Enums';
import {DependencyInjector} from '../../Helpers/DependencyInjector/DependencyInjector';
import HttpClient from '../../Helpers/ServiceHelpers/HttpClient/HttpClient';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';
import {IAppShellServices} from './IAppShellServices';

class AppShellServices implements IAppShellServices {
  public updateItemList = async (
    itemList: ItemBO[],
    userId: string,
  ): Promise<ServiceResult<boolean>> => {
    const {BaseURL} = DependencyInjector.getInstances();
    try {
      const http = new HttpClient<any, string>();
      const config = {
        headers: {
          'Content-Type': 'text/xml',
          Accept: 'text/xml',
          SOAPAction: 'http://tempuri.org/UploadItemsInventory',
        },
      };
      let start = 0;
      for (let end = 0; end < itemList.length + 49; end += 50) {
        if (end > itemList.length) {
          end = itemList.length;
        } else if (end === 0) {
          end += 50;
        }
        const tempArr = itemList.slice(start, end);
        if (tempArr.length === 0) {
          continue;
        }

        let encodedsrt = encodeURIComponent(JSON.stringify(tempArr));

        const soap = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><UploadItemsInventory xmlns="http://tempuri.org/"><item>${encodedsrt}</item><Userid>${userId}</Userid></UploadItemsInventory></soap:Body></soap:Envelope>`;

        const url =
          BaseURL + 'Invadjustment/Services/InventoryAdjustmentUpload.asmx';
        const response = await http.post(url, soap, config);

        if (response.status !== HttpStatus.Success) {
          throw new Error();
        }
        start = end;
      }
      return ServiceResult.Success(true);
    } catch (error) {
      return ServiceResult.Failed('Service exception', false);
    }
  };

  public getDownloadedCount = async (
    last: string = '',
    user: UserBO,
  ): Promise<ServiceResult<number | null>> => {
    try {
      const {BaseURL} = DependencyInjector.getInstances();
      const url: string =
        BaseURL +
        'CatalogItems/CatalogItem.svc/GetDownloadCount/?buisnessunit=' +
        user.BusinessUnitId +
        '&UserID=' +
        user.UserID +
        '&DateTime=' +
        last;
      const http = new HttpClient<ApiResponseBO, any>();

      const response = await http.get(url);
      if (response.status === HttpStatus.Success) {
        const data = response.data;

        if (data !== null) {
          const count: string[] = JSON.parse(
            data.resultSet.trim() === '' ? '0' : data.resultSet.trim(),
          );
          return ServiceResult.Success(parseInt(count[0]));
        } else {
          return ServiceResult.NotFound('Data is empty');
        }
      } else {
        return ServiceResult.Failed('Error occured', null);
      }
    } catch (error) {
      return ServiceResult.Failed('Exception occured', null);
    }
  };

  public fetchItems = async (
    userinfo: UserBO,
    currentCount: number,
    nextCount: number,
    lastItemId: string = '',
    lastBarCodeId: string = '',
    lastSyncDate: string = '',
  ): Promise<ServiceResult<ItemBO[] | null>> => {
    try {
      const {BaseURL} = DependencyInjector.getInstances();

      const url =
        BaseURL +
        'CatalogItems/CatalogItem.svc/FetchItems/?buisnessunit=' +
        userinfo.BusinessUnitId +
        '&FetchCount=' +
        currentCount +
        '&LastCount=' +
        nextCount +
        '&LastItemID=' +
        lastItemId +
        '&LastBarcodeID=' +
        lastBarCodeId +
        '&UserID=' +
        userinfo.UserID +
        '&datetime=' +
        lastSyncDate;

      const http = new HttpClient<ApiResponseBO, any>();
      const response = await http.get(url);
      const data = response.data;
      if (data !== null) {
        const items: ItemBO[] = JSON.parse(data.resultSet);
        return ServiceResult.Success(items);
      } else {
        return ServiceResult.NotFound('Data is empty');
      }
    } catch (error) {
      return ServiceResult.Failed('Service Exception', null);
    }
  };
}

export default AppShellServices;
