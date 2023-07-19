import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import { useSelector } from 'react-redux';
import TabBar from '../components/Layout/TabBar';
import Signin from '../screens/Signin';
import Register from '../screens/Register';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import Profile from '../screens/Profile';
import TransferMethod from '../screens/TransferMethod';

type RootStackParamList = {
    HomeScreen: undefined;
    Cart: undefined;
    Profile: undefined;
    Product: {
      product: string | undefined;
    };
    TransferMethod: undefined;
};

type AuthStackParamList = {
    Main: undefined;
    Signin: undefined;
    Signup: undefined;
    Reset: undefined;
    Validation: undefined;
    Change: undefined;
    Photo: undefined;
    UserType: undefined;
    Preferences: undefined;
    VerifyAge: undefined;
  };

const HomeStackNavigator = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="HomeScreen" component={Home} />
      <HomeStackNavigator.Screen name="Product" component={Product} />
      <HomeStackNavigator.Screen name="TransferMethod" component={TransferMethod} />
    </HomeStackNavigator.Navigator>
  );
};




const Tab = createBottomTabNavigator();
const Auth = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
    return (
        <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen
        name="Signin"
        component={Signin}
        options={{
          presentation: 'card',
          animationTypeForReplace: 'push',
        }}
      />
       <Auth.Screen
        name="Signup"
        component={Register}
        options={{
          presentation: 'card',
          animationTypeForReplace: 'push',
        }}
      />
    </Auth.Navigator>
    )
}

export const AppNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props: any) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };
  

  export const NavigatorContainer = () => {
    const {user} = useSelector((state: any) => state.auth);
    return <>{user?.token ? <AppNavigator /> : <AuthNavigator />}</>;
  };