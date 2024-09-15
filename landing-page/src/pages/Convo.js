import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ConvoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 650px;
  // border: 1px solid #ccc; delete for now?
  border-radius: 15px;
  // background-color: rgb(255, 255, 254, 0.3);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 1px );
`;

const ConvoTitle = styled.h2`
  text-align: center;
  padding: 15px;
  margin: 0;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  background-color: #6495ED;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 10px 0;
  text-align: left;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isUser ? '#E3F2FD' : '#E5E7EB'}; // before was F5F5F5
  color: ${props => props.isUser ? '#000000' : '#000000'};
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 60%;
  word-wrap: break-word;
`;

const MessageInput = styled.input`
  width: 80%;
  padding: 12px;
  margin-right: 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
`;

const SendButton = styled.button`
  padding: 12px 25px;
  background-color: #6495ED;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.15s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgb(243, 244, 246, 0.6);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  // border-top: 1px solid #ccc;
  // background-color: #fff;
  background-color: rgb(255, 255, 254, 0.6);
  flex-direction: row;
  justify-content: space-evenly;
  border-radius: 20px;
  margin-bottom: 10px;
`;

function Convo() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage = { text: inputMessage, isUser: true };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputMessage('');
      const data = await fetchData(inputMessage);
      
      // Simulate API call with 2-second delay
      setTimeout(() => {
        console.log('Data from server:', data);
        const apiResponse = { text: data["choices"][0]["message"]["content"], isUser: false };
        setMessages(prevMessages => [...prevMessages, apiResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      try {
        handleSubmit();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const fetchData = async (key) => {
    const response = await fetch(`http://127.0.0.1:5000/ask/${key}`, {
      method: 'GET',
    });
    console.log(response);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log('Response from server:', data);
    return data;
  };

  const printMessage = (message) => {
    return (
      <MessageContainer isUser={message.isUser}>
        <MessageBubble isUser={message.isUser}>
          {message.text}
        </MessageBubble>
      </MessageContainer>
    );
  };

  useEffect(() => {
    // Scroll to bottom of message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ConvoContainer>
      <ConvoTitle>Rocket Chat Live  🚀</ConvoTitle>
      <MessageList ref={messageListRef}>
        {messages.map((message, index) => (
          <div key={index}>{printMessage(message)}</div>
        ))}
      </MessageList>
      <InputArea>
        <MessageInput 
          type="text" 
          value={inputMessage} 
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSubmit}>Send</SendButton>
      </InputArea>
    </ConvoContainer>
  );
}

export default Convo;