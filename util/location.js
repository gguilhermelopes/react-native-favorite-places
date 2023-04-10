const GOOGLE_API_KEY = "AIzaSyD4R1IDAyulh8KdcEVQ8pz73xwOALWNyy0";

const getMapPreview = (latitude, longitude) => {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

  return imagePreviewURL;
};

export default getMapPreview;
