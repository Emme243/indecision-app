<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">{{ counter }}</p>

  <div class="buttons-container">
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from '@vue/reactivity'

const props = defineProps({
  title: { type: String },
  start: {
    type: Number,
    default: 100,
    validator(value: number): boolean {
      return value >= 0
    },
  },
})
const { start, title } = toRefs(props)

const counter = ref<number>(start.value)
const getSquareValue = (): number => start.value * start.value
const increase = () => counter.value++
const decrease = () => counter.value--
const squareCounter = computed<number>(() => counter.value * counter.value)
const customTitle = computed<string>(() => title?.value || 'Counter')
</script>

<style scoped>
button {
  background-color: #64b687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
