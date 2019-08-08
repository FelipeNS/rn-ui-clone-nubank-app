import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';

import {
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Title,
  Description,
  Annotation,
} from './styles';

export default function Main() {
  const { height } = Dimensions.get('window');

  let offset = 0;
  let opened = false;

  const translateY = new Animated.Value(0);

  const animatedEvent = new Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 200) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? height : 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? height : 0;
        translateY.setOffset(opened ? 0 : offset);
        translateY.setValue(opened ? offset : 0);
      });
    }
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => {
        Animated.timing(translateY, {
          toValue: opened ? 0 : height,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          offset = opened ? 0 : height;
          translateY.setOffset(opened ? offset : 0);
          translateY.setValue(opened ? 0 : offset);
          opened = !opened;
        });
      }}
      >
        <Header translateY={translateY} />
      </TouchableOpacity>

      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card style={{
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-350, 0, height],
                outputRange: [-50, 0, height],
                extrapolate: 'clamp',
              }),
            }],
          }}
          >
            <CardHeader>
              <IconFA name="coins" size={24} color="#666" />
              <TouchableOpacity onpress={() => {}}>
                <Icon name="visibility-off" size={28} color="#666" />
              </TouchableOpacity>
            </CardHeader>
            <CardContent>
              <Title>Saldo Disponível</Title>
              <Description>R$ 14.450,00</Description>
            </CardContent>
            <CardFooter>
              <Annotation>Transferênca de 200 reais recebida de Jhon Doe</Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>

      </Content>

      <Tabs translateY={translateY} />
    </Container>
  );
}
