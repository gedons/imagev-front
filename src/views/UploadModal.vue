<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-10 rounded-lg w-full max-w-3xl">
        <h2 class="text-3xl mb-6">Upload Image</h2>
        
        <!-- Image Preview -->
        <div class="mb-6">
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer"
          >
            <p v-if="!file" class="text-lg">Drag & drop your image here</p>
            <p v-else class="text-lg">{{ file.name }}</p>
            <!-- Display Image Preview -->
            <img v-if="imagePreview" :src="imagePreview" class="mt-4 max-w-full h-auto" />
          </div>
          <input type="file" @change="handleFileChange" class="hidden" ref="fileInput" />
        </div>
  
        <!-- Buttons -->
        <button @click="triggerFileInput" class="bg-blue-500 text-white px-6 py-3 rounded mt-4">
          Choose File
        </button>
        <button @click="uploadImage" class="bg-green-500 text-white px-6 py-3 rounded mt-4 ml-2" :disabled="!file">
          Upload
        </button>
        <button @click="$emit('close')" class="bg-red-500 text-white px-6 py-3 rounded mt-4 ml-2">
          Cancel
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        file: null,
        imagePreview: null,
      };
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        this.file = event.target.files[0];
        this.createImagePreview(this.file);
      },
      handleDrop(event) {
        this.file = event.dataTransfer.files[0];
        this.createImagePreview(this.file);
      },
      createImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async uploadImage() {
        try {
          const formData = new FormData();
          formData.append('image', this.file);
          await axios.post('https://imageview.onrender.com/api/images/upload', formData);
          this.$emit('uploaded');
          this.$emit('close');
        } catch (error) {
          console.error('Failed to upload image:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  input[type="file"] {
    display: none;
  }
  </style>
  