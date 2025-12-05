<template>
    <main class="flex h-full max-[925px]:flex-col">
        <!-- Sidebar with slide animation -->
        <Transition name="slide">
            <TheSidebar v-if="width >= 925 || show"
                class="w-3xs bg-[#FFFFFF] max-[925px]:absolute max-[925px]:top-0 max-[925px]:left-0 max-[925px]:w-full max-[925px]:h-full z-40">
                <template v-if="width < 925 && show">
                    <button @click="toggleSidebar">
                        X
                    </button>
                </template>
            </TheSidebar>
        </Transition>
        <section class="flex-1 flex flex-col border-2 border-solid border-[rgba(245,245,247,1)]">
            <!-- Mobile -->
            <header
                class="w-full py-4 px-6 flex items-center max-[925px]:border-b-2 border-solid border-[rgba(245,245,247,1)]"
                v-if="width >= 1082">
                <!-- Default fallback if not provided -->
                <slot name="navbar">
                    <h1 class="text-xl font-semibold font-jakarta">
                        Title
                    </h1>
                </slot>
                <div class="ml-auto class flex items-center gap-4">
                    <div class="flex size-12 border-2 border-solid border-[rgba(245,245,247,1)] rounded-full">
                        <Notification class="m-auto" />
                    </div>
                    <Avatar :url="'/img/girl.png'" :width="width" />
                </div>
            </header>

            <!-- Desktop -->
            <header class="py-4 px-6" v-else>
                <div class="w-full flex items-center">
                    <div class="flex size-12 border-2 border-solid border-[rgba(245,245,247,1)] rounded-full"
                        v-if="width < 925">
                        <MenuIcon @click="toggleSidebar" class="m-auto" />
                    </div>
                    <div class="ml-auto class flex items-center gap-4">
                        <div class="flex size-12 border-2 border-solid border-[rgba(245,245,247,1)] rounded-full">
                            <Notification class="m-auto" />
                        </div>
                        <Avatar :url="'/img/girl.png'" :width="width" />
                    </div>
                </div>
                <!-- Default fallback if not provided -->
                <div class="mt-4">
                    <slot name="navbar">
                        <h1 class="text-xl font-semibold font-jakarta">
                            Title
                        </h1>
                    </slot>
                </div>
            </header>

            <div v-if="$slots['filter']" class="py-2 mb-4 px-6">
                <slot name="filter">

                </slot>
            </div>

            <!-- MAIN CONTENT -->
            <div class="flex-1 py-4 px-6 overflow-y-auto bg-[rgba(245,245,247,1)] max-[925px]:max-w-full"
                :class="[$slots['sidebar-right'] ? 'max-w-[calc(70dvw-238px)]' : 'max-w-[calc(100dvw-260px)]']">
                <slot />
            </div>
        </section>

        <!-- OPTIONAL RIGHT SIDEBAR -->
        <aside v-if="$slots['sidebar-right']"
            class="w-[30dvw] max-[925px]:w-full bg-[rgba(245,245,247,1)] border-l border-gray-200 p-5 overflow-y-auto min-h-[100dvh]">
            <slot name="sidebar-right" />
        </aside>
    </main>
</template>

<script setup lang="ts">
import MenuIcon from "@/assets/icons/menu.vue";
import Notification from "@/assets/icons/notification.vue";

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
    if (newW < 925) {
        show.value = false;
    }
});

onMounted(() => {
    if (width.value < 925) {
        show.value = false;
    }
});
</script>
