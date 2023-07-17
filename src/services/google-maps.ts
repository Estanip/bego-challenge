import axios from 'axios';

async function getLocationCoordinates(placeId: string) {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`);
        if (data?.status === 'OK') return data?.results[0]?.geometry?.location;
        else return null;
    } catch (error) {
        console.log(error);
    }
};

async function getDistanceBetweenTwoPoints(pointA, pointB) {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pointA}&destinations=${pointB}&key=${process.env.GOOGLE_API_KEY}`);
        if (data?.status === 'OK') return data?.rows[0]?.elements[0]?.distance?.value;
        else return null;
    } catch (error) {
        console.log(error);
    }
};

export { getLocationCoordinates, getDistanceBetweenTwoPoints };