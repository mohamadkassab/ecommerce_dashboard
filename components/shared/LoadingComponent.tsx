import { DRAWERWIDTH } from "@/utils/constants";

const LoadingElement = () => {
  return (
    <div
      className={`ml-[${DRAWERWIDTH}px] flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white bg-opacity-50`}
      style={{ zIndex: 1400 }} // Higher than MUI Modal's default z-index
    >
      <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
        <div className="flex space-x-4">
          <div className="w-4 h-4 rounded-full animate-color-change-1"></div>
          <div className="w-4 h-4 rounded-full animate-color-change-2"></div>
          <div className="w-4 h-4 rounded-full animate-color-change-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingElement;
