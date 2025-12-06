<template>
    <Default>
        <template #navbar>
            <div>
                <h1 class="text-2xl font-semibold">
                    Explore Task
                </h1>
            </div>
        </template>

        <template #filter>
            <div class="flex items-center gap-4">
                <div
                    class="w-[30dvw] max-[800px]:w-[60dvw] flex items-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg py-2 px-4">
                    <input v-model.trim="taskSearch" @keyup.enter="searchTask" placeholder="Search Task"
                        class="outline-none w-full placeholder-[rgba(84,87,122,1)] text-[rgba(84,87,122,1)]" />
                    <SearchIcon class="ml-auto" @click="searchTask" />
                </div>
                <div
                    class="ml-auto flex max-[800px]:hidden items-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg py-2 px-4">
                    <PatternIcon />
                    <p class="font-semibold text-sm">Category</p>
                </div>
                <div
                    class="ml-4 flex max-[800px]:hidden items-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg py-2 px-4">
                    <SortIcon />
                    <p class="font-semibold text-sm">Sort by: Deadline</p>
                </div>
                <div @click="showFilter = !showFilter"
                    class="ml-auto hidden max-[800px]:flex items-center justify-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg size-12">
                    <ConfigIcon />
                </div>
            </div>
            <div class="w-full flex items-center justify-center gap-2 mt-2" v-if="showFilter">
                <div
                    class="flex items-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg py-2 px-4">
                    <PatternIcon />
                    <p class="font-semibold text-sm">Category</p>
                </div>
                <div
                    class="ml-4 flex items-center gap-4 border-2 border-solid border-[rgba(245,245,247,1)] rounded-lg py-2 px-4">
                    <SortIcon />
                    <p class="font-semibold text-sm">Sort by: Deadline</p>
                </div>
            </div>
        </template>

        <div class="w-full">
            <div>
                <div class="flex items-center gap-4 justify-between mt-4">
                    <h1 class="text-2xl text-[rgba(20,21,34,1)] font-semibold">Time Limit</h1>
                    <div class="flex items-center gap-4">
                        <ArrowLeft :is-disabled="currentLimitTaskPage == 0" @click="decreaseLimitTaskPage" />
                        <ArrowRight :is-disabled="currentLimitTaskPage == maxLimitTasksPage"
                            @click="increaseLimitTaskPage" />
                    </div>
                </div>
                <Carousel class="mt-4" v-model:page="currentLimitTaskPage" :value="limitTasksFiltered"
                    :numVisible="limitTaskNumsVisible" :numScroll="1" :showNavigators="false" :showIndicators="false"
                    :responsiveOptions="responsiveOptions" containerClass="gap-2">
                    <template #item="slotProps">
                        <div class="rounded-lg bg-[rgba(255,255,255,1)] p-4 m-2" @click="openTask(slotProps.data.id)">
                            <img :src="slotProps.data.image" class="w-full max-h-[20dvh]" />
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

            <div>
                <div class="flex items-center gap-4 justify-between mt-4">
                    <h1 class="text-2xl text-[rgba(20,21,34,1)] font-semibold">New Task</h1>
                    <div class="flex items-center gap-4">
                        <ArrowLeft :is-disabled="currentNewTaskPage == 0" @click="decreaseNewTaskPage" />
                        <ArrowRight :is-disabled="currentNewTaskPage == maxNewTasksPage" @click="increaseNewTaskPage" />
                    </div>
                </div>
                <Carousel class="mt-4" v-model:page="currentNewTaskPage" :value="newTasks" :numVisible="newTaskNumsVisible"
                    :numScroll="1" :showNavigators="false" :showIndicators="false" :responsiveOptions="responsiveOptions"
                    containerClass="gap-2">
                    <template #item="slotProps">
                        <div class="rounded-lg bg-[rgba(255,255,255,1)] p-4 m-2" @click="openTask(slotProps.data.id)">
                            <img :src="slotProps.data.image" class="w-full max-h-[20dvh]" />
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
    </Default>
</template>

<script setup lang="ts">
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import ClockIcon from "@/assets/icons/clock.vue";
import ConfigIcon from "@/assets/icons/config.vue";
import PatternIcon from "@/assets/icons/pattern.vue";
import SearchIcon from '@/assets/icons/search.vue';
import SortIcon from "@/assets/icons/sort.vue";

import Avatar from "@/components/Avatar.vue";
import Default from '@/layouts/Default.vue';

import { getRemainTime } from "@/utils/date";
import tasksData from "@/utils/tasks";

import useWindowResize from "@/composables/window";

import router from "@/router";
import { computed, ref } from "vue";

const { width } = useWindowResize();

interface Task {
    id: number;
    title: string;
    tag: string;
    progress: number;
    expire: string;
    image: string;
}

// Static data
const limitTasks = tasksData.filter(t => {
    const diffSeconds = (Date.now() - new Date(t.expire).getTime()) / 1000;
    return diffSeconds <= 3600;
});

const newTasks = tasksData.filter(t => {
    const diffSeconds = (Date.now() - new Date(t.expire).getTime()) / 1000;
    return diffSeconds > 3600;
});

// Filter state
const showFilter = ref<boolean>(false);
const taskSearch = ref<string>('');

// Limit Tasks
const currentLimitTaskPage = ref<number>(0);
const limitTaskNumsVisible = ref<number>(3);
const limitTasksFiltered = ref<Array<Task>>(limitTasks);

const maxLimitTasksPage = computed(() => Math.ceil((limitTasksFiltered.value?.length ?? 0) / limitTaskNumsVisible.value));

// New Tasks
const currentNewTaskPage = ref<number>(0);
const newTaskNumsVisible = ref<number>(3);
const newTasksFiltered = ref<Array<Task>>(newTasks);

const maxNewTasksPage = computed(() => Math.ceil((newTasksFiltered.value?.length ?? 0) / newTaskNumsVisible.value));

const responsiveOptions = ref([
    {
        breakpoint: '1250px',
        numVisible: 2,
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

const decreaseLimitTaskPage = () => {
    if (currentLimitTaskPage.value == 0) return;
    currentLimitTaskPage.value--;
};

const increaseLimitTaskPage = () => {
    if (currentLimitTaskPage.value == maxLimitTasksPage.value) return;
    currentLimitTaskPage.value++;
};

const decreaseNewTaskPage = () => {
    if (currentNewTaskPage.value == 0) return;
    currentNewTaskPage.value--;
};

const increaseNewTaskPage = () => {
    if (currentNewTaskPage.value == maxNewTasksPage.value) return;
    currentNewTaskPage.value++;
};

const searchTask = () => {
    let id;

    clearTimeout(id);
    id = setTimeout(() => {
        if (taskSearch.value == '') {
            limitTasksFiltered.value = limitTasks;
            newTasksFiltered.value = newTasks;
            return;
        }

        limitTasksFiltered.value = limitTasks.filter(t => (t.title + ' ' + t.tag).toLowerCase().includes(taskSearch.value));
        newTasksFiltered.value = newTasks.filter(t => (t.title + ' ' + t.tag).toLowerCase().includes(taskSearch.value));
    }, 500);
};

const openTask = (id: number) => {
    router.push({ name: 'task', params: { id } });
};

</script>