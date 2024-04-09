<script setup lang="ts">
const checkboxItemsList = ref([])
const radioItem = ref('')

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
    isLeftButton: true,
    isRightButton: true,
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
    isLeftButton: true,
    isRightButton: false,
  },
])

const radioList = reactive([
  {
    option: 'vue',
    id: 'vue',
    name: 'framework',
    type: 'radio',
    disabled: false,
  },
  {
    option: 'angular',
    id: 'angular',
    name: 'framework',
    type: 'radio',
    disabled: false,
  },
  {
    option: 'react',
    id: 'react',
    name: 'framework',
    type: 'radio',
    disabled: true,
  },
])

const checkboxList = reactive([
  {
    option: 'vue2',
    id: 'vue2',
    name: 'framework',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'angular2',
    id: 'angular2',
    name: 'framework',
    type: 'checkbox',
    disabled: false,
  },
  {
    option: 'react2',
    id: 'react2',
    name: 'framework',
    type: 'checkbox',
    disabled: false,
  },
])

const onChange = val => {
  console.log(val)
}

const onChangeRadio = val => {
  radioItem.value = val

  console.log(radioItem.value)
}

const onChangeCheckbox = val => {
  const index = checkboxItemsList.value.indexOf(val)

  if (index === -1) {
    checkboxItemsList.value.push(val)
  } else {
    checkboxItemsList.value.splice(index, 1)
  }

  console.log(checkboxItemsList.value)
}
</script>

<template>
  <main>
    <section style="height: 100vh">
      <!-- <div class="container">
        <TheButton tag="button" button-size="large" variant="soft">
          Button
          <template #end-icon>afafa</template>
        </TheButton>
        <TheBadge variant="outlined" :is-button="true">Badge</TheBadge>
        <TheAlert variant="danger">
          A simple content alert—check it out!
        </TheAlert>
        <TheInput
          v-for="(input, idx) in inputsList"
          :id="input.id"
          :key="idx"
          :required="input.required"
          :title="input.title"
          :name="input.name"
          :type="input.type"
          :validation="input.validation"
          :validation-text="input.validationText"
          :error="input.error"
          :placeholder="input.placeholder"
          :disabled="input.disabled"
          :is-left-button="input.isLeftButton"
          :is-right-button="input.isRightButton"
          @input-value="onChange"
        >
          <template #left-icon>
            <IconsCalendar />
          </template>
          <template #right-icon>
            <IconsCalendar />
          </template>
        </TheInput>
        <RadioInput
          v-for="(radio, idx) in radioList"
          :id="radio.id"
          :key="idx"
          :option="radio.option"
          :name="radio.name"
          :type="radio.type"
          :disabled="radio.disabled"
          @input-value="onChangeRadio"
        />
        <CheckboxInput
          v-for="(radio, idx) in checkboxList"
          :id="radio.id"
          :key="idx"
          :value="radio.option"
          :name="radio.name"
          :type="radio.type"
          :disabled="radio.disabled"
          @input-value="onChangeCheckbox"
        />
        <ThePagination :total-pages="5" />
      </div> -->
    </section>
  </main>
</template>
