import React, {useEffect, useState} from 'react';
import {SettingsScreenProps} from './SettingsScreenProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const useSettingsScreenVM = (props: SettingsScreenProps) => {
  const [upload, setupload] = useState<boolean>(false);
  const [downLoad, setdownLoad] = useState<boolean>(false);

  const moveToAbout = () => {
    props.navigation.navigate('AboutUs');
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const enableUpload = await AsyncStorage.getItem('enable-upload');

      if (enableUpload === 'true') {
        setupload(true);
      }

      const enableDownload = await AsyncStorage.getItem('enable-download');

      if (enableDownload === 'true') {
        setdownLoad(true);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const changeDownload = async () => {
    try {
      if (downLoad) {
        await AsyncStorage.removeItem('enable-download');
        setdownLoad(false);
      } else {
        await AsyncStorage.setItem('enable-download', 'true');
        setdownLoad(true);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const changeUpload = async () => {
    try {
      if (!upload) {
        await AsyncStorage.setItem('enable-upload', 'true');
        setupload(true);
      } else {
        await AsyncStorage.removeItem('enable-upload');
        setupload(false);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  return {
    moveToAbout,
    upload,
    setupload,
    downLoad,
    setdownLoad,
    changeDownload,
    changeUpload,
  };
};

export default useSettingsScreenVM;
