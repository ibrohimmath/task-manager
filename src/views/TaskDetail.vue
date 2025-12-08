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

        <div class="w-full grid grid-cols-10 gap-6 max-[790px]:grid-cols-1">
            <div class="col-span-6 bg-[rgba(255,255,255,1)] rounded-lg">
                <!-- Black placeholder for screenmirror mode -->
                <div v-if="videoObj.screenmirror"
                    class="relative bg-black rounded-lg flex items-center justify-center h-80 p-4">
                    <p class="text-white text-lg">Video playing in picture-in-picture mode</p>
                </div>

                <div v-show="!videoObj.screenmirror" @mouseenter="showControls = true" @mouseleave="hideControlsWithDelay"
                    :class="videoObj.maximize ? 'z-70 fixed top-0 left-0 w-dvw h-dvh bg-black' : 'relative'"
                    @mousemove="showControls = true; resetHideTimer()">
                    <video ref="videoRef" class="rounded-lg cursor-pointer w-full object-contain"
                        poster="/img/task_preview.jpg" :class="[videoObj.maximize ? 'h-dvh' : 'h-80']"
                        @timeupdate="updateProgress" @loadedmetadata="onVideoLoaded" @seeking="onSeeking" @seeked="onSeeked"
                        @click="togglePlayPause">
                        <source src="/video/tcp_vs_udp.mp4" type="video/mp4" />
                    </video>
                    <Transition name="fade">
                        <div v-show="showControls || !videoObj.playing"
                            class="absolute rounded-lg left-[3%] bottom-[5%] w-[94%] bg-[rgba(255,255,255,0.95)] h-8 px-3 transition-opacity duration-300"
                            @mouseenter="showControls = true">
                            <div class="flex items-center gap-4 max-[1070px]:gap-2 h-full">
                                <PlayIcon class="size-6 cursor-pointer flex-none" v-if="!videoObj.playing"
                                    @click="playVideo" />
                                <StopIcon class="size-6 cursor-pointer flex-none" v-else @click="pauseVideo" />
                                <input type="range" min="0" max="100" step="0.1" :value="videoObj.progress * 100"
                                    :style="{ '--progress': `${videoObj.progress * 100}%` }" @input="onSliderInput"
                                    @change="onSliderChange" class="flex-1 cursor-pointer max-w-[calc(100%-240px)]" />
                                <p class="text-sm whitespace-nowrap">
                                    {{ displayVideoTime(videoObj.currentTime) }} / {{ displayVideoTime(videoObj.duration) }}
                                </p>
                                <MaximizeIcon class="size-6 flex-none ml-auto cursor-pointer"
                                    @click="videoObj.screenmirror = false; videoObj.maximize = !videoObj.maximize" />
                                <ScreenMirrorIcon class="size-6 flex-none ml-1 cursor-pointer"
                                    @click="videoObj.maximize = false; videoObj.screenmirror = !videoObj.screenmirror" />

                                <!-- Volume Control -->
                                <div class="ml-1 relative volume-container">
                                    <div @mouseenter="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
                                        <VolumeIcon v-if="videoObj.volume > 0" class="size-6 flex-none cursor-pointer"
                                            @click="toggleMute" />
                                        <VolumeMuteIcon v-else class="size-6 flex-none cursor-pointer"
                                            @click="toggleMute" />

                                        <!-- Horizontal Volume slider -->
                                        <Transition name="fade">
                                            <div v-show="showVolumeSlider"
                                                class="absolute -top-0 -translate-y-[300%] left-1/2 -translate-x-1/2 mb-2 bg-[rgba(255,255,255,0.95)] p-3 rounded-lg shadow-lg min-w-[120px] -rotate-90"
                                                @mouseenter="showVolumeSlider = true"
                                                @mouseleave="showVolumeSlider = false">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-xs font-semibold whitespace-nowrap rotate-90">{{
                                                        Math.round(videoObj.volume * 100) }}%</span>
                                                    <input type="range" min="0" max="100" step="1"
                                                        :value="videoObj.volume * 100"
                                                        :style="{ '--volume-progress': `${videoObj.volume * 100}%` }"
                                                        @input="onVolumeChange"
                                                        class="volume-slider-horizontal flex-1 cursor-pointer" />
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>

                <div class="p-4">
                    <h1 class="font-semibold text-3xl">{{ task.title }}</h1>
                    <div class="mt-4 flex gap-4">
                        <p class="text-sm font-medium text[rgba(84,87,122,1)]">
                            {{ task.tag }}
                        </p>
                        <div class="h-6 bg-[rgba(223,223,223,1)] border-[1px] border-solid border-[[rgba(223,223,223,1)]]">
                        </div>
                        <p class="font-medium text-sm text-[rgba(4,164,244,1)]">+Get Mentors</p>
                    </div>
                    <div class="mt-4 flex items-center gap-6">
                        <p class="flex items-center gap-2">
                            <StudentsIcon />
                            200 students involved
                        </p>
                        <p class="flex items-center gap-2">
                            <ClockIcon />
                            {{ getRemainTime(new Date(task.expire), new Date()) }}
                        </p>
                    </div>
                    <h1 class="mt-4 font-semibold text-2xl">Description</h1>
                    <p class="mt-4 text-justify text-sm leading-6 font-light">Follow the video tutorial above. Understand
                        how to use each tool in the
                        Figma
                        application. Also learn how to make a good and correct design. Starting from spacing, typography,
                        content, and many other design hierarchies. Then try to make it yourself with your imagination and
                        inspiration.</p>
                    <h1 class="mt-4 font-semibold text-2xl">Essence of Assessment</h1>
                    <div class="mt-4 flex items-center gap-4">
                        <div
                            class="size-6 max-[925px]:size-4 bg-[rgba(84,111,255,1)] flex justify-center items-center rounded-full">
                            <TickIcon />
                        </div>
                        <p class="font-light text-sm">Understanding the tools in Figma</p>
                    </div>
                    <div class="mt-4 flex items-center gap-4">
                        <div
                            class="size-6 max-[925px]:size-4 bg-[rgba(84,111,255,1)] flex justify-center items-center rounded-full">
                            <TickIcon />
                        </div>
                        <p class="font-light text-sm">Understand the basics of making designs</p>
                    </div>
                    <div class="mt-4 flex items-center gap-4">
                        <div
                            class="size-6 max-[925px]:size-4 bg-[rgba(84,111,255,1)] flex justify-center items-center rounded-full">
                            <TickIcon />
                        </div>
                        <p class="font-light text-sm">Designing a mobile application using figma</p>
                    </div>
                    <div class="mt-4 flex items-center gap-4">
                        <div
                            class="size-6 max-[925px]:size-4 bg-[rgba(84,111,255,1)] flex justify-center items-center rounded-full">
                            <TickIcon />
                        </div>
                        <p class="font-light text-sm">Presenting the design flow</p>
                    </div>
                </div>

                <!-- Picture-in-picture (screenmirror) video -->
                <div v-if="videoObj.screenmirror" @mouseenter="showControls = true" @mouseleave="hideControlsWithDelay"
                    class="z-70 fixed right-4 bottom-4 w-[40dvw] max-[1500px]:w-[60dvw] max-[925px]:w-[95dvw] h-[35dvh] bg-black rounded-lg shadow-2xl"
                    @mousemove="showControls = true; resetHideTimer()">
                    <video ref="pipVideoRef" class="rounded-lg cursor-pointer w-full h-full object-contain"
                        @timeupdate="updateProgress" @loadedmetadata="onVideoLoaded" @click="togglePlayPause"
                        @seeked="onSeeked">
                        <source src="/video/tcp_vs_udp.mp4" type="video/mp4" />
                    </video>
                    <Transition name="fade">
                        <div v-show="showControls || !videoObj.playing"
                            class="absolute rounded-lg left-[3%] bottom-[5%] w-[94%] bg-[rgba(255,255,255,0.95)] h-8 px-3 transition-opacity duration-300"
                            @mouseenter="showControls = true">
                            <div
                                class="flex items-center gap-4 max-[1070px]:gap-2 max-[925px]:gap-4 max-[728px]:gap-2 h-full">
                                <PlayIcon class="cursor-pointer size-6 flex-none" v-if="!videoObj.playing"
                                    @click="playVideo" />
                                <StopIcon class="cursor-pointer size-6 flex-none" v-else @click="pauseVideo" />
                                <input type="range" min="0" max="100" step="0.1" :value="videoObj.progress * 100"
                                    :style="{ '--progress': `${videoObj.progress * 100}%` }" @input="onSliderInput"
                                    @change="onSliderChange" class="flex-1 cursor-pointer max-w-[calc(100%-200px)]" />
                                <p class="text-sm whitespace-nowrap">
                                    {{ displayVideoTime(videoObj.currentTime) }} / {{ displayVideoTime(videoObj.duration) }}
                                </p>
                                <ScreenMirrorIcon class="size-6 ml-auto cursor-pointer flex-none"
                                    @click="videoObj.screenmirror = false" />

                                <!-- Volume Control for PIP -->
                                <div class="ml-1 relative volume-container">
                                    <div @mouseenter="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
                                        <VolumeIcon v-if="videoObj.volume > 0" class="cursor-pointer size-6 flex-none"
                                            @click="toggleMute" />
                                        <VolumeMuteIcon v-else class="cursor-pointer size-6 flex-none"
                                            @click="toggleMute" />

                                        <!-- Horizontal Volume slider for PIP -->
                                        <Transition name="fade">
                                            <div v-show="showVolumeSlider"
                                                class="absolute -top-0 -translate-y-[300%] left-1/2 -translate-x-1/2 mb-2 bg-[rgba(255,255,255,0.95)] p-3 rounded-lg shadow-lg min-w-[120px] -rotate-90"
                                                @mouseenter="showVolumeSlider = true"
                                                @mouseleave="showVolumeSlider = false">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-xs font-semibold whitespace-nowrap rotate-90">{{
                                                        Math.round(videoObj.volume * 100) }}%</span>
                                                    <input type="range" min="0" max="100" step="1"
                                                        :value="videoObj.volume * 100"
                                                        :style="{ '--volume-progress': `${videoObj.volume * 100}%` }"
                                                        @input="onVolumeChange"
                                                        class="volume-slider-horizontal flex-1 cursor-pointer" />
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="h-fit col-span-4 bg-[rgba(255,255,255,1)] rounded-lg p-6">
                <p class="font-semibold text-sm">Assigned Assignments</p>
                <h1 class="mt-6 font-semibold text-3xl">{{ task.title }}</h1>
                <p class="mt-2 text-sm font-medium text[rgba(84,87,122,1)]">
                    {{ task.tag }}
                </p>
                <h1 class="mt-6 font-semibold text-xl">Detail Student</h1>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-sm text-[rgba(84,87,122,1)]">Student's name</p>
                    <h2 class="font-semibold text-sm text-[rgba(20,21,34,1)]">Dennis Nzioki</h2>
                </div>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-sm text-[rgba(84,87,122,1)]">Student Class</p>
                    <h2 class="font-semibold text-sm text-[rgba(20,21,34,1)]">MP2</h2>
                </div>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-sm text-[rgba(84,87,122,1)]">Student number</p>
                    <h2 class="font-semibold text-sm text-[rgba(20,21,34,1)]">10</h2>
                </div>
                <h1 class="mt-6 font-semibold text-xl">File Task</h1>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-sm text-[rgba(84,87,122,1)]">Last Modified</p>
                    <h2 class="font-semibold text-sm text-[rgba(20,21,34,1)]">1 July 2022</h2>
                </div>
                <div class="mt-4 flex items-center gap-4 justify-between">
                    <p class="font-normal text-sm text-[rgba(84,87,122,1)]">File submissions</p>
                </div>
                <div class="mt-4 h-40 border-dashed border-2 border-[rgba(84,111,255,1)] flex items-center justify-center rounded-[10px] cursor-pointer hover:bg-[rgba(84,111,255,0.05)] transition-colors"
                    @click="fileRef?.click()" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleFileDrop" :class="{ 'bg-[rgba(84,111,255,0.1)]': isDragging }">
                    <div class="flex flex-col items-center gap-2 p-4">
                        <FileIcon />
                        <p class="text-sm text-[rgba(84,87,122,1)]">
                            {{ fileName || 'Click to browse or drag file here' }}
                        </p>
                    </div>
                    <input ref="fileRef" type="file" class="hidden" @change="handleFileChange" />
                </div>
                <p class="mt-4 text-xs text-[rgba(84,87,122,1)]">
                    {{ fileName ? `Selected: ${fileName}` : '*drag or browse from device' }}
                </p>
                <button
                    class="w-full mt-15 p-4 bg-[rgba(84,111,255,1)] rounded-[10px] text-sm text-[rgba(255,255,255,1)] font-semibold">Submit</button>
            </div>
        </div>
    </Default>
