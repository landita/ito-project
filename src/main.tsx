import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './styles/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withCSSVariables
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: "font-family: 'Montserrat', sans-serif;",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
);
