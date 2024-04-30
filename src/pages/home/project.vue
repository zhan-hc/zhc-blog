<template>
  <main-frame :rightShow="false">
    <div class="content-container">
      <div class="project-title">
        我的项目
      </div>
      <el-skeleton animated :loading="loading">
        <template #template>
          <el-skeleton-item variant="image" style="width: 220px; height: 170px" />
          <el-skeleton-item variant="p"  style="width: 220px;margin-top: 10px"/>
        </template>
      </el-skeleton>
      <div class="project-list">
        <div class="card project-item" v-for="item in projectList" :key="item.project_id" @click="projectClick(item)">
          <img class="project-img" :src="item.project_imgurl" alt="" />
          <span class="project-name ellipsis">{{ item.project_name }}</span>
        </div>
      </div>
      <empty-state v-if="!loading && !projectList.length"/>
    </div>
  </main-frame>
</template>

<script lang='ts' setup>
import useRouter from '@/hook/common/useRouter'
import useProject from '@/hook/project/useProject'
import useCollect from '@/hook/common/useCollect'
import mainFrame from '@/components/common/main-frame.vue'
import emptyState from '@/components/common/empty-state.vue'
import { onMounted } from 'vue'
import { ProjectType } from '@/constants/types'

  const { reportEvent } = useCollect()
  const { projectList, loading } = useProject()
  const { openWindow } = useRouter()

  const projectClick = (item: ProjectType) => {
    const common = JSON.stringify({
      project_url: item.project_url,
      project_name: item.project_name
    })
    reportEvent(`博客项目页面_项目点击_${item.project_name}`, { common })
    openWindow(item.project_url)
  }

  onMounted(() => {
    reportEvent(`博客项目页面`, { type: 'view' })
  })
  
</script>

<style scoped lang='scss'>
  .content-container {
    height: calc(100vh - 64px);
    margin: 0 auto;
    .project-title {
      font-size: 24px;
      font-weight: bold;
      @include font_color(0);
      margin-bottom: 20px;
    }
    .project-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &::after {
        content: '';
        width: 220px;
      }
      .project-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 220px;
        height: 170px;
        margin-bottom: 20px;
        padding: 10px;
        &:hover {
          cursor: pointer;
        }
        .project-img {
          width: 220px;
          height: 140px;
          border-radius: 5px;
        }
        .project-name {
          margin-top: 10px;
          font-weight: bold;
          @include font_color(1);
        }
      }
    }
  }
</style>