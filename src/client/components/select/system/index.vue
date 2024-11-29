<template>
  <USelectMenu
    v-model="system"
    :options="options"
    size="lg"
    value-attribute="_id"
    option-attribute="name"
    :disabled="options.length == 0"
    :loading="loading"
  >
    <template #label>
      <UiText mini>{{ select ? select.name : 'Chọn hệ điều hành' }}</UiText>
    </template>
  </USelectMenu>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  system: Object,
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'update:system'])

const loading = ref(true)

const system = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('update:system', options.value.find(i => i._id === value))
  } 
}) 

const options = ref(props.options)
const select = computed(() => options.value.find(i => i._id === system.value))

const fetch = async () => {
  try {
    loading.value = true
    const list = await useAPI('client/system/select')
    options.value = options.value.concat(list)
    loading.value = false
  }
  catch (e) {
    loading.value = false
  }
}
fetch()
</script>