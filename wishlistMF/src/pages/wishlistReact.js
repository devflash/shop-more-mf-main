import React from 'react';
import { applyVueInReact } from 'veaury';
import Wishlist from './wishlist.vue';
import AuthReactContext from '../components/authReactContext';
const WishlistReact = () => {
  const Component = applyVueInReact(Wishlist);
  return (
    <AuthReactContext
      render={(authUser) => <Component authUser={authUser}></Component>}
    ></AuthReactContext>
  );
};

export default WishlistReact;
