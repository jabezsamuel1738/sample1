import { HttpStatus } from "../../Constants/Enums";

export class ServiceResult<T> {
    data: T | null;
    status: HttpStatus;
    message: string;

    constructor(data: T | null, status: HttpStatus, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public static Success<G>(data: G): ServiceResult<G> {

        return new ServiceResult<G>(data, HttpStatus.Success, "Got response from API");
    }

    public static Failed<G>(message: string, data?:G): ServiceResult<G> {

        return new ServiceResult<G>(data !== undefined ? data : null, HttpStatus.Failed, message);
    }

    public static UnAuthorised<G>(message: string): ServiceResult<G> {

        return new ServiceResult<G>(null, HttpStatus.UnAuthorised, message);
    }

    public static Conflict<G>(message: string): ServiceResult<G> {

        return new ServiceResult<G>(null, HttpStatus.Conflict, message);
    }

    public static NotFound<G>(message: string): ServiceResult<G> {
        
        return new ServiceResult<G>(null, HttpStatus.NotFound, message);
    }
}