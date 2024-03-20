import { ItemDetailsBO } from '../../BOs/ItemDetailsBO/ItemDetailsBO';
import {DependencyInjector} from '../../Helpers/DependencyInjector/DependencyInjector';
import HttpClient from '../../Helpers/ServiceHelpers/HttpClient/HttpClient';
import {ServiceResult} from '../../Helpers/ServiceHelpers/ServiceResult/ServiceResult';
import {ICycleCountService} from './ICycleCountService';

class CycleCountServices implements ICycleCountService {
  public downloadCycleCountItems = async (
    itemsCount: number,
    userId: string,
  ): Promise<ServiceResult<ItemDetailsBO[] | null>> => {
    let result = '';

    try {
      const {BaseURL} = DependencyInjector.getInstances();
      const URL = `${BaseURL}CycleCount/Services/CycleCountService.svc/DownloadItems/?count=${itemsCount}&userid=${userId}`;

      const httpClient = new HttpClient<any, any>();
      const response = await httpClient.get(URL);

      if (response.data && response.data.DownloadItemsResult) {
        if (response.data.DownloadItemsResult.startsWith('Response Error')) {
          return ServiceResult.Failed("Items cannot Find", null);
        }

        if (response.data.DownloadItemsResult.trim() === "") {
          return ServiceResult.Success([]);
        }

        return ServiceResult.Success(
          JSON.parse(response.data.DownloadItemsResult),
        );
      } else {
        return ServiceResult.Failed('Items cannot Find', null);
      }
    } catch (error) {
      return ServiceResult.Failed('Service Exception', null);
    }
  };

  public updateCycleCountItems = async (
    items: ItemDetailsBO[],
    userId: string,
  ): Promise<ServiceResult<string[] | null>> => {
    let count = 25;
    let itemUpdated: string[] = [];

    try {
      let iter = 0;
      const {BaseURL} = DependencyInjector.getInstances();
      
      const httpClient = new HttpClient<any, any>();
      const config = {
        headers: {
          'Content-Type': 'text/xml',
          Accept: 'text/xml',
          SOAPAction: 'http://tempuri.org/UploadItems',
        },
      };

      do {
        let serialized = '';

        if (iter + count > items.length) {
          serialized = JSON.stringify(items.slice(iter));
        } else {
          serialized = JSON.stringify(items.slice(iter, iter + count));
        }

        iter += count;

        const encodedsrt = encodeURIComponent(serialized);

        var soapXml = `<?xml version=\"1.0\" encoding=\"utf - 8\"?><soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><UploadItems  xmlns=\"http://tempuri.org/\"><item>${encodedsrt}</item><Userid>${userId}</Userid></UploadItems></soap:Body></soap:Envelope>`;

        const URL = BaseURL + 'CycleCount/Services/CycleCountUpload.asmx';

        const response = await httpClient.post(URL, soapXml, config);

        const value = response.data.split('<UploadItemsResult>')[1];
        const value2 = value.split('</UploadItemsResult>');

        itemUpdated.push(...JSON.parse(value2[0]));
      } while (iter < items.length);

      if (itemUpdated.length > 0) {
        return ServiceResult.Success(itemUpdated);
      } else {
        return ServiceResult.Failed('Failed to upload items');
      }
    } catch (error) {
      return ServiceResult.Failed('Service Exception', null);
    }
  };
}

export default CycleCountServices;
