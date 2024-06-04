<script setup lang="ts">
interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getStatisticProviders, getCurrentStatisticTraffic } =
  useBrokerStatistic()

const headerFields = ref([])
const ahrefsTraffic = ref<string>('')
const semrushTraffic = ref<string>('')
const similarWebTraffic = ref<string>('')

onMounted(async () => {
  const { providerNames } = await getStatisticProviders()

  const ahrefsRequestData = await getCurrentStatisticTraffic(
    'Ahrefs',
    props.brokerId
  )
  const semrushRequestData = await getCurrentStatisticTraffic(
    'Semrush',
    props.brokerId
  )
  const similarWebRequestData = await getCurrentStatisticTraffic(
    'SimilarWeb',
    props.brokerId
  )

  headerFields.value = providerNames

  ahrefsTraffic.value =
    ahrefsRequestData?.companyNamesTraffic[0]?.traffic || 'N/A'
  semrushTraffic.value =
    semrushRequestData?.companyNamesTraffic[0]?.traffic || 'N/A'
  similarWebTraffic.value =
    similarWebRequestData?.companyNamesTraffic[0]?.traffic || 'N/A'
})
</script>

<template>
  <div class="statistics-table">
    <Table>
      <TableHead :header-fields="headerFields" />
      <TableBody>
        <TableRow>
          <TableCell :item="ahrefsTraffic" />
          <TableCell :item="semrushTraffic" />
          <TableCell :item="similarWebTraffic" />
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
