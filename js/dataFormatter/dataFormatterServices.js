
dataFormatterModule.factory('formatter', ['mapCreate', function (mapCreate) {
  
  return {
    formatDate: function (stringDate) {
      
      var date = new Date(stringDate);

      var locale = "en-us";
      var day = date.getDay();
      var month = date.toLocaleString(locale, {month: "short"});
      var hours = date.toLocaleTimeString(locale, {hour: "2-digit", minute: "2-digit", hour12: false});

      return day + ' ' + month + ', ' + hours;
    },
    
    getAddress: function (lat, lng) {
      var address = mapCreate.coordinatesMap.get([lat, lng].join("|"));

      if (!address && lat && lng) {
        mapCreate.getAddress([lat, lng]);
      }

      return address;
    },
    
    getDistance: function (distance) {
      if (distance < 1000) {
        return distance + 'm';
      } else {
        return (distance / 1000).toFixed(1) + 'km';
      }
    },

    getGender: function (male, female) {
      if(male && female) {
        return null;
      } else if(male) {
        return 1;
      } else if(female) {
        return 2;
      }

      return null;
    },

    getUnixTime: function (date) {
      return new Date(date).getTime() / 1000 | 0;
    },
    
    getAge: function (date) {
      var currentDate = new Date();

      var birthdayDate = new Date(date);

      return currentDate.getYear() - birthdayDate.getYear() - !!(currentDate.getMonth() - birthdayDate.getMonth());
    },
    
    getLastSeenTime: function (date) {
      var MINUTE = 60 * 1000;
      var HOUR = MINUTE * 60;
      var DAY = HOUR * 24;
      var locale = "en-us";

      let currentDate = new Date();
      let lastSeenDate = new Date(date);
      let dif = new Date(currentDate - lastSeenDate);

      if (dif > DAY) {
        return lastSeenDate.toLocaleDateString(locale);
      } else if (dif > HOUR) {
        return (dif / HOUR).toFixed(0) + ' hours ago';
      } else if (dif > MINUTE) {
        return (dif / MINUTE).toFixed(0) + ' minutes ago';
      } else if (dif < MINUTE) {
        return (dif / 1000).toFixed(0) + ' seconds ago';
      }
    },
    
    getUserListImg : function (url) {
      return url ? url : 'img/test/user-list-img.jpg';
    },

    getUserImg : function (url) {
      return url ? url : 'img/test/user-icon.jpg';
    },

    getEventListImg : function (url) {
      return url ? url : 'img/test/profile-card-bg.jpg';
    }
  }
}]);