</template>

<script setup lang="ts">
import ClockIcon from "@/assets/icons/clock.vue";
import ConfigIcon from "@/assets/icons/config.vue";
import FileIcon from "@/assets/icons/file.vue";
import MaximizeIcon from "@/assets/icons/maximize.vue";
import PatternIcon from "@/assets/icons/pattern.vue";
import PlayIcon from "@/assets/icons/play_video.vue";
import ScreenMirrorIcon from "@/assets/icons/screenmirror.vue";
import SearchIcon from '@/assets/icons/search.vue';
import SortIcon from "@/assets/icons/sort.vue";
import StopIcon from "@/assets/icons/stop_video.vue";
import StudentsIcon from "@/assets/icons/students.vue";
import TickIcon from "@/assets/icons/tick.vue";
import VolumeIcon from "@/assets/icons/volume-high.vue";
import VolumeMuteIcon from "@/assets/icons/volume-slash.vue";

import tasksData from "@/utils/tasks";

import Default from '@/layouts/Default.vue';
import { displayVideoTime, getRemainTime } from "@/utils/date";

import { nextTick, reactive, ref, watch } from "vue";

import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

// Interfaces
interface VideoObject {
    playing: boolean;
    progress: number;
    currentTime: number;
    duration: number;
    maximize: boolean;
    screenmirror: boolean;
    volume: number;
    previousVolume: number;
}

