<template>
  <div class="bg-gray-800 h-screen text-gray-200 py-10 px-5">
    <img
      v-if="image"
      :src="image"
      alt="Yes or No Gif"
      class="fixed top-0 left-0 z-0 w-screen h-screen object-cover"
    />
    <div class="bg-dark w-screen h-screen bg-black opacity-40 fixed top-0 left-0 z-10"></div>

    <div class="z-20 relative text-center">
      <input
        type="text"
        placeholder="Make a question"
        v-model="question"
        class="rounded px-3 py-1 text-gray-900 placeholder-gray-400 text-lg w-auto outline-none"
      />
      <p class="text-xl mt-2">Remember finish your question with an (?)</p>

      <div v-show="isValidQuestion" class="mt-8">
        <h2 class="text-3xl">{{ question }}</h2>
        <h1 class="text-6xl uppercase">{{ answer }}!</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

// isValidQuestioin block
const isValidQuestion = ref<boolean>(false);

// question block
const question = ref<string>('');
watch(question, function (value) {
  isValidQuestion.value = false;
  if (!value.endsWith('?')) return;
  isValidQuestion.value = true;
  getAnswer();
});

// answer and image block
interface yesnoResponseType {
  answer: string;
  forced: boolean;
  image: string;
}
const answer = ref<string>('');
const image = ref<string>('');
async function getAnswer() {
  answer.value = 'Let me think...';
  const { answer: answerResponse, image: imageResponse }: yesnoResponseType = await fetch(
    'https://yesno.wtf/api'
  ).then(r => r.json());
  answer.value = answerResponse;
  image.value = imageResponse;
}
</script>
