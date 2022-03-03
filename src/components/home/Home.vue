<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
	
	<p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
	
	<input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre por partes do titulo">
	<ul class="lista-fotos">
		<li class="lista-fotos-item" v-for="foto of fotosComFiltro">
			<meu-painel :titulo="foto.titulo">
				<imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate="1.2"/>
				<meu-botao 
					tipo="button" 
					rotulo="REMOVER" 
					estilo="perigo"
					@botaoAtivado="remove(foto)" 
					:confirmacao="true"
				/>
			</meu-painel>
		</li>
	</ul>
  </div>
</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';

export default {

	components: {
		"meu-painel": Painel,
		"imagem-responsiva": ImagemResponsiva,
		"meu-botao": Botao
	},

	data() {
		return {
			titulo: "Alurapic",
			fotos: [],
			filtro: "",
			mensagem: ""
		}
	},

	methods: {
		remove(foto) {
			this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
			.then(
				() => this.mensagem="Foto removida com sucesso", 
				err => {console.log(err), this.mensagem="Não foi possível remover a foto"}
			);
		}
	},

	computed: {
		fotosComFiltro() {
			if(this.filtro) {
				let exp = new RegExp(this.filtro.trim(), 'i');
				return this.fotos.filter(foto => exp.test(foto.titulo));
			} else {
				return this.fotos;
			}		
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

	.centralizado {
		text-align: center;
	}

	.lista-fotos {
		list-style: none;
	}

	.lista-fotos .lista-fotos-item {
		display: inline-block;
	}

	.filtro {
		display: block;
		width: 100%;
	}
</style>
