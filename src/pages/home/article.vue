<template>
  <div class="article-container" @scroll="handleScroll($event, setActiveMenu)">
    <div class="article-wrap">
      <div class="article-main card">
        <div class="article-title">{{article?.article_title}}</div>
        <div class="article-info">
          <span class="article-time">{{formatDate(article?.create_time, 'YYYY-MM-DD hh:mm:ss')}}</span>
          <span class="iconfont icon-view mr-10"></span>
          <span>{{ article?.article_view }}</span>
        </div>
        <div class="article-content markdown-body" v-html="addIndexToHtml(content)"></div>
      </div>
      <comment @submit="submitComment" :commentList="commentList"/>
    </div>
    <div class="article-minor">
      <author-card></author-card>
      <div class="article-menu card">
        <a class="menu-item" v-for="(item, i) in menu" :key="i" :href="`#article-menu_${i + 1}`" :class="{active: i === activeMenuIndex}" :style="setMenuStyle(item)">{{ item.content }}</a>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import { watch } from 'vue'
  import comment from './components/comment.vue'
  import authorCard from '../../components/card/author-card.vue'
  import useComment from '@/hook/article/useComment'
  import useArticleDetail from '@/hook/article/useArticleDetail'
  import useArticleMenu from '@/hook/article/useArticleMenu'
  import useScrollAnchor from '@/hook/common/useScrollAnchor'
  import { formatDate } from '@/utils/common'
  import { addComment } from '@/api/comment'
  import useCollect from '@/hook/common/useCollect'

  const { getUserId } = useCollect()
  const { article, content, articleId } = useArticleDetail()
  const { menu, activeMenuIndex, setMenuStyle, getArticleMenu, setActiveMenu, addIndexToHtml } = useArticleMenu()
  const { handleScroll } = useScrollAnchor('h', 'article-menu_')
  const { commentList, fetchCommentList } = useComment(Number(articleId))

  const submitComment = async ({ avatar, content }: any) => {
    const nickname = await getUserId()
    await addComment({
      avatar,
      content,
      nickname,
      article_id: articleId,
      create_time: +new Date(),
      isAuthor: 0
    })
    await fetchCommentList()
  }

  watch(content, (newValue) => {
    if (newValue) {
      getArticleMenu(newValue)
    }
  })

</script>

<style scoped lang='scss'>
  .article-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: calc(100vh - 64px);
    padding: 20px 200px;
    box-sizing: border-box;
    overflow-y: scroll;
    .article-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      flex-shrink: 0;
      max-width: 850px;
      transition: width 0.5s;
      .article-main {
        padding: 30px;
        box-sizing: border-box;
      }
      .article-title {
        @include font_color(0);
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 28px;
      }
      .article-info {
        margin: 15px 0;
        font-size: 14px;
        @include font_color(2);
        .article-time {
          margin-right: 15px;
        }
        .mr-10 {
          margin-right: 10px;
        }
      }
    }
    .article-minor {
      position: sticky;
      top: 0;
      flex-shrink: 0;
      width: 200px;
      height: auto;
      padding-left: 20px;
    }
    .article-menu {
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
      .menu-item {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        &.active {
          color: $primary-color-active !important;
          font-weight: bold;
        }
        &:hover {
          cursor: pointer;
          color: $primary-color !important;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>