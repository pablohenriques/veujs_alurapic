import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) {
      let current = 0;
      el.addEventListener('dblclick', function() {
        let incremento = binding.value || 90;
        current+=incremento;
        el.style.transition = "transform 0.5s";
        this.style.transform = `rotate(${current}deg)`;
      });
    }

});