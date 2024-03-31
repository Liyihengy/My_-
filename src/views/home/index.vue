<script setup lang="ts">
import { Typed } from '@duskmoon/vue3-typed-js'
import type { TypedOptions } from '@duskmoon/vue3-typed-js'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import figmaIcon from '@/assets/index/figma.png'

const options: TypedOptions = {
  strings: [
    '>_ welcome to my secret garden ^1000',
    '>_ and let\'s explore it now ^1000',
  ],
  typeSpeed: 50, // 打印速度
  backSpeed: 20, // 回退速度
  startDelay: 300, // 开始之前的延迟300毫秒
  loop: true, // 是否循环
  showCursor: false, // 不显示光标
}

const cardList = ref([
  {
    title: 'Larkmap',
    desc: 'Designer website navigation',
    icon: figmaIcon,
  },
  {
    title: 'Larkmap',
    desc: 'Designer website navigation',
    icon: figmaIcon,
  },
  {
    title: 'Larkmap',
    desc: 'Designer website navigation',
    icon: figmaIcon,
  },
  {
    title: 'Larkmap',
    desc: 'Designer website navigation',
    icon: figmaIcon,
  },
])

// 用来动态存储鼠标位置
const mousePositions = reactive<Record<number, { x: number, y: number }>>({})
// 存储dom对象
const cards = ref<HTMLElement[]>([])
// 获取dom
onMounted(() => {
  cards.value = Array.from(document.querySelectorAll('.card'))
})
// 卸载移除
onUnmounted(() => {
  cards.value = []
})

// 遍历出来设置样式
function setMousePosition(index: number, x: number, y: number) {
  mousePositions[index] = { x, y }
}

// 处理鼠标移动事件
function handleMouseMove(event: MouseEvent) {
  cards.value.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    setMousePosition(index, event.clientX - rect.left, event.clientY - rect.top)
  })
}

// 动态返回一个对象
function cardStyle(index: number) {
  // 获取当前悬停元素位置
  const pos = mousePositions[index]
  if (pos) {
    return {
      '--mouse-x': pos ? `${pos.x}px` : '0px',
      '--mouse-y': pos ? `${pos.y}px` : '0px',
    }
  }
}

function resetMousePosition(index: number) {
  mousePositions[index] = { x: -100, y: -100 }
}

// 处理鼠标离开事件
function handleMouseLeave() {
  cards.value.forEach((_, index) => {
    resetMousePosition(index)
  })
}
</script>

<template>
  <div class="home w-full">
    <div class="hello w-full h-100">
      <div class="title text-8 font-bold">
        <div class="title-hi">
          Hi, I'm
        </div>
        <span>Asorn</span>
      </div>
      <div class="hello-desc">
        <Typed :options="options" class="typedClass">
          <div class="typing h-7 lh-7 mt-6 c-#B3B3C1  text-base font-300 tracking-widest " />
        </Typed>
      </div>
    </div>
    <div class="content-diver" />
    <div class="quickly-link pt-20 w-full">
      <div class="title-hi">
        What did I do
      </div>
      <div class="loader" />
      <div class="link-card w-full" @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave()">
        <template v-for="(item, index) in cardList" :key="index">
          <div class="card w-full cursor-pointer" :style="cardStyle(index)">
            <div class="card-box  flex gap-3  items-center p-4 w-full">
              <img :src="item.icon" alt="Icon" class="w-10 opacity-60">
              <div class="info w-full text-sm">
                <div class="info-title font-500 lh-6">
                  Figma
                </div>
                <div class="info-desc text-xs font-400 lh-5 c-#B3B3C1">
                  My design garden
                </div>
              </div>
              <i class="i-solar-arrow-right-linear text-6" />
            </div>
            <div class="show" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: $head-width;
  padding: 96px 40px 60px 40px;

  // 标题渐变
  .title-hi {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(180deg, #E8E8F6 0%, rgba(232, 232, 246, 0.72) 100%);
    background-clip: text;
    // 字体渐变蒙版
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        line-height: 1;
        --bg: linear-gradient(90deg, #A29CD3 0%, #E8BFAC 100%);
        background: var(--bg);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent
      }
    }

    &::after {
      // 背景
      content: '';
      position: absolute;
      width: 512px;
      height: 512px;
      background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      background-size: 8px 8px;
      mask-image: radial-gradient(at center, #fff, transparent 72%);
      -webkit-mask-image: radial-gradient(at center, #fff, transparent 72%);
      opacity: 0.6;
      z-index: -1;
    }
  }

  // 分割线
  .content-diver {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: $head-width;
    height: 1px;
    // 径向渐变
    background-image: radial-gradient(circle at center, #4E4E64 1px, transparent 1px);
    // 背景大小
    background-size: 6px 1px;
    // 重复
    background-repeat: repeat;
    // 为元素设置遮罩径向渐变
    mask-image: radial-gradient(at center, #fff, transparent 90%);
    -webkit-mask-image: radial-gradient(at center, #fff, transparent 90%);
  }

  .quickly-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: $head-width;

    .loader {
      margin: 32px 0 48px 0;
      width: 40px;
      height: 8px;
      --c: #6361DC 90deg, #0E0E13 0;
      // 创建一个以圆锥形为基础的渐变背景
      background: conic-gradient(from 135deg at top, var(--c)) 0 0, conic-gradient(from -45deg at bottom, var(--c)) 0 100%;
      background-size: calc(100% / 4) 50%;
      background-repeat: repeat-x;
      // 动画名称\时间\无限循环
      animation: l12 2s infinite;
    }

    .link-card {
      --inset: 1px;
      --border: 6px;
      --circle-size: 400px;
      width: 100%;
      max-width: $head-width;
      // grid布局
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-gap: 16px;

      .card {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #141419;
        box-shadow: 0px 0px 8px 0px rgba(10, 10, 14, 0.4);
        border-radius: var(--border);

        .card-box {
          i {
            opacity: 0;
            transition: opacity .4s;
          }
        }

        .info-title {
          background: linear-gradient(180deg, #E8E8F6 0%, rgba(232, 232, 246, 0.72) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        // hover border
        &::before,
        &::after {
          content: '';
          position: absolute;
          // 原有的高度上加2
          width: calc(100% + var(--inset)* 2);
          height: calc(100% + var(--inset)* 2);
          // 所有四边均向外偏移1像素
          border-radius: var(--border);
          inset: calc(0 - var(--inset));
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
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
          border-radius: var(--border);
          pointer-events: none;
          background: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.01), transparent 40%);
        }

        &:hover {
          .show {
            opacity: 1;
          }

          .card-box {
          i {
            opacity: .6;
          }
        }
        }
      }
    }
  }
}

@keyframes l12 {

  // 图片位置发生变化
  60%,
  100% {
    background-position: calc(100% / 3) 0, calc(100% / -3) 100%;
  }
}
</style>
