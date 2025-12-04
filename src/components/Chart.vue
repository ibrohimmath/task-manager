<template>
    <div class="w-full max-w-4xl mx-auto">
        <div class="bg-white rounded-3xl">
            <!-- Chart Container -->
            <div class="relative h-38 bg-white rounded-2xl p-2">
                <div ref="chartContainer"></div>
            </div>

        </div>
    </div>
</template>
  
<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import ApexCharts from 'apexcharts';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface WeekDay {
    short: string;
    full: string;
    tasks: number;
}

// Refs
const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<ApexCharts | null>(null);

// Data
const weekDays = ref<WeekDay[]>([
    { short: 'Sun', full: 'Sunday', tasks: 1 },
    { short: 'Mon', full: 'Monday', tasks: 2 },
    { short: 'Tue', full: 'Tuesday', tasks: 1 },
    { short: 'Wed', full: 'Wednesday', tasks: 2 },
    { short: 'Thu', full: 'Thursday', tasks: 1.5 },
    { short: 'Fri', full: 'Friday', tasks: 2 },
    { short: 'Sat', full: 'Saturday', tasks: 1.8 }
]);

// Computed
const totalTasks = computed(() => {
    return weekDays.value.reduce((sum, day) => sum + day.tasks, 0).toFixed(1);
});

// Chart Options
const chartOptions: ApexOptions = {
    chart: {
        type: 'line',
        height: 150,
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
        },
        background: 'transparent'
    },
    series: [
        {
            name: 'Tasks',
            data: weekDays.value.map(d => d.tasks)
        },
        {
            name: 'Background',
            data: weekDays.value.map(d => d.tasks * 0.7) // Background line at 70% of main line
        }
    ],
    stroke: {
        curve: 'smooth',
        width: [3, 3],
        colors: ['#1f2937', '#e5e7eb']
    },
    markers: {
        size: [0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        colors: ['#3b82f6'],
        strokeColors: '#fff',
        strokeWidth: 3,
        hover: {
            size: 8,
            sizeOffset: 0
        },
        discrete: [
            {
                seriesIndex: 0,
                dataPointIndex: 1,
                fillColor: '#3b82f6',
                strokeColor: '#fff',
                size: 8
            }
        ]
    },
    xaxis: {
        categories: weekDays.value.map(d => d.short[0]),
        labels: {
            style: {
                colors: '#374151',
                fontSize: '13px',
                fontWeight: 600
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        min: 0,
        max: 2,
        tickAmount: 2,
        labels: {
            style: {
                colors: '#6b7280',
                fontSize: '12px',
                fontWeight: 500
            },
            formatter: function (value) {
                return Math.round(value).toString();
            }
        }
    },
    grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 0,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
        padding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 5
        }
    },
    tooltip: {
        enabled: true,
        shared: true,
        followCursor: true,
        intersect: false,
        style: {
            fontSize: '14px',
            fontFamily: undefined
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex];
            const taskCount = Math.round(value);
            const dayName = weekDays.value[dataPointIndex].full;

            return `
          <div style="background: #1f2937; color: white; padding: 12px 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
            <div style="font-weight: 600; margin-bottom: 4px;">${taskCount} Task${taskCount !== 1 ? 's' : ''}</div>
            <div style="font-size: 12px; color: #9ca3af;">${dayName}</div>
          </div>
        `;
        }
    },
    colors: ['#1f2937', '#e5e7eb'],
    legend: {
        show: false
    }
};

// Methods
const initChart = () => {
    if (!chartContainer.value) return;

    chart.value = new ApexCharts(chartContainer.value, chartOptions);
    chart.value.render();
};

const highlightDay = (index: number) => {
    if (!chart.value) return;

    // Update markers to highlight selected day
    const newMarkers = weekDays.value.map((_, i) => i === index ? 8 : 0);

    chart.value.updateOptions({
        markers: {
            size: newMarkers
        }
    });
};

// Lifecycle
onMounted(() => {
    initChart();
});

onBeforeUnmount(() => {
    if (chart.value) {
        chart.value.destroy();
    }
});
</script>