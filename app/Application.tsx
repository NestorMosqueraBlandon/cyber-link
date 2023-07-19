import { View } from "./components/Themed"
import { Text } from 'react-native'
import { Provider } from 'react-redux';
import { persistor, store } from "./src/store";
import { NavigatorContainer } from "./src/navigation/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";
import {NavigationContainer} from '@react-navigation/native';

const Application = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <NavigationContainer>
                    <NavigatorContainer />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default Application