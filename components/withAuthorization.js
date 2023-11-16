
import React from 'react';
import { useSession } from "next-auth/react";
import ForbiddenPage from './ForbiddenPage';

function AuthorizationWrapper({ children }) {
  const { data: session } = useSession()

  if (session?.token?.token?.token?.token?.user?.role =='ADMIN') return <ForbiddenPage />;
  return <>{children}</>;
}

export default function withAuthorization(WrappedComponent) {
  return function AuthorizedComponent(props) {
    return (
      <AuthorizationWrapper>
        <WrappedComponent {...props} />
      </AuthorizationWrapper>
    );
  };
}