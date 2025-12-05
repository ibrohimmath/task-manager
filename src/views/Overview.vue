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
                    class="flex flex-col max-[1230px]:flex-row col-span-1 p-5 bg-[rgba(20,21,34,1)] rounded-lg max-[1230px]:mx-auto max-[1230px]:w-full max-w-[500px] max-[1230px]:h-30">
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
                    class="col-span-4 ml-auto max-[1230px]:mx-auto p-4 rounded-lg max-[1630px]:col-span-3 max-[1410px]:col-span-2 h-full w-full max-[1230px]:h-60 max-w-[600px] bg-[rgba(245,245,247,1)]">
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
                <Carousel class="mt-4" v-model:page="currentMentorPage" :value="mentorsData" :numVisible="mentorNumsVisible"
                    :numScroll="1" :showNavigators="false" :showIndicators="false" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="rounded-lg bg-[rgba(255,255,255,1)] ml-4 p-6">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-4">
                                    <img :src="slotProps.data.image"
                                        class="size-[52px] object-contain object-center rounded-full" />
                                    <div>
                                        <p class="font-semibold text-md text-[rgba(20,21,34,1)]">{{ slotProps.data.name }}
                                        </p>
                                        <p class="font-normal text-[12px] text-[rgba(84,87,122,1)]">{{
                                            slotProps.data.profession }}</p>
                                    </div>
                                </div>
                                <p class="text-sm ml-auto"
                                    :class="[slotProps.data.isFollowed ? 'text-[rgba(156,156,164,1)]' : 'text-[rgba(84,111,255,1)]']">
                                    {{ slotProps.data.isFollowed ? "Followed" : "+Follow" }}</p>
                            </div>
                            <div class="mt-4 flex items-center justify-between gap-2">
                                <div class="flex items-center gap-2">
                                    <TaskIcon />
                                    <p class="font-normal text-sm text-[rgba(20,21,34,1)]">{{ slotProps.data.tasks }}
                                        Task</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <StarIcon />
                                    <p>{{ slotProps.data.rate }} ({{ slotProps.data.reviews }} Reviews)</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>

            <div>
                <div class="flex items-center gap-4 justify-between mt-8">
                    <h1 class="text-2xl text-[rgba(20,21,34,1)] font-semibold">Upcoming Tasks</h1>
                    <div class="flex items-center gap-4">
                        <ArrowLeft :is-disabled="currentTaskPage == 0" @click="decreaseTaskPage" />
                        <ArrowRight :is-disabled="currentTaskPage == maxTasksPage" @click="increaseTaskPage" />
                    </div>
                </div>
                <Carousel class="mt-4" v-model:page="currentTaskPage" :value="tasksData" :numVisible="taskNumsVisible"
                    :numScroll="1" :showNavigators="false" :showIndicators="false" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="rounded-lg bg-[rgba(255,255,255,1)] ml-4 p-4">
                            <img :src="slotProps.data.image" class="w-full" />
                            <p class="mt-4 font-semibold text-md text-[rgba(20,21,34,1)]">{{ slotProps.data.title }}
                            </p>
                            <p class="font-normal text-[12px] text-[rgba(84,87,122,1)]">{{
                                slotProps.data.tag }}</p>
                            <div class="mt-2 flex items-center gap-4 justify-between">
                                <p class="font-normal text-md text-[rgba(20,21,34,1)]">Progress</p>
                                <p class="font-medium text-md text-[rgba(84,111,255,1)]">{{ slotProps.data.progress }} %</p>
                            </div>
                            <Slider :model-value="slotProps.data.progress" class="mt-2 !bg-[rgba(186,200,255,1)]" />
                            <div class="mt-3 flex items-center justify-between gap-4">
                                <div class="flex items-center gap-2">
                                    <ClockIcon />
                                    <p class="text-md font-normal text-[rgba(20,21,34,1)]">{{ getRemainTime(new
                                        Date(slotProps.data.expire), new Date()) }} left</p>
                                </div>
                                <div class="flex items-center">
                                    <Avatar :size="35" :width="width" :url="'/img/girl.png'" :key="slotProps.data.title + i"
                                        v-for="i in 5" class="-ml-4" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>

        <template #sidebar-right>
            <Calendar />
            <div class="mt-4 bg-white rounded-lg p-6 w-full max-w-120 mx-auto">
                <div class="flex items-center gap-4 justify-between">
                    <p class="text-md fond-semibold text-[rgba(20,21,34,1)]">Task Today</p>
                    <MoreIcon />
                </div>
                <img src="/img/task.png" class="mt-4 w-full" />
                <p class="mt-6 text-md font-semibold text-[rgba(20,21,34,1)]">Creating Awesome Mobile Apps</p>
                <p class="mt-1 text-sm font-normal text-[rgba(84,87,122,1)]">UI/UX Designer</p>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-md text-[rgba(20,21,34,1)]">Progress</p>
                    <p class="font-medium text-md text-[rgba(84,111,255,1)]">90 %</p>
                </div>
                <Slider :model-value="90" class="mt-2 !bg-[rgba(186,200,255,1)]" />
                <div class="mt-3 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <ClockIcon />
                        <p class="text-md font-normal text-[rgba(20,21,34,1)]">{{ getRemainTime(new
                            Date('2025-12-4 23:00'), new Date(), 'hour') }} left</p>
                    </div>
                    <div class="flex items-center">
                        <Avatar :size="35" :width="width" :url="'/img/girl.png'" :key="i" v-for="i in 5" class="-ml-4" />
                    </div>
                </div>
                <hr class="my-4 w-full h-1 bg-[rgba(245,245,247,1)]" />
                <div class="flex items-center gap-4 justify-between">
                    <p class="text-md font-semibold text-[rgba(20,21,34,1)]">Detail Task</p>
                    <p class="text-sm font-normal text-[rgba(84,87,122,1)]">UI/UX Designer</p>
                </div>
                <div class="mt-4 flex items-center gap-4">
                    <div
                        class="flex items-center justify-center rounded-lg size-9 bg-[rgba(245,245,247,1)] text-sm font-semibold text-[rgba(20,21,34,1)]">
                        1</div>
                    <p class="text-sm font-medium">Understanding the tools in Figma</p>
                </div>
                <div class="mt-4 flex items-center gap-4">
                    <div
                        class="flex items-center justify-center rounded-lg size-9 bg-[rgba(245,245,247,1)] text-sm font-semibold text-[rgba(20,21,34,1)]">
                        2</div>
                    <p class="text-sm font-medium">Understand the basics of making designs</p>
                </div>
                <div class="mt-4 flex items-center gap-4">
                    <div
                        class="flex items-center justify-center rounded-lg size-9 bg-[rgba(245,245,247,1)] text-sm font-semibold text-[rgba(20,21,34,1)]">
                        3</div>
                    <p class="text-sm font-medium">Design a mobile application with figma</p>
                </div>
                <button
                    class="w-full mt-4 p-4 bg-[rgba(84,111,255,1)] rounded-lg text-sm text-[rgba(255,255,255,1)] font-semibold">Go
                    To Detail</button>
            </div>
        </template>
    </Default>
