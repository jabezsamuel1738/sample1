import {FC} from 'react';
import Toast from 'react-native-toast-message';
import {Text, TouchableOpacity, View} from 'react-native';
import {ToastComponentStyle} from './ToastComponentStyle';
import {SvgXml} from 'react-native-svg';
import {cancel} from '../../../Assets/Images/cancel';
import React from 'react';
import { BlackColor } from '../../../Helpers/Constants/Colors';

const ToastComponent = () => {
  return (
    <Toast
      config={{
        tomatoToast: ({text1, props}) => {
          return (
            <View style={ToastComponentStyle.container}>
              <View style={ToastComponentStyle.iconContainer}>
                <SvgXml xml={props.icon} width="100%" height="100%" />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[ToastComponentStyle.message, {color: BlackColor}]}>
                  {text1}
                </Text>
              </View>
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                style={ToastComponentStyle.cancelContainer}
                onPress={props.cancelCallback}>
                <SvgXml xml={cancel} />
              </TouchableOpacity>
            </View>
          );
        },
      }}
    />
  );
};

export default ToastComponent;
