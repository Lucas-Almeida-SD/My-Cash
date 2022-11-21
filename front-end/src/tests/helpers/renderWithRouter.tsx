import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MyContextProvider } from '../../contexts/MyContext';

export default (component: ReactNode) => ({
  ...render(
    <BrowserRouter>
      <MyContextProvider>
        {component}
      </MyContextProvider>
    </BrowserRouter>,
  ),
});
