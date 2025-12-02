<template>
    <main class="flex h-full">
        <TheSidebar class="w-3xs bg-[#FFFFFF]" />
        <section class="flex-1 p-4">
            <slot />
        </section>
    </main>
</template>

<script setup lang="ts">
import TheSidebar from '../components/TheSidebar.vue';

</script>