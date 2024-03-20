import { useEffect, useState } from 'react';
import { version } from '../../../package.json';
import { AboutScreenProps } from './AboutScreenProps';
import { getDBConnection } from '../../Helpers/SqliteStorage/SqliteStorage';

const useAboutScreenVM = (props: AboutScreenProps) => {
  const [currentVersion, setVersion] = useState<string>('');
  const [dbConnection, setDBConnection] = useState<boolean>(false)

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setVersion(version);
  };

  const goBack = () => {
    props.navigation?.goBack();
  };

  const navigateTOSettings = () =>{
    props.navigation.navigate('Settings');
  }

  const method1 = async () => {
    method2()
  }
  const method2 = async () => {
    const dbInstance = await getDBConnection();
    if(dbInstance) {
      setDBConnection(true)
    } else {
      setDBConnection(false)
    }
  }

  return {currentVersion, goBack,method1,dbConnection,navigateTOSettings};
};

export default useAboutScreenVM;