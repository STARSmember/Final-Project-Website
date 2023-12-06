import { ref } from 'vue'
import axios from 'axios'

const villains = ref([])
const pages = ref(1)
const loading = ref(false)
const activePage = ref(1)
const pageSize = ref(12)
const currentDemon = ref(null)

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    auth: {
        username: import.meta.env.VITE_API_USERNAME,
        password: import.meta.env.VITE_API_PASSWORD,
    },
})

const getVillains = async () => {
    loading.value = true
    const { data, headers } = await api.get('/api/villains', {
        params: {
            page: activePage.value,
            size: pageSize.value,
        },
    })
    villains.value = data
    pages.value = Number(headers['x-total-pages']) || 1
    loading.value = false
}

const fetchVillain = async (id) => {
    const { data } = await api.get(`/api/villains/${id}`)
    currentVillain.value = data
    console.log(data)
}

const useAPI = () => {
    return { villains, pages, activePage, loading, pageSize, getVillains, fetchVillain, currentVillain}
}

export default useAPI