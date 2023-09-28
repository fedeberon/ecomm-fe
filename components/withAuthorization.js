
import React from 'react';
import { useSession } from "next-auth/client";
import ForbiddenPage from './ForbiddenPage';

function AuthorizationWrapper({ children }) {
  const [session, loading] = useSession();

  if (!session?.user?.role?.includes('ADMIN')) return <ForbiddenPage />;
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