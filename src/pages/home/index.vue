<template>
  <menu-bar :tabs="tabs" @tabClick="tabClick"></menu-bar>
  <div class="tab-content" @scroll="handleScroll">
    <div class="tab-list card" v-for="(tab, i) in linkList" :key="i" :id="`nav-bar_${i}`">
      <div class="tab-tag">
        <span>{{ tab.jump_tag }}</span>
        <span>{{ tab.jump_desc }}</span>
      </div>
      <div class="tag-container">
        <div v-for="(link, j) in tab.jump_links" :key="j" class="tag-item" @click="handleJump(link.link_url)" :data-title="link.link_name">
          <img v-if="link.link_icon" class="tag-icon" :src="link.link_icon" alt="">
          <span class="tag-name ellipsis">{{ link.link_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import MenuBar from './components/menu-bar.vue'
  import useTabs from '@/hook/home/useTabs'
  const { tabs, tabClick, linkList, handleJump, handleScroll } = useTabs()
</script>

<style scoped lang='scss'>
  .tab-content {
    padding: 20px 200px;
    height: calc(100vh - 64px);
    box-sizing: border-box;
    overflow-y: scroll;
    .tab-list {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      padding: 20px 20px 0;
      .tab-tag {
        padding-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        border-bottom: 2px solid $primary-color;
        span {
          &:first-child {
            margin-right: 20px;
          }
          &:last-child {
            font-size: 16px;
            color: #808080;
          }
        }
      }
      .tag-container {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0 0;
      }
      .tag-item {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 150px;
        margin-bottom: 20px;
        margin-right: 20px;
        padding: 10px 15px;
        border: 1px solid #DCDCDC;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 2px 2px rgba(7,17,27,0.15);
          &::after {
            position: absolute;
            top: -40px;
            left: 0;
            padding: 5px 10px;
            content:attr(data-title);
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            white-space: nowrap;
          }
        }
      }
      .tag-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        object-fit: contain;
      }
      .tag-name {
        padding: 2px;
      }
    }
  }
</style>