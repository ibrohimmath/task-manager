<template>
    <main class="flex h-full" :class="{ 'flex-col': width < 1024 }">
        <!-- Sidebar with slide animation -->
        <Transition name="slide">
            <TheSidebar v-if="width >= 1024 || show" class="w-3xs bg-[#FFFFFF]"
                :class="{ 'absolute top-0 left-0 w-full h-full z-40 shadow-xl': width < 1024 }">
                <template v-if="width < 1024 && show">
                    <button class="absolute top-8 right-8" @click="toggleSidebar">
                        X
                    </button>
                </template>
            </TheSidebar>
        </Transition>
        <!-- <TheSidebar class="w-3xs bg-[#FFFFFF]" v-if="width >= 1024 || show" :class="" /> -->
        <section class="flex-1 flex p-4 flex-col">
            <!-- NAVBAR / PAGE HEADER -->
            <header class="w-full p-4 flex items-center" v-if="width >= 1024">
                <!-- Default fallback if not provided -->
                <slot name="navbar">
                    <h1 class="text-xl font-semibold font-jakarta">
                        Title
                    </h1>
                </slot>
                <div class="ml-auto">
                    <Avatar :url="'/img/girl.png'" :width="width" />
                </div>
            </header>

            <header class="p-4" v-else>
                <div class="w-full flex items-center">
                    <MenuIcon @click="toggleSidebar" />
                    <Avatar class="ml-auto" :url="'/img/girl.png'" />
                </div>
                <!-- Default fallback if not provided -->
                <slot name="navbar">
                    <h1 class="text-xl font-semibold font-jakarta">
                        Title
                    </h1>
                </slot>
            </header>

            <!-- MAIN CONTENT -->
            <div class="flex-1 p-4 overflow-y-auto">
                <slot />
            </div>
        </section>

        <!-- OPTIONAL RIGHT SIDEBAR -->
        <aside v-if="$slots['sidebar-right']" class="w-64 bg-white border-l border-gray-200 p-4">
            <slot name="sidebar-right" />
        </aside>
    </main>
</template>

<script setup lang="ts">
import MenuIcon from "@/assets/icons/menu.vue";
import Avatar from '@/components/Avatar.vue';
import TheSidebar from "@/components/TheSidebar.vue";

import useWindowResize from "@/composables/window";
import { onMounted, ref, watch } from "vue";
const { width } = useWindowResize();
const show = ref<boolean>(true);

const toggleSidebar = () => {
    show.value = !show.value;
    console.log('Menu clicked, show:', show.value);
};

watch(width, (newW) => {
    if (newW < 1024) {
        show.value = false;
    }
});

onMounted(() => {
    if (width.value < 1024) {
        show.value = false;
    }
});
</script>
