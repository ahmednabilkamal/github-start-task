import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import { Repos } from '../screens';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/actions/action';
import { useTheme } from '../hooks/useTheme';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Repos">
        <Stack.Screen
          name="Repos"
          component={Repos}
          options={{
            title: 'GitHub Top Repos',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => dispatch(toggleTheme())}
                style={{ paddingRight: 10 }}
              >
                <Icon
                  name={theme === 'light' ? 'moon' : 'sun'}
                  type="feather"
                  color={'black'}
                  size={22}
                  onPress={() => dispatch(toggleTheme())}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
