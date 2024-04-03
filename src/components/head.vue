<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useMousePosition from '@/hook/mouse-position'

const { handleMouseMove, handleMouseLeave, elementStyle } = useMousePosition('.magical')
const router = useRouter()
const route = useRoute()

// 控制动态样式
// 头部导航菜单数据
const menuList = ['Home', 'Work', 'Blog', 'About']

function isActiveRoute(menuItem: string) {
  return route.name === menuItem.toLowerCase()
}

function handleActive(routeName: string) {
  // 记录索引
  router.push({ name: routeName.toLowerCase() })
}

function handleGoHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="head w-full h-14 px-10 py-0 z-99 ">
    <div class="main w-full">
      <img src="../assets/public/logo_text.svg" class="h-5 cursor-pointer" @click="handleGoHome">
      <ul gap-3 @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave()">
        <template v-for="(item, index) in menuList" :key="index">
          <li
            class="magical btn rounded-full py-1.5 px-4 cursor-pointer" :class="{ active: isActiveRoute(item) }"
            :style="elementStyle(index)" @click="handleActive(item)"
          >
            {{ item }}
            <div class="show" />
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
@use '../styles/public-mixin.scss' as *;

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
          @include afterBefore-public-styles;
          border-radius: var(--border);
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

      .show {
        @include showStyle;
      }

      &:hover {
        .show {
          opacity: 1;
        }
      }
    }
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
