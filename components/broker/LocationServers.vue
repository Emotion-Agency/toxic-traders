<script setup lang="ts">
interface iProps {
  serverLocation: string
}

const props = defineProps<iProps>()

const locationInputData = {
  required: false,
  id: 'location',
  name: 'Location',
  type: 'text',
  value: props.serverLocation || '',
  placeholder: 'Enter Location Server',
}
</script>

<template>
  <div class="location-servers">
    <TheAccordion title="Location Servers" :is-inputs="true">
      <TheInput
        :id="locationInputData.id"
        :required="locationInputData.required"
        :name="locationInputData.name"
        :type="locationInputData.type"
        :placeholder="locationInputData.placeholder"
        :value="locationInputData.value"
      />
    </TheAccordion>
  </div>
</template>
