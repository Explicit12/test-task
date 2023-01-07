<script setup>
  import { onMounted, ref } from "vue";
  import L from "leaflet";

  import MapModal from "@/components/MapModal.vue";

  import "leaflet/dist/leaflet.css";

  const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  let map = null;

  const isModalOpend = ref(false);
  const promptLatlng = ref({ lat: 0, lng: 0 });

  function handlePrompt(prompt) {
    if (!prompt) {
      isModalOpend.value = false;
      return;
    }

    addPoint(prompt);
    isModalOpend.value = false;
  }

  function addPoint(pointData) {
    const point = L.marker(pointData.latlng).addTo(map);
    if (pointData.name !== "") {
      point.bindPopup(pointData.name);
      point.on("mouseover", () => point.openPopup());
      point.on("mouseout", () => point.closePopup());
    }
  }

  function initMap() {
    map = L.map("map").setView([48.3794, 31.1656], 6);

    L.tileLayer(tileLayer, {
      maxZoom: 19,
      attribution: attribution,
    }).addTo(map);
  }

  onMounted(() => {
    initMap();
    map.on("click", (e) => {
      promptLatlng.value = e.latlng;
      isModalOpend.value = true;
    });
  });
</script>

<template>
  <div class="py-6">
    <div class="z-10 max-lg:h-screen lg:aspect-video" id="map"></div>
    <Teleport to="body">
      <MapModal
        :key="promptLatlng"
        :open="isModalOpend"
        :latlng="promptLatlng"
        @prompt="handlePrompt"
      />
    </Teleport>
  </div>
</template>
