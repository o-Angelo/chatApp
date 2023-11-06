import logo from './logo.svg';
import './App.css';

import { 
  apiKeyP, 
  authDomainP, 
  projectIdP, 
  storageBucketP, 
  messagingSenderIdP, 
  appIdP, 
  measurementIdP 
} from './key';

// firebase sdk
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// hooks do firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: apiKeyP,
  authDomain: authDomainP,
  projectId: projectIdP,
  storageBucket: storageBucketP,
  messagingSenderId: messagingSenderIdP,
  appId: appIdP,
  measurementId: measurementIdP
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header></header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;
