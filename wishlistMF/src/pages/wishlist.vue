<script>
import WishlistComp from '../components/wishlistComp.vue';
import Layout from 'commonComponentMf/Layout';
import { applyReactInVue } from 'veaury';

export default {
  props: {
    authUser: Object,
    userId: String,
    navigateRoute: Function,
  },
  components: {
    WishlistComp,
    'shop-more-layout': applyReactInVue(Layout),
  },
  methods: {
    getReactStyles(styleClass) {
      const styles = {
        customLayout: {
          minHeight: 'calc(100vh - 62px)',
          paddingTop: '30px',
          paddingBottom: '30px',
          height: 'auto',
        },
      };
      return styles[styleClass];
    },
  },
};
</script>

<template>
  <shop-more-layout :layoutStyle="getReactStyles('customLayout')">
    <WishlistComp
      :authUser="authUser"
      :userId="userId"
      :navigateRoute="navigateRoute"
    />
  </shop-more-layout>
</template>
