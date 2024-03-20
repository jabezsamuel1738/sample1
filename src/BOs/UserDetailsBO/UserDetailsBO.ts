export interface UserDetailsBO {
    Id: number;
    UserID: string;
    Name: string;
    Password: string;
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
    CurrentDB: string;
    DownloadCount: number;
    DB_Pwd: string;
  }
  