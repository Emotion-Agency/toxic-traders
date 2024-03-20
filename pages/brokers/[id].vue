<script lang="ts" setup>
import type { iBroker } from '~/types/brokers'

const route = useRoute()
const id = route.params.id
const brokersList = ref<iBroker[]>([])
const categoryOptions = ref<string[]>([])
const brokersHeadings = ref<string[]>([])
const websitesList = ref<string[]>([])

const { getAllBrokers } = useBrokers()

onMounted(async () => {
  const data = await getAllBrokers()

  brokersList.value = data.brokers

  categoryOptions.value = brokersList.value.map(obj => obj.brokerCategory)
  brokersHeadings.value = brokersList.value.map(obj => obj.companyNames)
  websitesList.value = brokersList.value.map(obj => obj.website)
})
</script>

<template>
  <main class="main-broker">
    <div class="container grid main-broker__wrapper">
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerCompanyName :brokers-headings="brokersHeadings" />
            <BrokerCategory :category-options="categoryOptions" />
            <BrokerLocationServers />
            <BrokerAddressCompany />
            <BrokerWebsites :websites="websitesList" />
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
  </main>
</template>
