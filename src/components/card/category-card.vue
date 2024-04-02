<template>
  <div class="category-card card">
    <div class="card-title">
      <i class="iconfont icon-category"></i>
      <span>Categories</span>
    </div>
    <div class="card-content">
      <div class="card-item active-hover" v-for="item in props.data" :key="item.category_id" @click="toCategory(item.category_id)">
        <span>{{ item.category_name }}</span>
        <span>{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { categorySticsType } from '@/constants/types'
import { useRouter } from 'vue-router'
const props = defineProps({
  data: {
    type: Array<categorySticsType>,
    default: () => []
  }
})

const router = useRouter()

const toCategory = (id: number) => {
  router.push(`/category/${id}`)
}
</script>

<style scoped lang='scss'>
  .category-card {
    width: 200px;
    padding: 20px;
    box-sizing: border-box;
    .card-title {
      font-weight: 500;
      letter-spacing: 1px;
      @include font_color(1);
      .icon-category {
        font-size: 18px;
        margin-right: 10px;
      }
    }
    .card-content {
      padding-top: 15px;
      color: $blog-color-gray-1;
      .card-item {
        font-weight: 500;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>