interface Task {
    id: number;
    title: string;
    tag: string;
    progress: number;
    expire: string;
    image: string;
}

// Route
const route = useRoute();

// Filter state
const showFilter = ref<boolean>(false);
const taskSearch = ref<string>('');

// File
const fileRef = ref<any>();
const fileName = ref<string>('');
const isDragging = ref<boolean>(false);

// Task
let task = reactive<Task>({
    id: 0,
    title: "Nothing",
    tag: "Web",
    progress: 90,
    expire: "2025-12-05 12:59",
    image: "/img/task.png",
});

// Video
const videoRef = ref<HTMLVideoElement>();
const pipVideoRef = ref<HTMLVideoElement>();
const isSeeking = ref<boolean>(false);
const showControls = ref<boolean>(true);
const showVolumeSlider = ref<boolean>(false);
let hideControlsTimer: ReturnType<typeof setTimeout> | null = null;

// Video status
const videoObj = reactive<VideoObject>({
    playing: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    maximize: false,
    screenmirror: false,
    volume: 1,
    previousVolume: 1,
});

const searchTask = () => {
    console.log("Search task...");
};

const updateProgress = () => {
    // Only update progress if user is not actively seeking
    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    if (activeVideo && !isSeeking.value) {
        videoObj.currentTime = activeVideo.currentTime;
        videoObj.duration = activeVideo.duration || 0;
        videoObj.progress = videoObj.duration ? (activeVideo.currentTime / activeVideo.duration) : 0;
    }
};

