import PlaygroundMessages from './MessageComponents/PlaygroundMessages';

const Playground = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex py-6 h-full flex-wrap px-12 gap-6">
        <div className="flex flex-col gap-4 grow">
          <PlaygroundMessages />
          <div className="">Test</div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
