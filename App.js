import 'react-native-gesture-handler';
import React from 'react';
import Firebase, {FirebaseProvider} from './Firebase';
import Initial from './Application/Views/initial';

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <Initial />
    </FirebaseProvider>
  );
}
