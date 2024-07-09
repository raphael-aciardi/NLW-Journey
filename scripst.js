const activity = {
    nome: "Almoço",
    data: new Date("2027-07-08 10:00"),
    finalizada: true,
} 

const activities = [
    activity,
    {
        nome: 'Academia em grupo',
        data: new Date("2027-07-09 12:00"),
        finalizada: true,
    },
    activity,
    {
        nome: 'Academia em grupo',
        data: new Date("2027-07-09 12:00"),
        finalizada: true,
    },
]

const createActivitiItem = (activity) => {
    
    let input = '<input type="checkbox" '

    if(activity.finalizada) {
        input = input + 'checked'
    }

    input += '>'

    return `
        <div>
            ${input}
            <span>${activity.nome}</span>
            <time>${activity.data}</time>
        </div>
    `
}

const section = document.querySelector("section")

for(let activity of activities){
    section.innerHTML += createActivitiItem(activity)
}
