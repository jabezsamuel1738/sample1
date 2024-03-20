import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ServiceResult } from "../ServiceResult/ServiceResult";

class HttpClient<R, B> {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            headers: {
                Accept: "*/*",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    }

    get = async (
        url: string,
        config?: AxiosRequestConfig<any>
    ): Promise<ServiceResult<R>> => {
        try {
            const response = await this.client.get<R, AxiosResponse<R, B>, B>(
                url,
                config
            );

            return this.handleResponse(response);
        } 
        catch (error) {

            return this.handleError(error);
        }
    };

    post = async (
        url: string,
        body: B,
        config?: AxiosRequestConfig<any>
    ): Promise<ServiceResult<R>> => {
        try {
            const response = await this.client.post<R, AxiosResponse<R, B>, B>(
                url,
                body,
                config
            );
        
            return this.handleResponse(response);
        } 
        catch (error) {

            return this.handleError(error);
        }
    };

    private handleResponse = <R>(response: any): ServiceResult<R> => {
        if (response.status >= 200 && response.status <= 299) {

            return ServiceResult.Success<R>(response.data);
        }
        if (response.status === 409) {

            return ServiceResult.Conflict<R>("Conflict");
        }
        if (response.status === 401 || response.status === 403) {

            return ServiceResult.UnAuthorised<R>("UnAuthorised Request");
        }
        if (response.status === 404) {

            return ServiceResult.NotFound<R>("Not Found");
        }
    
        return ServiceResult.Failed<R>("Some error got occured");
    };

    private handleError = <R>(error: any): ServiceResult<R> => {
        if(error.response.status === 409) {

            return ServiceResult.Conflict<R>("Conflict");
        }
        if (error.response.status === 404) {

            return ServiceResult.NotFound<R>("Not Found");
        }
        if (error instanceof Error) {
            
            return ServiceResult.Failed<R>(String(error.message));
        }
        
        return ServiceResult.Failed<R>(String(error));
    };
}



export default HttpClient;