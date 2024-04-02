<template>
  <div class="time-line card">
    <div class="article-item category">{{name}}</div>
    <div class="article-box" v-for="(item, i) in list" :key="item.article_id">
      <div class="article-item year" v-if="i === 0 || (i > 0 && !diffDateYear(list[i].create_time, list[i - 1].create_time))">{{ formatDate(item.create_time, 'YYYY') }}</div>
      <div class="article-item" @click="articleCardClick(item)">
        <article-cover :img-url="item.article_cover" img-alt="暂无封面图" style=" margin-right: 20px;"></article-cover>
        <div class="article-info">
          <div class="article-date">
            <i class="iconfont icon-date"></i>
            <span>{{ formatDate(item.create_time, 'YYYY-MM-DD') }}</span>
          </div>
          <div class="article-title ellipsis-2">{{ item.article_title }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang='ts' setup>
import { toRefs } from 'vue'
import { formatDate } from '@/utils/common'
import { ArticleType } from '@/constants/types'
import useArticle from '@/hook/article/useArticle'
import articleCover from '@/components/article-cover.vue'

const props = defineProps({
  list: {
    type: Array<ArticleType>,
    default: () => []
  },
  name: {
    type: String,
    default: ''
  }
})

const { list, name } = toRefs(props)
const { articleCardClick } = useArticle()
const diffDateYear = (startDate: Date, endDate: Date) => {
  return formatDate(startDate, 'YYYY') === formatDate(endDate, 'YYYY')
}

</script>

<style scoped lang='scss'>
  .time-line {
    padding: 20px;
    .article-item {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-bottom: 20px;
      border-left: 2px solid #8a919f;
      &:hover {
        cursor: pointer;
        &::before {
          border: 4px solid $primary-color !important;
        }
        .article-title {
          color: $primary-color !important;
        }
      }
      .article-info {
        @include font_color(2);
        .article-date {
          margin-bottom: 10px;
          .icon-date {
            margin-right: 10px;
          }
        }
        .article-title {
          @include font_color(1);
        }
      }
      &.category {
        font-size: 20px;
        padding-top: 20px;
        @include font_color(1);
        &::before {
          left: -11px;
          width: 8px;
          height: 8px;
          border: 6px solid #8a919f;
        }
      }
      &.year {
        @include font_color(2);
        font-size: 18px;
        padding-top: 20px;
        &::before {
          border: 4px solid $primary-color !important;
        }
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        // background: #fff;
        border: 4px solid #8a919f;
        // @include border_color();
        @include bg_color();
        border-radius: 50%;
      }
    }
  }
</style>
<style lang='scss'>
  .time-line {
    .article-item {
      &:hover {
        .article-cover {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
</style>