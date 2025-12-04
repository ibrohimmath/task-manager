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
                class="mt-4 grid gap-4 grid-cols-5 justify-between max-[1630px]:grid-cols-4 max-[1410px]:grid-cols-3 max-[1230px]:flex max-[1230px]:flex-col">
                <div
                    class="flex flex-col max-[1230px]:flex-row col-span-1 p-5 bg-[rgba(20,21,34,1)] rounded-lg max-[1230px]:mx-auto max-[1230px]:w-full max-w-[500px] max-[1230px]:h-35">
                    <div class="flex flex-col max-[1230px]:my-auto">
                        <h1 class="font-semibold text-md text-white">Running Task</h1>
                        <h1 class="font-semibold text-2xl text-white mt-3">65</h1>
                    </div>
                    <div class="mt-auto max-[1230px]:my-auto mx-auto flex items-center gap-4">
                        <CircleProgress />
                        <div>
                            <h1 class="text-white font-semibold text-xl">100</h1>
                            <p class="text-sm text-[rgba(156,156,164,1)]">Task</p>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-4 ml-auto max-[1230px]:mx-auto p-4 rounded-lg max-[1630px]:col-span-3 max-[1410px]:col-span-2 h-full w-full max-[1230px]:h-72 max-w-[600px] bg-[rgba(245,245,247,1)]">
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

            <div>
                <div class="flex items-center gap-4 justify-between mt-8">
                    <h1 class="text-2xl text-[rgba(20,21,34,1)] font-semibold">Monthly mentors</h1>
                    <div class="flex items-center gap-4">
                        <ArrowLeft :is-disabled="currentMentorPage == 0" @click="decreaseMentorPage" />
                        <ArrowRight :is-disabled="currentMentorPage == maxMentorsPage" @click="increaseMentorPage" />
                    </div>
                </div>
                <Carousel class="w-full" v-model:page="currentMentorPage" :value="mentorsData" :numVisible="numsVisible"
                    :numScroll="1" :showNavigators="false" :showIndicators="false" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="rounded-lg p-6 bg-[rgba(255,255,255,1)] ml-2">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-4">
                                    <img :src="slotProps.data.image"
                                        class="size-[52px] object-contain object-center rounded-full" />
                                    <div>
                                        <h1>{{ slotProps.data.name }}</h1>
                                        <p>{{ slotProps.data.profession }}</p>
                                    </div>
                                </div>
                                <p class="text-sm"
                                    :class="[slotProps.data.isFollowed ? 'text-[rgba(156,156,164,1)]' : 'text-[rgba(84,111,255,1)]']">
                                    {{ slotProps.data.isFollowed ? "Followed" : "+Follow" }}</p>
                            </div>
                        </div>
                    </template>
                </Carousel>
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
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import Down from "@/assets/icons/down.vue";

import Chart from "@/components/Chart.vue";
import CircleProgress from "@/components/CircleProgress.vue";

import Default from '@/layouts/Default.vue';

import useWindowResize from "@/composables/window";

import { ref } from "vue";

const { width } = useWindowResize();

const mentorsData = [
    {
        name: "Curious George",
        profession: "UI UX Design",
        tasks: 40,
        rate: 4.7,
        reviews: 750,
        image: '/img/girl.png',
        isFollowed: false,
    },
    {
        name: "Abraham Lincoln",
        profession: "3D Design",
        tasks: 32,
        rate: 4.9,
        reviews: 510,
        image: '/img/girl.png',
        isFollowed: true,
    },
    {
        name: "Jessica Jane",
        profession: "Web Developer",
        tasks: 40,
        rate: 4.7,
        reviews: 750,
        image: '/img/girl.png',
        isFollowed: false,
    },
    {
        name: "Alex Stanton",
        profession: "UI / UX Designer",
        tasks: 60,
        rate: 4.9,
        reviews: 970,
        image: '/img/girl.png',
        isFollowed: true,
    },
    {
        name: "Antoine Griezmann",
        profession: "Android Developer",
        tasks: 50,
        rate: 4.8,
        reviews: 830,
        image: '/img/girl.png',
        isFollowed: false,
    },
    {
        name: "Anna White",
        profession: "3D Design",
        tasks: 60,
        rate: 4.8,
        reviews: 870,
        image: '/img/girl.png',
        isFollowed: true,
    },
    {
        name: "Richard Kyle",
        profession: "2D Design",
        tasks: 60,
        rate: 4.7,
        reviews: 730,
        image: '/img/girl.png',
        isFollowed: false,
    },
    {
        name: "Julia Philips",
        profession: "IOS Developer",
        tasks: 60,
        rate: 4.9,
        reviews: 910,
        image: '/img/girl.png',
        isFollowed: true,
    }
];

const responsiveOptions = ref([
    {
        breakpoint: '1800px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const currentMentorPage = ref<number>(0);
const numsVisible = ref<number>(2);
const maxMentorsPage = ref<number>(Math.ceil(mentorsData.length / numsVisible.value));

const decreaseMentorPage = () => {
    if (currentMentorPage.value == 0) return;
    currentMentorPage.value--;
};

const increaseMentorPage = () => {
    if (currentMentorPage.value == maxMentorsPage.value) return;
    currentMentorPage.value++;
};
</script>