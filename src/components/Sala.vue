<template>
    <div class="container">
        <div class="pantalla">
            <p class="font-weight-bold">Pantalla</p>
        </div>
        <div class="asientos">
            <div class="row">
                <div class="col mt-4 asiento" 
                    v-for="(asiento, index) in asientos" :key="index" v-text="asiento.id"
                    v-bind:id="asiento.id"
                    v-bind:class="{disponible: asiento.disponible, ocupado: !asiento.disponible, 
                        pointer: asientoDisponible(asiento)}"
                    @click="selecionarAsiento">

                </div>
            </div>
        </div>
        <div class="botones">
            <b-button :disabled="contador == 0" class="mt-5 mx-2" variant="success" @click="guardar">Guardar</b-button>
            <b-button :disabled="contador == 0" class="mt-5 mx-2" variant="danger" @click="cancelar">Cancelar</b-button>
            <b-button class="mt-5 mx-2"  @click="liberar">Liberar</b-button>
        </div>
        <div class="mt-4">
            <strong >Asientos Selecionados {{contador}}</strong>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
const path = 'salas';
const pathId = '1';

export default {
    created(){
        //this.actualizarElementos();
        this.id = firebase.database().ref('/users').push().key
        firebase.database()
        .ref(path)
        .child(pathId)
        .on('value', snapshot => this.cargarElementos(snapshot.val()) )
    },
    data(){
        return {
            id: '',
            contador: 0,
            asientos: []
        }
    },
    methods:{
        selecionarAsiento: function(event){
            let asiento = this.asientos.find(a => a.id == event.target.id);
            if(asiento.adquirido || (asiento.user_id !=null && asiento.user_id != this.id)){
                this.$notify({
                    group: 'foo',
                    type: 'error', 
                    title: 'Error',
                    text: 'No es posible Selecionar el Asiento' + asiento.id,
                })
                return
            }
            asiento.disponible = !asiento.disponible;
            asiento.user_id = this.id;
            this.actualizarElementos();
            this.contador = this.asientosSelecionados().length;
            
        },
        actualizarElementos: function(){
            firebase.database()
            .ref(path) // igual a => '/salas/1'
            .child(pathId)
            .set(this.asientos)
        },
        validarRespuesta(error, committed, snapshot){
            if(error){
                this.$notify({
                    group: 'foo',
                    type: 'error', 
                    title: 'Error',
                    text: 'No es posible completar la operación',
                })
            }
            if(committed){
                this.$notify({
                    group: 'foo',
                    type: 'success', 
                    title: 'Exito',
                    text: 'Asientos Adquiridos Exitosamente',
                })
            }
            console.log(snapshot.val());
        },
        cargarElementos: function(data){
            this.asientos = data
        },
        guardar: function(){
            //
            firebase.database()
            .ref(path)
            .child(pathId)
            .transaction(
                valoresDb => this.validarCompra(valoresDb),
                (error, committed, snapshot) => this.validarRespuesta(error, committed, snapshot)
            )
            this.contador = 0;
            //console.log("Transaccion ejecutada");
        },
        validarCompra: function(valoresDb){
            this.asientosSelecionados().forEach(function (asiento){
                if (valoresDb.find(a => a.id == asiento.id).adquirido) {
                    return
                }
                asiento.adquirido = true
            })
            return this.asientos
        },
        asientoDisponible: function(asiento){
            return !asiento.adquirido && (asiento.user_id == null || asiento.user_id == this.id);

        },
        asientosSelecionados: function (){
            return this.asientos.filter(a => !a.disponible && !a.adquirido)
        },
        validarAsientos: function (){
            this.asientosSelecionados().forEach(function(asiento){
                asiento.adquirido = true
            })
        },
        liberar : function (){
            this.asientos.forEach(function (asiento){
                asiento.adquirido = false;
                asiento.disponible = true;
                asiento.user_id = null;
                console.log("se desocuparon los asientos")
            })
            this.actualizarElementos();
            this.contador = 0; 
        },
        cancelar: function (){
            this.asientosSelecionados().forEach(function(asiento){
                asiento.user_id = null
                asiento.disponible = true
            })
            this.actualizarElementos();
            this.contador = 0;
        }
    }
}
</script>

<style lang="css" scoped>
    .pantalla{
        background-color: #2b6282;
    }
    .pantalla p{
        color: white;
        font-size: 18px;
    }
    .asiento {
        color: white;
        margin: 3px;
        font-weight: bold;
        cursor: pointer;
    }
    .disponible{
        background-color: #2d4d86;
    }
    .ocupado{
        background-color: #73264f;
    }
    .pointer{
        cursor: pointer;
    }
</style>