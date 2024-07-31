<template>
    <div>
      <ImageUpload @imageUploaded="fetchImages" />
      <ImageList :images="images" />
    </div>
  </template>
  
  <script>
  import ImageUpload from '../components/ImageUpload.vue';
  import ImageList from '../components/ImageList.vue';
  import axios from 'axios';
  
  export default {
    components: {
      ImageUpload,
      ImageList,
    },
    data() {
      return {
        images: [],
      };
    },
    methods: {
      async fetchImages() {
        try {
          const response = await axios.get('http://localhost:5000/api/images');
          this.images = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
    async created() {
      await this.fetchImages();
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  