angular
  .module('dataFormatter')
  .factory('formatter', formatter);

formatter.$inject = ['mapCreate'];

function formatter(mapCreate) {
  return {
    getAddress,
    getDistance,
    getGender,
    getUnixTime,
    getAge,
    getLastSeenTime,
    getUserListImg,
    getUserImg,
    getEventListImg,
    getMeetingStatusIconStyle,
    getTime,
    getGoogleMapsSrc,
    formatDate,
  };

  function getAddress(lat, lng) {
    const address = mapCreate.coordinatesMap.get([lat, lng].join('|'));

    if (!address && lat && lng) {
      mapCreate.getAddress([lat, lng]);
    }

    return address;
  }

  function getDistance(distance) {
    if (distance < 1000) {
      return `${distance} m`;
    }

    return `${(distance / 1000).toFixed(1)} km`;
  }

  function getGender(male, female) {
    if (male && female) {
      return null;
    }
    if (male) {
      return 1;
    }
    if (female) {
      return 2;
    }

    return null;
  }

  function getUnixTime(date) {
    return new Date(date).getTime() / 1000;
  }

  function getAge(date) {
    const currentDate = new Date();

    const birthdayDate = new Date(date);

    return currentDate.getYear() - birthdayDate.getYear()
      - !!(currentDate.getMonth() - birthdayDate.getMonth());
  }

  function getLastSeenTime(date) {
    const MINUTE = 60 * 1000;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const locale = 'en-us';

    const currentDate = new Date();
    const lastSeenDate = new Date(date);
    const dif = new Date(currentDate - lastSeenDate);

    if (dif > DAY) {
      return lastSeenDate.toLocaleDateString(locale);
    }

    if (dif > HOUR) {
      return `${(dif / HOUR).toFixed(0)} hours ago`;
    }

    if (dif > MINUTE) {
      return `${(dif / MINUTE).toFixed(0)} minutes ago`;
    }

    if (dif < MINUTE) {
      return `${(dif / 1000).toFixed(0)} seconds ago`;
    }
  }

  function getUserListImg(url) {
    return url || 'img/test/user_icon.png';
  }

  function getUserImg(url) {
    return url || 'img/test/user_icon.png';
  }

  function getEventListImg(url) {
    return url || 'img/test/profile-card-bg.jpg';
  }

  function getMeetingStatusIconStyle(status) {
    if (status === 'DECLINED') {
      return 'meeting-status-icon_declined';
    } else if (status === 'INVITED') {
      return 'meeting-status-icon_invited';
    }

    return 'meeting-status-icon_accepted';
  }

  function getTime(date) {
    const currentDate = new Date(date);

    let hours = currentDate.getHours();

    hours = hours < 10 ? `0${hours}` : hours;

    let minutes = currentDate.getMinutes();

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  }

  function getGoogleMapsSrc([lat, lng]) {
    return `https://www.google.com.ua/maps/@${lat},${lng},12z`;
  }

  function formatDate(stringDate) {
    const date = new Date(stringDate);

    return date.toDateString();
  }
}
