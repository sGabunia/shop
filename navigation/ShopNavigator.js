import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {useSelector} from 'react-redux';
import {selectIsSignedIn} from '../features/user/authSlice';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import colors from '../constants/colors';

import CustomHeaderButton from '../components/ui/CustomHeaderButton';
import CustomBurgerButton from '../components/ui/CustomBurgerButton';
import CustomAddButton from '../components/ui/CustomAddButton';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthScreen from '../screens/user/AuthScreen';
import CreateAccountScreen from '../screens/user/CreateAccountScreen';

const Stack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ShopStackNavigator = () => {
  const isSignedIn = useSelector(selectIsSignedIn);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
        },
        headerStyle: {backgroundColor: colors.accent},
        headerTitleAlign: 'center',
      }}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Products"
            component={ProductsOverviewScreen}
            options={{
              title: 'All Products',
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
              headerTitleAlign: 'center',
              headerRight: () => {
                return <CustomHeaderButton />;
              },
            })}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Sign In" component={AuthScreen} />
          <Stack.Screen name="Create Account" component={CreateAccountScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.accent},
        headerTitleAlign: 'center',
      }}>
      <UserStack.Screen
        name="Your Products"
        component={UserProductsScreen}
        options={{
          title: 'Your Product',
          headerLeft: () => <CustomBurgerButton />,
          headerRight: () => <CustomAddButton />,
        }}
      />
      <UserStack.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={({route}) => {
          return {
            title: route.params ? 'Edit Product' : 'Add Product',
          };
        }}
      />
    </UserStack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.accent},
          headerTitleAlign: 'center',
        }}>
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
          name="Admin"
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
