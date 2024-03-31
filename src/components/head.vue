<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// 控制动态样式
// 用于存储活跃的li的索引
const activeIndex = ref(0)

// 点击赋值,控制active
// 菜单与路由的映射关系

const router = useRouter()

// 头部导航菜单数据
const menuList = ['Home', 'Work', 'Blog', 'About']
function handleActive(index: number, routeName: string) {
  // 记录索引
  activeIndex.value = index
  router.push({ name: routeName.toLowerCase() })
}

// 控制 show 元素的透明度
const isHovered = reactive<Record<number, boolean>>({})

// 处理鼠标移动事件
function handleMouseMove(event: MouseEvent, index: number) {
  const element = event.target as HTMLElement
  if (!element)
    return
  // 获取位置信息
  const rect = element.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const offsetY = event.clientY - rect.top
  element.style.setProperty('--mouse-x', `${offsetX}px`)
  element.style.setProperty('--mouse-y', `${offsetY}px`)
  isHovered[index] = true
}

// 处理鼠标离开事件
function handleMouseLeave(event: MouseEvent, index: number) {
  const element = event.target as HTMLElement
  element.style.setProperty('--mouse-x', `100px`)
  element.style.setProperty('--mouse-y', `100px`)
  isHovered[index] = false
}
</script>

<template>
  <div class="head w-full h-14 px-10 py-0 z-99 ">
    <div class="main w-full">
      <img src="../assets/public/logo_text.svg" class="h-5">
      <ul gap-3>
        <template v-for="(item, index) in menuList" :key="index">
          <li
            class="magical btn rounded-full py-1.5 px-4 cursor-pointer" :class="{ active: activeIndex === index }"
            @click="handleActive(index, item)" @mousemove="handleMouseMove($event, index)"
            @mouseleave="handleMouseLeave($event, index)"
          >
            {{ item }}
            <div class="show" :style="{ opacity: isHovered[index] ? 1 : 0 }" />
          </li>
        </template>
      </ul>
    </div>
    <div class="logo">
      <img src="../assets/public/logo.svg">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.head {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $head-background-color;
  backdrop-filter: blur(4px);

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: $head-width;

    ul {
      display: flex;

      li {
        // 变量
        --circle-size: 100px;
        --inset: 1px;
        --border: 9999px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border);
        background-color: $btn-bgc-color;
        // 动画
        // 创建一个径向渐变,--circle-size是圆的大小,at var(--mouse-x) var(--mouse-y): 这里指定了渐变的中心位置,在半径的 40% 处变成完全透明
        background-image: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%);
        transition: .3s background ease-in-out;

        // hover border
        &::before,
        &::after {
          content: '';
          position: absolute;
          // 原有的高度上加2
          width: calc(100% + var(--inset)* 2);
          height: calc(100% + var(--inset)* 2);
          // 这里是befalor和after的样式
          border-radius: var(--border);
          // 所有四边均向外偏移1像素
          inset: calc(0 - var(--inset));
          z-index: -1;
        }

        // 高光boder
        &::after {
          z-index: -2;
          background: linear-gradient(180deg, rgba(78, 78, 100, 0.68) 0%, rgba(78, 78, 100, 0.2) 100%);
        }

        // hoverBoder 渐变
        &::before {
          background: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%);
        }

        // 选中样式
        &.active {
          background-color: $btn-bgc-active-color;

          &::after {
            background-color: #6361DC
          }
        }
      }
    }
  }

  .show {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    border-radius: var(--border);
    pointer-events: none;
    background: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.01), transparent 40%);
    /* hover fill */
  }

  .logo {
    position: absolute;
    inset: calc(20px + 56px) 0 0;
    display: block;
    font-size: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    img {
      margin-bottom: 10px;
      animation: rotate 6s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: url(../assets/public/head_bottom_line.svg) no-repeat center top;
      z-index: -1
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
