<script>
import Button from 'commonComponentMf/Button';
import Toast from 'commonComponentMf/Toast';
import Loader from 'commonComponentMf/Loader';
import { applyReactInVue } from 'veaury';
import Card from './card.vue';
import axios from 'axios';
import config from '../config';
import { getErrorMessage } from '../utils/handleError';

const { API_SERVER } = config;
export default {
  props: {
    authUser: Object,
    userId: String,
    navigateRoute: Function,
  },
  components: {
    'shop-more-button': applyReactInVue(Button),
    'shop-more-toast': applyReactInVue(Toast),
    'shop-more-loader': applyReactInVue(Loader),
    Card,
  },
  data() {
    return {
      name: 'Mrugesh',
      wishlist: [],
      serviceError: null,
      isLoading: null,
      isBackdrop: null,
      success: null,
    };
  },
  methods: {
    getReactStyles(styleClass) {
      const styles = {};
      return styles[styleClass];
    },
    goToProducts() {
      navigateRoute('/');
    },
    clearErrors() {
      this.serviceError = null;
      this.success = null;
    },
    setLoader({ isLoading, isBackdrop }) {
      this.isLoading = isLoading;
      this.isBackdrop = isBackdrop;
    },
    async addToCart(product) {
      try {
        this.setLoader({ isLoading: true, isBackdrop: true });
        const payload = {
          ...product,
        };
        const { data } = await axios.post(
          `${API_SERVER}/api/cart/add`,
          payload
        );
        const { msg } = data;
        if (msg === 'PRODUCT_ADDED_CART') {
          this.success = 'Product has been added to your cart';
          //show success toast
        }
      } catch (e) {
        const error_code = e?.response?.data;
        this.serviceError = getErrorMessage(error_code);
        console.log(e);
      }
      this.setLoader({ isLoading: false, isBackdrop: false });
    },
    async handleRemove(id) {
      try {
        this.setLoader({ isLoading: true, isBackdrop: true });

        const { data } = await axios.delete(
          `${API_SERVER}/api/wishlist/remove/${this.authUser.uid}/${id}`
        );
        const { msg } = data;
        if (msg === 'PRODUCT_REMOVED') {
          //show success toast;
          const userWishlist = this.wishlist.filter((cur) => cur.id !== id);

          this.wishlist = userWishlist.slice();
          this.success = 'Product has been removed from your wishlist';
        }
      } catch (e) {
        const error_code = e?.response?.data;
        this.serviceError = getErrorMessage(error_code);
      }
      this.setLoader({ isLoading: false, isBackdrop: false });
    },
    async fetchData() {
      try {
        const { data } = await axios.get(
          `${API_SERVER}/api/wishlist/${this.userId}`
        );
        const { msg } = data;
        if (msg === 'WISHLIST_FETCHED') {
          this.wishlist = data.userWishlist.slice();
        }
        //stop loader
      } catch (e) {
        const error_code = e?.response?.data;
        this.serviceError = getErrorMessage(error_code);
      }
      this.setLoader({ isLoading: false, isBackdrop: false });
    },
  },
  mounted() {
    this.setLoader({ isLoading: true, isBackdrop: false });

    console.log(API_SERVER);
    this.fetchData();
    console.log('Fetching...');
  },
};
</script>
<template>
  <shop-more-toast
    :open="this.serviceError || this.success"
    :text="this.serviceError || this.success"
    :callback="this.clearErrors"
    :isError="!!this.serviceError"
  >
  </shop-more-toast>
  <shop-more-loader
    :isLoading="this.isLoading"
    :isBackdrop="this.isBackdrop"
  ></shop-more-loader>
  <div class="wishlist-wrapper">
    <h1 css="userName">{{ name }}'s wishlist</h1>
    <div v-if="wishlist.length > 0">
      <template v-for="item in wishlist" :key="item.userId">
        <Card
          :data="item"
          :handleAddToCart="addToCart"
          :handleRemove="handleRemove"
        />
      </template>
    </div>
    <div v-else="!wishlist.length">
      <div class="noWishlistBox">
        <h3>You have no products in the wishlist.</h3>
        <shop-more-button
          :label="'Go to products'"
          :customCss="{ fontSize: '14px' }"
          :onClick="goToProducts"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wishlist-wrapper {
  width: 90%;
  margin: 20px auto 0;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
.username {
  font-size: 18px;
}
.noWishlistBox {
  text-align: center;
  margin-top: 20px;
  h3 {
    margin-bottom: 10px;
  }
}
</style>
