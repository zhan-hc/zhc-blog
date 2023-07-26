<template>
  <div class="menu-bar card">
    <div class="menu-item" v-for="(tab, i) in tabs" :key="i" @click="tabClick(i)">
      <a class="ellipsis" :href="`#nav-bar_${i + 1}`">{{tab.jump_tag}}</a>
    </div>
    <div v-if="tabs.length" class="menu__active-bar" :style="barStyle"></div>
  </div>
</template>

<script lang='ts' setup>
  import { ref, watch, nextTick } from 'vue';
  import type { CSSProperties } from 'vue'
  import { JumpType } from '../../../constants/types';
  const props = defineProps({
    tabs: {
      type: Array<JumpType>,
      default: () => []
    }
  })
  // const emits = defineEmits(['tabClick'])

  const barStyle = ref<CSSProperties>()

  const getBarStyle = () => {
    const activeIndex = props.tabs.findIndex((tab:any) => tab.active)
    return {
      transform: `translateY(${(activeIndex) * 40 + 8}px)`
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
  background: #ffffff;
  border-radius: 6px;
  overflow-y: scroll;
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 200px;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
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
</style>