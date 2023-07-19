<template>
  <menu-bar :tabs="tabs" @tabClick="tabClick"></menu-bar>
  <div class="tab-content" @scroll="handleScroll">
    <div class="tab-list card" v-for="(tab, i) in list" :key="i" :id="`nav-bar_${i}`">
      <div class="tab-tag">
        <span>{{ tab.jump_tag }}</span>
        <span v-if="tab.jump_desc">这是描述</span>
      </div>
      <div v-for="(item, j) in tab.children" :key="j" class="tag-item">
        <img class="tag-icon" :src="item.link_icon" alt="">
        <span class="ellipsis">{{ item.link_name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import MenuBar from './components/menu-bar.vue'
  import useTabs from '@/hook/home/useTabs'
  const { tabs, tabClick, list, handleScroll } = useTabs()
</script>

<style scoped lang='scss'>
  .tab-content {
    padding: 20px 200px;
    height: calc(100vh - 64px);
    box-sizing: border-box;
    overflow-y: scroll;
    .tab-list {
      margin-bottom: 20px;
      padding: 20px;
      .tab-tag {
        padding-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        border-bottom: 3px solid $primary-color;
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
      .tag-item {
        display: inline-flex;
        align-items: center;
        max-width: 100px;
        margin-top: 20px;
        margin-right: 20px;
        padding: 5px 15px;
        font-size: 18px;
        border: 1px solid #DCDCDC;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        &:hover {
          cursor: pointer;
        }
      }
      .tag-icon {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
    }
  }
</style>