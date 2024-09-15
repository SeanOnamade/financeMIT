import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1976D2;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 25px;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Made with Love @ HackMIT2024 by Sean Onamade, Osasikemwen Ogieva, Chris Ojo, and Pranav Varma 💪💪</FooterText>
    </FooterContainer>
  );
};

export default Footer;