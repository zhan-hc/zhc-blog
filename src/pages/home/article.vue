<template>
  <div class="article-container" @scroll="handleScroll">
    <div class="article-main card">
      <div class="article-title">彻底弄懂Promise，并带你手写</div>
      <div class="article-info">
        <span class="article-time">{{dayjs(article?.create_time).format('YYYY-MM-DD hh:mm:ss')}}</span>
        <span class="iconfont icon-view mr-10"></span>
        <span>460</span>
      </div>
      <div class="article-content markdown-body" v-html="content"></div>
    </div>
    <div class="article-menu card">
      <div class="menu-item" v-for="(item, i) in menu" :key="i" :class="{active: i === activeMenuIndex}" :style="setMenuStyle(item)">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs'
import useArticle from '@/hook/article/useArticle'

const { article, content, menu, activeMenuIndex, setMenuStyle, handleScroll } = useArticle()
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
    .article-main {
      flex: 1;
      flex-shrink: 0;
      padding: 20px;
      box-sizing: border-box;
      .article-title {
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 24px;
      }
      .article-info {
        margin: 15px 0;
        font-size: 14px;
        color: $blog-font-2;
        .article-time {
          margin-right: 15px;
        }
        .mr-10 {
          margin-right: 10px;
        }
      }
    }
    .article-menu {
      position: sticky;
      top: 0;
      width: 200px;
      height: auto;
      flex-shrink: 0;
      margin-left: 20px;
      padding: 20px;
      box-sizing: border-box;
      .menu-item {
        margin-bottom: 10px;
        font-size: 16px;
        &.active {
          color: $primary-color-active !important;
          font-weight: bold;
        }
        &:hover {
          cursor: pointer;
          color: $primary-color !important;
        }
      }
    }
  }
</style>