# City of Pittsburgh — RenewPGH / ReVIVE

<!-- Portfolio project page content. Mirror structure of your “Lidar Dust Filter” HTML article: hero images → motivation → technical approach → analysis → results → limitations → skills → resources. Replace image paths, demo links, and contact placeholders for your site. -->

---

## Figure row 1 (two columns)

| ![Pittsburgh community / program context](assets/images/pittsburgh_community.jpg) | ![RenewPGH / ReVIVE overview](assets/images/renewpgh_overview.png) |
| :---: | :---: |
| Program context — neighborhoods & revitalization | Tool overview — data-driven prioritization |

---

## Figure row 2 (two columns)

| ![Property management & database](assets/images/property_management.png) | ![Multi-stage scoring / analytics](assets/images/data_driven_scoring.png) |
| :---: | :---: |
| Property Management — condemned-property database & map | Multi-stage scoring — physical, administrative, social |

---

## Figure row 3 (optional full-width)

| ![Interactive mapping / suggestive priority map](assets/images/interactive_mapping.png) |
| :---: |
| Interactive mapping — spatial distribution & suggestive order of action |

> **Note:** Your repo already has suitable screenshots under `Data/`: `pittsburgh_community.jpg`, `Property Management.png`, `Data driven .png`, `Interactive mapping.png`. Copy or export them into your portfolio’s `assets/images/` and update the paths above.

---

### Technical approach diagram (centered)

![System architecture: data → Streamlit tabs → scoring → maps](assets/images/technical_approach_renewpgh.png)

> **Placeholder:** Add a single diagram showing: open data + merged parent dataset → Streamlit app (tabs) → three scoring stages → weighted final score → PyDeck map.

---

## Project motivation & problem statement

Vacant and condemned properties strain neighborhoods, public safety, and city capacity—but not every case is equally urgent or equally feasible to resolve. Agencies need a **transparent, repeatable way** to compare properties using **physical risk**, **administrative and legal friction**, and **neighborhood context**, then **communicate priorities** to staff, partners, and the public.

**RenewPGH** (Department of Permits, Licenses, and Inspections — PLI) focuses on turning problem properties into opportunities through systematic prioritization. **ReVIVE** (Renewal Visualization & Inspection Evaluation) is the decision-support application: it brings together property records, multi-stage scores, and interactive maps so agencies, developers, and community organizations can align on **where and how** to intervene.

This project addresses the gap between **raw city and parcel data** and **actionable prioritization**—without replacing professional judgment, but making it easier to apply consistently.

---

## Technical approach

### 1. Data integration and parent dataset

- Merged **condemned-property and parcel** records with geocoding and centroids for mapping.
- Enriched context from **neighborhood boundaries**, **zoning**, **crime incidents**, **311 volumes**, **parks**, **transit (PRT) density**, **Census / CDBG block-group context** (e.g., vacancy rate), and related CSV outputs from reproducible processing scripts.
- Central **parent dataset** (`Parent_dataset.csv` and derivatives) is the backbone for tabs, scores, and maps.

### 2. Application stack — Streamlit modular tabs

- Built a **wide-layout Streamlit** app with separate modules per workflow: Home, Property Management, Physical Conditions (Stage 1), Administrative Status (Stage 2), Social Feasibility (Stage 3), and Suggestive Order of Action.
- **Property Management**: load/edit the dataset, add properties, optional geocoding, **PyDeck** map of the portfolio.
- **Caching** (`st.cache_data`) for responsive loads on large CSVs.

### 3. Multi-stage scoring (config-driven)

Scores are driven by JSON configs (e.g. `physical_scoring.json`, `administrative_status.json`, `social_feasibility.json`) so criteria and rubrics stay **editable without rewriting core UI code**.

**Stage 1 — Physical conditions** (illustrative criteria):

- Violation danger level, estimated resolution time, vacancy duration, structural integrity, environmental hazards, fire/water damage severity — anchored to **PLI / inspection** logic and documented scales (0–5).

**Stage 2 — Administrative status** (illustrative criteria):

