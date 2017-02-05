angular
  .module('chat')
  .directive(schrollBottom);

function schrollBottom() {
  return {
    scope: {
      schrollBottom: '=',
    },
    link(scope, element) {
      scope.$watchCollection('schrollBottom', (newValue) => {
        if (newValue) {
          element[0].scrollTop = element[0].scrollHeight;
        }
      });
    },
  };
}
