import React from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Top,
  Logo,
  Title,
} from './styles';
import logo from '~/assets/Nubank_Logo.png';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function Header({ translateY }) {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>Felipe Novais</Title>
      </Top>
      <AnimatedIcon
        style={{
          transform: [{
            rotateX: translateY.interpolate({
              inputRange: [0, 200],
              outputRange: ['0deg', '180deg'],
              extrapolate: 'clamp',
            }),
          }],
        }}
        name="keyboard-arrow-down"
        size={20}
        color="#FFF"
      />
    </Container>
  );
}
