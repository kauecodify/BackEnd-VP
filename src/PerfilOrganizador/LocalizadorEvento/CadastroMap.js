// cadastra os eventos e os direciona para o mapa.
var map = L.map('map').setView([0, 0], 2);
        var events = [];

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.Control.geocoder().addTo(map);

        function addEvent() {
            var address = document.getElementById('address').value;
            var eventName = document.getElementById('eventName').value;
            var eventDescription = document.getElementById('eventDescription').value;

            if (address && eventName && eventDescription) {

                fetch('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(address) + '&format=json')
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            var lat = parseFloat(data[0].lat);
                            var lon = parseFloat(data[0].lon);

                            L.marker([lat, lon]).addTo(map);

                            var event = {
                                address: address,
                                eventName: eventName,
                                eventDescription: eventDescription,
                                latitude: lat,
                                longitude: lon
                            };

                            console.log('Dados do evento:', event);
                        } else {
                            alert('Endereço não encontrado.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar o endereço:', error);
                        alert('Ocorreu um erro ao buscar o endereço. Por favor, tente novamente.');
                    });
            } else {
                alert('Por favor, preencha todos os campos.');
            }

            var nameElement = document.createElement('span');
            nameElement.textContent = 'kauecodify';
            nameElement.classList.add('blink');
            document.body.appendChild(nameElement);
            setTimeout(() => {
                document.body.removeChild(nameElement);
            }, 5000);
        }

// falta database...
