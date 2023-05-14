import {Dimensions, PixelRatio, Platform} from 'react-native';

export const getFontSizeByWindowWidth = (fontSize: number) => {
  const baseWidth = Platform.OS === 'ios' ? 380 : 400;
  return PixelRatio.roundToNearestPixel(
    fontSize * (Dimensions.get('screen').width / baseWidth),
  );
};
