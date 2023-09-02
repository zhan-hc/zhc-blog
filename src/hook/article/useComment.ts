import { getCommentList } from '@/api/comment'
import { CommentType } from '@/constants/types'
import { onMounted, reactive, toRefs } from 'vue'
export default function (id: number) {

  const state: {
    commentList: CommentType[]
  } = reactive({
    commentList: []
  })


  onMounted(async () => {
    await fetchCommentList()
  })

  const fetchCommentList = async () => {
    const [_err, { commentList = [] }]: any = await getCommentList(id)
    state.commentList = commentList
  }

  return {
    fetchCommentList,
    ...toRefs(state)
  }
}