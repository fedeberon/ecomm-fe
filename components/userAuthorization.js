import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import ForbiddenPage from './ForbiddenPage';

function AuthorizationWrapper({ children }) {
  const { data: session } = useSession()
  const [grantAccess, setGrantAccess] = useState(false);
  const sessionUser = session?.user?.username;
  let userAdmin, validUser, allowedUser;

  //Once that the page has finished loading and the user is known, deduces if the user should be allowed 
  //and if the user is an admin
  useEffect(() => {
    if (!loading) {
      validUser = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      userAdmin = session?.user?.role?.includes('ADMIN');

      allowedUser = sessionUser === validUser || sessionUser === validUser + "#";
    }
  }, [loading, sessionUser]);

  //Once that allowedUser has got a value, it checks whether the user should be granted access or not.
  useEffect(() => {
    if (!loading) {
      if (userAdmin || allowedUser) {
        setGrantAccess(true);
      }
    }
  }, [loading, userAdmin, allowedUser]);

  if (!grantAccess) return <ForbiddenPage />;
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