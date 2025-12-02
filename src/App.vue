<template>
  <div class="h-dvh">
    <component :is="layout">
      <router-view />
    </component>
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