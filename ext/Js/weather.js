$(document).ready(function () {
    let weatherIcon = {
        '01': 'fas fa-sun',
        '02': 'fas fa-cloud-sun',
        '03': 'fas fa-cloud',
        '04': 'fas fa-cloud-meatball',
        '09': 'fas fa-cloud-sun-rain',
        '10': 'fas fa-cloud-showers-heavy',
        '11': 'fas fa-poo-storm',
        '13': 'far fa-snowflake',
        '50': 'fas fa-smog'
    };

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Busan&appid=b3362eafed5e76f220c2e086b4a040eb&units=metric',

        dataType: 'json',
        type: 'GET',
        success: function (data) {
            let $Icon = (data.weather[0].icon).substr(0, 2);
            let $Temp =`현재 ${Math.floor(data.main.temp)} º `;
            let $city = data.name;

            $('.CurrIcon').append('<i class="' + weatherIcon[$Icon] + '" style="font-size: 1.5rem"></i>');
            $('.CurrTemp').prepend($Temp);
            $('.City').append($city);
        }
    })
});