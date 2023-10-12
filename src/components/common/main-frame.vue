<template>
  <div class="home-container">
    <div class="home-main" :class="{'auto' : !props.rightShow}">
      <slot></slot>
    </div>
    <div class="home-right" v-if="props.rightShow">
      <author-card style="margin-bottom: 20px;"></author-card>
      <category-card style="margin-bottom: 20px;" :data="categoryData"></category-card>
      <tag-card :data="tagData"></tag-card>
    </div>
  </div>
  <footer>
    <a href="https://beian.miit.gov.cn">粤ICP备2023101697号-1</a>
    <span>&nbsp;&nbsp;©2023 janus-c.top</span>
  </footer>
</template>

<script lang='ts' setup>
  import { onMounted } from 'vue'
  import tagCard from '@/components/card/tag-card.vue'
  import authorCard from '@/components/card/author-card.vue'
  import categoryCard from '@/components/card/category-card.vue'
  import useTag from '@/hook/article/useTag'
  import useCategory from '@/hook/article/useCategory'
  import useStatistics from '@/hook/article/useStatistics'
  import { STATISTICS_TYPE } from '@/constants'

  const props = defineProps({
    rightShow: {
      type: Boolean,
      default: true
    }
  })

  useTag()
  useCategory()
  const { categoryData, tagData } = useStatistics([STATISTICS_TYPE.CATEGORY, STATISTICS_TYPE.TAG])

</script>

<style scoped lang='scss'>
.home-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  .home-main {
    width: 800px;
    min-height: 100%;
    padding-bottom: 32px;
    .article-item {
      margin-bottom: 20px;
    }
    &.auto {
      flex: 1;
      max-width: 1120px;
    }
  }
  .home-right {
    margin-left: 20px;
    width: 200px;
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-top: -32px;
  color: #999aaa;
  font-size: 12px;
  border-top: 1px solid $blog-color-gray-3;
  @include bg_color();
  @include border_color();
  box-sizing: border-box;
}
</style>