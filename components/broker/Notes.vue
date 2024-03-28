<script setup lang="ts">
const notesInput = {
  required: false,
  id: 'notes',
  name: 'Notes',
  type: 'textarea',
  value: '',
  placeholder: 'Add your notes...',
}

const notesOnChange = () => {
  console.log('new notes')
}
</script>

<template>
  <div class="notes">
    <TheAccordion title="Notes" :is-inputs="true">
      <TheInput
        :id="notesInput.id"
        :required="notesInput.required"
        :name="notesInput.name"
        :type="notesInput.type"
        :placeholder="notesInput.placeholder"
        class="notes__input"
        @input-value="notesOnChange"
      />
    </TheAccordion>
  </div>
</template>
