function searchWeather() {
    const locationInput = document.getElementById("location").value;
    const dateInput = document.getElementById("date").value;
    console.log(dateInput);

    // Replace YOUR_API_KEY with your actual API key from weather.visualcrossing.com
    const apiKey = "9TWS2LCH9Y7DV5KUXKTMUFPT4";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${dateInput}?key=${apiKey}&include=days&unitGroup=uk&elements=temp,humidity`;
    const url2 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${dateInput}?key=${apiKey}&include=hours&unitGroup=uk&elements=temp,humidity`;

    fetch(url2)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.days);
            const tempElement = document.getElementById("temp");
            const humElement = document.getElementById("hum");
            const temp = data.days[0].temp;
            const humidity = data.days[0].humidity;
            tempElement.innerHTML = `${temp}`;
            humElement.innerHTML = `${humidity}`;
            const locElement = document.getElementById("loc");
            locElement.innerHTML = data.resolvedAddress;
            const latElement = document.getElementById("lat");
            latElement.innerHTML = data.latitude;
            const lonElement = document.getElementById("lon");
            lonElement.innerHTML = data.longitude;
            const tzElement = document.getElementById("tz");
            tzElement.innerHTML = data.timezone;
            populateTable(data.days[0].hours);
            setDate(locationInput, dateInput);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function setDate(loc, date) {
    const currentDate = new Date();
    const linkElement = document.getElementById("link");
    if (new Date(date) < currentDate) {
        linkElement.innerHTML = `https://www.visualcrossing.com/weather-history/${loc}/metric/${date}`;
    } else {
        linkElement.innerHTML = `https://www.visualcrossing.com/weather-forecast/${loc}`;        
    }
}

function populateTable(lst) {
  if (typeof lst == 'undefined') {
    for (let i=0; i<24; i++) {
      const tempCell = document.getElementById(`temp-${i.toString()}`);
      const humCell = document.getElementById(`hum-${i.toString()}`);
      tempCell.textContent = '';
      humCell.textContent = '';
    }
  }
  else {
    for (let i=0; i<24; i++) {
      const tempCell = document.getElementById(`temp-${i.toString()}`);
      const humCell = document.getElementById(`hum-${i.toString()}`);

      tempCell.textContent = lst[i].temp;
      humCell.textContent = lst[i].humidity;
    }
  }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        searchWeather();
    }
}

document.addEventListener("keydown", handleKeyPress);
