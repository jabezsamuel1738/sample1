import {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {failure} from '../../Assets/Images/failure';
import {success} from '../../Assets/Images/success';
import {ItemBO} from '../../BOs/ItemBO/ItemBO';
import {
  currentUserInfo,
  getDBConnection,
  updateItems,
} from '../../Helpers/SqliteStorage/SqliteStorage';
import {ItemDetailScreenProps} from './ItemDetailScreenProps';
import {useFocusEffect} from '@react-navigation/native';
import {exceptionLogger} from '../../Helpers/AppCenterHelpers/AppCenterExceptionLogger';

const useItemDetailScreenVM = ({navigation, route}: ItemDetailScreenProps) => {
  const [adjustmentDataState, setAdjustmentDataState] = useState<string>('');
  const [reasonState, setReasonState] = useState<string>('');
  const [documentState, setDocumentState] = useState<string>('');
  const [quantityState, setQuantityState] = useState<string>('');
  const adjustmentData = [
    {label: 'Increase Inventory', value: 'I'},
    {label: 'Decrease Inventory', value: 'D'},
  ];
  const reason = [{label: 'COUNTERROR'}, {label: 'MISMATCH'}];

  useFocusEffect(
    useCallback(() => {
      setAdjustmentDataState(route.params.AdjustmentType);
      setReasonState(route.params.Reason);
      setDocumentState(route.params.Document);
      setQuantityState(
        route.params.QTY.trim() === '0' || route.params.QTY === ''
          ? ''
          : route.params.QTY,
      );
    }, []),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const updateTapped = async () => {
    try {
      const db = await getDBConnection();
      if (db) {
        const user = await currentUserInfo(db);
        if (user !== null) {
          const regex: RegExp = /^(\d+)(\.\d{1,2})?$/;
          if (!regex.test(quantityState)) {
            Toast.show({
              autoHide: true,
              position: 'bottom',
              type: 'tomatoToast',
              text1: 'Enter the valid Item Count !',
              props: {
                icon: failure,
                cancelCallback: cancelToast,
              },
            });
          } else if (
            quantityState.trim() === '' ||
            parseFloat(quantityState.trim()) < 0
          ) {
            Toast.show({
              autoHide: true,
              position: 'bottom',
              type: 'tomatoToast',
              text1: 'Quantity should be greater than 0',
              props: {
                icon: failure,
                cancelCallback: cancelToast,
              },
            });
          } else {
            if (reasonState === null) {
              Toast.show({
                autoHide: true,
                position: 'bottom',
                type: 'tomatoToast',
                text1: 'Select any reasons... !',
                props: {
                  icon: failure,
                  cancelCallback: cancelToast,
                },
              });
            } else if (adjustmentDataState === null) {
              Toast.show({
                autoHide: true,
                position: 'bottom',
                type: 'tomatoToast',
                text1: 'Select any adjustment type... !',
                props: {
                  icon: failure,
                  cancelCallback: cancelToast,
                },
              });
            } else if (
              adjustmentDataState === 'D' &&
              parseFloat(route.params.QTY) <= parseFloat(quantityState)
            ) {
              Toast.show({
                autoHide: true,
                position: 'bottom',
                type: 'tomatoToast',
                text1: 'Count must be greater than actual',
                props: {
                  icon: failure,
                  cancelCallback: cancelToast,
                },
              });
            } else {
              const isQuantity: boolean = quantityCheck(route.params);
              if (isQuantity) {
                let obj: ItemBO = {...route.params};
                obj.LockedTo = user.UserID;
                obj.Document = documentState !== '' ? documentState : '';
                obj.Status = 'Counted';
                obj.AdjustmentType = adjustmentDataState;
                obj.Reason = 'COUNTERROR';
                obj.QTY = quantityState;
                const currentDate = new Date();

                const formatter = new Intl.DateTimeFormat('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                });
                const parts = formatter.formatToParts(currentDate);

                const formattedDate = `${parts[6].value}-${parts[4].value}-${parts[0].value} ${parts[2].value}:${parts[8].value}:${parts[10].value} ${parts[12].value}`;
                obj.LastUpdated = formattedDate;

                const response = await updateItems(db, obj, user);
                if (response) {
                  Toast.show({
                    autoHide: true,
                    position: 'bottom',
                    type: 'tomatoToast',
                    text1: 'Item updated..',
                    props: {
                      icon: success,
                      cancelCallback: cancelToast,
                    },
                  });
                  goBack();
                } else {
                  Toast.show({
                    autoHide: true,
                    position: 'bottom',
                    type: 'tomatoToast',
                    text1: 'Item not updated, Error occured',
                    props: {
                      icon: failure,
                      cancelCallback: cancelToast,
                    },
                  });
                }
              } else {
                Toast.show({
                  autoHide: true,
                  position: 'bottom',
                  type: 'tomatoToast',
                  text1: "Quantity entered should'nt be greater than available",
                  props: {
                    icon: failure,
                    cancelCallback: cancelToast,
                  },
                });
              }
            }
          }
        }
      }
    } catch (error) {
      Toast.show({
        autoHide: true,
        position: 'bottom',
        type: 'tomatoToast',
        text1: 'Item not updated, Error occured',
        props: {
          icon: failure,
          cancelCallback: cancelToast,
        },
      });
      exceptionLogger(error);
    }
  };

  const quantityCheck = (item: ItemBO): boolean => {
    try {
      if (adjustmentDataState === 'I') {
        return true;
      } else {
        const currQty = parseFloat(item.QTY);
        if (parseFloat(quantityState) > currQty) {
          return false;
        } else {
          return true;
        }
      }
    } catch (error) {
      exceptionLogger(error);
      return false;
    }
  };

  const cancelToast = () => {
    Toast.hide();
  };

  return {
    adjustmentData,
    adjustmentDataState,
    setAdjustmentDataState,
    reasonState,
    reason,
    setReasonState,
    documentState,
    setDocumentState,
    quantityState,
    setQuantityState,
    goBack,
    updateTapped,
  };
};

export default useItemDetailScreenVM;
