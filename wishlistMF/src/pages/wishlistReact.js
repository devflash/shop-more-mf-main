import React from 'react';
import { applyVueInReact } from 'veaury';
import Wishlist from './wishlist.vue';
import AuthReactContext from '../components/authReactContext';

const WishlistReact = ({
  getParams = () => ({ userId: '4uQG6ItEQYfozhlwHa72jMu1l172' }),
  navigateRoute,
}) => {
  const Component = applyVueInReact(Wishlist);
  const { userId } = getParams();
  return (
    <AuthReactContext
      render={(authUser) => (
        <Component
          authUser={authUser}
          userId={userId}
          navigateRoute={navigateRoute}
        ></Component>
      )}
    ></AuthReactContext>
  );
};

export default WishlistReact;
