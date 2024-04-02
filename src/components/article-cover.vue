<template>
  <div class="article-cover" :class="`article-cover--${props.size}`">
    <img v-imgErr :src="props.imgUrl" :alt="props.imgAlt">
  </div>
</template>

<script lang='ts' setup>
  const props = defineProps({
    imgUrl: {
      type: String,
      default: ''
    },
    imgAlt: {
      type: String,
      default: '文章封面'
    },
    size: {
      type: String,
      default: 'default' // 'large'| 'default'| 'small'
    }
  })
</script>

<style scoped lang='scss'>
  .article-cover {
    flex-shrink: 0;
    width: 120px;
    height: 80px;
    overflow: hidden;
    border-radius: $blog-cover-radius;
    &--large {
      width: 150px;
      height: 100px;
    }
    &--small {
      width: 90px;
      height: 60px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.6s;
    }
    &:hover {
      cursor: pointer;
      img {
        transform: scale(1.1);
      }
    }
  }
</style>