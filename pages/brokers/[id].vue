<script lang="ts" setup>
import type { iBroker } from '~/types/broker/broker'

const route = useRoute()
const id = route.params.id
const categoryOptions = ref<string[]>([])
const brokersHeadings = ref<string[]>([])
const websitesList = ref<string[]>([])
const serversList = ref<iBroker[]>([])
const reviewsList = ref<{ rating: string; count: string }[]>([])

const { getCurrentBroker } = useBrokers()

onMounted(async () => {
  const data = await getCurrentBroker(Number(id))

  console.log(data)

  serversList.value = [
    {
      brokerServersMT4ServerNames: data?.brokerServersMT4ServerNames,
      brokerServersMT5ServerNames: data?.brokerServersMT5ServerNames,
    },
  ]
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
        <h2 class="main-broker__title">Servers</h2>
        <BrokerServersTable :servers="serversList" />
      </section>
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerNotes />
            <BrokerRegulation />
            <BrokerPlatforms />
            <BrokerRestrictionCountries />
            <BrokerDepositMethods />
            <div class="broker-aside__btn-wrapper">
              <TheButton tag="button" button-size="medium" variant="outlined">
                History
              </TheButton>
              <TheButton tag="button" button-size="medium" variant="fill">
                Settings
                <template #start-icon>
                  <IconsSettings />
                </template>
              </TheButton>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
