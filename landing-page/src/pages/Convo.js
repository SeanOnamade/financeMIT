import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ConvoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 650px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fffffe;
`;

const ConvoTitle = styled.h2`
  text-align: center;
  padding: 15px;
  margin: 0;
  font-size: 30px;
  background-color: #6495ED;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 10px 0;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isUser ? '#E3F2FD' : '#F5F5F5'};
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

  &:hover {
    background-color: #45a049;
  }
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
`;

function Convo() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage = { text: inputMessage, isUser: true };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputMessage('');
      
      // Simulate API call with 2-second delay
      setTimeout(() => {
        const apiResponse = { text: "This is a placeholder response from the API.", isUser: false };
        setMessages(prevMessages => [...prevMessages, apiResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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