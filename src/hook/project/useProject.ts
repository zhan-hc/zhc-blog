import { toRefs, reactive, onMounted } from 'vue'
import { getProjectList } from '@/api/project'
import { ProjectType } from '@/constants/types'

export default function (fetchStatus = true) {
  const state: {
    loading: boolean;
    projectList: ProjectType[];
  } = reactive({
    projectList: [],
    loading: false
  })

  const getProjectData = async () => {
    state.loading = true
    const [_err, { projectList = [] }]:any = await getProjectList()
    state.projectList = projectList
    state.loading = false
  }

  onMounted(async () => {
    fetchStatus && await getProjectData()
  })

  return {
    ...toRefs(state)
  }
}