import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import colors from '../constants/colors';
import {Text} from 'react-native';
import CustomHeaderButton from '../components/ui/CustomHeaderButton';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerTitleStyle: {fontFamily: 'OpenSans-Bold'}}}>
        <Stack.Screen
          name="Products"
          component={ProductsOverviewScreen}
          options={{
            headerStyle: {backgroundColor: colors.accent},
            headerRight: () => {
              return <CustomHeaderButton />;
            },
          }}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={({route}) => ({
            title: route.params.title,
            headerStyle: {backgroundColor: colors.accent},
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
