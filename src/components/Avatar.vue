<template>
    <img :src="url" :class="`size-${size}px`" class="object-contain object-center rounded-full" />
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    width: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
    }
});

const size = computed(() => props.width >= 768 ? 52 : 32);
</script>