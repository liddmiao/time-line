import { h, VNode } from 'vue';
import { createUUID } from './uuid';
/**
 * 生成无内容的vnode列表
 * @param num 长度
 * @param style 样式
 * @returns 虚拟dom列表
 */
export const createEmptyItems = (num: number): VNode[] => {
  const res: VNode[] = [];
  for (let i = 0; i < num; i++) {
    res.push(h('span', { key: createUUID(), className: 'empty-item' }));
  }
  return res;
};
