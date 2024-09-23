<script setup>
import { useNoteStore } from '@/stores/NoteStore'
const props = defineProps(['notes', 'title', 'icon', 'type'])

const noteStore = useNoteStore()

const detailsNote = () => {
  console.log('details')
}
</script>

<template>
  <h4 class="rs__sidebar-title" v-if="'list' === type">
    <span class="rs__sidebar-title-note-icon material-symbols-sharp"> {{ icon }} </span>

    {{ title }}
  </h4>
  <ul class="rs__note-list" v-if="'list' === type">
    <li v-for="note in notes" :key="note.id">
      <p @click="noteStore.setNote(note)">
        {{ note.title }}
      </p>
      <span
        v-if="note.pinned"
        @click="noteStore.markesAsUnpinned(note.id)"
        class="rs__note-list-icon material-symbols-sharp"
      >
        do_not_disturb_on
      </span>
      <span
        v-else
        @click="noteStore.markesAsPinned(note.id)"
        class="rs__note-list-icon material-symbols-sharp"
      >
        push_pin
      </span>
    </li>
  </ul>
</template>
