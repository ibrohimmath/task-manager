<template>
  <div class="h-dvh">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const layout = computed(() => {
  const layoutName = route.meta?.layout || 'Default';
  return defineAsyncComponent(() =>
    import(`@/layouts/${layoutName}.vue`)
  );
});

</script>