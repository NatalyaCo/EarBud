document.addEventListener('DOMContentLoaded', function () {
  var options = {
      dropdownOptions: {
          alignment: 'right',
          hover: true
      }
  }
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, options);
  });