<template>
    <div>
      <h2>All Images</h2>
      <div v-if="images.length">
        <div v-for="image in images" :key="image._id" class="image-item">
          <router-link :to="`/image/${image._id}`">
            <img :src="image.url" alt="Image" />
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>No images found</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        images: [],
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        this.images = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  
  <style scoped>
  .image-item {
    margin: 10px;
  }
  </style>
  