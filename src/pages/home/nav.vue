<template>
  <div class="tab-container">
    <menu-bar :tabs="jumpTabs" class="tab-menu"></menu-bar>
    <div class="tab-content" @scroll="handleScroll($event, activeTabIndex)">
      <div class="tab-list card" v-for="(tab, i) in linkList" :key="i" :id="`nav-bar_${i + 1}`">
        <div class="tab-tag">
          <span>{{ tab.jump_tag }}</span>
          <span>{{ tab.jump_desc }}</span>
        </div>
        <div class="tag-container">
          <div v-for="(link, j) in tab.jump_links" :key="j" class="tag-item" @click="toNavUrl(link)" :data-title="link.link_desc || link.link_name">
            <img v-imgErr v-if="link.link_icon" class="tag-icon" :src="link.link_icon" alt="图标">
            <span class="tag-name ellipsis">{{ link.link_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang='ts' setup>
  import { onMounted } from 'vue'
  import MenuBar from '../../components/menu-bar.vue'
  import useScrollAnchor from '@/hook/common/useScrollAnchor'
  import useLink from '@/hook/nav/useLink'
  import useJump from '@/hook/nav/useJump'
  import useRouter from '@/hook/common/useRouter'
  import useCollect from '@/hook/common/useCollect'
  import { LinksType } from '@/constants/types'
  
  const { openWindow } = useRouter()
  const { linkList } = useLink()
  const { jumpTabs, activeTabIndex } = useJump()
  const { handleScroll } = useScrollAnchor()
  const { reportEvent } = useCollect()

  const toNavUrl = (link: LinksType) => {
    const common = JSON.stringify({
      link_id: link.link_id,
      link_name: link.link_name
    })
    reportEvent(`快捷导航-${link.link_name}`, { common })
    openWindow(link.link_url)
  }
  onMounted(() => {
    reportEvent(`博客快捷导航页面`, { type: 'view' })
  })
</script>

<style scoped lang='scss'>
.tab-container {
  display: flex;
  align-items: flex-start;
  max-width: 1100px;
  margin: 0 auto;
  @include font-color(1);
  box-sizing: border-box;
  .tab-menu {
    margin: 20px 20px 0 20px;
    flex-shrink: 0;
  }
  .tab-content {
    height: calc(100vh - 64px);
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .tab-list {
      display: flex;
      flex-direction: column;
      margin: 20px;
      padding: 20px 20px 0;
      .tab-tag {
        padding-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        border-bottom: 2px solid #d3d3d3;
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
        img {
          background-color: #fff;
        }
        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 2px 2px rgba(7,17,27,0.15);
          // &::after {
          //   position: absolute;
          //   top: -40px;
          //   left: 0;
          //   padding: 5px 10px;
          //   content:attr(data-title);
          //   font-size: 14px;
          //   border: 1px solid #ccc;
          //   border-radius: 5px;
          //   background-color: $theme-color;
          //   white-space: nowrap;
          // }
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
}
  
</style>