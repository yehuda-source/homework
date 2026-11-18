export default function Weather({weather}){
    console.log(weather)

    if(!weather){
        return(
            <>loading</>
        )
        }
            const weekdays = ['Today']
    for(let i = 1; i < weather.daily.time.length; i++){
        let day = new Date(weather.daily.time[i] + 'T12:00:00').toLocaleDateString("en-US", {weekday: 'long'})
        if(day.toLowerCase() === 'saturday'){
            day = 'Shabbos'
        }
        weekdays.push(day)
    }
        return(
        <div id='weather'>
            {weather.daily.time.map((date, index) =>(
                <div key={date} className="day">
                <h2>{weekdays[index]}</h2>
                <span>{Math.floor(weather.daily.temperature_2m_max[index])} {Math.floor(weather.daily.temperature_2m_min[index])}</span>
                </div>
            ))}
        </div>
        )
       
}