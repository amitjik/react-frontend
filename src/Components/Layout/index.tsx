import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from '../../Home'
import { Layout } from 'antd';
import HeaderNav from './../HeaderNav';
import HeaderTop from './../HeaderTop';

import RoutesPage from './../../Routes';
import './style.css';

const { Content, Footer } = Layout;

interface PageLayoutInterface {
  handleLogout: () => void;
}

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

const PageLayout = ({handleLogout}: PageLayoutInterface) => {
  const navigate = useNavigate();

  const [collapsedSlide, setCollapsedSlide] = useState(false)
  const [selectedApp, setSelectedApp] = useState('DASHBOARD')
  const handleSelectApp = (app:string) => {
    setSelectedApp(app)
    if(app === 'PAXINVOICING-CODE-SHARE'){
      navigate('/pax-invoicing-code-share/invoice/invoice-approve')
    }else if(app === 'PAXINVOICING-NON-CODE-SHARE'){
      navigate('/pax-invoicing-non-code-share/invoice/invoice-approve')
    }
    // if(app === 'PAXINVOICING'){
    //   navigate('/pax-invoicing/invoice/invoice-approve')
    // }
  }
  useEffect(() => {
    geturl()
  }, [])

  const geturl = () => {
    const value =  window.location.pathname.split('/')[1]
    switch(value) {
      case 'pax-invoicing-code-share':
        setSelectedApp('PAXINVOICING-CODE-SHARE')
        break;
      case 'pax-invoicing-non-code-Share':
        setSelectedApp('PAXINVOICING-NON-CODE-SHARE')
       break;
      case 'COPSINVOICING':
        setSelectedApp('COPSINVOICING')
        break;
      default:
        setSelectedApp('DASHBOARD')
    }
  }
  return (
    selectedApp === "DASHBOARD" ? <Layout className='main-layout home-page'>
      <Layout className='content-layout'>
      <HeaderTop collapsedSlide={collapsedSlide} setCollapsedSlide={setCollapsedSlide} selectedApp={selectedApp} handleLogout={handleLogout} />
      <Content style={{ padding: '24px 24px 0' }}>
        <Home handleSelectApp={handleSelectApp}/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        &#169; Copyright 2024 Indigo. All rights reserved
      </Footer>
    </Layout>
      </Layout>:  <Layout className='main-layout'>
    <HeaderNav collapsedSlide={collapsedSlide} selectedApp={selectedApp} setSelectedApp={setSelectedApp} />
    <Layout className='content-layout'>
      <HeaderTop collapsedSlide={collapsedSlide} setCollapsedSlide={setCollapsedSlide} selectedApp={selectedApp} handleLogout={handleLogout} />
      <Content style={{ padding: '24px 24px 0' }}>
      <ApolloProvider client={client}>
        <RoutesPage handleSelectApp={handleSelectApp} selectedApp={selectedApp} />
        </ApolloProvider>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        &#169; Copyright 2024 Indigo. All rights reserved
      </Footer>
    </Layout>
  </Layout>
   
  );
};

export default PageLayout;