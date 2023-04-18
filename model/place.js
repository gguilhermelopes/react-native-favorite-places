export class Place {
  constructor(title, imageURI, location) {
    this.title = title;
    this.imageURI = imageURI;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    this.id = new Date().toString() + Math.random().toString();
  }
}
