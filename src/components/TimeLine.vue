<template>
  <div class="time-line" :class="class" ref="timeLineContainer">
    <div
      class="time-line__row"
      :style="{ 'margin-bottom': `${rowSpacing}px` }"
      ref="timeLineRow"
      v-for="(item, index) in timeLineRowData"
      :key="`${index}timelinerow`"
    >
      <component v-for="slot in item" :key="`${slot.key as string}`" :is="slot" :connectWidth="connectWidth"></component>
    </div>
  </div>
</template>

<script setup lang="ts" name="time-line">
import { nextTick, onBeforeMount, onMounted, reactive, ref, useSlots, VNode } from 'vue';
import { createEmptyItems } from '../utils/empty';

const props = withDefaults(
  defineProps<{
    class?: string;
    col?: number;
    rowSpacing?: number;
  }>(),
  {
    class: '',
    col: 5,
    rowSpacing: 50,
  }
);

const slots = useSlots();
const timeLineRowData = reactive<VNode[][]>([]);
onBeforeMount(() => {
  const childNodes = slots.default?.()[0].children as VNode[] || [];
  if (!childNodes.length) {
    console.warn('please use at least one time-line-item component!');
    return;
  }
  const rowNum = props.col;
  let rowIdx = 0;
  while (rowIdx <= childNodes.length - 1) {
    const rowData = childNodes.slice(rowIdx, rowIdx + rowNum);
    if (rowData.length < rowNum) {
      rowData.push(...createEmptyItems(rowNum - rowData.length));
    }
    timeLineRowData.push(rowData);
    rowIdx += rowNum;
  }
});

const timeLineContainer = ref<HTMLElement | null>(null);
const timeLineRow = ref<HTMLElement[] | null>(null);
const connectWidth = ref(0);
onMounted(() => {
  if (!timeLineContainer.value) {
    console.warn('time-line component init failed!');
    return;
  }
  nextTick(() => {
    if (timeLineRow.value) {
      const timeLineItem = timeLineRow.value[0].children[0];
      const width = timeLineItem.clientWidth;
      document.querySelectorAll('.empty-item').forEach((item) => {
        (item as HTMLElement).style.width = `${width}px`;
      });
      connectWidth.value = (timeLineRow.value[0].clientWidth - width * (props.col)) / (props.col - 1);
    }
  });
});
</script>

<style lang="scss" scoped>
.time-line {
  width: 100%;
  padding: 0 100px;
  &__row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    &:nth-child(2n) {
      flex-direction: row-reverse;
      :deep(.time-line__item:last-of-type .time-line__item-connect){
        display: none;
      }
      :deep(.time-line__item .time-line__item-connect .icon) {
        transform: rotate(180deg);
      }
    }
    &:nth-child(2n - 1) {
      :deep(.time-line__item:first-of-type .time-line__item-connect){
        display: none;
      }
    }
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>