const onVideoLoaded = () => {
    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    if (activeVideo) {
        videoObj.duration = activeVideo.duration;
        activeVideo.volume = videoObj.volume;
    }
};

const playVideo = () => {
    videoObj.playing = true;
    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    activeVideo?.play();
    hideControlsWithDelay();
};

const pauseVideo = () => {
    videoObj.playing = false;
    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    activeVideo?.pause();
    showControls.value = true;
    clearHideTimer();
};

const togglePlayPause = () => {
    if (videoObj.playing) {
        pauseVideo();
    } else {
        playVideo();
    }
};

const hideControlsWithDelay = () => {
    if (videoObj.playing) {
        hideControlsTimer = setTimeout(() => {
            showControls.value = false;
        }, 2000);
    }
};

const resetHideTimer = () => {
    clearHideTimer();
    if (videoObj.playing) {
        hideControlsWithDelay();
    }
};

const clearHideTimer = () => {
    if (hideControlsTimer) {
        clearTimeout(hideControlsTimer);
        hideControlsTimer = null;
    }
};

const onSliderInput = (event: Event) => {
    isSeeking.value = true;
    showControls.value = true;
    clearHideTimer();

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

    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    if (activeVideo && videoObj.duration) {
        activeVideo.currentTime = value * videoObj.duration;
    }

    setTimeout(() => {
        isSeeking.value = false;
        if (videoObj.playing) {
            hideControlsWithDelay();
        }
    }, 100);
};

const onVolumeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value) / 100;
    videoObj.volume = value;

    // Update both video elements
    if (videoRef.value) {
        videoRef.value.volume = value;
    }
    if (pipVideoRef.value) {
        pipVideoRef.value.volume = value;
    }

    console.log('Volume changed to:', value, 'Percentage:', Math.round(value * 100) + '%');
};

const toggleMute = () => {
    if (videoObj.volume > 0) {
        videoObj.previousVolume = videoObj.volume;
        videoObj.volume = 0;
    } else {
        videoObj.volume = videoObj.previousVolume;
    }

    if (videoRef.value) {
        videoRef.value.volume = videoObj.volume;
    }
    if (pipVideoRef.value) {
        pipVideoRef.value.volume = videoObj.volume;
    }
};

const onSeeking = () => {
    console.log("Video is seeking...");
};

const onSeeked = () => {
    const activeVideo = videoObj.screenmirror ? pipVideoRef.value : videoRef.value;
    console.log("Video seeked to:", activeVideo?.currentTime);
    isSeeking.value = false;
};

// File handling functions
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
        const file = files[0];
        fileName.value = file?.name ?? '';
        console.log('Selected file:', file);

        // You can add additional file handling here
        // For example, upload the file or read its contents
    }
};

const handleFileDrop = (event: DragEvent) => {
    isDragging.value = false;

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
        const file = files[0];
        fileName.value = file?.name ?? '';
        console.log('Dropped file:', file);

        // If you want to also update the input element with the dropped file
        // Note: This is read-only, but useful for form submission
        if (fileRef.value) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file!);
            fileRef.value.files = dataTransfer.files;
        }

        // You can add additional file handling here
    }
};

// Optional: Clear file selection
const clearFile = () => {
    fileName.value = '';
    if (fileRef.value) {
        fileRef.value.value = '';
    }
};

