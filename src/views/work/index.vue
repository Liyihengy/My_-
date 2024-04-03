<script setup lang="ts">
import { ref } from 'vue';
import qdesignImage from '../../assets/work/empty.png'
import useMousePosition from '@/hook/mouse-position';
const cardList = ref([
  {
    title: '设计资产',
    tag: 'Assets',
    desc: '设计系统、图标、可视化组件等',
    link: 'https://works.meiye.art/FD8Pa151G9310A21',
    cover: qdesignImage,
  },

  {
    title: '设计资产',
    tag: 'Assets',
    desc: '设计系统、图标、可视化组件等',
    link: 'https://works.meiye.art/FD8Pa151G9310A21',
    cover: qdesignImage,
  },

  {
    title: '设计资产',
    tag: 'Assets',
    desc: '设计系统、图标、可视化组件等',
    link: 'https://works.meiye.art/FD8Pa151G9310A21',
    cover: qdesignImage,
  },

  {
    title: '设计资产',
    tag: 'Assets',
    desc: '设计系统、图标、可视化组件等',
    link: 'https://works.meiye.art/FD8Pa151G9310A21',
    cover: qdesignImage,
  },
])

const { handleMouseMove, handleMouseLeave, elementStyle } = useMousePosition('.magicalCard')

</script>

<template>
  <div class="blog w-full flex flex-col items-center  max-w-242 pt-39  pb-15 min-h-208">
    <div class="alert w-full p-4 mb-8 flex items-center gap-3 rounded-1.5">
      <div class="ico text-base lh-6">💕</div>
      <div class="text text-sm lh-6 c-#b3b3c1">为了节省您的宝贵时间，这里特地准备了一份精简版作品集，重点讲述设计资产与 B 端产品部分。</div>
    </div>
    <div class="card-list" @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave()">
      <template v-for="(item, index) in cardList" :key="index">
        <div class="magicalCard item" :style="elementStyle(index)">
          <a :href="item.link" target="_blank" class="flex flex-col p-4 gap-4">

            <div class="dark">
              <img class="cover w-full rounded-1.5 opacity-90" :src="item.cover">
            </div>

            <div class="text flex flex-col gap-1 opacity-80">
              <div class="title-area flex w-full justify-between items-center gap-2">
                <div class="title flex items-center gap-1.5">
                  <div class="name text-sm lh-6 font-500">{{ item.title }}</div>
                  <div class="name link text-sm c-#15a675 "> ↗</div>
                </div>
                <div class="tag tag-assets">{{ item.tag }}</div>
              </div>
              <div class="desc w-full text-xs lh-5 c-#b3b3c1">{{ item.desc }}</div>
            </div>

          </a>
          <div class="show"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/public-mixin.scss' as *;
.alert {
  background: linear-gradient(180deg, rgba(78, 78, 100, 0.16) 0%, rgba(78, 78, 100, 0.08) 100%);
}

.card-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 16px;

  .magicalCard {
    position: relative;
    border-radius: 6px;
    --circle-size: 400px;
    background-color: #141419;
    box-shadow: 0px 0px 8px 0px rgba(10, 10, 14, 0.4);

    .cover {
      transition: opacity .2s;
    }

    .text {
      transition: opacity .2s;

      .title {
        .name {
          color: #e8e8f6;

          &.link {
            color: #6361DC;
            opacity: 0;
            transition: opacity .2s;
          }
        }
      }

      .tag {
        font-size: 12px;
        line-height: 100%;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 9999px;

        &.tag-assets {
          color: #9255d2;
          background: rgba(137, 85, 210, 0.1);
        }
      }
    }

    // hover样式
    // hover border
    &::before,
    &::after {
      border-radius: 6px;
      @include afterBefore-public-styles;
    }

    // hoverBoder 渐变
    &::before {
      // 径向渐变,以鼠标中心为原点进行渐变
      background: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3), transparent 40%);
      z-index: -1;
    }

    // boder
    &::after {
      // 线性渐变
      background: linear-gradient(180deg, rgba(78, 78, 100, 0.48) 0%, rgba(78, 78, 100, 0.2) 100%);
      z-index: -2;
    }

    .show {
      @include showStyle;
    }

    &:hover {

      .show,
      .text,
      .cover,
      .name.link {
        opacity: 1 !important;
      }
    }
  }
}
</style>
