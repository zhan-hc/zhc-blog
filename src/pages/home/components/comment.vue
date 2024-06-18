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
                            v-for="item in 5" :key="item" 
                            :src="`${imgHost}/avatar/avatar${item}.png`"
                            style="margin: 0 10px 5px 0; cursor: pointer;width: 48px; height: 48px;"
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
            <textarea v-model="content" rows="4" :placeholder="commentPlaceholder"></textarea>
            <div class="btn" @click="onSubmit">提交</div>
        </div>
    </div>
    <div class="comment-list">
        <div class="comment-box" v-for="item in props.commentList" :key="item.c_id" :class="{author : item.isAuthor}">
            <div class="comment-item">
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
            <div class="comment-repay" v-for="childComment in item.comment_repay" :key="childComment.c_id" :class="{author : childComment.isAuthor}">
                <img class="item-avatar" :src="childComment.avatar" alt="">
                <div class="item-content">
                    <svg width="17" height="10" class="radius">
                        <path
                        :fill="childComment.isAuthor ? '#3CB371' : '#49b1f5'" 
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
                        {{ childComment.content }}
                    </div>
                </div>
            </div>
            <div class="repay-text" @click="repay(item)">{{ repayId ? '取消回复' : '回复' }}</div>
        </div>
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
    const commentPlaceholder = ref('评论内容')
    const curAvatarIndex = ref(1)
    const content = ref('')
    const repayId = ref('')

    const onSubmit = () => {
        emit('submit', {
            avatar: `${envApiHost}/static/avatar/avatar${curAvatarIndex.value}.png`,
            content: content.value
        })
    }
    const repay = (comment: any) => {
        commentPlaceholder.value = repayId.value ? '评论内容'  : `回复‘${comment.content}’`
        repayId.value = repayId.value ? '' : comment.c_id
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
        .comment-box {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 20px;
            &:not(.author):hover {
                .repay-text {
                    display: block;
                }
            }
            &.author {
                flex-direction: row-reverse;
                .comment-item, .comment-repay {
                    flex-direction: row-reverse;
                }
                .item-content {
                    margin-right: 20px;
                    margin-left: 0;
                    .radius {
                        left: unset;
                        right: -18px;
                        transform: translateY(-50%) rotate(90deg) scale(1.5, 2);
                    }
                    .text {
                        background-color: #3CB371;
                    }
                }
                .item-avatar {
                    padding: 6px;
                    box-sizing: border-box;
                }
                 
            }
            .comment-item, .comment-repay {
                align-items: center;
                display: flex;
            }
            .comment-repay {
                margin-left: 60px;
                &.author {
                    .item-avatar {
                        padding: 6px;
                        box-sizing: border-box;
                    }
                    .item-content {
                        .text {
                            background-color: #3CB371;
                        }
                    }
                }
            }
            .item-avatar {
                width: 48px;
                height: 48px;
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
            .repay-text {
                display: none;
                position: absolute;
                top: 5px;
                right: 20px;
                color: $primary-color;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
  }
</style>