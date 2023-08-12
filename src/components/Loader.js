import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';

const Loader = ({visible}) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={{width: 100, height: 100}}
      speed={1}
      source={require('../assets/loader.json')}
    />
  );
};
export default Loader;
