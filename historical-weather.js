function searchWeather() {
    const locationInput = document.getElementById("location").value;
    const dateInput = document.getElementById("date").value;
    console.log(dateInput);

    // Replace YOUR_API_KEY with your actual API key from weather.visualcrossing.com
    const apiKey = "9TWS2LCH9Y7DV5KUXKTMUFPT4";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${dateInput}?key=${apiKey}&include=days&unitGroup=uk&elements=temp,humidity`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.days);
            const resultElement = document.getElementById("result");
            const temp = data.days[0].temp;
            const humidity = data.days[0].humidity;
            resultElement.innerHTML = `temperature: ${temp} \n Humidity: ${humidity}`;
            
            
        })
        .catch(error => {
            console.error('Error:', error);
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = "An error occurred while fetching weather data.";
        });
}
