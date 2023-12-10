'use client';

import Playground from './containers/Playground';
import { AuthProvider } from './hooks/useAuth';
import OpenAIProvider from './hooks/useOpenAI';

const Home = () => {
  return (
    <AuthProvider>
      <OpenAIProvider>
        <Playground />
      </OpenAIProvider>
    </AuthProvider>
  );
};

export default Home;
