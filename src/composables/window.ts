import { onMounted, onUnmounted, ref } from 'vue';

export default function useWindowResize() {
    const width = ref(window.innerWidth);

    function handler() {
        width.value = window.innerWidth;
        console.log(width.value, 'window resize');
    };

    onMounted(() => window.addEventListener('resize', handler));
    onUnmounted(() => window.removeEventListener('resize', handler));

    return { width };
}