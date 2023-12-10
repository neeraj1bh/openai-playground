import PlaygroundMessages from './MessageComponents/PlaygroundMessages';
import SystemMessage from './MessageComponents/SystemMessage';
import Navbar from './Navbar';
import Sidebar from './MessageComponents/Sidebar';

const Playground = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex py-6 flex-wrap px-6 lg:px-12 gap-4 lg:gap-6 flex-1">
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
