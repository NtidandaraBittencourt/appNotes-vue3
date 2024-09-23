import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteStore', {
  state: () => ({
    notes: [
      {
        id: 1,
        title: 'Note title one',
        content: 'Note one content',
        timestamp: Date.now(),
        pinned: false
      }
    ],
    lastNoteID: '',
    note: {}
  }),

  getters: {
    allNotes: (state) => {
      return state.notes
    },

    pinnedNotes: (state) => {
      return state.notes.filter((note) => note.pinned)
    },
    getNote: (state) => {
      return state.note
    }
  },

  actions: {
    markesAsPinned(noteId) {
      const updateNotes = this.notes.map((item) => {
        if (noteId === item.id) {
          item.pinned = true
          return item
        }
        return item
      })
      this.notes = updateNotes
    },
    markesAsUnpinned(noteId) {
      const updateNotes = this.notes.map((item) => {
        if (noteId === item.id) {
          item.pinned = false
          return item
        }
        return item
      })
      this.notes = updateNotes
    },

    addNote(note) {
      const newNotesArr = [note, ...this.notes]
      this.notes = newNotesArr
    },
    setNote(note) {
      this.note = note
    }
  }
})
