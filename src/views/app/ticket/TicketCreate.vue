<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from 'pinia'
import feather from 'feather-icons'

const ticketStore = useTicketStore()
const { success, error, loading } = storeToRefs(ticketStore)
const { createTicket } = ticketStore

const form = ref({
  title: '',
  description: '',
  priority: ''
  // remember: false,
})

const handleSubmit = async () => {
  await createTicket(form.value)
}

onMounted(async () => {
  feather.replace()
})
</script>

<template>
  <!-- Back Button -->
  <div class="mb-6">
    <RouterLink
      :to="{ name: 'app.dashboard' }"
      class="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
    >
      <i data-feather="arrow-left" class="w-4 h-4 mr-2"></i>
      Kembali ke Daftar Tiket
    </RouterLink>
  </div>

  <!-- Create Ticket Form -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="p-6 border-b border-gray-100">
      <h1 class="text-2xl font-bold text-gray-800">Buat Tiket Baru</h1>
      <p class="text-sm text-gray-500 mt-1">Isi form di bawah ini untuk membuat tiket baru</p>
    </div>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <!-- Judul Tiket -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Judul Tiket</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          name="title"
          placeholder="Contoh: Gangguan Jaringan WiFi"
          class="w-full text-gray-500 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500 ring-red-500': error?.title }"
        />
        <div v-if="error?.title" class="flex items-center mt-2">
          <p class="text-xs text-red-500">Judul tiket wajib diisi</p>
        </div>
      </div>

      <!-- Deskripsi -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2"
          >Deskripsi Masalah</label
        >
        <textarea
          v-model="form.description"
          id="description"
          name="description"
          rows="6"
          placeholder="Jelaskan masalah Anda secara detail. Sertakan informasi seperti:&#10;- Kapan masalah mulai terjadi&#10;- Apa yang sudah Anda coba&#10;- Dampak masalah terhadap pekerjaan"
          class="w-full text-gray-500 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500 ring-red-500': error?.title }"
        ></textarea>
        <div v-if="error?.description" class="flex items-center mt-2">
          <p class="text-xs text-red-500">Deskripsi masalah wajib diisi</p>
        </div>
      </div>

      <!-- Prioritas -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Prioritas</label>
        <div class="grid grid-cols-3 gap-4">
          <label
            class="relative flex cursor-pointer rounded-lg border p-4 focus:outline-none"
            :class="[form.priority === 'low' ? 'border-green-200 bg-green-50' : 'border-gray-200']"
          >
            <input type="radio" v-model="form.priority" value="low" class="sr-only" />
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Rendah</p>
                  <p class="text-gray-500">Tidak mendesak</p>
                </div>
              </div>
              <div class="shrink-0 text-green-600" v-show="form.priority === 'low'">
                <i data-feather="check-circle" class="w-6 h-6"></i>
              </div>
            </div>
          </label>

          <label
            class="relative flex cursor-pointer rounded-lg border p-4 focus:outline-none"
            :class="[
              form.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'
            ]"
          >
            <input type="radio" v-model="form.priority" value="medium" class="sr-only" />
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Sedang</p>
                  <p class="text-gray-500">Normal</p>
                </div>
              </div>
              <div class="shrink-0 text-yellow-600" v-show="form.priority === 'medium'">
                <i data-feather="check-circle" class="w-6 h-6"></i>
              </div>
            </div>
          </label>

          <label
            class="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 focus:outline-none"
            :class="[form.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-gray-200']"
          >
            <input type="radio" v-model="form.priority" value="high" class="sr-only" />
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <div class="text-sm">
                  <p class="font-medium text-gray-900">Tinggi</p>
                  <p class="text-gray-500">Mendesak</p>
                </div>
              </div>
              <div class="shrink-0 text-red-600" v-show="form.priority === 'high'">
                <i data-feather="check-circle" class="w-6 h-6"></i>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-4">
        <a
          href="user-tickets.html"
          class="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          Batal
        </a>
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          <i data-feather="send" class="w-4 h-4 inline-block mr-2"></i>
          Kirim Tiket
        </button>
      </div>
    </form>
  </div>
</template>
