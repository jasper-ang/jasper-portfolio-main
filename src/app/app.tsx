// components/App.tsx
import React, { ReactNode } from 'react';

interface AppProps {
  children?: ReactNode; // children prop to render the content of the page
}

const App: React.FC<AppProps> = ({ children }) => {
  return <div className="w-full p-6">{children}</div>;
};

export default App;
