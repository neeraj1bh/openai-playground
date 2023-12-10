import PlaygroundMessages from './MessageComponents/PlaygroundMessages';
import SystemMessage from './MessageComponents/SystemMessage';
import Navbar from './Navbar';
import Sidebar from './MessageComponents/Sidebar';

const Playground = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex py-6 h-full flex-wrap px-12 gap-6">
        <div className="flex flex-col gap-4 grow">
          <SystemMessage />
          <PlaygroundMessages />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Playground;
