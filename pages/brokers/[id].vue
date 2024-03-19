<script lang="ts" setup>
import type { iBroker } from '~/types/brokers'

const route = useRoute()
const id = route.params.id
const brokersList = ref<iBroker[]>([])
const categoryModalOpened = ref(false)
const addressModalOpened = ref(false)
const categoryOptions = ref<string[]>([])
const brokersHeadings = ref<string[]>([])
const addressCompany = ref<string[]>([])

const { getAllBrokers } = useBrokers()

onMounted(async () => {
  const data = await getAllBrokers()

  brokersList.value = data.brokers

  categoryOptions.value = brokersList.value.map(obj => obj.brokerCategory)
  brokersHeadings.value = brokersList.value.map(obj => obj.companyNames)
})

const categoryInputData = {
  required: false,
  id: 'category',
  name: 'Category',
  type: 'text',
  value: '',
  placeholder: 'Category name',
}

const addressInputData = {
  required: false,
  id: 'address',
  name: 'Adress',
  type: 'textarea',
  value: '',
  placeholder: 'Company adress',
}

const locationInputData = {
  required: false,
  id: 'location',
  name: 'Location',
  type: 'text',
  value: '',
  placeholder: 'US NY',
}

const categoryOnChange = () => {
  console.log('new category')
}

const addressOnChange = () => {
  console.log('new address')
}

const addressModalOpen = () => {
  addressModalOpened.value = true
  document.body.classList.add('modal-open')
}

const addressModalClose = () => {
  addressModalOpened.value = false
}

const categoryModalOpen = () => {
  categoryModalOpened.value = true
  document.body.classList.add('modal-open')
}

const categoryModalClose = () => {
  categoryModalOpened.value = false
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
              <CustomSelect
                :options="categoryOptions"
                placeholder="Regulated"
              />
            </TheAccordion>
            <TheAccordion title="Location Servers" :is-inputs="true">
              <TheInput
                :id="categoryInputData.id"
                :required="categoryInputData.required"
                :name="categoryInputData.name"
                :type="categoryInputData.type"
                :placeholder="categoryInputData.placeholder"
                @input-value="categoryOnChange"
              />
            </TheAccordion>
            <TheAccordion
              title="Adress Company"
              additional-button="Add new"
              @open="addressModalOpen"
            >
              accordion content
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
          {{ id }}
        </div>
      </section>
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">right {{ id }}</div>
        </div>
      </aside>
    </div>
    <TheModal
      :modal-opened="categoryModalOpened"
      title="Add new category"
      @close="categoryModalClose"
    >
      <TheInput
        :id="locationInputData.id"
        :required="locationInputData.required"
        :name="locationInputData.name"
        :type="locationInputData.type"
        :placeholder="locationInputData.placeholder"
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
    <TheModal
      :modal-opened="addressModalOpened"
      title="Add new category"
      @close="addressModalClose"
    >
      <TheInput
        :id="addressInputData.id"
        :required="addressInputData.required"
        :name="addressInputData.name"
        :type="addressInputData.type"
        :placeholder="addressInputData.placeholder"
        class="broker-aside__category-input"
        @input-value="addressOnChange"
      />
      <div class="broker-aside__category-buttons">
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="addressModalClose"
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