</template>
  
<script setup lang="ts">
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import ClockIcon from "@/assets/icons/clock.vue";
import Down from "@/assets/icons/down.vue";
import MoreIcon from "@/assets/icons/more.vue";
import StarIcon from "@/assets/icons/star.vue";
import TaskIcon from "@/assets/icons/task.vue";

import Avatar from "@/components/Avatar.vue";
import Calendar from "@/components/Calendar.vue";
import Chart from "@/components/Chart.vue";
import CircleProgress from "@/components/CircleProgress.vue";

import Default from '@/layouts/Default.vue';

import useWindowResize from "@/composables/window";

import { getRemainTime } from "@/utils/date";
import mentorsData from "@/utils/mentors";
import tasksData from "@/utils/tasks";

import { ref } from "vue";

const { width } = useWindowResize();

const responsiveOptions = ref([
    {
        breakpoint: '1250px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '925px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '590px',
        numVisible: 1,
        numScroll: 1
    }
]);

const currentMentorPage = ref<number>(0);
const mentorNumsVisible = ref<number>(2);
const maxMentorsPage = ref<number>(Math.ceil(mentorsData.length / mentorNumsVisible.value));

const decreaseMentorPage = () => {
    if (currentMentorPage.value == 0) return;
    currentMentorPage.value--;
};

const increaseMentorPage = () => {
    if (currentMentorPage.value == maxMentorsPage.value) return;
    currentMentorPage.value++;
};

const currentTaskPage = ref<number>(0);
const taskNumsVisible = ref<number>(2);
const maxTasksPage = ref<number>(Math.ceil(mentorsData.length / mentorNumsVisible.value));

const decreaseTaskPage = () => {
    if (currentTaskPage.value == 0) return;
    currentTaskPage.value--;
};

const increaseTaskPage = () => {
    if (currentTaskPage.value == maxTasksPage.value) return;
    currentTaskPage.value++;
};

</script>

<style scoped></style>