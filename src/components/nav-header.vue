<template>
  <div class="nav-header">
    <div class="header-left" @click="router.push('/')">
      <img class="logo" src="../../public/logo.svg" alt=""/>
      <span class="author">前端笨鸟</span>
    </div>
    <div class="header-tags">
      <router-link to="/" class="tag">Home</router-link>
      <router-link to="/nav" class="tag">Nav</router-link>
      <i class="iconfont icon-expand" @click="expandStatus = true"></i>
    </div>
  </div>
  <div class="nav-fill"></div>
  <el-drawer v-model="expandStatus" :with-header="false" size="70%">
    <author-card class="author-wrap show"/>
    <div class="nav-list">
      <router-link to="/" class="tag"  @click.stop="expandStatus = false">
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/nav" class="tag"  @click.stop="expandStatus = false">
        <i class="iconfont icon-menu"></i>
        <span>Nav</span>
      </router-link>
    </div>
  </el-drawer>
</template>

<script lang='ts' setup>
  import { Ref, ref } from "vue"
  import { onClickOutside } from '@vueuse/core'
  import { useRouter } from "vue-router"
  import authorCard from '@/components/author-card.vue'

  const router = useRouter()
  const expandStatus = ref(false)

</script>

<style scoped lang='scss'>
  .nav-header {
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 8px 32px;
    background-color: $theme-color;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: $box-shadow;
    box-sizing: border-box;
    .header-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      &:hover {
        cursor: pointer;
      }
      .author {
        font-size: 20px;
        font-weight: bold;
        color: $primary-color;
        letter-spacing: 3px;
      }
      .logo {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }
    .header-tags {
      display: flex;
      .tag {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.6);
        margin-right: 20px;
        text-decoration: none;
        &.router-link-exact-active {
          color: $primary-color;
        }
        &:hover {
          cursor: pointer;
          color: $primary-color-sub;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
      .icon-expand {
        display: none;
        font-size: 24px;
        color: $blog-color-gray-1;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .author-wrap {
    margin: auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  .nav-list {
    display: flex;
    flex-direction: column;
    .tag {
      padding: 10px 10px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.5);
      .iconfont {
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.5);
      }
      &.router-link-exact-active {
        color: $primary-color-sub;
        .iconfont {
          color: $primary-color-active;
        }
      }
      &:hover {
        cursor: pointer;
        color: $primary-color-active;
      }
    }
  }
  .nav-fill {
    height: 64px;
  }
  @keyframes expand {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }
  .slide-fade-enter-active {animation: expand .2s ease-in; transition: all 0.5s ease-out;}
</style>