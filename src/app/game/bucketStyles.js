import { animations, colors } from '_app/muiTheme';
import { toDecimalPlaces } from '_app/format';

const { transition, transitionSlow } = animations;
const { bucket: { backgroundColor, waterColor }, results: { checkColor } } = colors;
const maxSize = 6;
const minSize = 3;
const unitSizes = {
  image: 31,
  label: 6,
  labelMargin: 2,
  water: 25,
  waterTop: 3,
};

export function calcWaterUnits({ size, value }) {
  if (size > maxSize) return toDecimalPlaces(3, (maxSize / size) * value);
  else if (size < minSize) return toDecimalPlaces(3, (minSize / size) * value);
  else return value;
}

export default function createStyles({ props, state }) {
  const { isBig, size, style = {}, tipLeft, value } = props;
  const { showValue, tip, wins } = state;
  const bucketUnits = size > maxSize ? maxSize : (size < minSize ? minSize : size);
  const heightAdjustment = bucketUnits === minSize ? 1 : 1 + ((bucketUnits - minSize) * 0.5);
  const waterHeightAdjustment = bucketUnits === minSize ? 1 : ((bucketUnits - minSize) * 3);
  const calculated = {
    checkTop: -50 / heightAdjustment,
    imageHeight: bucketUnits * unitSizes.image,
    labelBottomMargin: bucketUnits * unitSizes.labelMargin * heightAdjustment,
    labelFontSize: bucketUnits * unitSizes.label,
    splashTop: -24 / heightAdjustment,
    waterHeight: (calcWaterUnits({ size, value }) * unitSizes.water) + waterHeightAdjustment,
    waterTopHeight: 40 + (bucketUnits * unitSizes.waterTop * heightAdjustment),
  };
  const splash = {
    height: 75,
    opacity: tip ? 0.6 : 0,
    position: 'absolute',
    top: calculated.splashTop,
    transition,
    width: 75,
    zIndex: 1000,
  };
  return {
    bucketContainer: {
      alignItems: 'flex-start',
      backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      height: calculated.imageHeight,
      position: 'relative',
      transition: transitionSlow,
      width: calculated.imageHeight,
    },
    check: {
      height: 48,
      width: 48,
      opacity: wins ? 1 : 0,
      position: 'absolute',
      right: -5,
      top: calculated.checkTop,
      transition,
      zIndex: 10,
    },
    checkColor,
    containerStyle: {
      position: 'relative',
      ...style,
    },
    imageStyle: {
      height: calculated.imageHeight,
      transition: transitionSlow,
      width: calculated.imageHeight,
      zIndex: 2,
    },
    inputContainerStyle: {
      backgroundColor: 'white',
      bottom: 0,
      position: 'absolute',
      textAlign: 'center',
      width: calculated.imageHeight,
      zIndex: 50,
    },
    inputStyle: {
      fontSize: 18,
      width: 100,
    },
    labelStyle: {
      bottom: 10,
      color: 'white',
      fontSize: calculated.labelFontSize,
      fontWeight: 'bold',
      marginBottom: calculated.labelBottomMargin,
      opacity: showValue ? 1 : 0,
      position: 'absolute',
      textAlign: 'center',
      transition,
      width: '90%',
      zIndex: 4,
    },
    splashLeft: {
      ...splash,
      left: -45,
    },
    splashRight: {
      ...splash,
      right: -30,
      transform: 'scaleX(-1)',
    },
    tipContainer: {
      position: 'relative',
      transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
      transition: transitionSlow,
      zIndex: isBig ? 2 : 1,
    },
    waterCoverStyle: {
      backgroundColor: 'white',
      height: 80,
      marginTop: 0,
      position: 'relative',
      width: '150%',
      zIndex: 20,
    },
    waterLevelStyle: {
      backgroundColor: waterColor,
      bottom: -18,
      height: calculated.waterHeight,
      opacity: 0.5,
      position: 'absolute',
      transition: transitionSlow,
      width: '95%',
      zIndex: 1,
    },
    waterLevelTopStyle: {
      backgroundColor: waterColor,
      borderRadius: '50%',
      height: calculated.waterTopHeight,
      position: 'absolute',
      top: -24,
      transition: transitionSlow,
      width: '95%',
      zIndex: 2,
    },
  };
}