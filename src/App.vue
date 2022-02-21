<template>
  <div>
    <h1>{{ titulo }}</h1>
    <!-- <h1 v-text="titulo"></h1> -->
	<ul>
		<li v-for="item of fotos">
			<img :src="item.url" v-bind:alt="item.titulo">
		</li>
	</ul>
  </div>
</template>

<script>
export default {
	data() {
		return {
			titulo: "Alurapic",
			fotos: []
		}
	},

	created() {
		let promisse = this.$http.get("http://localhost:3000/v1/fotos");
		promisse
			.then(res => res.json())
			.then(fotos => this.fotos = fotos, err => console.log(err));
	}
}
</script>

<style>
</style>
