<script>
import WishlistComp from '../components/wishlistComp.vue';
export default {
  props: {
    authUser: Object,
  },
  components: {
    WishlistComp,
  },
};
</script>

<template>
  <WishlistComp :authUser="authUser" />
</template>
