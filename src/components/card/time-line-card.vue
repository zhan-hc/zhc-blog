<template>
  <div class="time-line card">
    <div class="article-item category">{{name}}</div>
    <div class="article-box" v-for="(item, i) in list" :key="item.id">
      <div class="article-item year" v-if="i === 0 || (i > 0 && !diffDateYear(list[i].create_time, list[i - 1].create_time))">{{ formatDate(item.create_time, 'YYYY') }}</div>
      <div class="article-item" @click="articleCardClick(item)">
        <div class="article-cover">
          <img v-imgErr :src="item.article_cover" alt="文章占位图片">
        </div>
        <div class="article-info">
          <div class="article-date">
            <i class="iconfont icon-date"></i>
            <span>{{ formatDate(item.create_time, 'YYYY-MM-DD') }}</span>
          </div>
          <div class="article-title">{{ item.article_title }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang='ts' setup>
import { toRefs } from 'vue';
import { formatDate } from '@/utils/common';
import { ArticleType } from '@/constants/types';
import useArticle from '@/hook/article/useArticle';

const props = defineProps({
  list: {
    type: Array<ArticleType>,
    default: () => []
  },
  name: {
    type: String,
    default: '分类'
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
      border-left: 2px solid $blog-font-3;
      &:hover {
        cursor: pointer;
        &::before {
          border: 4px solid $primary-color;
        }
        .article-cover {
          img {
            transform: scale(1.1);
          }
        }
        .article-title {
          color: $primary-color;
        }
      }
      .article-cover {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        overflow: hidden;
        border-radius: $blog-cover-radius;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s;
        }
      }
      .article-info {
        color: $blog-font-2;
        .article-date {
          margin-bottom: 10px;
          .icon-date {
            margin-right: 10px;
          }
        }
      }
      &.category {
        font-size: 20px;
        padding-top: 20px;
        &::before {
          left: -11px;
          width: 8px;
          height: 8px;
          border: 6px solid $blog-font-3;
        }
      }
      &.year {
        color: $blog-font-2;
        font-size: 18px;
        padding-top: 20px;
        &::before {
          border: 4px solid $primary-color;
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
        background: #fff;
        border: 4px solid $blog-font-3;
        border-radius: 50%;
      }
    }
  }
</style>