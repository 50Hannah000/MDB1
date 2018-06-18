import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare var google;

@IonicPage()
@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html',
})
export class GeoPage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: any;
  private currentLocation: any;
  private places : Array<any>;
  private url = "assets/imgs/supermarket-icon.png";
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.loadMap();
      }      
    });
  }

  private loadMap() {
      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => { 
        //gets location permission
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION).then(result => {
        if(!result.hasPermission) {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION]);
        }},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION));
        this.currentLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions = {
          center: this.currentLocation,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay.setMap(this.map);

        this.getStores(this.currentLocation).then((results : Array<any>)=>{
          this.places = results;
          for(let i = 0 ;i < results.length ; i++)
          {
              this.createMarker(results[i]);
          }
        },(status)=>console.log(status));

        this.addMarker();
      }, (err) => {
        alert('err '+err);
      });
  }

  private addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  private getStores(latLng) {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : latLng,
        radius : 8047 ,
        types: ["supermarket"]
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
                resolve(results);    
            }else
            {
                reject(status);
            }

        }); 
    });
  }

  private createMarker(place)
  {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon: {
        url: this.url,
        size: {
          width: 40,
          height: 40
        }
      }
    });

    let content = '<div><strong>' + place.name + '</strong><br>' +
    place.vicinity + '<br>' + 
    '<button data-loc="' + place.vicinity + '" id="tap">Start route</button></div>';          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    let self = this;

    google.maps.event.addListener(infoWindow, 'domready', () => {
      let element = document.getElementById('tap');
      element.addEventListener('click', () => {
        self.navigate(element.getAttribute('data-loc'));
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  
  protected navigate(goal) {
    this.directionsService.route({
      origin: this.currentLocation,
      destination: goal,
      travelMode: 'DRIVING'
    }, (resp, status) => {
      if (status === 'OK') {
        alert('De route naar: ' + goal);
        this.directionsDisplay.setDirections(resp);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }

}
