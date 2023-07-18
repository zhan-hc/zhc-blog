<template>
  <div class="nav-header">
    <div class="header-left">
      <img class="logo" src="@/assets/image/logo.png" alt=""/>
      <span class="author">前端笨鸟</span>
    </div>
    <div class="header-tags">
      <div class="tag active">Home</div>
      <div class="tag">Category</div>
      <i class="iconfont icon-expand" @click="toggleExpand"></i>
    </div>
  </div>
  <div class="nav-fill"></div>
  <Transition name="slide-fade">
    <div class="header-expand" v-show="expandStatus">
      <div class="tag">
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </div>
      <div class="tag">
        <i class="iconfont icon-category"></i>
        <span>Category</span>
      </div>
    </div>
  </Transition>
</template>

<script lang='ts' setup>
  import { ref } from "vue";

  const expandStatus = ref(false)
  const toggleExpand = () => {
    expandStatus.value = !expandStatus.value
  }

</script>

<style scoped lang='scss'>
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 8px 32px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
    .header-left {
      display: flex;
      align-items: center;
      .author {
        font-size: 20px;
        font-weight: bold;
        color: $primary-color;
        letter-spacing: 2px;
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
        color: rgba(0, 0, 0, 0.3);
        margin-right: 20px;
        &.active {
          color: rgba(0, 0, 0, 0.9);
        }
        &:hover {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.7);
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
      .icon-expand {
        display: none;
        font-size: 24px;
      }
    }
  }
  .header-expand {
    position: absolute;
    top: 56px;
    width: 100%;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
    .iconfont {
      margin-right: 5px;
      color: #262626;
    }
    .tag {
      padding: 10px 10px;
      font-weight: bold;
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