- Tax delinquency / liens, zoning compliance, ownership clarity, historic / preservation constraints, pathway to disposition — categorical rubrics with explicit anchor text for analysts.

**Stage 3 — Social feasibility** (illustrative criteria):

- Vacancy rate (tract/block group), crime incidence (neighborhood), park acreage density, transit density near PRT, 311 complaint volume — **spatial joins and pre-aggregated** metrics autofill where available.

### 4. Suggestive order of action and weighting

- Combines stage scores with **user-adjustable weights** into a **weighted cumulative / final score**.
- **Priority labels** (e.g., high / moderate / low) summarize recommended coordination intensity.
- **PyDeck** visualization of top-priority parcels; optional **CSV-driven target list** (`Suggestivemaptemp.csv`) to fix a curated set of parcels for demos or policy review.

**Demonstration** *(add your deployed app, screen recording, or slide deck links):*

- [Streamlit Cloud / deployed app — *add URL*](#)
- [Short walkthrough video — *add URL*](#)
- [Slides or one-pager for stakeholders — *add URL*](#)

---

## Multi-stage scoring & prioritization analysis

### A. From raw attributes to comparable scores

- Normalized **heterogeneous inputs** (ordinal scales, booleans, percentages, neighborhood aggregates) into **comparable stage scores** using config-defined breakpoints and anchor language for consistency.

### B. Administrative and zoning logic

- Integrated **zoning utilities** and categorical **administrative** rules so legal and procedural risk is explicit in the model—not only building condition.

### C. Neighborhood context and equity of information

- Linked parcels to **neighborhood-level** service and stress indicators (crime, 311, parks, transit) and **Census-style** vacancy context so prioritization conversations can reference **place-based** factors, not only the parcel file.

---

## Results

![Results or priority map — before/after or top-N parcels](assets/images/renewpgh_results.png)

- **Single workspace** for PLI-aligned workflows: inventory, score, and map without switching tools.
- **Reproducible rubrics** via JSON configs reduce ad hoc spreadsheet drift.
- **Three-lens scoring** (physical / administrative / social) surfaces cases that are urgent, legally complex, or context-sensitive in different ways.
- **Suggestive order** and map layers make tradeoffs visible for **inter-agency** and **public-facing** discussions.

---

## Limitations

- Scores depend on **data freshness and completeness**; missing fields fall back to “unknown” or neutral handling and should be flagged in operational use.
- **Automated spatial metrics** simplify real-world dynamics (crime, 311, transit) and are not causal models of neighborhood outcomes.
- **Professional inspection and legal review** remain essential; the tool supports prioritization, not code compliance determinations or legal advice.
- Demo deployments may use **subset or sanitized** data—production governance (PII, retention, access control) must follow city policy.

---

## Skills and technologies demonstrated

- **Python** data pipelines and merges (pandas; multiple preprocessing scripts)
- **Streamlit** multi-tab applications and forms
- **PyDeck** interactive mapping
- **JSON-configured** scoring models and UI generation from shared configs
- **Geospatial / neighborhood** joins (GeoJSON, centroids, aggregates)
- **Product thinking** for government stakeholders: clarity, auditability, and repeatable criteria

---

## Resources

- [Streamlit Documentation](https://docs.streamlit.io/)
- [PyDeck](https://deckgl.readthedocs.io/en/latest/)
- [City of Pittsburgh — PLI](https://www.pittsburghpa.gov/pli)
- [pandas documentation](https://pandas.pydata.org/docs/)

---

## Sidebar-style meta (optional for your template)

**Project title:** RenewPGH / ReVIVE — Condemned Properties Priority System  

**Role:** *[Your role: e.g., developer, researcher, UX, data integration]*  

**Context:** *[e.g., CMU AECM Synthesis / capstone / collaboration with City of Pittsburgh]*  

**Repository:** *[private/public Git link if you publish it]*  

---

### Footer placeholders (replace in HTML clone)

**Contact:** *[Your phone]* · *[your.email@domain.edu](mailto:your.email@domain.edu)* · *[City, State ZIP]*  

**Follow:** *[LinkedIn](#) · [GitHub](#)*  

**Copyright** © *[year]*, *[Your name]*
