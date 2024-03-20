<script setup lang="ts">
const locationInputData = {
  required: false,
  id: 'location',
  name: 'Location',
  type: 'text',
  value: '',
  placeholder: 'US NY',
}

const locationOnChange = () => {
  console.log('location')
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
        @input-value="locationOnChange"
      />
    </TheAccordion>
  </div>
</template>
