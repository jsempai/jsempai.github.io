"use strict";angular.module("suvahiClienteApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ngMaterial"]);var routerApp=angular.module("suvahiClienteApp",["ui.router"]),urlAPI="http://demo-jsempai.rhcloud.com/api/";routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_",{"abstract":!0,views:{"":{templateUrl:"components/body.html"},menu:{templateUrl:"components/menu.html"},header:{templateUrl:"components/cabecera.html"}}}).state("_.home",{url:"/",views:{"":{templateUrl:"components/body.html"}}}),b.html5Mode(!0),a.otherwise("/")}]),angular.module("suvahiClienteApp").controller("SucursalesListCtrl",["$scope","sucursales",function(a,b){a.sucursales=b}]),angular.module("suvahiClienteApp").controller("SucursalesNuevoCtrl",["$scope","SucursalesService","$state",function(a,b,c){a.sucursal={},a.guardar=function(){b.create(a.sucursal),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("SucursalesDetalleCtrl",["$scope","SucursalesService","$state","sucursal",function(a,b,c,d){a.sucursal=d,a.guardar=function(){b.update(a.sucursal),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("InstitucionesCtrl",["$scope","$stateParams","InstitucionesService","institucion",function(a,b,c,d){a.institucion=d,a.guardar=function(){c.update(a.institucion)}}]),angular.module("suvahiClienteApp").controller("TiposNegociosListCtrl",["$scope","tipos_negocios",function(a,b){a.tipos_negocios=b}]),angular.module("suvahiClienteApp").controller("TiposNegociosNuevoCtrl",["$scope","TiposNegociosService","$state",function(a,b,c){a.tipo_negocio={},a.guardar=function(){b.create(a.tipo_negocio),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("TiposNegociosDetalleCtrl",["$scope","TiposNegociosService","$state","tipo_negocio",function(a,b,c,d){a.tipo_negocio=d,a.guardar=function(){b.update(a.tipo_negocio),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("EstadosCivilesListCtrl",["$scope","estados_civiles",function(a,b){a.estados_civiles=b}]),angular.module("suvahiClienteApp").controller("EstadosCivilesNuevoCtrl",["$scope","EstadosCivilesService","$state",function(a,b,c){a.estado_civil={},a.guardar=function(){b.create(a.estado_civil),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("EstadosCivilesDetalleCtrl",["$scope","EstadosCivilesService","$state","estado_civil",function(a,b,c,d){a.estado_civil=d,a.guardar=function(){b.update(a.estado_civil),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("PersonasListCtrl",["$scope","personas",function(a,b){a.personas=b}]),angular.module("suvahiClienteApp").controller("PersonasNuevoCtrl",["$scope","PersonasService","$state",function(a,b,c){a.persona={},a.guardar=function(){b.create(a.persona),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("PersonasDetalleCtrl",["$scope","PersonasService","$state","persona",function(a,b,c,d){a.persona=d,a.guardar=function(){b.update(a.estado_civil),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("TiposDocumentosListCtrl",["$scope","tipos_documentos",function(a,b){a.tipos_documentos=b}]),angular.module("suvahiClienteApp").controller("TiposDocumentosNuevoCtrl",["$scope","TiposDocumentosService","$state",function(a,b,c){a.tipo_documento={},a.guardar=function(){b.create(a.tipo_documento),c.go("^",{},{reload:!0})}}]),angular.module("suvahiClienteApp").controller("TiposDocumentosDetalleCtrl",["$scope","TiposDocumentosService","$state","tipo_documento",function(a,b,c,d){a.tipo_documento=d,a.guardar=function(){b.update(a.tipo_documento),c.go("^",{},{reload:!0})}}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.sucursales",{url:"/sucursales",resolve:{sucursales:["SucursalesService",function(a){return a.getAll().then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/sucursales/list.html",controller:"SucursalesListCtrl"}}}).state("_.sucursales.nuevo",{url:"/nuevo",views:{"contenido@_":{templateUrl:"views/sucursales/form.html",controller:"SucursalesNuevoCtrl"}}}).state("_.sucursales.detalle",{url:"/:id",resolve:{sucursal:["$stateParams","SucursalesService",function(a,b){return b.get(a.id).then(function(a){return a.data})}]},views:{"contenido@_":{templateUrl:"views/sucursales/form.html",controller:"SucursalesDetalleCtrl"}}})}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.institucion",{url:"/institucion",resolve:{institucion:["InstitucionesService",function(a){return a.get(1).then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/instituciones/form.html",controller:"InstitucionesCtrl"}}})}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.tiposNegocios",{url:"/tipos-negocios",resolve:{tipos_negocios:["TiposNegociosService",function(a){return a.getAll().then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/tipos_negocios/list.html",controller:"TiposNegociosListCtrl"}}}).state("_.tiposNegocios.nuevo",{url:"/nuevo",views:{"contenido@_":{templateUrl:"views/tipos_negocios/form.html",controller:"TiposNegociosNuevoCtrl"}}}).state("_.tiposNegocios.detalle",{url:"/:id",resolve:{tipo_negocio:["$stateParams","TiposNegociosService",function(a,b){return b.get(a.id).then(function(a){return a.data})}]},views:{"contenido@_":{templateUrl:"views/tipos_negocios/form.html",controller:"TiposNegociosDetalleCtrl"}}})}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.estadosCiviles",{url:"/estados-civiles",resolve:{estados_civiles:["EstadosCivilesService",function(a){return a.getAll().then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/estados_civiles/list.html",controller:"EstadosCivilesListCtrl"}}}).state("_.estadosCiviles.nuevo",{url:"/nuevo",views:{"contenido@_":{templateUrl:"views/estados_civiles/form.html",controller:"EstadosCivilesNuevoCtrl"}}}).state("_.estadosCiviles.detalle",{url:"/:id",resolve:{estado_civil:["$stateParams","EstadosCivilesService",function(a,b){return b.get(a.id).then(function(a){return a.data})}]},views:{"contenido@_":{templateUrl:"views/estados_civiles/form.html",controller:"EstadosCivilesDetalleCtrl"}}})}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.personas",{url:"/personas",resolve:{personas:["PersonasService",function(a){return a.getAll().then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/personas/list.html",controller:"PersonasListCtrl"}}}).state("_.personas.nuevo",{url:"/nuevo",views:{"contenido@_":{templateUrl:"views/personas/form.html",controller:"PersonasNuevoCtrl"}}}).state("_.personas.detalle",{url:"/:id",resolve:{persona:["$stateParams","PersonasService",function(a,b){return b.get(a.id).then(function(a){return a.data})}]},views:{"contenido@_":{templateUrl:"views/personas/form.html",controller:"PersonasDetalleCtrl"}}})}]),routerApp.config(["$urlRouterProvider","$locationProvider","$stateProvider",function(a,b,c){c.state("_.tiposDocumentos",{url:"/tipos-documentos",resolve:{tipos_documentos:["TiposDocumentosService",function(a){return a.getAll().then(function(a){return a.data})}]},views:{contenido:{templateUrl:"views/tipos_documentos/list.html",controller:"TiposDocumentosListCtrl"}}}).state("_.tiposDocumentos.nuevo",{url:"/nuevo",views:{"contenido@_":{templateUrl:"views/tipos_documentos/form.html",controller:"TiposDocumentosNuevoCtrl"}}}).state("_.tiposDocumentos.detalle",{url:"/:id",resolve:{tipo_documento:["$stateParams","TiposDocumentosService",function(a,b){return b.get(a.id).then(function(a){return a.data})}]},views:{"contenido@_":{templateUrl:"views/tipos_documentos/form.html",controller:"TiposDocumentosDetalleCtrl"}}})}]),angular.module("suvahiClienteApp").service("SucursalesService",["$http",function(a){var b=urlAPI+"sucursales/";this.get=function(c){return a({method:"GET",url:b+c})},this.getAll=function(){return a({method:"GET",url:b})},this.create=function(c){return a({method:"POST",url:b,data:c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]),angular.module("suvahiClienteApp").service("InstitucionesService",["$http",function(a){var b=urlAPI+"instituciones/";this.get=function(c){return a({method:"GET",url:b+c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]),angular.module("suvahiClienteApp").service("TiposNegociosService",["$http",function(a){var b=urlAPI+"tipos-negocios/";this.get=function(c){return a({method:"GET",url:b+c})},this.getAll=function(){return a({method:"GET",url:b})},this.create=function(c){return a({method:"POST",url:b,data:c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]),angular.module("suvahiClienteApp").service("EstadosCivilesService",["$http",function(a){var b=urlAPI+"parametros/estado-civil/";this.get=function(c){return a({method:"GET",url:b+c})},this.getAll=function(){return a({method:"GET",url:b})},this.create=function(c){return a({method:"POST",url:b,data:c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]),angular.module("suvahiClienteApp").service("PersonasService",["$http",function(a){var b=urlAPI+"personas/";this.get=function(c){return a({method:"GET",url:b+c})},this.getAll=function(){return a({method:"GET",url:b})},this.create=function(c){return a({method:"POST",url:b,data:c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]),angular.module("suvahiClienteApp").service("TiposDocumentosService",["$http",function(a){var b=urlAPI+"parametros/tipo-documento/";this.get=function(c){return a({method:"GET",url:b+c})},this.getAll=function(){return a({method:"GET",url:b})},this.create=function(c){return a({method:"POST",url:b,data:c})},this.update=function(c){return a({method:"PUT",url:b+c.id+"/",data:c})}}]);