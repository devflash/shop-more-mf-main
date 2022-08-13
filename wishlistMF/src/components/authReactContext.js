import React, { useState } from 'react';
import { useAuthContext } from '@devflash/shared-shopmore-lib';
const AuthReactContext = (props) => {
  console.log('wishlist!');
  const { authUser } = useAuthContext();

  return <>{props.render(authUser)}</>;
};

export default AuthReactContext;
