import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, limit, addDoc, serverTimestamp } from 'firebase/firestore';

function ChatRoom() {
  // Toujours appeler les hooks ici
  const messagesRef = collection(db, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(50));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  // Vérifier si l'utilisateur est connecté après avoir appelé les hooks
  const user = auth.currentUser;
  if (!user) {
    return <p>You need to be logged in to view the chat.</p>;
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  };

  return (
    <>
      <div className="ChatRoom">
        <div className="messages">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://i.pravatar.cc/300'} alt="User Avatar" />
      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
