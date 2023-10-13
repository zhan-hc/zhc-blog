<template>
  <div class="menu-bar card">
    <div class="menu-item" :class="{active: activtTab === i}" v-for="(tab, i) in tabs" :key="i" @click="tabClick(i)">
      <a class="ellipsis menu-text" :href="`#nav-bar_${i + 1}`">{{tab.jump_tag}}</a>
    </div>
    <div v-if="tabs.length" class="menu__active-bar" :style="barStyle"></div>
  </div>
</template>

<script lang='ts' setup>
  import { ref, watch, nextTick, computed } from 'vue'
  import type { CSSProperties } from 'vue'
  import { JumpType } from '@/constants/types'
  const props = defineProps({
    tabs: {
      type: Array<JumpType>,
      default: () => []
    }
  })

  const barStyle = ref<CSSProperties>()
  const activtTab = computed(() => props.tabs.findIndex((tab:any) => tab.active))
  const getBarStyle = () => {
    return {
      transform: `translateY(${(activtTab.value) * 40 + 8}px)`
    }
  }
  const update = () => (barStyle.value = getBarStyle())
  
  const tabClick = (index: number) => {
    props.tabs.map((tab: any, i) => {
      tab.active = i === index
    })
  }
  
  watch(
  () => props.tabs,
  async () => {
    await nextTick()
    update()
    
  },
  { immediate: true, deep: true }
)

</script>

<style scoped lang='scss'>
.menu-bar {
  position: relative;
  max-height: 500px;
  @include bg_color();
  border-radius: 6px;
  overflow-y: scroll;
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 200px;
    height: 40px;
    padding: 0 20px;
    @include font-color(1);
    box-sizing: border-box;
    .menu-text {
      padding-bottom: 5px;
    }
    &.active {
      color: $primary-color;
      font-weight: bold;
    }
    &:hover {
      cursor: pointer;
      color: $primary-color-sub;
      font-weight: bold;
      .menu-text {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background-color: $primary-color-sub;
          border-radius: 2px;
          animation: lineRight .3s linear;
        }
      }
      
    }
  }
  .menu__active-bar {
    position: absolute;
      top: 0;
      left: 8px;
      width: 4px;
      height: 24px;
      border-radius: 4px;
      background-color: $primary-color;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
@keyframes lineRight {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>