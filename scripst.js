const format = (data) => {
    return {
        day: dayjs(data).format("dddd")
    }
}



const activity = {
    nome: "Almoço",
    data: new Date("2027-07-08 10:00"),
    finalizada: true,
} 

let activities = [
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

//activities = []


const createActivityItem = (activity) => {
    
    let input = '<input type="checkbox" '

    if(activity.finalizada) {
        input += 'checked'
    }

    input += '>'
    
    const newDate = format(activity.data)

    return `
        <div>
            ${input}
            <span>${activity.nome}</span>
            <time>${newDate.day}</time>
        </div>
    `
}

const updateActivityList = () => {
    const section = document.querySelector("section")

    if (activities.length === 0) {
        section.innerHTML = `<p> Nenhuma atividade cadastrada</p> `
    } 
    
    for(let activity of activities){
        section.innerHTML += createActivityItem(activity)
    }
}

updateActivityList()