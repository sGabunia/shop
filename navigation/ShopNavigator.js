import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import colors from '../constants/colors';

import CustomHeaderButton from '../components/ui/CustomHeaderButton';
import CustomBurgerButton from '../components/ui/CustomBurgerButton';
import CustomEdditButton from '../components/ui/CustomEdditButton';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerTitleStyle: {fontFamily: 'OpenSans-Bold'}}}>
      <Stack.Screen
        name="Products"
        component={ProductsOverviewScreen}
        options={{
          title: 'All Products',
          headerStyle: {backgroundColor: colors.accent},
          headerTitleAlign: 'center',
          headerRight: () => {
            return <CustomHeaderButton />;
          },
          headerLeft: () => {
            return <CustomBurgerButton />;
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
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Your Products"
        component={UserProductsScreen}
        options={{
          title: 'Your Product',
          headerLeft: () => <CustomBurgerButton />,
          headerRight: () => <CustomEdditButton />,
          headerTitleAlign: 'center',
        }}
      />
      <UserStack.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={({route}) => {
          return {
            title: route.params ? 'Edit Product' : 'Add Product',
            headerRight: () => <MaterialIcons name="check" size={24} />,
          };
        }}
      />
    </UserStack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="All Products"
          component={ShopStackNavigator}
          options={{
            headerShown: false,
            drawerIcon: () => <MaterialIcons name="shopping-cart" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            drawerIcon: () => <MaterialIcons name="list" size={20} />,
          }}
        />
        <Drawer.Screen
          name="User Products"
          component={UserNavigator}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <MaterialIcons name="admin-panel-settings" size={20} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
