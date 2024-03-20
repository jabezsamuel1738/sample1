import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {AppState} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  FetchScannedBarcodeItem,
  getCycleDBConnection,
} from '../../Helpers/CycleCountSqliteStorage/CycleCountSqliteStorage';
import {
  getDBConnection,
  readBarCodeListItemDetails,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {ScanScreenProps} from './ScanScreenProps';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const useScanScreenVM = (props: ScanScreenProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isCameraActive, setCameraActive] = useState<boolean>(false);

  const device = useCameraDevice('back');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      try {
        const subscription = AppState.addEventListener('change', state => {
          if (state === 'active') {
            const permission = Camera.getCameraPermissionStatus();
            if (permission === 'granted') {
              setCameraActive(true);
            } else {
              setCameraActive(false);
            }
          }
        });
        if (!hasPermission) {
          request();
        } else {
          setCameraActive(true);
        }
        return () => {
          subscription.remove();
        };
      } catch (error) {
        exceptionLogger(error);
      }
    }, [hasPermission]),
  );

  const request = async () => {
    try {
      const request = await requestPermission();

      if (request.valueOf() || hasPermission) {
        setCameraActive(true);
      } else {
        setCameraActive(false);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: [
      'ean-13',
      'code-128',
      'code-39',
      'code-93',
      'ean-8',
      'pdf-417',
      'upc-e',
      'itf',
    ],
    onCodeScanned: async codes => {
      try {
        setIsFetching(true);

        if (codes.length !== 0) {
          const qrValue = Number(codes[0].value);

          const instance = await AsyncStorage.getItem('choosed-option');

          if (instance === 'Cycle') {
            const db = await getCycleDBConnection();

            if (db) {
              const result = await FetchScannedBarcodeItem(
                db,
                qrValue.toString(),
              );

              if (result) {
                props.navigation.navigate('CycleCountDetail', {item: result});
              }
            }
          } else {
            const db = await getDBConnection();
            if (db) {
              const result = await readBarCodeListItemDetails(
                db,
                qrValue.toString(),
              );
              if (result && result?.length !== 0) {
                props.navigation.navigate('Detail', result[0]);
              }
            }
          }
        }
      } catch (error) {
        exceptionLogger(error);
      }
    },
  });
  return {
    hasPermission,
    requestPermission,
    isCameraActive,
    setCameraActive,
    isFetching,
    setIsFetching,
    device,
    request,
    codeScanner,
  };
};

export default useScanScreenVM;
