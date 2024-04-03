<script setup lang="ts">
import { ref } from 'vue'
import useMousePosition from '@/hook/mouse-position';
const showCopy = ref(false)

const handleCopy = async (event: MouseEvent) => {
  showCopy.value = !showCopy.value
  const element = event.target as HTMLElement;
  // 获取元素中的文本内容
  const textToCopy = element.textContent as string;
  try {
    // 使用 Clipboard API 复制文本到剪贴板
    await navigator.clipboard.writeText(textToCopy);
    // 显示成功消息或者进行其他操作
    setTimeout(() => {
      showCopy.value = !showCopy.value
    }, 1000);
  } catch (err) {
    // 如果用户没有授予权限或者发生了其他错误
    console.error('Failed to copy:', err);
  }
}

const { handleMouseLeave, handleMouseMove, elementStyle } = useMousePosition('.magicalBtn')
</script>

<template>
  <div class="about w-full flex justify-center  max-w-242 pt-39  pb-15 min-h-208">
    <div class="about-top w-full">
      <div class="about-name mb-12">
        李依恒
      </div>
      <div class="about-info flex gap-18">
        <div class="info-left">
          <div class="info-title mb-6">Introduce</div>
          <div class="introduce-desc  c-#b3b3c1">
            目前是一名产品设计师，初级开发者，立志做一名设计工程师。拥有云计算、低代码、电商、智能客服、零信任等多行业洞察与实践落地经验。<br><br>
            我热衷于技术的无限可能性，并开启了简单的编程学习之旅。时至今日，开发了导航工具 Larkmap
            ↗（衍生品开源导航工具 ，青云图标站 及配套 Figma 插件 Figicon ↗，B
            端产品常见页面布局适配方案 Q-Adapter ↗ 等。
            我专注于探索产品设计的价值观，在极致的设计、交互与技术包容、业务理解之间寻求平衡以解决问题，持续写作与分享，累计输出超 15 万字的 技术文章 ↗。<br><br>
            如果你有兴趣，还可以来 语雀 ↗看看我种草的影视剧作品，偶尔写的中二文章，日常收集的奇思妙想。<br><br>
          </div>

        </div>
        <div class="info-right flex flex-col w-60 min-w-60 gap-8 ">
          <div class="contact">
            <div class="info-title mb-5">Contact</div>
            <div class="contact-desc">
              <div class="list mb-2">
                <div class="list-label whitespace-nowrap">邮箱：</div>
                <div class="list-value  mr-1 c-#b3b3c1" @click="handleCopy">liyiheng26@gmail.com</div>
                <span class="copied c-#15a675" :class="{ show: showCopy }">copied&nbsp;✓</span>
              </div>
              <div class="list relative">
                <div class="list-label">微信：</div>
                <div class="list-value wx">
                  lyh2120
                  <div class="tooltip-box">
                    <img src="../../assets/about/wechat.png" class="w-30 h-30 rounded">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="resume">
            <div class="info-title resume-title mb-2">Portfolio</div>
            <div class="resume-desc">
              <div class="resume-desc-helptext mb-4">下载我的作品集 (PDF &amp; 17MB)</div>
              <div
                class="magicalBtn c-#e8e8f6 lh-8 text-xs inline-block px-4 cursor-pointer rounded-full cursor-pointer"
                @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave()" :style="elementStyle(0)">
                下载
                <div class="show" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/public-mixin.scss' as *;

.about {
  .about-top {
    color: #b3b3c1;
    font-size: 14px;
    line-height: 24px;

    .about-name {
      @include titleBgc;
    }

    .info-title {
      @include titleBgc;
      font-size: 18px;
      line-height: 100%;
      font-weight: 500;
    }

    .info-right {
      .list {
        display: flex;

        .list-value {
          text-decoration: underline;
          transition: color .15s ease-out;
          cursor: pointer;

          &:hover {
            color: #6361DC;
            transition: color .15s ease-out;

            .tooltip-box {
              visibility: visible;
              opacity: 1;
            }
          }
        }

        & span {
          opacity: 0;
          transition: opacity .2s ease-out;

          &.show {
            opacity: 1;
          }
        }

        .tooltip-box {
          visibility: hidden;
          width: 160px;
          height: 160px;
          text-align: center;
          padding: 20px;
          position: absolute;
          right: 42px;
          top: 32px;
          z-index: 9999;
          opacity: 0;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0px 4px 24px rgba(10, 10, 14, 0.12);
          transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
        }
      }

      .resume {
        .resume-desc {
          .magicalBtn {
            --circle-size: 100px;
            --border: 9999px;
            position: relative;
            border-radius: var(--border);
            background-color: #6361DC;
            // 动画
            // 创建一个径向渐变,--circle-size是圆的大小,at var(--mouse-x) var(--mouse-y): 这里指定了渐变的中心位置,在半径的 40% 处变成完全透明

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
              background: radial-gradient(var(--circle-size) circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3), transparent 40%);
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
      }
    }
  }
}
</style>
