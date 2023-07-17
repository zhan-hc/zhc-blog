import {ref} from 'vue'
export default function useCounter () {

  let count = ref(0)

  const add = () => {
    count.value += 1
  }

  const minue = () => {
    count.value -= 1
  }

  return {
    count,
    add,
    minue
  }
}