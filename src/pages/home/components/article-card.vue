<template>
  <div class="card article-card">
    <div class="article-header">
      <div class="article-author">张三</div>
      <div class="dividing"></div>
      <div class="article-date">{{ dayjs(props.data.create_time).format('YYYY-MM-DD') }}</div>
      <div class="dividing"></div>
      <div class="article-tag">
        <span v-for="(tag, i) in props.data.article_tag" :key="i" style="margin-right: 10px;">{{tag}}</span>
      </div>
    </div>
    <div class="article-content">
      <div class="article-info">
        <div class="article-title ellipsis">{{ props.data.article_title }}</div>
        <div class="article-desc ellipsis-2">{{ props.data.article_desc }}</div>
        <div class="article-indicator">
          <i class="iconfont icon-upvote"></i>
          <span class="indicator">{{ props.data.article_like }}</span>
          <i class="iconfont icon-view"></i>
          <span class="indicator">{{ props.data.article_view }}</span>
          <i class="iconfont icon-comment"></i>
          <span class="indicator">111</span>
        </div>
      </div>
      <img class="article-cover" v-if="props.data.article_cover" :src="props.data.article_cover" alt="">
    </div>
  </div>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs'
import { ArticleType } from '@/constants/types';

const props = defineProps({
  data: {
    type: Object as () => ArticleType,
    default: () => ({} as ArticleType)
  }
})

</script>

<style scoped lang='scss'>
  .article-card {
    padding: 15px;
    &:hover {
      cursor: pointer;
    }
    .article-header {
      display: flex;
      font-size: 12px;
      color: $blog-font-3;
      .article-author {
        color: $blog-font-2;
      }
    }
    .article-content {
      display: flex;
      margin-top: 12px;
      .article-info {
        flex-grow: 1;
        .article-title {
          color: $blog-font-1;
          font-size: 16px;
          font-weight: bold;
        }
        .article-desc {
          margin-top: 8px;
          font-size: 12px;
          line-height: 24px;
          color: $blog-font-3;
        }
        .article-indicator {
          margin-top: 8px;
          color: $blog-color-gray-1;
          .iconfont {
            margin-right: 7px;
          }
          .indicator {
            margin-right: 16px;
            color: $blog-color-gray-2;
            font-size: 14px;
          }
        }
      }
      .article-cover {
        width: 120px;
        height: 80px;
        margin-left: 8px;
        border-radius: 2px;
        object-fit: cover;
      }
    }
  }
</style>