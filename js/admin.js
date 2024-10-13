const contactBtn = document.getElementById("contact-btn")
const homeBtn = document.getElementById("home-btn")
const contactSection = document.getElementById("contact-section")
contactBtn.addEventListener("click",()=>{
    homeBtn.classList.remove("bg-slate-100")
    contactBtn.classList.add("bg-slate-100")
    contactSection.classList.remove("hidden")
})
homeBtn.addEventListener("click",()=>{
    homeBtn.classList.add("bg-slate-100")
    contactBtn.classList.remove("bg-slate-100")
    contactSection.classList.add("hidden")
})


async function getContactData() {
    try {
        const res = await fetch("https://jd-tamim-backend.onrender.com/getContactData");  // Fetch data from API
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();  // Parse response as JSON
        dataShow(data);  // Log data to console (or display it on your page)
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function dataShow(data){
    let parent = document.getElementById("contactPostDiv")
    data.forEach(d=>{
        let div = document.createElement("div");
        div.classList = "contact max-h-[400px] overflow-auto space-y-3 border-2 p-2 rounded-lg hover:-translate-y-2 hover:shadow-lg hover:transform transition-all duration-200 ease-linear"
        const newDate = d.createdAt;
        const createDate = newDate.toLocaleString()
        div.innerHTML = `
                    <p class="font-light text-sm">Date: ${createDate}</p>
                     <div class="flex justify-between items-center ">
                        <h3 class="font-medium text-lg">Full Name: <span class="text-zinc-500 font-bold">${d.fullname}</span></h3>
                        <h3 class="font-medium text-lg">Phone Number: <span class="text-zinc-500 font-bold">${d.phonenumber}</span></h3>
                        <h3 class="font-medium text-lg">Email: <span class="text-zinc-500 font-bold">${d.email}</span></h3>
                    </div>
                    <h3 class="font-medium text-lg">Title: <span class="text-zinc-700 font-bold">${d.title}</span></h3>
                    <p class="font-medium text-lg">Message: <span class="text-zinc-500 text-base">${d.message}</span></p>
        `;
        parent.insertBefore(div, parent.firstChild);

    })
}


// Call the function to fetch and display data
getContactData();
