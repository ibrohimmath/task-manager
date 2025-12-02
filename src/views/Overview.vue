<template>
    <Default>
        <template #navbar>
            <div>
                <h1 class="text-2xl font-semibold">
                    Hi, Dennis Nzioki
                </h1>
                <p class="text-md font-normal mt-2">Let's finish your task today!</p>
            </div>
        </template>

        <template #sidebar-right>
            <div>
                <h3>Filters</h3>
                <button>All Tasks</button>
                <button>Completed</button>
            </div>
        </template>
    </Default>
</template>
  
<script setup lang="ts">
// import Main from "@/layouts/main.vue";
import Default from '@/layouts/Default.vue';
</script>