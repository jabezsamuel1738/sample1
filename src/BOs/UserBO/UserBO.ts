export interface UserBO
{
    Id: number;
    CurrentDB: string;
    DB_Pwd: string;
    UserID: string;
    Name: string;
    BusinessUnitId: string;
    BusinessUnitName: string;
    Phone: string;
    Email: string;
    UniqueUserId: string;
    IsLoggedIn: boolean;
    Message: string;
    UploadChanges: boolean;
    DownloadLatest: boolean;
    IsModified: boolean;
    DeviceID: string;
    DownloadCount: number;
}
