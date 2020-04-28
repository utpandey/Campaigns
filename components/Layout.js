import React from 'react';
import Header from '../components/Header';
import {Container } from "semantic-ui-react";
import Head from 'next/head';

export default props => {
     return (
         <Container>
            <link
            rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">              
            </link>
            
             <Header />
             {props.children}
         </Container>
     );
};