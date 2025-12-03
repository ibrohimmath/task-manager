<template>
    <Default>
        <template #navbar>
            <div>
                <h1 class="text-2xl font-semibold">
                    Hi, Dennis Nzioki
                </h1>
                <p class="text-md font-normal mt-2 text-[rgba(84,87,122,1)]">Let's finish your task today!</p>
            </div>
        </template>

        <div class="w-full">
            <div
                class="mt-4 grid gap-6 grid-cols-5 max-[1630px]:grid-cols-4 max-[1410px]:grid-cols-3  max-[1230px]:flex max-[1230px]:flex-col">
                <div
                    class="flex flex-col col-span-1 p-5 bg-[rgba(20,21,34,1)] rounded-lg max-[1230px]:mx-auto max-[1230px]:w-full max-w-[400px] max-[1230px]:h-50">
                    <div class="flex flex-col">
                        <h1 class="font-semibold text-md text-white">Running Task</h1>
                        <h1 class="font-semibold text-2xl text-white mt-3">65</h1>
                    </div>
                    <div class="mt-auto flex items-center mx-auto gap-4">
                        <CircleProgress />
                        <div>
                            <h1 class="text-white font-semibold text-xl">100</h1>
                            <p class="text-sm text-[rgba(156,156,164,1)]">Task</p>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-4 mx-auto p-4 rounded-lg max-[1630px]:col-span-3 max-[1410px]:col-span-2 h-full w-full max-[1230px]:h-72 max-w-[600px] bg-[rgba(245,245,247,1)]">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-semibold mb-4">Activity</h1>
                        <div class="flex items-center gap-4">
                            <p class="text-[rgba(20,21,34,1)] font-medium text-sm">This Week</p>
                            <Down />
                        </div>
                    </div>
                    <Chart />

                </div>
            </div>
        </div>

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
import Down from "@/assets/icons/down.vue";
import Chart from "@/components/Chart.vue";
import CircleProgress from "@/components/CircleProgress.vue";
import Default from '@/layouts/Default.vue';
</script>