const nativePlants = [
    {
        name: "Purple Coneflower",
        scientificName: "Echinacea purpurea",
        sunlight: "Full Sun",
        soil: "Well-Drained",
        height: "2-3 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Attracts native birds, bees, and butterflies."
    },
    {
        name: "Butterfly Weed",
        scientificName: "Asclepias tuberosa",
        sunlight: "Full Sun",
        soil: "Dry to Medium",
        height: "1-2.5 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Essential host plant for monarch caterpillars."
    },
    {
        name: "Wild Bergamot",
        scientificName: "Monarda fistulosa",
        sunlight: "Full Sun to Part Shade",
        soil: "Moist to Dry",
        height: "2-4 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Highly attractive to hummingbirds and long-tongued bees."
    },
    {
        name: "Black-Eyed Susan",
        scientificName: "Rudbeckia hirta",
        sunlight: "Full Sun",
        soil: "Adaptable",
        height: "1-3 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Provides seeds for finches and pollen for native insects."
    },
    {
        name: "Switchgrass",
        scientificName: "Panicum virgatum",
        sunlight: "Full Sun to Part Shade",
        soil: "Clay or Sandy",
        height: "3-6 feet",
        bloomSeason: "Late Summer",
        wildlifeBenefits: "Provides protective nesting cover and winter food for birds."
    },
    {
        name: "Joe Pye Weed",
        scientificName: "Eutrochium purpureum",
        sunlight: "Full Sun to Part Shade",
        soil: "Moist",
        height: "4-7 feet",
        bloomSeason: "Late Summer",
        wildlifeBenefits: "A magnet for butterflies, bumblebees, and beneficial predatory insects."
    },
    {
        name: "New England Aster",
        scientificName: "Symphyotrichum novae-angliae",
        sunlight: "Full Sun",
        soil: "Moist, Well-Drained",
        height: "3-5 feet",
        bloomSeason: "Fall",
        wildlifeBenefits: "Crucial late-season nectar source for migrating monarch butterflies."
    },
    {
        name: "Cardinal Flower",
        scientificName: "Lobelia cardinalis",
        sunlight: "Part Shade to Full Sun",
        soil: "Moist to Wet",
        height: "2-4 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Primary nectar source favored heavily by ruby-throated hummingbirds."
    },
    {
        name: "Blue Flag Iris",
        scientificName: "Iris versicolor",
        sunlight: "Full Sun to Part Shade",
        soil: "Wet to Moist",
        height: "2-3 feet",
        bloomSeason: "Spring",
        wildlifeBenefits: "Provides early spring pollen and structural cover for wetland wildlife."
    },
    {
        name: "Virginia Bluebells",
        scientificName: "Mertensia virginica",
        sunlight: "Part Shade to Full Shade",
        soil: "Rich, Moist",
        height: "1-2 feet",
        bloomSeason: "Spring",
        wildlifeBenefits: "Provides critical early-season nectar for emerging long-tongued bees."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("keyword");
    const sunSelect = document.getElementById("sun");
    const bloomSelect = document.getElementById("bloom");
    const filterBtn = document.getElementById("filter-btn");
    const gridContainer = document.querySelector(".plant-grid");
    const tableBody = document.querySelector("tbody");

    function displayPlants(plantsToDisplay) {
        if (!gridContainer) return;
        gridContainer.innerHTML = "";
        if (tableBody) tableBody.innerHTML = "";

        if (plantsToDisplay.length === 0) {
            gridContainer.innerHTML = "<p>No native plants found matching your criteria.</p>";
            return;
        }

        plantsToDisplay.forEach((plant, index) => {
            const card = document.createElement("article");
            card.classList.add("plant-card");
            card.innerHTML = `
                <h3>${index + 1}. ${plant.name}</h3>
                <p><b>Scientific Name:</b> <i>${plant.scientificName}</i></p>
                <p><b>Sunlight:</b> ${plant.sunlight}</p>
                <p><b>Soil:</b> ${plant.soil}</p>
                <p><b>Height:</b> ${plant.height}</p>
                <p><b>Bloom Season:</b> ${plant.bloomSeason}</p>
                <p><b>Wildlife Benefits:</b> ${plant.wildlifeBenefits}</p>
            `;
            gridContainer.appendChild(card);

            if (tableBody) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${plant.name}</td>
                    <td>${plant.sunlight}</td>
                    <td>${plant.soil}</td>
                    <td>${plant.bloomSeason}</td>
                `;
                tableBody.appendChild(row);
            }
        });
    }

    function filterPlants() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedSun = sunSelect ? sunSelect.value : "all";
        const selectedBloom = bloomSelect ? bloomSelect.value : "all";

        const filtered = nativePlants.filter(plant => {
            const matchesSearch = plant.name.toLowerCase().includes(searchTerm) || 
                                  plant.scientificName.toLowerCase().includes(searchTerm);
            
            const matchesSun = selectedSun === "all" || plant.sunlight.toLowerCase().includes(selectedSun.toLowerCase());
            const matchesBloom = selectedBloom === "all" || plant.bloomSeason.toLowerCase().includes(selectedBloom.toLowerCase());

            return matchesSearch && matchesSun && matchesBloom;
        });

        displayPlants(filtered);
    }

    if (filterBtn) filterBtn.addEventListener("click", filterPlants);
    if (searchInput) searchInput.addEventListener("input", filterPlants);
    if (sunSelect) sunSelect.addEventListener("change", filterPlants);
    if (bloomSelect) bloomSelect.addEventListener("change", filterPlants);

    displayPlants(nativePlants);
});
