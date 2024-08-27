  // className={`ml-[${DRAWERWIDTH}px]`}

  import { DRAWERWIDTH, PROTECTED_ROUTES } from "@/utils/constants";
  import { usePathname } from 'next/navigation';

  
  const LoadingElement = () => {
    const pathname = usePathname();
    const ml = PROTECTED_ROUTES.includes(pathname) ? DRAWERWIDTH / 2 : 0 ; 
    
    return (
      <div className={`ml-[${ml}px] flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white bg-opacity-50 z-50`}>
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