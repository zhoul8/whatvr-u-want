
import { useEffect, useState } from 'react';
import { db, auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, setDoc, getDoc} from 'firebase/firestore';



function App() {

  const [apiData, setApiData] = useState('');
  const [apiData1, setApiData1] = useState('');
  const [apiData2, setApiData2] = useState('');
  const [apiData3, setApiData3] = useState('');



  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setApiData(data.message); // "message" is the field of the image URL
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };
  
  const fetchJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
      const data = await response.json();
      setApiData1(data.setup); // "message" is the field of the image URL
      setApiData2(data.delivery);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setApiData3(data.advice); // "message" is the field of the image URL
    } catch (error) {
      console.error(error);
    }
  };
  
  // Track logged-in user
  const [user, setUser] = useState(null);

  // Profile fields for editing
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');

  // Message input and stored messages
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If user is logged in, load their profile and messages
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNickname(data.nickname || '');
          setAge(data.age || '');
        }
        fetchMessages();
      }
    });

    return () => unsubscribe();
  }, []);

  // Google sign-in
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setNickname('');
      setAge('');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Save nickname and age to Firestore
  const handleSaveProfile = async () => {
    if (!nickname || !age) {
      alert('Please enter both nickname and age');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      nickname,
      age,
      email: user.email
    });

    alert('Profile saved!');
  };

  // Get messages from Firestore
  const fetchMessages = async () => {
    const snapshot = await getDocs(collection(db, 'messages'));
    const list = snapshot.docs.map(doc => doc.data());
    setMessages(list);
  };

  // Submit a new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text: input,
      name: nickname || user.displayName,
      timestamp: Date.now()
    });

    setInput('');
    fetchMessages();
  };


  // UI rendering
  return (
    <div>
      <h1>Firebase + React App</h1>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
{apiData && <img src={apiData} alt="Random Dog" />}

<button onClick={fetchJoke}>Fetch joke</button>
{apiData1 && <p>{apiData1}</p>}
{apiData2 && <p>{apiData2}</p>}

<button onClick={fetchAdvice}>Fetch advice</button>
{apiData3 && <h1>{apiData3}</h1>}


      {user ? (
        <div>
          <h2>Hello, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>

          <h3>Edit Profile</h3>
          <input
            placeholder="Nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
          <button onClick={handleSaveProfile}>Save Profile</button>

          <h3>Send Message</h3>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter your message"
          />
          <button onClick={sendMessage}>Send</button>

          <h3>Messages</h3>
          <ul>
            {messages.map((msg, i) => (
              <li key={i}>
                <strong>{msg.name || 'Anon'}:</strong> {msg.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Please log in with Google to continue.</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;