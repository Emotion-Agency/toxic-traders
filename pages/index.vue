<script setup lang="ts">
const inputsList = reactive([
  {
    title: 'Email',
    required: true,
    id: 'email',
    name: 'Email',
    type: 'textarea',
    validation: 'email',
    validationText: 'incorrect email',
    error: true,
    value: '',
    placeholder: 'Email',
    disabled: false,
  },
  {
    title: 'First Name',
    required: true,
    id: 'first-name',
    name: 'First Name',
    type: 'text',
    validation: 'name',
    validationText: 'incorrect first name',
    error: true,
    value: '',
    placeholder: 'First Name',
    disabled: false,
  },
])

const onChange = val => {
  console.log(val)
}

// onMounted(async () => {
//   const data = await getSortedBrokers()

//   console.log(data)
// })
</script>

<template>
  <main>
    <section>
      <div class="container">
        <h1 class="22">Hello from Emotion!</h1>
        <TheButton tag="button" button-size="large" variant="soft">
          Button
          <template #icon>afafa</template>
        </TheButton>
        <TheBadge variant="outlined" :is-button="true">Badge</TheBadge>
        <TheAlert variant="danger">
          A simple content alert—check it out!
        </TheAlert>
        <TheInput
          v-for="(input, idx) in inputsList"
          :id="input.id"
          ref="$inputs"
          :key="idx"
          class="form__item"
          :required="input.required"
          :title="input.title"
          :name="input.name"
          :type="input.type"
          :validation="input.validation"
          :validation-text="input.validationText"
          :error="input.error"
          :placeholder="input.placeholder"
          :disabled="input.disabled"
          @input-value="onChange"
        />
      </div>
    </section>
  </main>
</template>
