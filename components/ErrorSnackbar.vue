<template>
  <v-snackbar
      v-model="visible"
      :timeout="timeout"
      :color="colors[props.type]"
      class="text-center font-IRANSansXDemiBold"
      dir="rtl"
      elevation="2"
  >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import {ref, watch} from 'vue';

const colors = {
  error: '#FB8C00',
  success: '#4fe825',
  warning: '#CCEBFF',
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 3000,
  }, type: {
    type: String,
    default: 'error', // نوع پیام: error، success یا warning
  },
});

const visible = ref(props.modelValue);
const message = ref(props.errorMessage);
watch(() => props.modelValue, (newValue) => {
  visible.value = newValue;
});

watch(() => props.errorMessage, (newValue) => {
  message.value = newValue;
});

const emit = defineEmits(['update:modelValue']);
watch(visible, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
