<template>
  <div class="tag-card card">
    <div class="card-title">
      <i class="iconfont icon-tag"></i>
      <span>Tags</span>
    </div>
    <div class="card-content">
      <div class="card-item active-hover" v-for="item in props.data" :key="item.tag_id">{{ item.tag_name }}</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { tagSticsType } from '@/constants/types'
const props = defineProps({
  data: {
    type: Array<tagSticsType>,
    default: () => []
  }
})
</script>

<style scoped lang='scss'>
  .tag-card {
    width: 200px;
    padding: 20px;
    box-sizing: border-box;
    .card-title {
      font-weight: 500;
      letter-spacing: 1px;
      color: $primary-color;
      .icon-tag {
        font-size: 18px;
        margin-right: 10px;
      }
    }
    .iconfont {
      color: $primary-color;
    }
    .card-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 15px;
      color: $blog-color-gray-1;
      .card-item {
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 3px 6px;
        border: 2px solid $blog-color-gray-1;
        border-radius: 4px;
      }
    }
  }
</style>