<template>
    <div class="p-8 flex flex-col">
        <router-link to="/overview">
            <div class="flex items-center gap-3">
                <div class="flex items-center h-6 gap-2">
                    <img :src="bookIcon" />
                </div>
                <div class="p-auto text-[#141522] text-3xl font-semibold leading-[4xlpx]">DNX</div>
            </div>
        </router-link>
        <nav class="mt-12 flex flex-col gap-4">
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

import { watch } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, (newRoute) => {
    console.log(route, 'update route');
}, { immediate: true });

</script>