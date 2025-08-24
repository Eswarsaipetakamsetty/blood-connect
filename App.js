import { StatusBar } from 'react-native';
import RootNavigator from './app/navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from './app/context/AuthProvider';
import UsersProvider from './app/context/UsersProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <AuthProvider>
        <UsersProvider>
          <RootNavigator />
        </UsersProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
