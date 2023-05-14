<template>
  <div class="time-line__item" :style="itemStyle">
    <!-- 步骤图标 -->
    <div class="time-line__item-step" ref="step">
      <slot name="step"></slot>
    </div>
    <!-- 每一步的内容 -->
    <div class="time-line__item-content">
      <slot name="content"></slot>
    </div>
    <div class="time-line__item-connect" ref="connect" :style="connectStyle">
      <svg
        t="1684067650235"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="12567"
        width="10"
        height="10"
      >
        <path
          d="M238.3 960l98.1-448-98.1-448 547.4 448-547.4 448z"
          :fill="active ? activeColor : defaultColor"
          p-id="12568"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, onMounted, reactive, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    defaultColor?: string;
    activeColor?: string;
    active?: boolean;
    connectWidth?: number;
  }>(),
  {
    defaultColor: '#999999',
    activeColor: '#f98686',
    active: false,
    connectWidth: 0,
  }
);

const step = ref<HTMLElement| null>(null);
const connect = ref<HTMLElement| null>(null);
const connectStyle = computed<CSSProperties>(() => {
  if (!step.value || !connect.value) {
    return {};
  }
  const { width, height } = step.value.getBoundingClientRect();
  return {
    right: `${width}px`,
    top: `${height / 2}px`,
    backgroundColor: props.active ? props.activeColor : props.defaultColor,
    width: `${props.connectWidth}px`,
  };
});

const itemStyle = reactive<CSSProperties>({});
onMounted(() => {
  if (!step.value || !connect.value) {
    return;
  }
  const { width } = step.value.getBoundingClientRect();
  itemStyle.width = `${width}px`;
});
</script>

<style lang="scss" scoped>
.time-line {
  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: visible;
    &-content {
      white-space: nowrap;
      margin-top: 5px;
    }
    &-connect {
      position: absolute;
      height: 1px;
      overflow: visible;
      .icon {
        position: absolute;
        top: -4.5px;
        left: 50%;
        margin-left: -5px;
      }
    }
  }
}
</style>
