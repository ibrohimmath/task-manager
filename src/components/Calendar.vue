<template>
    <div class="bg-white rounded-lg p-6 w-full max-w-120 mx-auto">
        <div class="flex items-center justify-between">
            <ArrowLeft />
            <p class="text-md fond-semibold text-[rgba(20,21,34,1)]">{{ monthNames[currentTime.getMonth()] }} {{
                currentTime.getFullYear() }}</p>
            <ArrowRight />
        </div>
        <div class="mt-6 flex items-center gap-1 justify-between">
            <div class="text-center rounded-full px-1 py-2" v-for="(_, i) in 7"
                :class="[i == 0 ? 'bg-black text-white' : 'bg-red text-[rgba(20,21,34,1)]']">
                <p class="font-medium text-sm">{{ dayNames[addDays(currentTime,
                    -i).getDay()]?.charAt(0) ?? '' }}</p>
                <div class="mt-4 rounded-full size-8 max-[1260px]:size-6 max-[925px]:size-8 max-[390px]:size-6 max-[320px]:size-4 flex items-center justify-center"
                    :class="[i == 0 ? 'bg-[rgba(84,111,255,1)]' : 'bg-[rgba(245,245,247,1)]']">
                    {{ addDays(currentTime, -i).getDate() }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";

import { addDays, dayNames, monthNames } from "@/utils/date";

import { ref } from "vue";

const currentTime = ref<Date>(new Date());

</script>