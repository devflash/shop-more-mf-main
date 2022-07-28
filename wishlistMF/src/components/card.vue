<script>
import Button from 'commonComponentMf/Button';
import Currency from 'commonComponentMf/Currency';
import { applyReactInVue } from 'veaury';

export default {
  props: {
    data: Object,
    handleAddToCart: Function,
    handleRemove: Function,
  },
  components: {
    'shop-more-button': applyReactInVue(Button),
    'shop-more-currency': applyReactInVue(Currency),
  },
  methods: {
    getReactStyles(styleClass) {
      const styles = {
        cartBtn: {
          marginRight: '5px',
        },
        removeBtn: {
          backgroundColor: '#e74c3c',
        },
      };
      return styles[styleClass];
    },
  },
};
</script>
<template>
  <div class="box">
    <div class="imageWrapper">
      <img :src="data.image" :alt="data.title" class="productImg" />
    </div>
    <div class="info">
      <p class="productTitle">{{ data.title }}</p>
      <p>Category: {{ data.category }}</p>
      <p class="productInfo">
        <span class="cost">
          Cost: <shop-more-currency />
          {{ data.price }}
        </span>
        <span v-if="data.stock > 0" class="inStock">In stock</span>
        <span v-else="!data.stock" class="outOfStock">Out of stock</span>
      </p>
      <div class="wishlistBtn">
        <shop-more-button
          :customCss="getReactStyles('cartBtn')"
          :label="'Add to cart'"
          @click="handleAddToCart(data)"
        ></shop-more-button>
        <shop-more-button
          :label="'Remove'"
          :customCss="getReactStyles('removeBtn')"
          @click="handleRemove(data.id)"
        ></shop-more-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.box {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 4px 2px 10px 0px #95a5a6;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.productTitle {
  font-size: 1.2rem;
  font-weight: 800;
}
.cost {
  display: flex;
  align-items: center;
}
.imageWrapper {
  height: 80px;
  width: 100px;
  position: relative;
}
.productImg {
  height: 100%;
  width: 100%;
}
.info {
  margin-left: 10px;
}
.inStock {
  color: #27ae60;
  font-weight: bold;
}
.outOfStock {
  color: #c0392b;
  font-weight: bold;
}
.productInfo {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.wishlistBtn {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
@media screen and (min-width: 600px) {
  .imageWrapper {
    height: 100px;
    width: 100px;
  }
}
</style>
