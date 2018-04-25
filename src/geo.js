var EARTH_EQUATORIAL_RADIUS_METERS = 6378100;
var PRECISION = 100;
var D2R = Math.PI / 180; // converts degrees to radians

function _toLatLngs(geopoints) {
    return geopoints.map(function (geopoint) {
        return geopoint.trim().split(' ');
    });
}

function _toRadians(angle) {
    return angle * D2R;
}

// check if all geopoints are valid (copied from Enketo FormModel)
function _latLngsValid(latLngs) {
    return latLngs.every(function (coords) {
        return (
            (coords[0] !== '' && coords[0] >= -90 && coords[0] <= 90) &&
            (coords[1] !== '' && coords[1] >= -180 && coords[1] <= 180) &&
            (typeof coords[2] == 'undefined' || !isNaN(coords[2])) &&
            (typeof coords[3] == 'undefined' || (!isNaN(coords[3]) && coords[3] >= 0))
        );
    });
}

/**
 * Adapted from https://github.com/Leaflet/Leaflet.draw/blob/3cba37065ea5be28f42efe9cc47836c9e3f5db8c/src/ext/GeometryUtil.js#L3-L20
 */
function area(geopoints) {
    var latLngs = _toLatLngs(geopoints);

    if (!_latLngsValid(latLngs)) {
        return Number.NaN;
    }

    var pointsCount = latLngs.length;
    var area = 0.0;

    if (pointsCount > 2) {
        for (var i = 0; i < pointsCount; i++) {
            var p1 = {
                lat: latLngs[i][0],
                lng: latLngs[i][1]
            };
            var p2 = {
                lat: latLngs[(i + 1) % pointsCount][0],
                lng: latLngs[(i + 1) % pointsCount][1]
            };
            area += ((p2.lng - p1.lng) * D2R) *
                (2 + Math.sin(p1.lat * D2R) + Math.sin(p2.lat * D2R));
        }
        area = area * EARTH_EQUATORIAL_RADIUS_METERS * EARTH_EQUATORIAL_RADIUS_METERS / 2.0;
    }
    return Math.abs(Math.round(area * PRECISION)) / PRECISION;
}

/**
 * Adapted from https://www.movable-type.co.uk/scripts/latlong.html
 * 
 * @param {any} geopoints 
 * @returns 
 */
function distance(geopoints) {
    var latLngs = _toLatLngs(geopoints);

    if (!_latLngsValid(latLngs)) {
        return Number.NaN;
    }

    var pointsCount = latLngs.length;
    var distance = 0.0;

    if (pointsCount > 1) {
        for (var i = 1; i < pointsCount; i++) {
            var p1 = {
                lat: latLngs[i - 1][0],
                lng: latLngs[i - 1][1]
            };
            var p2 = {
                lat: latLngs[i][0],
                lng: latLngs[i][1]
            };
            var φ1 = p1.lat * D2R;
            var φ2 = p2.lat * D2R;
            var Δφ = (p2.lat - p1.lat) * D2R;
            var Δλ = (p2.lng - p1.lng) * D2R;

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            distance += EARTH_EQUATORIAL_RADIUS_METERS * c;
        }
    }
    
    return Math.abs(Math.round(distance * PRECISION)) / PRECISION;;
}

module.exports = {
    area: area,
    distance: distance
}