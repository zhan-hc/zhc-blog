<template>
  <div class="menu-bar">
    <div class="menu-item" v-for="(tab, i) in tabs" :key="i" @click="tabClick(i)">
      <span class="ellipsis">{{tab[`${MODULES.JUMP}_tag`]}}</span>
      
    </div>
    <div class="menu__active-bar" :style="barStyle"></div>
  </div>
</template>

<script lang='ts' setup>
  import { ref, watch, nextTick } from 'vue';
  import type { CSSProperties } from 'vue'
import { MODULES } from '../../../constants';
import { JumpType } from '../../../constants/types';
  const props = defineProps({
    tabs: {
      type: Array<JumpType>,
      default: () => []
    }
  })
  const emits = defineEmits(['tabClick'])

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
    emits('tabClick', index)
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
  position: fixed;
  left: 50px;
  top: 100px;
  box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
  border-radius: 6px;
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    max-width: 200px;
    &:hover {
      cursor: pointer;
    }
    &:last-of-type {
      margin-bottom: 0;
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