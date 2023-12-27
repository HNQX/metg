<template>
  <div :id="props.id" class="map"></div>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted, reactive } from 'vue';

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

const me = reactive({ map: null, group: {} })
const props = defineProps({
  id: { type: String, default: 'map' },
})

document.onkeydown = (e) => {
  if (e.ctrlKey) {
    if (e.key === 'z') {
      // me.map.invalidateSize(true)
    }
  }
}

const addCustomMap = () => {
  const NAME_LAYER = 'chinaosm:osm'

  const wmsLayer = L.tileLayer.wms(`/mapServer/geoserver/${NAME_LAYER.split(':').shift()}/wms`, {
    // 'http://52152121.xyz:8081/geoserver/osm/wms', {
    // layers: 'osm:osm_defualt_0',
    layers: NAME_LAYER,
    format: 'image/png',
    transparent: true,
    // tilesOrigin: '8155154.5,1779369',
    styles: 'blue',
  })

  me.map.addLayer(wmsLayer)

  setTimeout(() => me.map.invalidateSize(true), 0)
}

const addMarker = () => {
  L.marker([31.3, 120.6]).addTo(me.map)
}

onMounted(() => {
  me.map = L.map(props.id, {
    center: [31.3, 120.6],
    zoom: 11,
  })

  addCustomMap()
  addMarker()
})
</script>

<style lang="less" scoped>
.map {
  height: 100%;
  width: 100%;
}

.leaflet-container {
  background: #4952a0;
}
</style>
