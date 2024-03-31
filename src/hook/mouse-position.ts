import { onMounted, onUnmounted, reactive, ref } from 'vue';

// 鼠标位置类型定义
interface MousePosition {
  x: number;
  y: number;
}

interface MousePositions {
  [key: number]: MousePosition;
}

// 自定义hook
function useMousePosition(selector: string) {
  // 承接dom数据
  const elementsList = ref<HTMLElement[]>([]);
  
  // 在组件挂载的时候查询传入的元素名称
  onMounted(() => {
    elementsList.value = Array.from(document.querySelectorAll(selector));
  });
  
  // 卸载的时候清空数组
  onUnmounted(() => {
    elementsList.value = [];
  });

  // 承接元素位置变量
  const mousePositions = reactive<MousePositions>({});

  // 设置元素位置
  function setMousePosition(index: number, x: number, y: number) {
    mousePositions[index] = { x, y };
  }

  // 重置元素位置
  function resetMousePosition(index: number) {
    mousePositions[index] = { x: -100, y: -100 };
  }

  // 鼠标移入监听
  function handleMouseMove(event: MouseEvent) {
    elementsList.value.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      setMousePosition(index, event.clientX - rect.left, event.clientY - rect.top);
    });
  }

  // 鼠标离去监听
  function handleMouseLeave() {
    elementsList.value.forEach((_, index) => {
      resetMousePosition(index);
    });
  }

  // 设置样式到元素上
  function elementStyle(index: number) {
    const pos = mousePositions[index];
    return {
      '--mouse-x': `${pos?.x ?? -100}px`,
      '--mouse-y': `${pos?.y ?? -100}px`,
    };
  }

  return {
    elementsList,
    handleMouseMove,
    handleMouseLeave,
    elementStyle,
  };
}

export default useMousePosition;
