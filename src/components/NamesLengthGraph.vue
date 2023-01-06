<script setup>
  import { ref, computed } from "vue";
  import { Bar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  );

  const props = defineProps({
    emails: {
      rrequired: true,
      type: Array,
      default: new Array(),
    },
  });

  const emailsLength = computed(() =>
    props.emails.map((email) => email.length),
  );

  const chartData = ref({
    labels: props.emails,
    datasets: [{ label: "Emails length", data: emailsLength.value }],
  });

  const chartOptions = ref({
    responsive: true,
    backgroundColor: "#16a34a",
  });
</script>

<template>
  <Bar class="py-12" :options="chartOptions" :data="chartData" />
</template>
