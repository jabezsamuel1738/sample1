import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {forwardArrow} from '../../../Assets/Images/forwardArrow';
import {location} from '../../../Assets/Images/location';
import {ListRenderItemProps} from './ListRenderItemProps';
import {ListRenderItemStyles} from './ListRenderItemStyles';
import { noImage } from '../../../Assets/Images/ImageEmpty';
const ListrenderItem: FC<ListRenderItemProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={ListRenderItemStyles.mainContainer}>
      <View style={ListRenderItemStyles.imageContainer}>
        {item.ImageURL ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item.ImageURL}}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgXml xml={noImage} width={'50%'} height={'50%'} />
          </View>
        )}
      </View>
      <View style={ListRenderItemStyles.descriptionContainer}>
        <Text style={ListRenderItemStyles.title}>{item.ItemID}</Text>
        <Text
          style={ListRenderItemStyles.description}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.Description}
        </Text>
      </View>
      <View style={ListRenderItemStyles.trailingContiner}>
        <View style={ListRenderItemStyles.rowContainer}>
          <View style={ListRenderItemStyles.svgContainer}>
            <SvgXml xml={location} width="100%" height="100%" />
          </View>
          <Text style={ListRenderItemStyles.location}>{item.Location}</Text>
        </View>
        <View
          style={ListRenderItemStyles.rowContainer}
          hitSlop={ListRenderItemStyles.hitSlop}>
          <Text style={ListRenderItemStyles.buttonText}>View</Text>
          <View style={ListRenderItemStyles.arrowContainer}>
            <SvgXml xml={forwardArrow} width="100%" height="100%" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListrenderItem;
