<script lang="ts" setup>
import type { iBroker } from '~/types/broker/broker'

const route = useRoute()
const brokerId = route.params.id
const websitesList = ref<string[]>([])
const serversList = ref<iBroker[]>([])
const serverLocation = ref<string>('')
const reviewsList = ref<{ rating: string; count: string }[]>([])

const { getCurrentBroker } = useBrokers()

onMounted(async () => {
  const data = await getCurrentBroker(Number(brokerId))

  serversList.value = [
    {
      brokerServersMT4ServerNames: data?.brokerServersMT4ServerNames,
      brokerServersMT5ServerNames: data?.brokerServersMT5ServerNames,
    },
  ]

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
  serverLocation.value = data?.baseBrokerServerLocation
})
</script>

<template>
  <main class="main-broker">
    <div class="container grid main-broker__wrapper">
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerCompanyName :broker-id="Number(brokerId)" />
            <BrokerCategory :broker-id="Number(brokerId)" />
            <BrokerLocationServers :server-location="serverLocation" />
            <BrokerAddressCompany />
            <BrokerWebsites :websites="websitesList" />
            <BrokerReviews :reviews-list="reviewsList" />
          </div>
        </div>
      </aside>
      <section class="main-broker__content">
        <div class="main-broker__item">
          <h2 class="main-broker__title">Servers</h2>
          <BrokerServersTable :broker-id="Number(brokerId)" />
        </div>
        <div class="main-broker__item">
          <h2 class="main-broker__title">Type of Accounts</h2>
          <BrokerTypeOfAccounts />
        </div>
      </section>
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerNotes :broker-id="Number(brokerId)" />
            <BrokerRegulator :broker-id="Number(brokerId)" />
            <BrokerPlatforms :broker-id="Number(brokerId)" />
            <BrokerRestrictedCountries :broker-id="Number(brokerId)" />
            <BrokerDepositMethods :broker-id="Number(brokerId)" />
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
