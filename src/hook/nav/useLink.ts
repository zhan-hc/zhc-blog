import { toRefs, reactive, onMounted } from 'vue'
import { getLinks } from '@/api/links'
import { LinkListType } from '@/constants/types'

export default function () {
  const state: {
    linkList: LinkListType[];
  } = reactive({
    linkList: []
  })

  onMounted(async () => {
    const [_err, {links = []}]:any = await getLinks()
    state.linkList = links
    console.log(links, 'ssssssssss')
  })

  return {
    ...toRefs(state)
  }
}