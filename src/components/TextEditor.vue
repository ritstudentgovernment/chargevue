<!--

filename: QuillEditor.vue
description: Component for Quill text editor.

author: Omar De La Hoz <oed7416@rit.edu>

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
