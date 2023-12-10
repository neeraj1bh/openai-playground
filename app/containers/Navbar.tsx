import { useTheme } from 'next-themes';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`flex items-center w-full border-b border-gray-400  text-sm justify-between py-4 px-14 '
    }`}
    >
      <div
        className="flex items-center group"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <div
          className={`flex transition-all ease-in-out duration-500
             ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}
        >
          <div
            className={`w-4 h-8 rounded-tl-full border-black border rounded-bl-full bg-gray-300`}
          />
          <div className={`w-4 h-8 rounded-tr-full rounded-br-full bg-gray-800`} />
        </div>
        <span className="ml-2 transition-all font-light ease-in-out duration-500 opacity-0 group-hover:opacity-100 -translate-x-[10%] group-hover:translate-x-0">
          Invert colors
        </span>
      </div>
    </div>
  );
};

export default Navbar;
