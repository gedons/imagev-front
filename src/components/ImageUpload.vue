<template>
    <div>
      <h2>Upload Image</h2>
      <form @submit.prevent="uploadImage">
        <input type="file" @change="onFileChange" />
        <button type="submit">Upload</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        file: null,
      };
    },
    methods: {
      onFileChange(event) {
        this.file = event.target.files[0];
      },
      async uploadImage() {
        const formData = new FormData();
        formData.append('image', this.file);
  
        try {
          const response = await axios.post('http://localhost:5000/api/images/upload', formData);
          console.log(response.data);
          this.$emit('imageUploaded', response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  