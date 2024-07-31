<template>
    <div>
      <h2>View Image</h2>
      <img :src="image.url" alt="Image" />
      <div>
        <router-link :to="`/edit/${image._id}`">Edit</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        image: null,
      };
    },
    async created() {
      const imageId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/images/${imageId}`);
        this.image = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  