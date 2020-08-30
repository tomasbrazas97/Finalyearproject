export class Init {
    load(){
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
            var markers = [
                {
                    name: 'Test1',
                    desc: 'location1s info box is here!',
                    lat: 53.5204,
                    lng: -8.8557,
                    draggable: true
                  },
                  {
                    name: 'Test2',
                    desc: 'location2 is based here!',
                    lat: 54.5204,
                    lng: -8.8557,
                    draggable: true
                  },
                  {
                    name: 'Test3',
                    desc: 'location3 is here! hi!',
                    lat: 55.5204,
                    lng: -8.8557,
                    draggable: true
                  } 
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('loading markers');
        }
    }
}