watch(() => videoObj.screenmirror, async (newVal, oldVal) => {
    // Wait for next tick to ensure DOM is updated
    await nextTick();

    if (newVal && pipVideoRef.value && videoRef.value) {
        // Switching TO picture-in-picture mode
        const mainVideo = videoRef.value;
        const pipVideo = pipVideoRef.value;

        // Store current state from main video
        const currentTime = mainVideo.currentTime;
        const wasPlaying = !mainVideo.paused;

        // Pause main video first
        mainVideo.pause();

        // Wait a bit for the pause to register
        await new Promise(resolve => setTimeout(resolve, 50));

        // Sync pip video
        pipVideo.currentTime = currentTime;
        pipVideo.volume = videoObj.volume;

        // Resume playback if it was playing
        if (wasPlaying) {
            try {
                await pipVideo.play();
                videoObj.playing = true;
            } catch (err) {
                console.error('Error playing pip video:', err);
                videoObj.playing = false;
            }
        }
    } else if (!newVal && videoRef.value && pipVideoRef.value) {
        // Switching FROM picture-in-picture mode back to main
        const mainVideo = videoRef.value;
        const pipVideo = pipVideoRef.value;

        // Store current state from pip video
        const currentTime = pipVideo.currentTime;
        const wasPlaying = !pipVideo.paused;

        // Pause pip video first
        pipVideo.pause();

        // Wait a bit for the pause to register
        await new Promise(resolve => setTimeout(resolve, 50));

        // Sync main video
        mainVideo.currentTime = currentTime;
        mainVideo.volume = videoObj.volume;

        // Resume playback if it was playing
        if (wasPlaying) {
            try {
                await mainVideo.play();
                videoObj.playing = true;
            } catch (err) {
                console.error('Error playing main video:', err);
                videoObj.playing = false;
            }
        }
    }
});

watch(() => route.params.id, (newId) => {
    const idNum = +(newId as string);
    if (tasksData.findIndex(t => t.id == idNum) != -1) {
        task = tasksData.find(t => t.id == idNum)!;
    }
}, { immediate: true });

onMounted(() => {
    // Set initial volume
    if (videoRef.value) {
        videoRef.value.volume = videoObj.volume;
    }
});

onUnmounted(() => {
    clearHideTimer();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* Custom range slider styling */
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    height: 4px;
}

input[type="range"]::-webkit-slider-track {
    background: rgba(200, 200, 200, 0.5);
    height: 4px;
    border-radius: 2px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: rgba(20, 21, 34, 1);
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin-top: -5px;
    cursor: pointer;
}

input[type="range"]::-moz-range-track {
    background: rgba(200, 200, 200, 0.5);
    height: 4px;
    border-radius: 2px;
}

input[type="range"]::-moz-range-thumb {
    background: rgba(20, 21, 34, 1);
    height: 14px;
    width: 14px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
}

/* Progress fill for webkit browsers */
input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right,
            rgba(20, 21, 34, 1) 0%,
            rgba(20, 21, 34, 1) var(--progress, 0%),
            rgba(200, 200, 200, 0.5) var(--progress, 0%),
            rgba(200, 200, 200, 0.5) 100%);
    height: 4px;
    border-radius: 2px;
}

/* Progress fill for Firefox */
input[type="range"]::-moz-range-progress {
    background: rgba(20, 21, 34, 1);
    height: 4px;
    border-radius: 2px;
}

/* Volume slider horizontal styling */
.volume-slider-horizontal {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    height: 4px;
}

.volume-slider-horizontal::-webkit-slider-track {
    background: rgba(200, 200, 200, 0.5);
    height: 4px;
    border-radius: 2px;
}

.volume-slider-horizontal::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: rgba(20, 21, 34, 1);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin-top: -4px;
    cursor: pointer;
}

.volume-slider-horizontal::-webkit-slider-runnable-track {
    background: linear-gradient(to right,
            rgba(20, 21, 34, 1) 0%,
            rgba(20, 21, 34, 1) var(--volume-progress, 0%),
            rgba(200, 200, 200, 0.5) var(--volume-progress, 0%),
            rgba(200, 200, 200, 0.5) 100%);
    height: 4px;
    border-radius: 2px;
}

.volume-slider-horizontal::-moz-range-track {
    background: rgba(200, 200, 200, 0.5);
    height: 4px;
    border-radius: 2px;
}

.volume-slider-horizontal::-moz-range-thumb {
    background: rgba(20, 21, 34, 1);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
}

.volume-slider-horizontal::-moz-range-progress {
    background: rgba(20, 21, 34, 1);
    height: 4px;
    border-radius: 2px;
}

.volume-container {
    display: flex;
    align-items: center;
    position: relative;
}
</style>