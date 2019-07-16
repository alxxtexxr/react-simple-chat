import React, { useState } from 'react';
import socketIoClient from 'socket.io-client/dist/socket.io';

/* Import Components */
// import Messages from './components/messages/Messages';

const App = () => {
  const socket = socketIoClient('http://localhost:4000');
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    message: '',
  })

  socket.on('sendMessage', (message) => {
    setMessages([
      ...messages,
      message,
    ]);
  });

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
  };

  const resetForm = () => {
    setForm({
      message: "",
    })
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sendMessage(form.message);

    resetForm();
  };

  return (
    <div className="App">
      <ul>
        {messages.length ? messages.map((message, key) => (
          <li key={key}>
            {message}
          </li>
        )) : null}
      </ul>
      <hr/>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="text" 
          name="message" 
          id="message" 
          placeholder="Type your message here..." 
          value={form.message} 
          onChange={(e) => changeHandler(e)}
        />
        <button>
          SEND
        </button>
      </form>

      <br/>

      <pre>
        {JSON.stringify(form)}
      </pre>
    </div>
  );
};

export default App;
