<template>
    <div class="p-8 flex flex-col relative">
        <router-link to="/overview">
            <div class="flex items-center gap-3">
                <div class="flex items-center h-6 gap-2">
                    <img :src="bookIcon" />
                </div>
                <div class="p-auto text-[#141522] text-3xl font-semibold leading-[4xlpx]">DNX</div>
                <div class="ml-auto flex items-center">
                    <slot />
                </div>
            </div>
        </router-link>
        <nav class="mt-8 flex flex-col gap-4">
            <router-link to="/overview">
                <div class="flex gap-3 py-3 px-8" :class="[route.name == 'overview' ? 'bg-[#F5F5F7] rounded-xl' : '']">
                    <Category :isActive="route.name != 'overview'" />
                    <p class="font-semibold" :class="[route.name != 'overview' ? 'text-[#8E92BC]' : 'text-[#141522]']">
                        Overview</p>
                </div>
            </router-link>
            <router-link to="/task">
                <div class="flex gap-3 py-3 px-8" :class="[route.name == 'task' ? 'bg-[#F5F5F7] rounded-xl' : '']">
                    <Book :isActive="route.name != 'task'" />
                    <p class="font-semibold" :class="[route.name != 'task' ? 'text-[#8E92BC]' : 'text-[#141522]']">Task</p>
                </div>
            </router-link>
            <router-link to="/mentors">
                <div class="flex gap-3 py-3 px-8" :class="[route.name == 'mentors' ? 'bg-[#F5F5F7] rounded-xl' : '']">
                    <User :isActive="route.name != 'mentors'" />
                    <p class="font-semibold" :class="[route.name != 'mentors' ? 'text-[#8E92BC]' : 'text-[#141522]']">
                        Mentors</p>
                </div>
            </router-link>
            <router-link to="/message">
                <div class="flex gap-3 py-3 px-8" :class="[route.name == 'message' ? 'bg-[#F5F5F7] rounded-xl' : '']">
                    <Message :isActive="route.name != 'message'" />
                    <p class="font-semibold" :class="[route.name != 'message' ? 'text-[#8E92BC]' : 'text-[#141522]']">
                        Message</p>
                </div>
            </router-link>
            <router-link to="/settings">
                <div class="flex gap-3 py-3 px-8" :class="[route.name == 'settings' ? 'bg-[#F5F5F7] rounded-xl' : '']">
                    <Setting :isActive="route.name != 'settings'" />
                    <p class="font-semibold" :class="[route.name != 'settings' ? 'text-[#8E92BC]' : 'text-[#141522]']">
                        Settings</p>
                </div>
            </router-link>
        </nav>
        <div class="relative mt-auto max-w-2xs w-full">
            <div
                class="absolute overflow-hidden size-12 rounded-full flex items-center justify-center top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_3px_24px_2px_#54577A]">
                <!-- outer blurred glow -->
                <div class="absolute inset-[-12px] bg-[#141522] rounded-full blur-xl opacity-40"></div>

                <!-- inner white ring + dark circle -->
                <div class="absolute inset-0 bg-[#141522] border-[4px] border-white rounded-full"></div>

                <span class="text-2xl font-bold text-white z-20">?</span>
            </div>

            <!-- Actual card -->
            <div
                class="relative max-w-2xs w-full h-[28dvh] p-4 rounded-2xl bg-[#141522] text-white overflow-hidden flex text-center flex-col">

                <!-- Top-left quarter circle -->
                <div class="absolute -top-4 -left-4 w-20 h-20 bg-[#FFFFFF14] rounded-br-full"></div>

                <!-- Bottom-right quarter circle -->
                <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-[#FFFFFF14] rounded-tl-full"></div>

                <div class="flex-1 flex flex-col items-center justify-center">
                    <h2 class="text-md font-semibold">Help Center</h2>

                    <p class="mt-2 text-[12px] tracking-tight">
                        Having Trouble in Learning.<br>
                        Please contact us for more questions.
                    </p>
                </div>

                <button class="mt-auto bg-white text-black font-semibold text-[12px] px-4 py-2 rounded-xl font-medium">
                    Go To Help Center
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Svg icon
import bookIcon from '@/assets/icons/book-square.svg';

// Dynamic icons
import Book from '@/assets/icons/book.vue';
import Category from "@/assets/icons/category.vue";
import Message from '@/assets/icons/message.vue';
import Setting from '@/assets/icons/setting.vue';
import User from '@/assets/icons/user.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>