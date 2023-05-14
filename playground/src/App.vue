<template>
  <time-line class="my-time-line" :col="6">
    <time-line-item v-for="(item, index) in step" :key="`${index}lineitem`" :active="index <= activeIdx">
      <template #step>
        <div class="step" :class="{ active: index <= activeIdx }">
          {{ index + 1 }}
        </div>
      </template>
      <template #content>
        <span class="context">{{ item }}</span>
      </template>
    </time-line-item>
  </time-line>
</template>

<script setup lang="ts">
import { TimeLine, TimeLineItem } from 'time-line';
import { reactive, ref } from 'vue';

const step = reactive(['合同会签', '合同终审', '等待合同盖章', '合同复核', '创建订单', '排产', '生产', '入库', '发货', '签收', '回款', '完工']);
const activeIdx = ref(2);
</script>

<style lang="scss" scoped>
.my-time-line {
  background-color: #fff;
  width: 600px;
}
.step {
  background-image: url('./assets/step_bg.png');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  &.active {
    background-image: url('./assets/step_bg-active.png');
    color: #fff;
  }
}
.context {
  color: #333;
  font-size: 13px;
}
</style>
