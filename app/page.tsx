import Playground from './containers/Playground';
import OpenAIProvider from './hooks/useOpenAI';

const Home = () => {
  return (
    <OpenAIProvider>
      <Playground />
    </OpenAIProvider>
  );
};

export default Home;
