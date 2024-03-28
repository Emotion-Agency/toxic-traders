<script lang="ts" setup>
const route = useRoute()
const id = route.params.id
const categoryOptions = ref<string[]>([])
const brokersHeadings = ref<string[]>([])
const websitesList = ref<string[]>([])
const reviewsList = ref<{ rating: string; count: string }[]>([])

const { getBroker } = useBrokers()

onMounted(async () => {
  const data = await getBroker(Number(id))

  console.log(data)

  categoryOptions.value = data?.brokerCategories?.split(',')
  brokersHeadings.value = data?.companyNames?.split(',')
  websitesList.value = data?.website?.split(',')
  reviewsList.value = [
    {
      rating: data?.brokerReviewsForexPeaceArmyRating,
      count: data?.brokerReviewsForexPeaceArmyReviewsCount,
    },
    {
      rating: data?.brokerReviewsFx123Rating,
      count: data?.brokerReviewsFx123ReviewsCount,
    },
    {
      rating: data?.brokerReviewsTrustPilotRating,
      count: data?.brokerReviewsTrustPilotReviewsCount,
    },
    {
      rating: data?.brokerReviewsWikifxRating,
      count: data?.brokerReviewsWikifxReviewsCount,
    },
  ]
  console.log(reviewsList.value)
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
            <BrokerReviews :reviews-list="reviewsList" />
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
          <div class="broker-aside__content">
            <BrokerNotes />
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
