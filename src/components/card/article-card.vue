<template>
  <div class="card article-card">
    <div class="article-header">
      <div class="article-author">前端笨鸟</div>
      <div class="dividing"></div>
      <div class="article-date">{{ formatDate(props.data.create_time, 'YYYY-MM-DD') }}</div>
      <div class="dividing"></div>
      <div class="article-category">
        <span>{{ categoryObj[props.data.category_id] }}</span>
      </div>
      <div class="dividing" v-if="props.data?.tag_id_blog_tags?.length"></div>
      <div class="article-tag" v-if="props.data?.tag_id_blog_tags?.length">
        <span v-for="item in props.data.tag_id_blog_tags" :key="item.tag_id" style="margin-right: 10px;">{{ tagObj[item.tag_id] }}</span>
      </div>
    </div>
    <div class="article-content">
      <div class="article-info">
        <div class="article-title ellipsis">{{ props.data.article_title }}</div>
        <div class="article-desc ellipsis-2">{{ props.data.article_desc || props.data.article_content.replace(/(?:\*\*|__)(.*?)(?:\*\*|__)|\[(.*?)\]\(.*?\)|[#`*_+-]/g, '$1$2') }}</div>
        <div class="article-indicator">
          <i class="iconfont icon-upvote"></i>
          <span class="indicator">{{ props.data.likesNum }}</span>
          <i class="iconfont icon-view"></i>
          <span class="indicator">{{ props.data.article_view }}</span>
          <i class="iconfont icon-comment"></i>
          <span class="indicator">{{ props.data.comments }}</span>
        </div>
      </div>
      <article-cover v-if="props.data.article_cover" :img-url="props.data.article_cover" style="margin-left: 8px;"></article-cover>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { ArticleType } from '@/constants/types'
import { formatDate } from '@/utils/common'
import { useArticleStore } from '@/store/article'
import articleCover from '@/components/article-cover.vue'

const props = defineProps({
  data: {
    type: Object as () => ArticleType,
    default: () => ({} as ArticleType)
  }
})

const store = useArticleStore()
const { tagObj, categoryObj } = storeToRefs(store)

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
      @include font_color(3);
      .article-author {
        @include font_color(2);
      }
    }
    .article-content {
      display: flex;
      margin-top: 12px;
      .article-info {
        overflow: hidden;
        .article-title {
          @include font_color(0);
          font-size: 16px;
          font-weight: bold;
        }
        .article-desc {
          margin-top: 8px;
          font-size: 12px;
          line-height: 24px;
          @include font_color(3);
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
    }
  }
</style>
<style lang='scss'>
  .article-card {
    &:hover {
      .article-cover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }
</style>