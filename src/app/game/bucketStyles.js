import { animations, colors } from '_app/muiTheme';

const { transition, transitionSlow } = animations;
const { bucket: { backgroundColor, water }, results: { checkColor } } = colors;
const minSize = 2;
const maxSize = 6;

export default function createStyles({ props, state }) {
  const { size, style = {}, tipLeft, value } = props;
  const { showValue, tip, wins } = state;
  const values = (() => {
    const bucketSize = size > maxSize ? maxSize : (size < minSize ? minSize : size);
    const bucketValue = value > maxSize ? maxSize : value;
    const imageSize = 40 + (bucketSize * 30);
    const waterLevelMod = size > maxSize ? (value / size) : (size < minSize ? (value * bucketSize) : 1);
    return {
      bucketSize,
      fontSize: (bucketSize * 6) + 5,
      imageSize,
      waterLevel: ((bucketValue * waterLevelMod) / bucketSize) * (imageSize - 5),
    };
  })();
  const splash = {
    height: 75,
    opacity: tip ? 0.6 : 0,
    position: 'absolute',
    top: -5,
    transition,
    width: 75,
    zIndex: 6,
  };
  return {
    bucketContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      zIndex: 3,
    },
    bucketCover: {
      backgroundColor: 'white',
      height: 100,
      marginTop: -5,
      width: '100%',
    },
    check: {
      height: 48,
      width: 48,
    },
    checkColor,
    checkContainer: {
      opacity: wins ? 1 : 0,
      position: 'absolute',
      right: -4,
      top: -20,
      transition,
      zIndex: 10,
    },
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    },
    imageContainer: {
      backgroundColor,
      height: values.imageSize,
      position: 'relative',
      transform: tip ? `rotate(${tipLeft ? -25 : 25}deg)` : 'none',
      transition: transitionSlow,
      width: values.imageSize,
    },
    imageStyle: {
      height: '100%',
      width: '100%',
    },
    inputContainerStyle: {
      backgroundColor: 'white',
      textAlign: 'center',
      width: values.imageSize,
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
    valueStyle: {
      bottom: 10,
      color: 'white',
      fontSize: values.fontSize,
      fontWeight: 'bold',
      marginBottom: (values.bucketSize * 3) - 2,
      opacity: showValue ? 1 : 0,
      position: 'absolute',
      textAlign: 'center',
      transition,
      width: '90%',
      zIndex: 4,
    },
    waterStyle: {
      backgroundColor: water,
      bottom: -2,
      height: values.waterLevel * 0.81,
      margin: '0 5px',
      opacity: 0.5,
      position: 'absolute',
      transition: transitionSlow,
      width: '90%',
      zIndex: 1,
    },
    waterTopStyle: {
      backgroundColor: water,
      borderRadius: '50%',
      height: 40 + (values.waterLevel * 0.2),
      position: 'absolute',
      top: -12 - (values.waterLevel * 0.04),
      width: '100%',
      zIndex: 2,
    },
  };
}