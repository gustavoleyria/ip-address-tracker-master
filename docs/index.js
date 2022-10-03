var map = L.map('map').setView([41.66, -4.72],14);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(map);

L.control.scale().addTo(map);
var customIcon = new L.Icon({
     iconUrl: "https://cdn.icon-icons.com/icons2/1129/PNG/512/placeholderblackshapeforlocalizationonmaps_79861.png",
     iconSize: [40,50]
})

L.marker([41.66, -4.72],/*{draggable: true}*/{icon: customIcon}).addTo(map);


function buscarIp(orden){
     let value = (document.getElementById('ipAddress').value).split('.')
     console.log(value)
     for(let i = 0; i < value.length; i++){
          let num = parseInt(value[i]) 
          value[i] = num
          console.log(num)
          console.log(value[i])
     }
     console.log(value.join('.'))

     let ipValue = value.join('.')
     let key = "at_OUaEwr5Uaxu8eYZxWr4pDdN7w71e5"
     let api = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${key}&ipAddress=${ipValue}`

          try{
               fetch(api)
               .then(result => result.json())
               .then(data =>{
                    console.log(data)
                    let ip = document.getElementById('ip')
                    ip.innerHTML = `${data.ip}`
                    console.log(data.ip)
                    if(orden === true){
                         let location = document.getElementById('location')
                         location.innerHTML = `${data.location.region}, ${data.location.city}</br>${data.location.postalCode}`
                         console.log(`${data.location.region}, ${data.location.city}, ${data.location.postalCode} ` )
                    }else{
                         let location = document.getElementById('location')
                         location.innerHTML = `${data.location.region}, ${data.location.city}, ${data.location.postalCode}`
                         console.log(`${data.location.region}, ${data.location.city}, ${data.location.postalCode} ` )
                    }                    
                    let tz = document.getElementById('tz')
                    tz.innerHTML = `UTC ${data.location.timezone}`
                    console.log(`UTC ${data.location.timezone}`)
                    let isp = document.getElementById('isp')
                    if(orden === true){
                         service = data.isp.split(' ')
                         if(service.length > 2 ){
                              isp.innerHTML = `${service[0]}</br>${(service.slice(1)).join(' ')}`
                         }
                         else if(service.length === 2){
                              isp.innerHTML = `${service[0]}</br>${service[1]}`
                         }else{
                              isp.innerHTML = `${service[0]}`
                         }
                    }else{
                         service = data.isp
                         if(service.length > 2 ){
                              isp.innerHTML = `${service}`
                         }
                    }
                    long = data.location.lat
                    lat = data.location.lng
                   mapLoc(lat,long)

               })
               
          } catch(e){
               console.log(e)
          }

     
}

function mapLoc(lat, long){
     var container = L.DomUtil.get('map');
        if (container != null) {
          container._leaflet_id = null;
        }
        let map = L.map('map').setView([`${long}`, `${lat}`], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



        L.marker([`${long}`, `${lat}`],{icon: customIcon}).addTo(map)
          .openPopup();
}