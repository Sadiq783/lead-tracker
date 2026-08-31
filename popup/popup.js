const urlInput = document.querySelector("#url-input")
const leadsList = document.querySelector("#leads-list")
const saveInputBtn = document.querySelector("#save-btn")
const saveTabBtn = document.querySelector("#save-tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
let leads = []

// Fetch the leads from the localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))


// If the localStorage is not empty
if (leadsFromLocalStorage) {
    // Render the leads
    renderLeads(leadsFromLocalStorage)

    leads = leadsFromLocalStorage
}

// Save Lead
saveInputBtn.addEventListener("click", () => {
    const url = urlInput.value

    if (url === "") {
        return
    }

    // If the lead is already in the list
    if (leads.includes(url)) {
        alert("This lead is already added to the list.")
        return
    }

    // Save the lead to the leads array
    leads.push(url)
    

    // Save the leads array to the localStorage
    localStorage.setItem("leads", JSON.stringify(leads))

    // Clear out the urlInput
    urlInput.value = ""

    // Render the leads
    renderLeads(leads)
})


function renderLeads(leads) {
    let leadsHTML = ""

    leads.forEach(lead => {
        leadsHTML += `
           <li>
                <a href="${lead}" target="_blank">${lead}</a>
           </li>
        `
    })

    leadsList.innerHTML = leadsHTML
}


// Save Tab URL
saveTabBtn.addEventListener("click", () => {
    chrome.tabs.query(
        {active: true, currentWindow: true},
        (tabs) => {
            if (!tabs || tabs.length === 0) return;

            let tabUrl = tabs[0].url

            // If the tab url is already added
            if (leads.includes(tabUrl)) {
                alert("This tab URL has already added to the list.")
                return
            }

            // Add the tab url to the leads array
            leads.push(tabUrl)


            // Update the localStorage
            localStorage.setItem("leads", JSON.stringify(leads))

            // Render the leads
            renderLeads(leads)
        }
    )
})


// Delete all leads
deleteBtn.addEventListener("dblclick", () => {
    const isConfirmed = window.confirm("Are you sure you want to permanently delete all saved leads? This action cannot be undone.")

    if (isConfirmed) {
        // Clear out localStorage
        localStorage.clear()

        // Reset the leads array
        leads = []

        // Clear the UI
        leadsList.innerHTML = ""
        leadsList.style.backgroundColor = "transparent"
        leadsList.style.padding = "0"
        leadsList.style.border = "none"
    }
})

