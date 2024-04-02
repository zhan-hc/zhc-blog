<template>
  <div class="article-comment card">
    <div class="content-wrap">
        <div class="left-content">
            <el-popover
                :width="210"
                >
                <template #reference>
                    <el-avatar :src="`${envApiHost}/static/avatar/avatar${curAvatarIndex}.png`" />
                </template>
                <template #default>
                    <div style="display: flex;flex-wrap: wrap;">
                        <img 
                            v-for="item in 16" :key="item" 
                            :src="`${envApiHost}/static/avatar/avatar${item}.png`" 
                            width="36" height="36" 
                            style="margin: 0 10px 5px 0; cursor: pointer;"
                            @click="curAvatarIndex = item"
                        />
                    </div>
                </template>
            </el-popover>
        </div>
        <div class="right-content">
            <svg width="17" height="10" class="radius">
                <path
                fill="white" 
                d="
                    M 0 10 
                    A 10,10,0,0,0,8 7 
                    A 3,3,0,0,1,9 7
                    A 10 10,0,0,0,17 10
                "
                stroke="#c2c8d1"
                stroke-width="1"
                />
            </svg>
            <textarea v-model="content" rows="4" placeholder="评论内容"></textarea>
            <div class="btn" @click="onSubmit">提交</div>
        </div>
    </div>
    <div class="comment-list">
        <div class="comment-item" v-for="item in props.commentList" :key="item.c_id" :class="{'right': item.isAuthor}">
            <img class="item-avatar" :src="item.avatar" alt="">
            <div class="item-content">
                <svg width="17" height="10" class="radius">
                    <path
                    :fill="item.isAuthor ? '#3CB371' : '#49b1f5'" 
                    d="
                        M 0 10 
                        A 10,10,0,0,0,8 7 
                        A 3,3,0,0,1,9 7
                        A 10 10,0,0,0,17 10
                    "
                    stroke-width="1"
                    />
                </svg>
                <div class="text">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <div class="comment-item"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
    import { CommentType } from '@/constants/types'
    import { envApiHost } from '@/utils/env'
    import { ref } from 'vue'

    const emit = defineEmits(['submit'])
    const props = defineProps({
        commentList: {
            type: Array<CommentType>,
            default: () => []
        }
    })
    const curAvatarIndex = ref(1)
    const content = ref('')

    const onSubmit = () => {
        emit('submit', {
            avatar: `${envApiHost}/static/avatar/avatar${curAvatarIndex.value}.png`,
            content: content.value
        })
    }
</script>

<style scoped lang='scss'>
  .article-comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    .content-wrap {
        display: flex;
    }
    .left-content {
        display: flex;
        align-items: center;
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .right-content {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: 15px;
        .radius {
            z-index: 2;
            position: absolute;
            top: 50%;
            left: -21px;
            transform: translateX(0.5px) translateY(-50%) rotate(-90deg) scale(1.5, 2.8);
        }
        .btn {
            position: absolute;
            right: 5px;
            bottom: 5px;
            margin-top: 10px;
            padding: 5px 10px;
            background: $primary-color;
            color: #fff;
            letter-spacing: 1px;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
            }
        }
        textarea {
            width: 100%;
            padding: 5px;
            border: 2px solid #ccc;
            border-radius: 6px;
            resize: none;
            box-sizing: border-box;
            &:focus {
                outline: none;
                border: 2px solid #ccc;
            }
        }
    }
    .comment-list {
        .comment-item {
            display: flex;
            align-items: center;
            margin-top: 20px;
            .item-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
            }
            .item-content {
                position: relative;
                margin-left: 5px;
                .radius {
                    position: absolute;
                    left: -3px;
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg) scale(1.5, 2);
                }
                .text {
                    margin-left: 15px;
                    padding: 10px 15px;
                    color: #fff;
                    background-color: $primary-color;
                    border-radius: 6px;
                }
            }
            &.right {
                flex-direction: row-reverse;
                .item-content {
                    margin-right: 20px;
                    margin-left: 0;
                }
                .radius {
                    left: unset;
                    right: -18px;
                    transform: translateY(-50%) rotate(90deg) scale(1.5, 2);
                }
                .text {
                    background-color: #3CB371;
                }
            }
        }
    }
  }
</style>