// The three geospatial projects. Shared by the homepage, Projects and Resume pages so the numbers can't drift.
export type MapProject = {
  slug: string;
  title: string;
  question: string;
  liveUrl: string;
  guideUrl: string;
  repoUrl: string;
  stats: { value: string; label: string }[];
  summary: string;
  method: string;
  lesson: { title: string; body: string };
  tags: string[];
  resumeBullet: string;
};

export const MAP_PROJECTS: MapProject[] = [
  {
    slug: "nyc-flood",
    title: "NYC Hidden Flood Risk",
    question: "How many NYC buildings face stormwater flooding that FEMA's maps don't show?",
    liveUrl: "https://zriley36.github.io/nyc-hidden-flood-risk/",
    guideUrl: "https://zriley36.github.io/nyc-hidden-flood-risk/guide.html",
    repoUrl: "https://github.com/ZRiley36/nyc-hidden-flood-risk",
    stats: [
      { value: "155,682", label: "buildings exposed outside FEMA zones" },
      { value: "4.2×", label: "Ida 311 sewer complaints vs. chance" },
      { value: "~4 min", label: "full-city pipeline run" },
    ],
    summary:
      "Joined every building footprint in New York against DEP's stormwater flood model and FEMA's flood zones. 17.9% of the city's buildings are exposed to modeled rainfall flooding but sit outside both FEMA zones, including about 68,000 likely basement homes.",
    method:
      "GeoPandas and Shapely 2 with STRtree indexes, GeoParquet between steps. Validated against Hurricane Ida 311 sewer-backup complaints: lots the model flags were 4.2× more likely than chance to report flooding, while FEMA zones gave no signal at all. Static MapLibre GL front end on PMTiles built with tippecanoe, plus keyless address search.",
    lesson: {
      title: "What didn't go to plan",
      body: "Point-in-polygon found almost nothing — DEP cuts every building footprint out of its flood polygons, so water never lands on a roof. I switched to edge-to-polygon distance with a 5 ft threshold and ran a sensitivity check on it.",
    },
    tags: ["GeoPandas", "Shapely 2", "GeoParquet", "PMTiles", "tippecanoe", "MapLibre GL"],
    resumeBullet:
      "Joined 868K NYC building footprints to DEP stormwater and FEMA flood layers; found 155,682 exposed buildings outside FEMA zones and validated against Hurricane Ida 311 complaints (4.2× lift). Shipped as a static MapLibre + PMTiles map.",
  },
  {
    slug: "sf-seismic",
    title: "SF Seismic Risk",
    question: "Which San Francisco soft-story buildings face the worst shaking and ground failure — and which still aren't retrofitted?",
    liveUrl: "https://zriley36.github.io/sf-seismic-risk/",
    guideUrl: "https://zriley36.github.io/sf-seismic-risk/guide.html",
    repoUrl: "https://github.com/ZRiley36/sf-seismic-risk",
    stats: [
      { value: "4,957", label: "soft-story buildings scored" },
      { value: "99.98%", label: "matched to footprints & parcels" },
      { value: "777", label: "in a mapped liquefaction zone" },
    ],
    summary:
      "Placed every soft-story building in San Francisco under the USGS HayWired M7.0 Hayward Fault scenario. 240 still aren't retrofitted, and the top 20% by risk index hold about 10,000 apartments and an estimated 19,000 residents.",
    method:
      "Joined the city's soft-story list to the assessor roll, footprints and the parcel layer (handling retired condo lots) in EPSG:7131. Sampled the USGS ShakeMap raster at each footprint, overlaid CGS liquefaction and landslide zones and HayWired liquefaction probability, and scored with configurable weights — rerun five other ways to test sensitivity. MapLibre map draws ShakeMap cells as squares and switches points to footprints on zoom.",
    lesson: {
      title: "The surprise",
      body: "Bay fill didn't shake harder than the hills. The ShakeMap's 1.5 km cells can't tell fill from bedrock, so the fill shows up through liquefaction instead — and the choice of shaking metric moves the ranking more than any weight does.",
    },
    tags: ["rasterio", "rasterstats", "Cloud-Optimized GeoTIFF", "EPSG:7131", "USGS ShakeMap", "MapLibre GL"],
    resumeBullet:
      "Scored 4,957 SF soft-story buildings under the USGS HayWired M7 scenario: parcel/footprint join at 99.98% match, ShakeMap raster sampling, CGS liquefaction and landslide overlays, and weight-sensitivity reruns. Published as a MapLibre web map.",
  },
  {
    slug: "la-wildfire",
    title: "LA Wildfire Survival",
    question: "What, measurable before the fire, predicted which homes burned in the 2025 Palisades and Eaton fires?",
    liveUrl: "https://zriley36.github.io/la-wildfire-survival/",
    guideUrl: "https://zriley36.github.io/la-wildfire-survival/guide.html",
    repoUrl: "https://github.com/ZRiley36/la-wildfire-survival",
    stats: [
      { value: "0.76", label: "model ROC AUC, spatial CV" },
      { value: "0.54", label: "official hazard zones' AUC" },
      { value: "16,306", label: "inspected homes as ground truth" },
    ],
    summary:
      "Used CAL FIRE's post-fire damage inspections as an answer key to test which pre-fire features predicted destruction, and whether a simple model beats CAL FIRE's Fire Hazard Severity Zones. It does: 0.76 vs. a near coin-flip 0.54.",
    method:
      "Building-level features from the USGS 3DEP DEM, LANDFIRE 2023 fuels, distance to wildland, and neighbor spacing, joined to footprints and assessor parcels. Logistic regression and gradient boosting, validated only spatially — cross-fire transfer and 5-fold CV over 500 m grid blocks — so a home can't learn its outcome from its neighbor. Homes with a neighbor within 2 m burned ~80% of the time vs. ~40% with nothing inside 20 m.",
    lesson: {
      title: "Catching leakage",
      body: "Adding the inspectors' roof, eave and vent fields pushed AUC to 0.94 — and it was meaningless. Eaves are marked \"Unknown\" on 71% of destroyed homes because nothing was left to inspect, so those fields encode the outcome. I kept them out.",
    },
    tags: ["scikit-learn", "Spatial CV", "LANDFIRE", "USGS 3DEP", "rasterio", "MapLibre GL"],
    resumeBullet:
      "Built a leakage-free model of home destruction in the 2025 LA fires from DEM, LANDFIRE fuel and building-spacing features; spatial CV AUC 0.76 vs. 0.54 for CAL FIRE's hazard zones. Interactive MapLibre map of outcome vs. predicted risk.",
  },
];
