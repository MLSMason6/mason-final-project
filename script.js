// Data Object: Characters
let characters = [
    { id: 1, name: "Warrior", age: 30, skill: "Swordsmanship", isActive: true },
    { id: 2, name: "Mage", age: 25, skill: "Spellcasting", isActive: false },
];

// Generate a unique ID
function generateId() {
    return characters.length > 0 ? Math.max(...characters.map(c => c.id)) + 1 : 1;
}

// Display Characters in the DOM
function displayCharacters() {
    let html = "";
    characters.forEach((char) => {
        html += `
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${char.name}</h5>
                    <p><strong>Age:</strong> ${char.age}</p>
                    <p><strong>Skill:</strong> ${char.skill}</p>
                    <p><strong>Active:</strong> ${char.isActive ? "Yes" : "No"}</p>
                    <button class="btn btn-primary edit-btn" data-id="${char.id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${char.id}">Delete</button>
                </div>
            </div>
        </div>`;
    });
    $("#game-area").html(html);
}

// Load All Characters into a Specific Area
function loadAllCharacters() {
    let html = "<h3>All Characters:</h3><ul>";
    characters.forEach((char) => {
        html += `<li>${char.name} - Age: ${char.age}, Skill: ${char.skill}, Active: ${char.isActive ? "Yes" : "No"}</li>`;
    });
    html += "</ul>";
    $("#all-characters").html(html);
}

// Open Character Editor Modal
function openEditor(id) {
    const char = characters.find(c => c.id === id);
    if (!char) return;

    $("#char-name").val(char.name);
    $("#char-age").val(char.age);
    $("#char-skill").val(char.skill);
    $("#char-active").prop("checked", char.isActive);
    $("#save-btn").data("id", id);
    $("#editor-modal").modal("show");
}

// Save Changes to Character
function saveChanges() {
    const id = $("#save-btn").data("id");
    const char = characters.find(c => c.id === id);
    if (!char) return;

    char.name = $("#char-name").val().trim();
    char.age = parseInt($("#char-age").val());
    char.skill = $("#char-skill").val().trim();
    char.isActive = $("#char-active").is(":checked");

    displayCharacters(); // Refresh DOM
    console.log("Updated Data (JSON Format):", JSON.stringify(characters, null, 2));
    $("#editor-modal").modal("hide");
}

// Add New Character
function addNewCharacter() {
    const newCharacter = {
        id: generateId(),
        name: "New Character",
        age: 20,
        skill: "Unassigned",
        isActive: false,
    };
    characters.push(newCharacter);
    displayCharacters();
    console.log("New Character Added:", JSON.stringify(characters, null, 2));
}

// Load Random Data
function loadRandomData() {
    const randomSkills = ["Swordsmanship", "Spellcasting", "Archery", "Alchemy"];
    const randomName = ["Knight", "Sorcerer", "Hunter", "Alchemist"];
    const newCharacter = {
        id: generateId(),
        name: randomName[Math.floor(Math.random() * randomName.length)],
        age: Math.floor(Math.random() * 40) + 18,
        skill: randomSkills[Math.floor(Math.random() * randomSkills.length)],
        isActive: Math.random() > 0.5,
    };
    characters.push(newCharacter);
    displayCharacters();
    console.log("Random Data Added:", JSON.stringify(characters, null, 2));
}

// Delete Character
function deleteCharacter(id) {
    characters = characters.filter(char => char.id !== id);
    displayCharacters();
    console.log("Character Deleted. Updated Data (JSON Format):", JSON.stringify(characters, null, 2));
}

// Setup Game
function setupGame() {
    // Open modal for editing when the edit button is clicked
    $("#game-area").on("click", ".edit-btn", function () {
        const id = parseInt($(this).data("id"));
        openEditor(id);
    });

    // Save changes when the save button is clicked
    $("#save-btn").on("click", saveChanges);

    // Add new character
    $("#new-character-btn").on("click", addNewCharacter);

    // Load random data
    $("#load-random-btn").on("click", loadRandomData);

    // Load all characters to the specific area
    $("#load-all-btn").on("click", loadAllCharacters);

    // Delete a character
    $("#game-area").on("click", ".delete-btn", function () {
        const id = parseInt($(this).data("id"));
        deleteCharacter(id);
    });
}

// Initialize Game
$(document).ready(function () {
    displayCharacters(); // Populate initial character data
    setupGame(); // Setup event listeners
});