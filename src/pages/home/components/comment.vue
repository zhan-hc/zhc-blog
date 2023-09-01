<template>
  <div class="article-comment card">
    <div class="content-wrap">
        <div class="left-content">
            <el-popover
                :width="300"
                >
                <template #reference>
                    <el-avatar :src="'@/assets/image/avatar/avatar1.png'" />
                </template>
                <template #default>
                    <el-avatar v-for="item in 16" :key="item" src="@/assets/image/avatar/avatar1.png" />
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
            <textarea rows="4" placeholder="评论内容"></textarea>
            <div class="btn">提交</div>
        </div>
    </div>
    <div class="comment-list">
        <div class="comment-item" v-for="item in 2" :key="item" :class="{'right': item?.myself}">
            <img class="item-avatar" src="@/assets/image/avatar/avatar1.png" alt="">
            <div class="item-content">
                <svg width="17" height="10" class="radius">
                    <path
                    fill="#49b1f5" 
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
                    写的很好，一步步引导思路
                </div>
            </div>
        </div>
        <div class="comment-item"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
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
        }
        textarea {
            width: 100%;
            padding: 5px;
            border: 2px solid $blog-font-4;
            border-radius: 6px;
            resize: none;
            box-sizing: border-box;
            &:focus {
                outline: none;
                border: 1px solid $blog-font-4;
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
                justify-content: flex-end;
            }
        }
    }
  }
</style>