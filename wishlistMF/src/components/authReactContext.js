import React, { useState } from 'react';
import { useAuthContext } from '@devflash/shared-shopmore-lib';
const AuthReactContext = (props) => {
  const { authUser } = useAuthContext();

  return <>{props.render(authUser)}</>;
};

export default AuthReactContext;
