<script setup>
import { ref, watch } from 'vue'
import contenteditable from 'vue-contenteditable'
import { useNoteStore } from '@/stores/NoteStore'
import { v4 as uuidv4 } from 'uuid'

const title = ref('')
const content = ref('')

const noteStore = useNoteStore()

watch(
  () => noteStore.getNote,
  (newValue, oldValue) => {
    title.value = newValue
    console.log('new', newValue)
    console.log('old', oldValue)
  },
  { deep: true }
)

console.log('note', noteStore.getNote)

const handleForm = (e) => {
  let insertId = noteStore.lastNoteID
  if (title.value.length > 0 && insertId === '') {
    insertId = uuidv4()

    noteStore.addNote({
      id: insertId,
      title: title.value,
      content: content.value,
      timestamp: Date.now(),
      pinned: false
    })
    title.value = ''
    content.value = ''
  }
}
</script>

<template>
  <div class="rs__notes-content">
    <form @submit.prevent="handleForm">
      <input
        type="text"
        class="rs__input_title"
        placeholder="What is the note about"
        required
        v-model="title"
      />

      <contenteditable
        tag="div"
        class="rs__content-editable"
        :contenteditable="true"
        :no-nl="false"
        :no-html="true"
        v-model="content"
      />

      <button type="submit" class="rs_form-save-btn">
        <span class="material-symbols-sharp">save</span>
      </button>
    </form>
  </div>
</template>
