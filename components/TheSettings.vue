<script setup lang="ts">
interface iProps {
  properties: string[]
}

const props = defineProps<iProps>()
const route = useRoute()

const emit = defineEmits(['change'])

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

const checkboxList = computed(() =>
  props.properties.map(property => ({
    value: formatNameToNormalCase(property),
    id: property,
    name: 'settings-checkboxes',
    type: 'checkbox',
    disabled: false,
  }))
)

const selectedCheckboxItems = ref<string[]>([])

const isInited = ref(false)

watch(
  () => checkboxList,
  () => {
    if (isInited.value && selectedCheckboxItems.value?.length) {
      return
    }

    const selectedItems = localStorage.getItem(
      `${String(route.name)}:selectedCheckboxItems`
    )

    if (selectedItems) {
      selectedCheckboxItems.value = JSON.parse(selectedItems)
    } else {
      selectedCheckboxItems.value = checkboxList.value.map(item => item.id)
    }

    isInited.value = true
  },
  { deep: true }
)

const hiddenItems = ref<string[]>([])

const onChange = (inputData: iInputData) => {
  searchInput.value = inputData.value
  const searchValue = inputData.value.toLowerCase()

  const filteredItems = checkboxList.value.filter(item =>
    item.value.toLowerCase().includes(searchValue)
  )

  hiddenItems.value = checkboxList.value
    .map(item => item.id)
    .filter(item => !filteredItems.map(item => item.id).includes(item))

  if (searchValue === '') {
    return
  }
}

const selectAllItems = () => {
  selectedCheckboxItems.value = checkboxList.value.map(item => item.id)
}

const resetAllItems = () => {
  selectedCheckboxItems.value = []
}

const onChangeCheckbox = (val: string, checked: boolean) => {
  if (checked) {
    selectedCheckboxItems.value = [...selectedCheckboxItems.value, val]
  } else {
    selectedCheckboxItems.value = selectedCheckboxItems.value.filter(
      item => item !== val
    )
  }
}

watch(
  () => selectedCheckboxItems.value,
  () => {
    emit('change', selectedCheckboxItems.value)

    localStorage.setItem(
      `${String(route.name)}:selectedCheckboxItems`,
      JSON.stringify(selectedCheckboxItems.value)
    )
  }
)
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
      <div class="settings__btns">
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
        <TheButton
          tag="button"
          button-size="small"
          variant="close"
          @click="resetAllItems"
        >
          Reset all
        </TheButton>
      </div>
    </div>
    <div class="settings__content">
      <CheckboxInput
        v-for="(item, idx) in checkboxList"
        v-show="!hiddenItems.includes(item.id)"
        :id="item.id"
        :key="idx"
        :value="item.value"
        :name="item.name"
        :type="item.type"
        :disabled="item.disabled"
        :checked="selectedCheckboxItems.includes(item.id)"
        @input-value="(_, checked) => onChangeCheckbox(item.id, checked)"
      />
    </div>
    <div class="settings__info">
      <p class="settings__info-text">
        Showed properties: {{ selectedCheckboxItems.length }}
      </p>
      <p class="settings__info-text">
        Hidden properties:
        {{ checkboxList.length - selectedCheckboxItems.length }}
      </p>
    </div>
  </div>
</template>
