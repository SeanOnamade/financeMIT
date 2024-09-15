import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1976D2;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 100px;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Made with love at HackMIT 2024 by Sean Onamade, Osasikemwen Ogieva, Chris Ojo, and Pranav Varma 💪💪</FooterText>
    </FooterContainer>
  );
};

export default Footer;