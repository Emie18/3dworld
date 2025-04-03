window.CESIUM_BASE_URL = "node_modules/cesium/Build/Cesium/";

import Cesium from "./node_modules/cesium/Build/Cesium/Cesium.js";
const {
  Cartesian3,
  createOsmBuildingsAsync,
  Ion,
  Math: CesiumMath,
  Terrain,
  Viewer,
  Color,
} = Cesium;

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDBmZWM2MC1lYjI2LTRlNzUtYTRmNS1mNTRhOTc3ZTJhZWIiLCJpZCI6MjkwMjk5LCJpYXQiOjE3NDM1OTI0MzV9.VwOvF3o3FJ6EdeVoEanAgCHJuxGEAaJXFVeA86kV6Fo";

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
  timeline: false,
  sceneModePicker: false,
  baseLayerPicker: false,
});

viewer.camera.flyTo({
  //coordonnée proche du petit minou
  destination: Cartesian3.fromDegrees(-4.614, 48.3329, 150),
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-15.0),
  },
});

const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);

/******* Mon code perso Test ******** */

viewer.entities.add({
  position: Cartesian3.fromDegrees(-4.614, 48.3329, 100),
  point: {
    pixelSize: 10, // Taille du point
    color: Color.BLUE, // Couleur du point
  },
});

viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-4.614, 48.3329, 100),
  ellipsoid: {
    radii: new Cesium.Cartesian3(500.0, 500.0, 500.0),
    outline: true,
    outlineColor: Color.WHITE,
    outlineWidth: 2,
    material: new Cesium.ColorMaterialProperty(
      Color.BLUE.withAlpha(0.2) // Couleur avec une transparence de 0.2
    ),
  },
});
