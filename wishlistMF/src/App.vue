<script>
import Wishlist from './pages/wishlist.vue';
import WishlistReact from './pages/wishlistReact';
import { applyReactInVue } from 'veaury';
export default {
  components: {
    'my-react-component': applyReactInVue(WishlistReact),
    Wishlist,
  },
};
</script>

<template>
  <!-- <Wishlist /> -->
  <my-react-component />
</template>
