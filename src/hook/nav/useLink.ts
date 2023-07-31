import { toRefs, reactive, onMounted } from 'vue';
import { getLinks } from '@/api/links';
import { LinkListType } from '@/constants/types';

export default function () {
  const state: {
    linkList: LinkListType[];
  } = reactive({
    linkList: []
  })

  onMounted(async () => {
    const [err, {links = []}]:any = await getLinks()
    console.log(err)
    state.linkList = links
  })

  return {
    ...toRefs(state)
  }
}