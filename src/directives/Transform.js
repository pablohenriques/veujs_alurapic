import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) {

      let current = 0;

      el.addEventListener('dblclick', function() {

        let incremento = binding.value || 90;
        // let animate = false;

        // if(binding.value) {
        //     incremento = binding.value.incremento
        //     animate = binding.value.animate 

        // }

        // if(binding.modifiers.animate) {
        //     animate = true;
        // }

        if(binding.modifiers.reverse) {
            current-=incremento;
        } else {
            current+=incremento;
        }

        this.style.transform = `rotate(${current}deg)`;
        if (binding.modifiers.animate) this.style.transition = "transform 0.5s";

      });
    }

});