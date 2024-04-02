<template>
  <div class="empty-wrap">
    <svg-icon :name="svg" :size="200" color="red" />
    <span class="desc">{{ descMsg }}</span>
  </div>
</template>

<script lang='ts' setup>
import svgIcon from '@/components/common/svg-icon.vue'
defineProps({
  svg: {
    type: String,
    required: true,
    default: "empty",
  },
  descMsg: {
    type: String,
    default: "暂无数据",
  },
});
</script>

<style scoped lang='scss'>
  .empty-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .desc {
      @include font_color(3);
      font-size: 14px;
    }
  }
</style>