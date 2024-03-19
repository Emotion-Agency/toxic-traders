<script lang="ts" setup>
import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
import type { iBroker } from '~/types/brokers'

const route = useRoute()
const name = route.params.name
const brokersList = ref<iBroker[]>([])
const categoryModalOpened = ref(false)

onMounted(async () => {
  const data = await getSortedBrokers()

  brokersList.value = data.brokers
})

const brokersHeadings = computed(() => {
  return getBrokerHeadings(brokersList.value[0] ?? {})
})

const optionList = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
]

const categoryModalOpen = () => {
  categoryModalOpened.value = true
  document.body.classList.add('modal-open')
}

const categoryModalClose = () => {
  categoryModalOpened.value = false
}

const categoryInputData = {
  required: false,
  id: 'category',
  name: 'Category',
  type: 'text',
  value: '',
  placeholder: 'Category name',
}

const categoryOnChange = () => {
  console.log('new category')
}
</script>

<template>
  <main class="main-broker">
    <div class="container grid main-broker__wrapper">
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <TheAccordion title="Company Name">
              <p v-for="(title, idx) in brokersHeadings" :key="idx">
                {{ formatNameToNormalCase(title) }}
              </p>
            </TheAccordion>
            <TheAccordion
              title="Category"
              additional-button="Add new"
              :is-inputs="true"
              @open="categoryModalOpen"
            >
              <CustomSelect :options="optionList" placeholder="Regulated" />
            </TheAccordion>
          </div>
        </div>
      </aside>
      <section class="main-broker__content">
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          facilis ipsum asperiores minus aperiam magni iure omnis nobis. Sunt
          cum, fugit reprehenderit quaerat id ipsa labore at provident dicta
          ipsam voluptas ipsum fugiat odit sequi iste sed voluptatibus
          consequatur corrupti laboriosam obcaecati aut eaque! Reprehenderit
          explicabo autem ut inventore animi, rem nam fuga, maiores quisquam
          corrupti quibusdam, in sequi adipisci. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Cupiditate, facilis ipsum asperiores
          minus aperiam magni iure omnis nobis. Sunt cum, fugit reprehenderit
          quaerat id ipsa labore at provident dicta ipsam voluptas ipsum fugiat
          odit sequi iste sed voluptatibus consequatur corrupti laboriosam
          obcaecati aut eaque! Reprehenderit explicabo autem ut inventore animi,
          rem nam fuga, maiores quisquam corrupti quibusdam, in sequi adipisci.
          {{ name }}
        </div>
      </section>
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">right {{ name }}</div>
        </div>
      </aside>
    </div>
    <TheModal
      :modal-opened="categoryModalOpened"
      title="Add new category"
      @close="categoryModalClose"
    >
      <TheInput
        :id="categoryInputData.id"
        :required="categoryInputData.required"
        :name="categoryInputData.name"
        :type="categoryInputData.type"
        :placeholder="categoryInputData.placeholder"
        class="broker-aside__category-input"
        @input-value="categoryOnChange"
      />
      <div class="broker-aside__category-buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="categoryModalClose"
        >
          Close
        </TheButton>
        <TheButton tag="button" variant="fill" button-size="medium">
          Add
        </TheButton>
      </div>
    </TheModal>
  </main>
</template>
