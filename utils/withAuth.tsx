// src/withAuth.tsx

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/store';
import { ReactNode, useEffect } from 'react';

// src/withAuth.tsx
const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthHOC = (props: any) => {
      const router = useRouter();
      const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
      useEffect(() => {
        if (!isAuthenticated || (user && user.role !== 'admin')) {
          router.push('/login');
        }
      }, [isAuthenticated, user, router]);
  
      if (!isAuthenticated || (user && user.role !== 'admin')) {
        return null; 
      }
  
      return <WrappedComponent {...props} />;
    };
  
    return AuthHOC;
  };
  

export default withAuth;
