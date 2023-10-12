<template>
  <div class="card search-card">
    <el-skeleton animated :rows="5" :loading="loading" v-if="loading"/>
    <div class="card-header" v-else>
      <i class="iconfont icon-search active"></i>
      <span>搜索到</span>
      <span class="active bold">{{ total }}</span>
      <span>条与</span>
      <span class="active bold">{{ keyword }}</span>
      <span>相关的文章</span>
    </div>
    <div class="card-article" v-for="item in list" :key="item.article_id" @click="articleCardClick(item)">
      <article-cover :img-url="item.article_cover" img-alt="暂无封面图" size="large"></article-cover>
      <div class="article-info">
        <div class="article-title ellipsis">{{ item.article_title }}</div>
        <div class="article-desc ellipsis-2">{{ item.article_desc || item.article_content.replace(/(?:\*\*|__)(.*?)(?:\*\*|__)|\[(.*?)\]\(.*?\)|[#`*_+-]/g, '$1$2') }}</div>
        <div class="article-sub">
          <div class="article-date">{{ formatDate(item.create_time, 'YYYY-MM-DD') }}</div>
          <div class="sub-left">
            <div class="dividing"></div>
            <i class="iconfont icon-upvote"></i>
            <span>{{ item.likesNum }}</span>
            <div class="dividing"></div>
            <i class="iconfont icon-view"></i>
            <span>{{ item.article_view }}</span>
            <div class="dividing"></div>
            <i class="iconfont icon-comment"></i>
            <span>{{ item.comments }}</span>
          </div>
          <div class="sub-right">
            <span>{{ categoryObj[item.category_id] }}</span>
            <span class="tag" v-for="item in item.tag_id_blog_tags" :key="item.tag_id" style="margin-right: 10px;">{{ tagObj[item.tag_id] }}</span>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
    <el-pagination
      background
      :page-size="10"
      :total="total"
      :hide-on-single-page="true"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='ts' setup>
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { ArticleType } from '@/constants/types'
import { formatDate } from '@/utils/common'
import useArticle from '@/hook/article/useArticle'
import { useArticleStore } from '@/store/article'
import articleCover from '@/components/article-cover.vue'

const props = defineProps({
  list: {
    type: Array<ArticleType>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  keyword: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})


const emit = defineEmits(['pageChange'])
const store = useArticleStore()
const { articleCardClick } = useArticle()
const { list, total, keyword, loading } = toRefs(props)
const { tagObj, categoryObj } = storeToRefs(store)

const handleCurrentChange = (val: number) => {
  emit('pageChange', val)
}

</script>

<style scoped lang='scss'>
  .search-card {
    padding: 20px;
    overflow: hidden;
    @include font-color(1);
    .card-header {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      font-size: 14px;
      letter-spacing: 1px;
      border-bottom: 1px solid $blog-color-gray-2;
      .icon-search {
        margin-right: 5px;
        font-weight: bold;
      }
      .active {
        color: $primary-color;
        &.bold {
          font-weight: 600;
        }
      }
    }
    .card-article {
      display: flex;
      align-items: center;
      margin-top: 20px;
      transition: all .6s;
      &:hover {
        cursor: pointer;
        .article-title {
          color: $primary-color;
        }
      }
      .article-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 20px;
        @include font_color(0);
        overflow: hidden;
        .article-title {
          font-size: 18px;
        }
        .article-desc {
          margin-top: 10px;
          @include font_color(3);
          font-size: 14px;
        }
        .article-sub {
          display: flex;
          @include font_color(2);
          margin-top: 10px;
          font-size: 12px;
          .article-date {
            display: flex;
            align-items: center;
          }
          .sub-left {
            display: flex;
            align-items: center;
            flex: 1;
            .iconfont {
              margin-right: 5px;
            }
          }
          .sub-right {
            .tag {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .el-pagination {
      margin-top: 20px;
      justify-content: center;
      .el-pager {
        .is-active {
          background-color: $primary-color;
        }
      }
      
    }
  }
</style>
<style lang='scss'>
  .search-card {
    .card-article {
      &:hover {
        .article-cover {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
  .el-pagination {
    .el-pager {
      .is-active {
        background-color: $primary-color !important;
      }
      li {
        &:hover {
          color: $primary-color !important;
        }
      }
    }
    button {
      &:hover {
        color: $primary-color !important;
      }
    }
  }
</style>