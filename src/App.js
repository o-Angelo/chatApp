import './App.css';

// import {
//   apiKeyP,
//   authDomainP,
//   projectIdP,
//   storageBucketP,
//   messagingSenderIdP,
//   appIdP,
//   measurementIdP
// } from './key';

// firebase sdk
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// hooks do firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState } from 'react';

firebase.initializeApp({
  // apiKey: apiKeyP,
  // authDomain: authDomainP,
  // projectId: projectIdP,
  // storageBucket: storageBucketP,
  // messagingSenderId: messagingSenderIdP,
  // appId: appIdP,
  // measurementId: measurementIdP
  apiKey: "AIzaSyCeI1MMv_jy7KXb4OAneWPVzpuecs952Mg",
  authDomain: "chatapp-d3db9.firebaseapp.com",
  projectId: "chatapp-d3db9",
  storageBucket: "chatapp-d3db9.appspot.com",
  messagingSenderId: "888414912803",
  appId: "1:888414912803:web:f3a82dfe7fa6b6c7668c96",
  measurementId: "G-R6KSXZYKF4"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }


  return (
    <button onClick={signInWithGoogle}>Entrar com Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sair</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('mensagens');
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} messages={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Enviar</button>
      </form>
    </>
  )

}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.messages;

  const messageClass = uid === auth.currentUser.uid ? 'enviada' : 'recebida'

  return (
    <div className={`messege ${messageClass}`}>
      <img src={photoURL} alt='User' />
      <p>{text}</p>
    </div>
  )
  // return <p>oi</p>
}


function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;
