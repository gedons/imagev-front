<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-10 rounded-lg w-full max-w-3xl relative">
        <h2 class="text-3xl mb-6">Editing Image</h2>
        <p class="text-lg mb-4">You are editing the image with ID: {{ image._id }}</p>
        
        <!-- Image Preview and Controls -->
        <div class="relative">
          <img ref="image" :src="imagePreview" class="resizable-draggable" />
        </div>
  
        <div class="mb-6">
          <label class="block text-lg mb-2">Width (px)</label>
          <input v-model.number="width" type="number" class="border p-3 rounded w-full" placeholder="Width" />
          <label class="block text-lg mb-2">Height (px)</label>
          <input v-model.number="height" type="number" class="border p-3 rounded w-full" placeholder="Height" />
          <label class="block text-lg mb-2">Left (px)</label>
          <input v-model.number="left" type="number" class="border p-3 rounded w-full" placeholder="Left" />
          <label class="block text-lg mb-2">Top (px)</label>
          <input v-model.number="top" type="number" class="border p-3 rounded w-full" placeholder="Top" />
        </div>
  
        <button @click="editImage" class="bg-green-500 text-white px-6 py-3 rounded mt-4">
          Save Changes
        </button>
        <button @click="$emit('close')" class="bg-red-500 text-white px-6 py-3 rounded mt-4 ml-2">
          Cancel
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import interact from 'interactjs';
  
  export default {
    props: {
      image: Object,
    },
    data() {
      return {
        width: null,
        height: null,
        left: 0,
        top: 0,
        imagePreview: null,
      };
    },
    async created() {
      await this.fetchImagePreview();
      this.initializeInteractions();
    },
    methods: {
      async fetchImagePreview() {
        try {
          const response = await axios.get(this.image.url, { responseType: 'blob' });
          const url = URL.createObjectURL(response.data);
          this.imagePreview = url;
        } catch (error) {
          console.error('Failed to fetch image preview:', error);
        }
      },
      initializeInteractions() {
        interact('.resizable-draggable')
          .draggable({
            listeners: {
              move(event) {
                const { target } = event;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
              },
            },
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: 'parent',
              }),
            ],
            inertia: true,
          })
          .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
              move(event) {
                const { target } = event;
                const { x, y } = target.dataset;
  
                target.style.width = `${event.rect.width}px`;
                target.style.height = `${event.rect.height}px`;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.dataset.x = x;
                target.dataset.y = y;
              },
            },
          });
      },
      async editImage() {
        try {
          const editData = {
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top,
          };
          await axios.put(`http://localhost:3000/api/images/edit/${this.image._id}`, editData);
          this.$emit('edited');
          this.$emit('close');
        } catch (error) {
          console.error('Failed to edit image:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .resizable-draggable {
    border: 1px solid #ddd;
    cursor: pointer;
  }
  </style>
  