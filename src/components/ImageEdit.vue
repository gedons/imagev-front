<template>
    <div>
      <h2>Edit Image</h2>
      <form @submit.prevent="editImage">
        <div>
          <label>Width:</label>
          <input type="number" v-model="width" />
        </div>
        <div>
          <label>Height:</label>
          <input type="number" v-model="height" />
        </div>
        <div>
          <label>Left:</label>
          <input type="number" v-model="left" />
        </div>
        <div>
          <label>Top:</label>
          <input type="number" v-model="top" />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        width: null,
        height: null,
        left: null,
        top: null,
      };
    },
    methods: {
      async editImage() {
        const imageId = this.$route.params.id;
        const editData = {
          width: this.width,
          height: this.height,
          left: this.left,
          top: this.top,
        };
  
        try {
          const response = await axios.put(`http://localhost:5000/api/images/edit/${imageId}`, editData);
          console.log(response.data);
          this.$router.push(`/image/${imageId}`);
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
  