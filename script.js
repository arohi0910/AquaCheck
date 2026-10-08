/* =====================================================
   AQUACHECK - RISK ANALYSIS
   ===================================================== */


/* =====================================================
   SMOOTH SCROLL FUNCTIONS
   ===================================================== */

function scrollToChecker() {

    document.getElementById("check-water").scrollIntoView({
        behavior: "smooth"
    });

}


function scrollToHowItWorks() {

    document.getElementById("how-it-works").scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   ANALYZE RISK
   ===================================================== */

function analyzeRisk() {

    const waterSource =
        document.getElementById("waterSource").value;

    const appearance =
        document.getElementById("appearance").value;

    const smell =
        document.getElementById("smell").value;

    const taste =
        document.getElementById("taste").value;

    const observations =
        document.getElementById("observations").value.trim();

    const timing =
        document.getElementById("timing").value;

    const severity =
        document.getElementById("severity").value;


    /* Get selected symptoms */

    const symptomElements =
        document.querySelectorAll(
            'input[name="symptoms"]:checked'
        );

    const symptoms =
        Array.from(symptomElements)
            .map(item => item.value);


    /* =================================================
       VALIDATION
       ================================================= */

    if (!waterSource) {

        alert("Please select the water source.");

        return;
    }


    if (!appearance) {

        alert("Please select the water appearance.");

        return;
    }


    if (!smell) {

        alert("Please select the water smell.");

        return;
    }


    if (!taste) {

        alert("Please select the water taste.");

        return;
    }


    /* =================================================
       RISK SCORE
       ================================================= */

    let score = 0;

    let reasons = [];


    /* WATER EVIDENCE */

    if (appearance === "cloudy") {

        score += 2;

        reasons.push(
            "Cloudy water appearance was reported."
        );

    }


    if (appearance === "discolored") {

        score += 3;

        reasons.push(
            "Discoloration of the water was reported."
        );

    }


    if (smell === "unusual") {

        score += 2;

        reasons.push(
            "An unusual water smell was reported."
        );

    }


    if (taste === "unusual") {

        score += 2;

        reasons.push(
            "An unusual water taste was reported."
        );

    }


    if (observations.length > 0) {

        score += 1;

        reasons.push(
            "Additional water-related observations were entered."
        );

    }


    /* SYMPTOM EVIDENCE */

    if (symptoms.includes("diarrhea")) {

        score += 2;

        reasons.push(
            "Diarrhea was reported as a symptom."
        );

    }


    if (symptoms.includes("vomiting")) {

        score += 2;

        reasons.push(
            "Vomiting was reported as a symptom."
        );

    }


    if (symptoms.includes("skin")) {

        score += 1;

        reasons.push(
            "Skin irritation was reported."
        );

    }


    if (symptoms.includes("other")) {

        score += 1;

        reasons.push(
            "Other symptoms were reported."
        );

    }


    /* TIMING */

    if (timing === "today") {

        score += 1;

        reasons.push(
            "Symptoms were reported as appearing today."
        );

    }


    /* SEVERITY */

    if (severity === "moderate") {

        score += 1;

        reasons.push(
            "Moderate symptom severity was reported."
        );

    }


    if (severity === "severe") {

        score += 2;

        reasons.push(
            "Severe symptom severity was reported."
        );

    }


    /* =================================================
       JOINT REASONING
       ================================================= */

    const waterConcern =
        appearance === "cloudy" ||
        appearance === "discolored" ||
        smell === "unusual" ||
        taste === "unusual" ||
        observations.length > 0;


    const symptomConcern =
        symptoms.length > 0;


    /*
       If both water evidence and symptoms
       are present, increase the risk signal.
    */

    if (waterConcern && symptomConcern) {

        score += 2;

        reasons.push(
            "Water-related concerns and reported symptoms were present together."
        );

    }


    /* =================================================
       DETERMINE RISK LEVEL
       ================================================= */

    let riskLevel;

    if (score <= 2) {

        riskLevel = "LOW";

    }
    else if (score <= 5) {

        riskLevel = "MODERATE";

    }
    else {

        riskLevel = "HIGH";

    }


    /* =================================================
       SHOW LOADING
       ================================================= */

    document
        .getElementById("analysisLoading")
        .classList.remove("hidden");


    document
        .getElementById("resultSection")
        .classList.add("hidden");


    document
        .getElementById("analyzeBtn")
        .disabled = true;


    setTimeout(function () {

        showResult(
            riskLevel,
            reasons,
            waterConcern,
            symptomConcern
        );

    }, 1800);

}


/* =====================================================
   SHOW RESULT
   ===================================================== */

function showResult(
    riskLevel,
    reasons,
    waterConcern,
    symptomConcern
) {

    const riskIcon =
        document.getElementById("riskIcon");

    const riskLevelElement =
        document.getElementById("riskLevel");

    const riskTitle =
        document.getElementById("riskTitle");

    const riskDescription =
        document.getElementById("riskDescription");

    const indicationText =
        document.getElementById("indicationText");

    const reasonList =
        document.getElementById("reasonList");

    const guidanceContent =
        document.getElementById("guidanceContent");


    /* Clear old reasons */

    reasonList.innerHTML = "";

    guidanceContent.innerHTML = "";


    /* =================================================
       LOW RISK
       ================================================= */

    if (riskLevel === "LOW") {

        riskIcon.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>';

        riskIcon.style.color = "#55e1c1";

        riskLevelElement.textContent = "LOW";

        riskTitle.textContent =
            "No Strong Contamination Indicators";

        riskDescription.textContent =
            "Based on the information entered, AquaCheck did not identify strong indicators of a possible water contamination risk.";


        indicationText.textContent =
            "The reported water characteristics and symptoms do not currently form a strong contamination-related pattern. However, this does not confirm that the water is safe or free from contamination.";


        addGuidance(
            guidanceContent,
            [
                "Continue following normal safe-water handling practices.",
                "If unusual water characteristics appear later, consider checking the water quality.",
                "If symptoms continue or become concerning, consider seeking appropriate medical advice.",
                "Laboratory water testing is required to confirm water quality."
            ]
        );

    }


    /* =================================================
       MODERATE RISK
       ================================================= */

    else if (riskLevel === "MODERATE") {

        riskIcon.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i>';

        riskIcon.style.color = "#ffc857";

        riskLevelElement.textContent = "MODERATE";

        riskTitle.textContent =
            "Possible Water Contamination";

        riskDescription.textContent =
            "The combination of the entered water observations and reported symptoms may be associated with a possible water contamination risk.";


        indicationText.textContent =
            "Some water-related changes and/or reported symptoms form a pattern that AquaCheck considers worth checking. These findings do not prove that contamination is present and cannot identify a specific contaminant.";


        addGuidance(
            guidanceContent,
            [
                "Consider avoiding reliance on the concerning water source for drinking until it is appropriately checked.",
                "Consider arranging suitable water-quality testing to investigate the observed changes.",
                "Keep note of unusual water characteristics and when symptoms appeared.",
                "If symptoms are severe, worsening or concerning, consider seeking appropriate medical advice."
            ]
        );

    }


    /* =================================================
       HIGH RISK
       ================================================= */

    else {

        riskIcon.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i>';

        riskIcon.style.color = "#ff6b6b";

        riskLevelElement.textContent = "HIGH";

        riskTitle.textContent =
            "Elevated Possible Contamination Risk";

        riskDescription.textContent =
            "Multiple water-related observations and reported symptoms are present together, creating an elevated possible water contamination risk signal.";


        indicationText.textContent =
            "The combination of water concerns and reported symptoms creates a stronger pattern in AquaCheck's rule-based reasoning. This is still only a screening signal and does not confirm contamination or identify its cause.";


        addGuidance(
            guidanceContent,
            [
                "Consider avoiding reliance on the concerning water source for drinking until it has been appropriately checked.",
                "Arrange suitable water-quality testing to investigate possible contamination.",
                "Record the observed water changes and reported symptoms to support further investigation.",
                "If symptoms are severe, worsening or concerning, consider seeking appropriate medical advice."
            ]
        );

    }


    /* =================================================
       DISPLAY REASONS
       ================================================= */

    if (reasons.length === 0) {

        const li =
            document.createElement("li");

        li.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> No strong contributing indicators were identified from the entered information.';

        reasonList.appendChild(li);

    }
    else {

        reasons.forEach(function (reason) {

            const li =
                document.createElement("li");

            li.innerHTML =
                '<i class="fa-solid fa-check"></i> ' +
                reason;

            reasonList.appendChild(li);

        });

    }


    /* =================================================
       DISPLAY RESULT
       ================================================= */

    document
        .getElementById("analysisLoading")
        .classList.add("hidden");


    document
        .getElementById("resultSection")
        .classList.remove("hidden");


    document
        .getElementById("analyzeBtn")
        .disabled = false;


    /* Scroll to result */

    setTimeout(function () {

        document
            .getElementById("resultSection")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 100);

}


/* =====================================================
   GUIDANCE HELPER
   ===================================================== */

function addGuidance(container, items) {

    const ul =
        document.createElement("ul");

    items.forEach(function (item) {

        const li =
            document.createElement("li");

        li.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>' +
            item;

        ul.appendChild(li);

    });

    container.appendChild(ul);

}


/* =====================================================
   RESET
   ===================================================== */

function resetAnalysis() {

    document
        .getElementById("waterSource")
        .value = "";

    document
        .getElementById("appearance")
        .value = "";

    document
        .getElementById("smell")
        .value = "";

    document
        .getElementById("taste")
        .value = "";

    document
        .getElementById("observations")
        .value = "";

    document
        .getElementById("timing")
        .value = "";

    document
        .getElementById("severity")
        .value = "";


    document
        .querySelectorAll('input[name="symptoms"]')
        .forEach(function (checkbox) {

            checkbox.checked = false;

        });


    document
        .getElementById("resultSection")
        .classList.add("hidden");


    document
        .getElementById("analysisLoading")
        .classList.add("hidden");


    document
        .getElementById("check-water")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   PAGE LOADED
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "AquaCheck loaded successfully."
        );

    }
);