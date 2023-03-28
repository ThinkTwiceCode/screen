<template>
  <input
    class="simple-input"
    :value="text"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  defineProps, defineEmits,
} from 'vue';

type PropsType = {
  modelValue: string,
};
const props = defineProps<PropsType>();
const emit = defineEmits({
  'update:modelValue': (v: string) => null,
});

const text = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== text.value) {
    text.value = newVal;
  }
});

function onInput(e: any) {
  const { value } = e.target;
  console.log(value);
  text.value = value;
  emit('update:modelValue', e.target.value);
}
</script>
<script lang="ts">
export default { name: 'SimpleInput' };
</script>

<style scoped lang="less">
.simple-input {
  padding: 0 var(--am-margin-s);
  width: 100%;
  font-size: 14px;
  line-height: 31px;
  border: none;
  border-bottom: 1px solid var(--am-color-black);
  transition: border var(--am-transtion-duration) ease-in-out;

  &, &:focus {
    outline: none;
  }

  &:focus {
    border-bottom-color: var(--am-primary-color);
  }
}
</style>