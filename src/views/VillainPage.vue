<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import useAPI from '@/composables/useAPI';

const { fetchVillain, currentVillain } = useAPI()


const route = useRoute()

const villains = ref('')
onMounted(async () => {
    await fetchVillain(route.params.id)
    console.log(route.params.id)
})

onUnmounted(() => {
    currentVillain.value = null
})

</script>

<template>
    <main class="min-h-screen bg-gradient-to-b from-amber-900 to-yellow-300 font-poppins">
        <div v-if="currentVillain" class="flex flex-col items-center justify-center gap-6">
            <img class="p-8 h-64 w-64" 
              :src="currentVillain.image" 
              :alt="currentVillain.name" />
            <h1 class="text-white-800 text-6xl font-bold">
                {{ currentVillain.name }}
            </h1>

        </div>
    </main>
</template>