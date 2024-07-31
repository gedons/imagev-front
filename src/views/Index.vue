<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-4">Image Viewer</h1>

    <button @click="showUploadModal = true" class="bg-gray-800 font-semibold text-white px-4 py-2 rounded">
      Upload Image
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div v-for="image in images" :key="image._id" class="relative group">
        <img :src="image.url" class="w-full h-64 object-cover rounded-lg" />
        <button @click="showEditModal(image)" class="absolute top-2 right-16 bg-gray-800 font-semibold text-white mr-4 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Edit
        </button>
        <button @click="deleteImage(image._id)" class="absolute top-2 right-2 bg-red-500 font-semibold text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Delete
        </button>
      </div>
    </div>

    <!-- Modals -->
    <UploadModal v-if="showUploadModal" @close="showUploadModal = false" @uploaded="fetchImages" />
    <EditModal v-if="showEditModalComponent" :image="selectedImage" @close="showEditModalComponent = false" @edited="fetchImages" />
  </div>
</template>

<script>
import axios from 'axios';
import UploadModal from './UploadModal.vue';
import EditModal from './EditModal.vue';

export default {
  components: {
    UploadModal,
    EditModal,
  },
  data() {
    return {
      images: [],
      showUploadModal: false,
      showEditModalComponent: false,
      selectedImage: null,
    };
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        this.images = response.data;
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    },
    showEditModal(image) {
      this.selectedImage = image;
      this.showEditModalComponent = true;
    },
    async deleteImage(id) {
      try {
        await axios.delete(`http://localhost:5000/api/images/${id}`);
        this.fetchImages();
      } catch (error) {
        console.error('Failed to delete image:', error);
      }
    },
  },
  mounted() {
    this.fetchImages();
  },
};
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
