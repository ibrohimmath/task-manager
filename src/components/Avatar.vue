<template>
    <div class="border-4 border-solid rounded-full border-white">
        <img :src="url" :style="{ width: `${size}px`, height: `${size}px` }"
            class="object-contain object-center rounded-full" />
    </div>
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
    },
    size: {
        type: Number,
        required: false
    }
});

const size = computed(() => props.size ?? (props.width >= 768 ? 52 : 44));
</script>