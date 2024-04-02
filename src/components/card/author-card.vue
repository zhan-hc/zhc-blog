<template>
  <div class="card author-card">
    <img v-imgErr class="author-avatar" :src="AuthorInfo.avatarUrl" alt="头像">
    <div class="author-username">{{ AuthorInfo.name }}</div>
    <div class="author-desc">{{ AuthorInfo.desc }}</div>
    <div class="author-contact">
      <i class="iconfont" :class="item.icon" @click="accountClick(item)" v-for="(item, i) in AuthorInfo.account" :key="i"></i>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import { AuthorInfo } from '@/constants'
  import useAuthors from '@/hook/home/useAuthors'
  const { accountClick } = useAuthors()
</script>

<style scoped lang='scss'>
.author-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 20px;
  box-sizing: border-box;
  @include font_color(0);
  .author-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .author-username {
    margin-top: 15px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .author-desc {
    margin-top: 8px;
    font-size: 14px;
  }
  .author-contact {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    .iconfont {
      font-size: 24px;
      color: $blog-color-gray-1;
      &.icon-juejin {
        color: #1e80ff;
      }
      &.icon-wechat {
        color: #07c160;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>