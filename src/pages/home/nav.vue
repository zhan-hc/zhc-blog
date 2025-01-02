<template>
  <div class="tab-container">
    <ja-anchor container=".tab-content" class="tab-anchor">
      <ja-anchor-link :href="`#${tab.jump_tag}_${tab.jump_id}`" :title="tab.jump_tag" v-for="tab in linkList" :key="tab.jump_id"></ja-anchor-link>
    </ja-anchor>
    <div class="tab-content">
      <ja-card class="card tab-list" v-for="tab in linkList" :key="tab.jump_id" :id="`${tab.jump_tag}_${tab.jump_id}`">
        <template #header>
          <span class="tag-title">{{ tab.jump_tag }}</span>
          <span class="tag-desc">{{ tab.jump_desc }}</span>
        </template>
        <div v-for="(link, j) in tab.jump_links" :key="j" class="tag-item" @click="toNavUrl(link)" :data-title="link.link_desc || link.link_name">
          <img v-imgErr v-if="link.link_icon" class="tag-icon" :src="link.link_icon" alt="图标">
          <span class="tag-name ellipsis">{{ link.link_name }}</span>
        </div>
      </ja-card>
    </div>
  </div>
  
</template>

<script lang='ts' setup>
  import { onMounted } from 'vue'
  import MenuBar from '../../components/menu-bar.vue'
  import useScrollAnchor from '@/hook/common/useScrollAnchor'
  import useLink from '@/hook/nav/useLink'
  import useRouter from '@/hook/common/useRouter'
  import { useBury } from 'janus-bury'
  import { LinksType } from '@/constants/types'
  
  const { openWindow } = useRouter()
  const { linkList } = useLink()
  const { dataSender } = useBury()

  const toNavUrl = (link: LinksType) => {
    const common = JSON.stringify({
      link_id: link.link_id,
      link_name: link.link_name
    })
    dataSender.value?.track({
      event_name: `快捷导航-${link.link_name}`,
      event_msg: JSON.stringify(common),
      event_type: 'click'
    })
    openWindow(link.link_url)
  }
</script>

<style scoped lang='scss'>
.tab-container {
  display: flex;
  align-items: flex-start;
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
  @include font-color(1);
  .tab-anchor {
    margin: 20px 20px 0 20px;
    flex-shrink: 0;
    box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
    border-radius: 6px;
    border: 1px solid transparent;
    @include bg_color();
    @include border_color();
  }
  .tab-content {
    height: calc(100vh - 64px);
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .tab-list {
      display: flex;
      flex-direction: column;
      margin: 20px;
      @include bg_color();
      .tag-title {
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: bold;
        margin-right: 20px;
        @include font_color(0);
      }
      .tag-desc {
        font-size: 16px;
        color: #808080;
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
        @include font_color(2);
        @include border_color();
        @include bg_color();
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
::v-deep .ja-card {
  &__body {
    display: flex;
    flex-wrap: wrap;
  }
}

::v-deep .ja-anchor__list {
  padding: 5px 20px;
  .ja-anchor__link  {
    font-size: 14px;
  }
}

  
</style>