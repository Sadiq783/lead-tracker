const urlInput = document.querySelector("#url-input")
const leadsList = document.querySelector("#leads-list")
const saveInputBtn = document.querySelector("#save-btn")
const saveTabBtn = document.querySelector("#save-tab-btn")
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