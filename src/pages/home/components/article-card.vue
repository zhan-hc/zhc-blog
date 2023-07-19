<template>
  <div class="card article-card">
    <div class="article-header">
      <div class="article-author">张三</div>
      <div class="dividing"></div>
      <div class="article-date">两天前</div>
      <div class="dividing"></div>
      <div class="article-tag">前端</div>
    </div>
    <div class="article-content">
      <div class="article-info">
        <div class="article-title ellipsis">✍🏻 聊聊工程化Docker的最佳实验 ｜ 有奖征文</div>
        <div class="article-desc ellipsis-2">本次技术专题带大家聊聊 「工程化Docker」，无论你是开发人员、运维人员、架构师还是技术爱好者，都可以分享过往的经验和见解，与其掘友一起探讨和学习！</div>
        <div class="article-indicator">
          <i class="iconfont icon-upvote"></i>
          <span class="indicator">111</span>
          <i class="iconfont icon-view"></i>
          <span class="indicator">111</span>
          <i class="iconfont icon-comment"></i>
          <span class="indicator">111</span>
        </div>
      </div>
      <img src="https://zhan-hc.github.io/2022/07/21/js-balance/balance.jpg" alt="">
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style scoped lang='scss'>
  .article-card {
    padding: 15px;
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
      img {
        width: 120px;
        height: 80px;
        margin-left: 8px;
        border-radius: 2px;
      }
    }
  }
</style>