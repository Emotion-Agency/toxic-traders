<script setup lang="ts">
interface iRegulationItem {
  name: string
  licenseNumber: number
  licenseLink?: string
}

const regulationModalOpened = ref(false)

const regulationItems = ref<iRegulationItem[]>([
  {
    name: 'FCA UK',
    licenseNumber: 316876,
    licenseLink: '/',
  },
  {
    name: 'ASIC',
    licenseNumber: 286365,
    licenseLink: '/',
  },
  {
    name: 'NFA',
    licenseNumber: 523426347,
  },
])

const regulationAddItem = () => {}

const regulationRemoveItem = (idx: number) => {
  regulationItems.value.splice(idx, 1)
}

const regulationModalOpen = () => {
  regulationModalOpened.value = true
  document.body.classList.add('modal-open')
}

const regulationModalClose = () => {
  regulationModalOpened.value = false
}

const regulationOnChange = () => {}
</script>

<template>
  <div class="regulation">
    <TheAccordion
      title="Regulation"
      additional-button="Edit"
      @open="regulationModalOpen"
    >
      <ul class="regulation__list">
        <li
          v-for="(item, idx) in regulationItems"
          :key="idx"
          class="regulation__item"
        >
          <p class="regulation__item-name">
            {{ item.name }}
          </p>
          <div class="regulation__content">
            <a
              v-if="item.licenseLink"
              :href="item.licenseLink"
              rel="noreferer noopener"
              target="_blank"
              class="regulation__link"
            >
              {{ item.licenseNumber }}
              <IconsLinkArrow />
            </a>
            <p v-else class="regulation__link regulation__link--text">
              {{ item.licenseNumber }}
            </p>
          </div>
        </li>
      </ul>
    </TheAccordion>
    <TheModal
      :modal-opened="regulationModalOpened"
      title="Edit regulations"
      class="regulation__modal"
      @close="regulationModalClose"
    >
      <div class="regulation__accordion-wrapper">
        <TheAccordion
          v-for="(item, idx) in regulationItems"
          :key="idx"
          :title="'#' + (idx + 1)"
          additional-button="Remove"
          class="regulation__accordion"
          @remove="regulationRemoveItem(idx)"
        >
          <TheInput
            id="regulation-name"
            name="Regulation name"
            type="text"
            placeholder="Name"
            :value="item.name"
            @input-value="regulationOnChange"
          />
          <TheInput
            id="license-number"
            name="License number"
            type="text"
            placeholder="License number"
            value=""
            @input-value="regulationOnChange"
          />
          <TheInput
            id="regulation-link"
            name="Regulation link"
            type="text"
            placeholder="Link"
            value=""
            @input-value="regulationOnChange"
          />
        </TheAccordion>
      </div>
      <TheButton
        tag="button"
        variant="outlined"
        button-size="medium"
        class="regulation__add-btn"
        @click="regulationAddItem"
      >
        <template #start-icon>
          <IconsPlus />
        </template>
        Add new
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        class="regulation__btn"
        @click="regulationModalClose"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
