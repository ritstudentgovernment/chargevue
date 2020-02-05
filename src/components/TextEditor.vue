<!--

filename: TextEditor.vue
description: A rich-text editor component that uses CKEditor 5.
Takes a 'text' prop that initially populates the editor, and 
emits an 'input' event whenever a user changes data in the editor.

author: Monty Watts <mjw4633@rit.edu>

-->
<template>
    <ckeditor ref="editor" 
      :editor="editor"
      v-model="localText"
      @input="update"
      @ready="prefillEditor"
    ></ckeditor>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import CKEditor from '@ckeditor/ckeditor5-vue'

  export default {
    name: 'TextEditor',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    components: {
      ckeditor: CKEditor.component
    },
    data () {
      return {
        editor: ClassicEditor,
        localText: ''
      }
    },
    methods: {
      update () {
        this.$emit('input', this.localText)
      },
      prefillEditor () {
        this.localText = this.text
      }
    }
  }
</script>
