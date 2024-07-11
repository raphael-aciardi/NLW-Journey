const format = (date) => {
    return {
        day: {
            numeric: dayjs(date).format("DD"),
            week: {
                short: dayjs(date).format("ddd"),
                long: dayjs(date).format("dddd"),

            }
        },
        month: dayjs(date).format("MMMM"),
        hour: dayjs(date).format("HH:mm")
    }
}

const activity = {
    name: "Almoço",
    date: new Date("2027-07-08 10:00"),
    finalized: true,
} 

let activities = [
    activity,
    {
        name: 'Academia em grupo',
        date: new Date("2027-07-09 12:00"),
        finalized: true,
    },
    activity,
    {
        name: 'Academia em grupo',
        date: new Date("2027-07-09 12:00"),
        finalized: true,
    },
]

//activities = []


const createActivityItem = (activity) => {
    
    let input = 
    `<input
    onchange = "finishActivity(event)"
    value = ${activity.date}
    type = "checkbox" `

    if(activity.finalized) {
        input += 'checked'
    }

    input += '>'
    
    const newDate = format(activity.date)

    return `
        <div>
            ${input}
            <span>${activity.name}</span>
            <time>${newDate.day.week.long},
             dia ${newDate.day.numeric} de ${newDate.month} 
             às ${newDate.hour}</time>
        </div>
    `
}

const updateActivityList = () => {
    const section = document.querySelector("section")
    section.innerHTML = ''

    if (activities.length === 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada</p> `
    } 
    
    for(let activity of activities){
        section.innerHTML += createActivityItem(activity)
    }
}

updateActivityList()

const saveActivity = (event) => {
    event.preventDefault()
    const dataForm = new FormData(event.target)
    
    const name = dataForm.get('activity')
    const day = dataForm.get('day')
    const hour = dataForm.get('hour')
    const date = `${day} ${hour}`

    const newActivity = {
        name,
        date,
        finalized: false,
    }

    const isThereActivity = activities.find((activity) =>{
        return activity.date == newActivity.date
    })

    if (isThereActivity) {
        return alert("Dia e Hora não disponíveis")
    }

    activities = [newActivity, ...activities]
    updateActivityList()
}

const createSelectionDay = () => {
    const days = [
        "2024-02-28", 
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03"
    ]


    let selectionDays = ''

    for (let day of days) {
        
        const formatvalue = format(day)
        const formatDay = `
        ${formatvalue.day.numeric} de 
        ${formatvalue.month}

        `

        selectionDays += 
        `
        <option value="${day}"> ${formatDay} </option>
        `
    }

document.querySelector("select[name = 'day']").innerHTML = selectionDays
}
createSelectionDay()

const createHoursSelection = () => {
    let availableHours = ''

    for (let i = 6; i < 23; i++) {
        availableHours += `<option value="${i}:00">${i}:00</option>`
        availableHours += `<option value="${i}:30">${i}:30</option>`
    }

    document.querySelector("select[name = 'hour']")
    .innerHTML = availableHours

}

createHoursSelection()

const finishActivity = (event) => {
    const input = event.target
    const value  = input.value

    const activity = activities.find((activity) => {
        return activity.date = value
    })

    if(!activity) {
        return
    }

    activity.finalized = !activity.finalized
}