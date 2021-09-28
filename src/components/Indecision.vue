<template>
  <img v-if="image" :src="image" alt="BG" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input type="text" placeholder="Make a question" v-model="question" />
    <p>Remember finish your question with an (?)</p>

    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}!</h1>
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
interface answerResponse {
  answer: string;
  forced: boolean;
  image: string;
}
const answer = ref<string>('');
const image = ref<string>('');
async function getAnswer() {
  answer.value = 'Pensando...';
  const { answer: answerRes, image: imageRes }: answerResponse = await fetch(
    'https://yesno.wtf/api'
  ).then(r => r.json());
  answer.value = answerRes;
  image.value = imageRes;
}
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
