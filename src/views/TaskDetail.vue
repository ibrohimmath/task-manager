<template>
    <Default>
        <template #navbar>
            <div>
                <h1 class="text-2xl font-semibold">
                    Detail Task
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
            <div class="w-full items-center justify-center gap-2 mt-2 min-[801px]:hidden"
                :class="showFilter ? 'flex' : 'hidden'">
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

        <div class="w-full grid grid-cols-10 gap-4">
            <div class="col-span-6 bg-[rgba(255,255,255,1)] rounded-lg">
                <div class="relative">
                    <video ref="videoRef" class="object-cover object-center w-full max-h-80 rounded-lg"
                        @timeupdate="updateProgress" @loadedmetadata="onVideoLoaded" @seeking="onSeeking"
                        @seeked="onSeeked">
                        <source src="/video/tcp_vs_udp.mp4" type="video/mp4" />
                    </video>
                    <div class="absolute rounded-lg left-[3%] bottom-[5%] w-[94%] bg-[rgba(255,255,255,1)] h-8 px-3">
                        <div class="flex items-center gap-4 h-full">
                            <PlayIcon class="size-6" v-if="!videoObj.playing" @click="playVideo" />
                            <StopIcon class="size-6" v-else @click="pauseVideo" />
                            <input type="range" min="0" max="100" step="0.1" :value="videoObj.progress * 100"
                                @input="onSliderInput" @change="onSliderChange" class="flex-1" />
                            <p>{{ displayVideoTime(videoObj.currentTime) }} / {{
                                displayVideoTime(videoObj.duration) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-30 col-span-4 bg-[rgba(255,255,255,1)] rounded-lg">
            </div>
        </div>
    </Default>
</template>

<script setup lang="ts">
import ConfigIcon from "@/assets/icons/config.vue";
import PatternIcon from "@/assets/icons/pattern.vue";
import PlayIcon from "@/assets/icons/play_video.vue";
import SearchIcon from '@/assets/icons/search.vue';
import SortIcon from "@/assets/icons/sort.vue";
import StopIcon from "@/assets/icons/stop_video.vue";

import Default from '@/layouts/Default.vue';
import { displayVideoTime } from "@/utils/date";

import { reactive, ref } from "vue";

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface VideoObject {
    playing: boolean;
    progress: number;
    currentTime: number;
    duration: number;
}

const route = useRoute();

// Filter state
const showFilter = ref<boolean>(false);
const taskSearch = ref<string>('');

const videoRef = ref<HTMLVideoElement>();
const isSeeking = ref<boolean>(false);

// Video status
const videoObj = reactive<VideoObject>({
    playing: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
});

const searchTask = () => {
    console.log("Search task...");
};

const updateProgress = () => {
    // Only update progress if user is not actively seeking
    if (videoRef.value && !isSeeking.value) {
        videoObj.currentTime = videoRef.value.currentTime;
        videoObj.duration = videoRef.value.duration || 0;
        videoObj.progress = videoObj.duration ? (videoRef.value.currentTime / videoObj.duration) : 0;
    }
};

const onVideoLoaded = () => {
    if (videoRef.value) {
        videoObj.duration = videoRef.value.duration;
    }
};

const playVideo = () => {
    videoObj.playing = true;
    videoRef.value?.play();
};

const pauseVideo = () => {
    videoObj.playing = false;
    videoRef.value?.pause();
};

const onSliderInput = (event: Event) => {
    isSeeking.value = true;
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value) / 100;
    videoObj.progress = value;
    if (videoObj.duration) {
        videoObj.currentTime = value * videoObj.duration;
    }
};

const onSliderChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value) / 100;

    if (videoRef.value && videoObj.duration) {
        videoRef.value.currentTime = value * videoObj.duration;
    }

    setTimeout(() => {
        isSeeking.value = false;
    }, 100);
};

const onSeeking = () => {
    console.log("Video is seeking...");
};

const onSeeked = () => {
    console.log("Video seeked to:", videoRef.value?.currentTime);
    isSeeking.value = false;
};

const taskId = route.redirectedFrom;
onMounted(() => {
    console.log(route, "route");
    console.log(videoRef.value, "video obj");
});
</script>