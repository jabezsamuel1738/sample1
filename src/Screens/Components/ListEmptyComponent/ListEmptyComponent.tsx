import React, {FC} from 'react';
import {ListEmptyComponentStyle} from './ListEmptyComponentStyles';
import {View, Text, ViewStyle} from 'react-native';

export interface ListEmptyComponentPropsBO {
  style?: any;
}

export const ListEmptyComponent: FC<ListEmptyComponentPropsBO> = props => {
  return (
    <View
      style={[
        ListEmptyComponentStyle.container,
        props.style ? props.style : {},
      ]}>
      <Text style={ListEmptyComponentStyle.text}>No items to display</Text>
    </View>
  );
};
