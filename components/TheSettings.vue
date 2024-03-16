<script setup lang="ts">
interface iProps {
  properties: string[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['change'])

const checkboxItemsList = ref([])

const searchInput = reactive({
  required: false,
  id: 'settings-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search property',
  disabled: false,
  isRightButton: true,
})

const checkboxList = computed(() => {
  return props.properties.map(property => {
    return {
      option: property,
      id: property,
      name: 'settings-checkboxes',
      type: 'checkbox',
      disabled: false,
      checked: false,
    }
  })
})

const onChange = val => {
  console.log(val)
}

const selectAllItems = () => {
  console.log('selected all')
}

const onChangeCheckbox = val => {
  const index = checkboxItemsList.value.indexOf(val)

  if (index === -1) {
    checkboxItemsList.value.push(val)
  } else {
    checkboxItemsList.value.splice(index, 1)
  }

  emit('change', checkboxItemsList.value)
}
</script>

<template>
  <div class="settings">
    <div class="settings__menu">
      <TheInput
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings__search-input"
        @input-value="onChange"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </TheInput>
      <TheButton
        tag="button"
        button-size="small"
        variant="outlined"
        @click="selectAllItems"
      >
        Select all
        <template #start-icon>
          <IconsDoubleCheck />
        </template>
      </TheButton>
    </div>
    <div class="settings__content">
      <CheckboxInput
        v-for="(item, idx) in checkboxList"
        :id="item.id"
        :key="idx"
        :option="item.option"
        :name="item.name"
        :type="item.type"
        :disabled="item.disabled"
        :checked="item.checked"
        @input-value="onChangeCheckbox"
      />
    </div>
    <div class="settings__info">
      <p class="settings__info-text">
        Showed properties: {{ checkboxItemsList.length }}
      </p>
      <p class="settings__info-text">
        Hidden properties: {{ checkboxList.length - checkboxItemsList.length }}
      </p>
    </div>
  </div>
</template>
