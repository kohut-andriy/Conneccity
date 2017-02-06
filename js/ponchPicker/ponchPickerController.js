angular
  .module('ponchPicker')
  .controller(PonchPickerController);

function PonchPickerController() {
  const vm = this;

  let changed = false;
  vm.add = addPocnch;
  vm.delete = deletePonch;
  vm.submit = submit;

  function addPocnch(ponch) {
    if (vm.my.length < 5 && ponch) {
      for (let i = 0; i < vm.my.length; i += 1) {
        if (vm.my[i] === ponch) return;
      }
      vm.my.push(ponch);
      vm.item = '';
    }

    changed = true;
  }

  function deletePonch(ponch) {
    for (let i = 0; i < vm.my.length; i += 1) {
      if (vm.my[i] === ponch) {
        vm.my.splice(i, 1);
        changed = true;
      }
    }
  }

  function submit() {
    if (changed) {
      vm.submitFunc({ ponches: vm.my });
    } else {
      vm.hideFunc();
    }
  }
}
