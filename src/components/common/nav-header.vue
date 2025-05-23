<template>
  <ja-nav-bar :icon="`${assetsDomain}/logo/logo.svg`" title="前端笨鸟" placeholder :socialLinks="socialLinks">
    <template #right>
      <div class="header-search">
        <input type="text" v-model="searchVal" placeholder="请输入关键字..." @keyup.enter="onSearch"/>
        <div class="search-right" @click="onSearch">
          <i class="iconfont icon-search"></i>
        </div>
      </div>
      <ja-nav-links :data="navLink"></ja-nav-links>
      <div class="ja-divider__before">
        <ja-switch
          style="--ja-switch-on-color: #2c2c2c;--ja-switch-off-color:#f2f2f2;fontSize: 14px;" v-model="isDark" :active-icon="Moon" :inactive-icon="Sun"></ja-switch>
      </div>
      <i class="iconfont icon-expand" @click="expandStatus = true"></i>
    </template>
  </ja-nav-bar>
    <!-- <div class="header-left" @click="router.push('/')">
      <img class="logo" :src="`${assetsDomain}/logo/logo.svg`" alt=""/>
      <span class="author">前端笨鸟</span>
    </div>
    <div class="header-search">
      <input type="text" v-model="searchVal" placeholder="请输入关键字..." @keyup.enter="onSearch"/>
      <div class="search-right" @click="onSearch">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <i class="theme iconfont" :class="isDark ? 'icon-dark' : 'icon-light'" @click="toggleDark()" style="font-size: 20px"></i>
    <div class="header-tags">
      <router-link to="/" class="tag">Home</router-link>
      <router-link to="/nav" class="tag">Nav</router-link>
      <router-link to="/project" class="tag">Project</router-link>
      <i class="iconfont icon-expand" @click="expandStatus = true"></i>
    </div> -->
  <!-- <div class="nav-fill"></div> -->
  <el-drawer v-model="expandStatus" class="drawer" :with-header="false" size="70%">
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
      <router-link to="/project" class="tag"  @click.stop="expandStatus = false">
        <i class="iconfont icon-project"></i>
        <span>Project</span>
      </router-link>
    </div>
  </el-drawer>
</template>

<script lang='ts' setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import authorCard from '@/components/card/author-card.vue'
  import { useDark, useToggle } from '@vueuse/core'
  import { assetsDomain } from "@/utils/env"
  import { Github, Wechat, Juejin, Moon, Sun } from '@janus-c/icons-vue'
  import useAuthors from '@/hook/home/useAuthors'


  const router = useRouter()
  const expandStatus = ref(false)
  const searchVal = ref('')
  const socialLinks = [
    {
      icon: Github,
      link: 'https://github.com/zhan-hc'
    },
    {
      icon: Juejin,
      link: 'https://juejin.cn/user/1433418895468829'
    },
    {
      icon: Wechat,
      event: () => handleCopy('Januscha')
    }
  ]

  const navLink = [{
    text: '首页',
    link: '/'
  },
  {
    text: '导航',
    link: '/nav'
  },
  {
    text: '项目',
    link: '/project'
  }]
  const { handleCopy } = useAuthors()
  const themeStatus = ref(false)

  const isDark = useDark({
    storageKey: 'janus-blog-theme',
    attribute: 'data-theme',
    valueDark:'dark',
    valueLight:'light'
  })

  const toggleDark = () => {
    isDark.value = isDark.value ? false : true;
  }
  const onSearch = () => {
    router.push(`/search?keyword=${searchVal.value}`)
    searchVal.value = ''
  }

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
    height: 64px;
    padding: 8px 32px;
    @include bg_color();
    // @include border_color();
    box-shadow: $box-shadow;
    box-sizing: border-box;
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        cursor: pointer;
      }
      .author {
        flex-shrink: 0;
        font-size: 20px;
        font-weight: bold;
        color: $primary-color;
        letter-spacing: 3px;
      }
      .logo {
        width: 52px;
        height: 52px;
        margin-right: 10px;
      }
    }
    .theme {
      margin-right: 20px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
    .header-tags {
      display: flex;
      .tag {
        font-weight: bold;
        @include font_color(0);
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
    }
  }
  .header-search {
    display: flex;
    align-items: center;
    height: 34px;
    min-width: 120px;
    margin-right: 30px;
    border-radius: 20px;
    padding-left: 2px;
    box-sizing: border-box;
    background-color: $blog-color-gray-4;
    transition: all .6s;
    overflow: hidden;
    input {
      height: 30px;
      padding-left: 10px;
      border: none;
      background-color: $blog-color-gray-4;
      border-radius: 20px 0 0 20px;
      font-size: 14px;
      -webkit-appearance: none; //去掉input 在iOS中的默认圆角和内阴影
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0); //去掉点击时高亮的样式
      &:focus {
        outline-color: $primary-color;
      }
    }
    .search-right {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 10px 0 8px;
      background-color: $primary-color;
      border-radius: 0 20px 20px 0;
      box-sizing: border-box;
    }
    .icon-search {
      color: #fff;
      font-size: 24px;
      cursor: pointer;
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
    @include font_color(1);
    .tag {
      padding: 10px 10px;
      font-weight: bold;
      .iconfont {
        margin-right: 10px;
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
  .icon-expand {
    display: none;
    font-size: 24px;
    &:hover {
      cursor: pointer;
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