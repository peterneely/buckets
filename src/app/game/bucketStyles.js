import { animations, colors } from '_app/muiTheme';

const { transition, transitionSlow } = animations;
const { bucket: { backgroundColor, water }, results: { checkColor } } = colors;
const maxSize = 6;
const unitSizes = {
  image: 31,
  label: 6,
  labelMargin: 2,
  water: 24.5,
  waterTop: 3,
};

export const calcWaterUnits = ({ size, value }) => size <= maxSize ? value : parseFloat(((maxSize / size) * value).toFixed(3));

export default function createStyles({ props, state }) {
  const { isBig, size, style = {}, tipLeft, value } = props;
  const { showValue, tip, wins } = state;
  const bucketUnits = size > maxSize ? maxSize : size;
  const sizes = {
    image: bucketUnits * unitSizes.image,
    waterLevelLabel: bucketUnits * unitSizes.label,
    waterLevelLabelMargin: bucketUnits * unitSizes.labelMargin,
    waterLevel: calcWaterUnits({ size, value }) * unitSizes.water,
    waterTopLevel: 40 + (bucketUnits * unitSizes.waterTop),
  };
  const splash = {
    height: 75,
    opacity: tip ? 0.6 : 0,
    position: 'absolute',
    top: -5,
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
      height: sizes.image,
      position: 'relative',
      // transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
      // transition: transitionSlow,
      width: sizes.image,
      // alignItems: 'flex-start',
      // display: 'flex',
      // flexDirection: 'column',
      // height: sizes.image + 100,
      // position: 'absolute',
      // width: '100%',
      // zIndex: 3,
    },
    // bucketCover: {
    //   backgroundColor: 'white',
    //   height: 100,
    //   width: '100%',
    // },
    check: {
      height: 48,
      width: 48,
      opacity: wins ? 1 : 0,
      position: 'absolute',
      right: -4,
      top: -20,
      transition,
      zIndex: 10,
    },
    checkColor,
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    },
    // imageContainer: {
    //   // alignItems: 'flex-start',
    //   // backgroundColor: 'white',
    //   // display: 'flex',
    //   // flexDirection: 'column',
    //   // height: sizes.image + 100,
    //   // position: 'relative',
    //   transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
    //   transition: transitionSlow,
    //   width: sizes.image,
    // },
    imageStyle: {
      height: sizes.image,
      width: sizes.image,
      zIndex: 2,
    },
    inputContainerStyle: {
      backgroundColor: 'white',
      position: 'relative',
      textAlign: 'center',
      width: sizes.image,
      zIndex: 5,
    },
    inputStyle: {
      fontSize: 18,
      width: 100,
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
      transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
      transition: transitionSlow,
      zIndex: isBig ? 2 : 1,
    },
    valueStyle: {
      bottom: 10,
      color: 'white',
      fontSize: sizes.waterLevelLabel,
      fontWeight: 'bold',
      marginBottom: sizes.waterLevelLabelMargin,
      opacity: showValue ? 1 : 0,
      position: 'absolute',
      textAlign: 'center',
      transition,
      width: sizes.image,
      zIndex: 4,
    },
    // waterContainerStyle: {
    //   height: sizes.waterLevel + sizes.waterTopLevel,
    //   position: 'absolute',
    //   bottom: 0,
    //   width: '100%',
    // },
    waterLevelStyle: {
      backgroundColor: water,
      bottom: 0,
      height: sizes.waterLevel,
      // margin: '0 5px',
      opacity: 0.5,
      position: 'absolute',
      transition: transitionSlow,
      width: sizes.image,
      zIndex: 1,
    },
    waterLevelTopStyle: {
      backgroundColor: 'blue',
      borderRadius: '50%',
      height: sizes.waterTopLevel,
      position: 'absolute',
      top: -12, // - (sizes.waterLevel * 0.04),
      width: sizes.image,
      zIndex: 2,
    },
    // waterStyle: {
    //   position: 'relative',
    // },
  };
}