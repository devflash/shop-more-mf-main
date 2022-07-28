<script>
export default {
  props: {
    authUser: Object,
  },
  setup() {
    return {
      name: 'Mrugesh',
    };
  },
};
</script>
<template>
  <div class="wishlist-wrapper">
    <h1 css="userName">{{ name }}'s wishlist</h1>
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
