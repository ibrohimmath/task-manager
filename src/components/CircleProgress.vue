<template>
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
        <circle :cx="center" :cy="center" :r="radius" fill="none" stroke="rgba(84, 111, 255, 0.15)"
            :stroke-width="stroke" />

        <circle :cx="center" :cy="center" :r="radius" fill="none" stroke="rgba(84, 111, 255, 1)" :stroke-width="stroke"
            stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="circumference * (1 - value / 100)"
            :transform="`rotate(-90 ${center} ${center})`" />

        <text :x="center" :y="center" text-anchor="middle" dominant-baseline="middle"
            class="fill-white text-lg font-normal">
            {{ value }}%
        </text>
    </svg>
</template>

<script setup lang="ts">
const props = defineProps({
    value: { type: Number, default: 45 },
    size: { type: Number, default: 80 },
    stroke: { type: Number, default: 5 },

});

const center = props.size / 2;
const radius = center - props.stroke / 2;
const circumference = 2 * Math.PI * radius;
</script>
