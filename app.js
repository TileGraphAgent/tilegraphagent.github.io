/* =============================================================================
   TileGraphAgent — landing page interactivity
   ============================================================================= */
(function () {
  "use strict";

  /* ---- tiny icon helper (lucide-style stroke paths) -------------------- */
  const ic = (p) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONS = {
    ingest: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    normalize: '<path d="M3 3v18h18"/><path d="M7 16l4-4 3 3 5-6"/>',
    geometry: '<path d="M12 2 2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    glb: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    tiles: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    spatial: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',
    graph: '<circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="M5 9v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M12 13v2"/>',
    mcp: '<path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/>',
    viewer: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    props: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    connect: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>',
    flow: '<path d="M7 4v16M7 8h10a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H7"/><path d="m14 5 3 3-3 3"/>',
    area: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    nearby: '<circle cx="11" cy="11" r="3"/><path d="M11 2v3M11 17v3M2 11h3M17 11h3"/>',
    map: '<path d="m9 6 6-3 6 3v15l-6-3-6 3-6-3V3z"/><path d="M9 6v15M15 3v15"/>',
    highlight: '<path d="m9 11-6 6v3h3l6-6"/><path d="m14 6 4 4M18 2l4 4-9.5 9.5"/>',
    isolate: '<path d="M12 2 2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    issue: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    maint: '<path d="M14.7 6.3a4 4 0 0 0-5.6 5L3 17.6V21h3.4l6.3-6.3a4 4 0 0 0 5-5.6l-2.5 2.5-2.1-2.1z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    select: '<path d="M3 3l7 17 2.5-7L19 10z"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
    audit: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
    rust: '<circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
    ts: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 12v6M15 9h-4a2 2 0 1 0 0 0"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  };

  /* ====================================================================
     ARCHITECTURE cards
     ==================================================================== */
  const ARCH = [
    ["01", "ingest", "Ingest", ["Synthetic EPC plant model", "IFC sample support", "future RVM / NWD / NWC adapters"]],
    ["02", "normalize", "Normalize", ["Industrial scene graph", "Stable object IDs", "Transforms", "AABB bounding volumes"]],
    ["03", "geometry", "Generate geometry", ["Procedural equipment", "Pipe segments", "Valves & supports", "Instance groups"]],
    ["04", "glb", "Export GLB", ["glTF nodes", "extras metadata", "Feature IDs", "Material groups"]],
    ["05", "tiles", "Build 3D Tiles", ["tileset.json", "Tile hierarchy", "Geometric error", "Object-to-feature mapping"]],
    ["06", "spatial", "Build spatial index", ["R-tree", "AABB queries", "Nearby lookup", "Object-to-tile lookup"]],
    ["07", "graph", "Export Knowledge Graph", ["Neo4j nodes", "Cypher relationships", "Connectivity", "Document linkage"]],
    ["08", "mcp", "Expose MCP Bridge", ["Deterministic tools", "Schema validation", "Audit logs", "Viewer commands"]],
    ["09", "viewer", "Operate viewer", ["CesiumJS", "Highlight & isolate", "Focus camera", "Issue creation"]],
  ];
  const archGrid = document.getElementById("archGrid");
  archGrid.innerHTML = ARCH.map(([n, icon, title, items], i) => `
    <div class="card arch-card reveal ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}">
      <div class="step-n">STAGE ${n}</div>
      <div class="step-ic">${ic(ICONS[icon])}</div>
      <h4>${title}</h4>
      <ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>`).join("");

  /* ====================================================================
     DEMO timeline
     ==================================================================== */
  const STEPS = [
    "User asks the question in the agent panel.",
    'Agent resolves <code>LINE-1001</code> using <code>search_object_by_tag</code>.',
    "Agent queries connected pumps and valves.",
    "Agent checks upstream/downstream relationships.",
    "Agent maps graph objects to 3D Tiles feature IDs.",
    "Agent sends viewer commands to isolate and highlight objects.",
    "Viewer highlights pumps, valves, and pipe segments.",
    "Agent returns evidence-backed maintenance context.",
    "Audit log stores every tool call.",
  ];
  const tl = document.getElementById("demoTimeline");
  tl.innerHTML = STEPS.map((s, i) => `
    <div class="tl-step" data-i="${i}">
      <div class="marker">${i + 1}</div>
      <div class="txt">${s}</div>
    </div>`).join("");

  /* ====================================================================
     MCP tools
     ==================================================================== */
  const TOOLS = [
    ["search", "search_object_by_tag"], ["props", "get_object_properties"],
    ["connect", "query_connected_components"], ["flow", "query_upstream_downstream"],
    ["area", "query_objects_in_area"], ["nearby", "query_nearby_objects"],
    ["map", "get_tile_feature_mapping"], ["highlight", "highlight_objects_in_viewer"],
    ["isolate", "isolate_system_in_viewer"], ["camera", "focus_camera_on_objects"],
    ["issue", "create_issue_from_selection"], ["maint", "generate_maintenance_context"],
  ];
  document.getElementById("mcpGrid").innerHTML = TOOLS.map(([icon, name]) => `
    <div class="mcp-tool"><span class="ic">${ic(ICONS[icon])}</span><code>${name}</code></div>`).join("");

  /* ====================================================================
     VIEWER features
     ==================================================================== */
  const VFEAT = [
    ["box", "Load generated tileset.json"], ["select", "Select object"],
    ["panel", "Show property panel"], ["search", "Search by tag"],
    ["highlight", "Highlight object list"], ["isolate", "Isolate system"],
    ["camera", "Focus camera"], ["box", "Show bounding boxes"],
    ["connect", "Show connected components"], ["link", "Open P&ID / datasheet links"],
    ["issue", "Create issue marker"], ["audit", "Show audit trail"],
  ];
  document.getElementById("viewerFeatures").innerHTML = VFEAT.map(([icon, label]) => `
    <div class="vfeat">${ic(ICONS[icon])}<span>${label}</span></div>`).join("");

  /* ====================================================================
     STACK
     ==================================================================== */
  const STACK = [
    ["rust", "Rust pipeline", false, ["tilegraph-core", "tilegraph-synth", "tilegraph-ingest", "tilegraph-geometry", "tilegraph-gltf", "tilegraph-tiles", "tilegraph-spatial", "tilegraph-graph-export", "tilegraph-cli"]],
    ["ts", "TypeScript apps", false, ["tilegraph-mcp-server", "tilegraph-viewer"]],
    ["db", "Data systems", false, ["Neo4j", "R-tree spatial index", "JSON metadata", "GLB / glTF", "3D Tiles 1.1"]],
    ["viewer", "Viewer", false, ["CesiumJS", "WebSocket command bridge", "REST property lookup", "Agent panel", "Audit trail panel"]],
    ["maint", "Future production adapters", true, ["RVM", "NWD / NWC", "IFC", "DWG metadata", "Smart3D / SP3D MDB-like tables", "P&ID linking", "Revision comparison"]],
  ];
  document.getElementById("stackGrid").innerHTML = STACK.map(([icon, title, fut, items], i) => `
    <div class="card stack-col ${fut ? "fut" : ""} reveal ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}">
      <div class="ch">${ic(ICONS[icon])}<h4>${title}</h4></div>
      <ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>`).join("");

  /* ====================================================================
     VALIDATION checks
     ==================================================================== */
  const CHECKS = [
    "object ID uniqueness", "tag uniqueness", "graph relationship consistency",
    "missing geometry detection", "missing graph node detection", "missing tile mapping detection",
    "invalid bounding volume detection", "disconnected line segment detection", "orphan valve detection",
    "P&ID reference mismatch", "datasheet reference mismatch", "feature ID mismatch",
    "MCP output schema validation", "viewer selection mismatch detection",
  ];
  document.getElementById("checkList").innerHTML = CHECKS.map((c) => `
    <div class="check">${ic(ICONS.check)}<span>${c}</span></div>`).join("");

  /* ====================================================================
     PORTFOLIO table
     ==================================================================== */
  const PORT = [
    ["CAD/BIM pipeline thinking", "Synthetic + IFC-ready ingestion architecture"],
    ["Rust systems design", "Modular Rust workspace and CLI"],
    ["3D Tiles knowledge", "tileset generation, bounding volumes, geometric error"],
    ["glTF/GLB knowledge", "node mapping, extras metadata, feature IDs"],
    ["Spatial indexing", "R-tree object query and nearby lookup"],
    ["Graph modeling", "Neo4j schema, Cypher queries, relationship types"],
    ["MCP agent bridge", "schema-bound tools, resources, audit logs"],
    ["CesiumJS viewer", "selection, highlight, isolate, focus camera"],
    ["Correctness discipline", "validation reports and manual verification"],
    ["AI-assisted workflow", "documented AI use with human verification"],
  ];
  document.getElementById("portfolioBody").innerHTML = PORT.map(([c, e]) => `
    <tr><td>${c}</td><td><span class="ck">✓</span>${e}</td></tr>`).join("");

  /* ====================================================================
     KNOWLEDGE GRAPH viz
     ==================================================================== */
  (function buildGraph() {
    const svg = document.getElementById("graphSvg");
    if (!svg) return;
    const SVGNS = "http://www.w3.org/2000/svg";
    // node: [id, x, y, label, color, r]
    const C = { plant: "#38BDF8", area: "#22D3EE", sys: "#22D3EE", line: "#38BDF8",
      pump: "#A3E635", valve: "#F59E0B", pipe: "#64748B", inst: "#A3E635",
      doc: "#94A3B8", tile: "#22D3EE", feat: "#38BDF8", issue: "#EF4444" };
    const N = [
      ["Plant", 280, 50, C.plant, 13],
      ["Area", 280, 130, C.area, 11],
      ["System", 160, 200, C.sys, 11],
      ["Line", 400, 200, C.line, 11],
      ["Pump", 110, 290, C.pump, 12],
      ["Valve", 250, 300, C.valve, 11],
      ["PipeSegment", 400, 300, C.pipe, 10],
      ["Instrument", 470, 250, C.inst, 9],
      ["PID", 470, 360, C.doc, 9],
      ["Datasheet", 90, 380, C.doc, 9],
      ["WorkPackage", 200, 400, C.doc, 9],
      ["Issue", 320, 410, C.issue, 10],
      ["Tile", 510, 150, C.tile, 9],
      ["Feature", 510, 70, C.feat, 9],
      ["AABB", 380, 110, C.doc, 8],
    ];
    const idx = {}; N.forEach((n, i) => (idx[n[0]] = i));
    const E = [
      ["Plant", "Area"], ["Area", "System"], ["Area", "Line"], ["System", "Pump"],
      ["System", "Valve"], ["Line", "PipeSegment"], ["Valve", "PipeSegment"],
      ["Pump", "Instrument"], ["Line", "PID"], ["Pump", "Datasheet"],
      ["System", "WorkPackage"], ["Issue", "Pump"], ["Tile", "Feature"],
      ["Feature", "Plant"], ["AABB", "Pump"], ["Valve", "Line"],
    ];
    let edges = "", nodes = "";
    E.forEach(([a, b]) => {
      const A = N[idx[a]], B = N[idx[b]];
      edges += `<line x1="${A[1]}" y1="${A[2]}" x2="${B[1]}" y2="${B[2]}" stroke="#24344D" stroke-width="1.2"/>`;
    });
    N.forEach((n, i) => {
      const [label, x, y, color, r] = n;
      nodes += `<g class="gnode" style="--d:${(i * 0.18).toFixed(2)}s">
        <circle cx="${x}" cy="${y}" r="${r + 6}" fill="${color}" opacity="0.10"/>
        <circle class="gpulse" cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="0.9"/>
        <text class="gnode-label" x="${x}" y="${y + r + 13}" fill="#94A3B8" text-anchor="middle">${label}</text>
      </g>`;
    });
    svg.innerHTML = edges + nodes;
  })();

  /* ====================================================================
     SCROLL reveal
     ==================================================================== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ====================================================================
     NAV scrolled state
     ==================================================================== */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ====================================================================
     DEMO timeline auto-step when in view
     ==================================================================== */
  (function demoStepper() {
    const steps = Array.from(document.querySelectorAll(".tl-step"));
    if (!steps.length) return;
    let active = -1, timer = null, running = false;
    const setActive = (i) => {
      steps.forEach((s, k) => s.classList.toggle("active", k <= i));
    };
    const tick = () => {
      active = (active + 1) % (steps.length + 2); // pause at end
      if (active < steps.length) setActive(active);
      else if (active === steps.length) setActive(steps.length - 1);
      else setActive(-1);
    };
    const demoIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) {
          running = true;
          setActive(-1); active = -1;
          timer = setInterval(tick, 1100);
        } else if (!e.isIntersecting && running) {
          running = false; clearInterval(timer);
        }
      });
    }, { threshold: 0.25 });
    demoIO.observe(document.getElementById("demo"));
  })();
})();
