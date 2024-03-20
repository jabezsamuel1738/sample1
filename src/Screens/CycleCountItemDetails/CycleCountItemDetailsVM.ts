import { useState, useEffect } from "react";
import { exceptionLogger } from "../../Helpers/AppCenterHelpers/AppCenterExceptionLogger";
import {
  getCycleDBConnection,
  updateItems,
} from "../../Helpers/CycleCountSqliteStorage/CycleCountSqliteStorage";
import { CycleCountItemDetailsProps } from "./CycleCountItemDetailsProps";
import { ItemDetailsBO } from "../../BOs/ItemDetailsBO/ItemDetailsBO";

const useCycleCountItemDetailsVM = (props: CycleCountItemDetailsProps) => {
  const [item, setItem] = useState<ItemDetailsBO>();
  const [count, setCount] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (props.route.params) {
      setItem(props.route.params.item);
    }
  };

  const navigateToAbout = async () => {
    props.navigation.navigate("AboutUs");
  };

  const navigateToSettings = async () => {
    props.navigation.navigate("Settings");
  };

  const goBack = async () => {
    props.navigation.goBack();
  };

  const updateInLocalDB = async () => {
    try {
      if (count) {
        const currentIteration = clicked + 1;
        setClicked(currentIteration);
        const db = await getCycleDBConnection();

        const actualCount = Number(item?.ActualCount) ?? 0;
        if (actualCount === Number(count) || currentIteration > 1) {
          const clonedItem = { ...item };
          if (clonedItem && clonedItem.ActualCount && clonedItem.Id) {
            clonedItem.Status = "Counted";
            clonedItem.Id = item?.Id;
            clonedItem.ActualCount = count;

            if (db) {
              const update = await updateItems(db, clonedItem);

              props.navigation.goBack();
            }
          }
        } else {
          setModalVisible(true);
        }
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      exceptionLogger(error);
    }
  };

  const okClicked = async () => {
    setModalVisible(false);
  };

  return {
    okClicked,
    goBack,
    updateInLocalDB,
    navigateToAbout,
    navigateToSettings,
    modalVisible,
    setModalVisible,
    item,
    count,
    setCount,
  };
};

export default useCycleCountItemDetailsVM;
