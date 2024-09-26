//@ui5-bundle zemp/Component-preload.js
sap.ui.require.preload({
	"zemp/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","zemp/model/models"],function(e,t,i){"use strict";return e.extend("zemp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"zemp/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("zemp.controller.App",{onInit:function(){}})});
},
	"zemp/controller/View1.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("zemp.controller.View1",{onInit:function(){}})});
},
	"zemp/i18n/i18n.properties":'# This is the resource bundle for zemp\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=App Title',
	"zemp/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"zemp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.15.0","toolsId":"1dfcbc3d-1586-4054-96ce-d955ed25a9d4"},"dataSources":{"mainService":{"uri":"odata/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.128.1","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"zemp.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"zemp.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"zemp.view.App","type":"XML","async":true,"id":"App"}}}',
	"zemp/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"zemp/view/App.view.xml":'<mvc:View controllerName="zemp.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"zemp/view/View1.view.xml":'<mvc:View controllerName="zemp.controller.View1" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><Page id="page" title="{i18n>title}"><content><Table id="projectTable" class="sapUiResponsiveContentPadding" items="{/EMPLOYEE}" growing="true" selectionChange="onSelectionChange" updateFinished="onUpdateFinished" mode="SingleSelectMaster"><headerToolbar><OverflowToolbar><Title text="Employee "/><ToolbarSpacer/><Button text="Create" icon="sap-icon://add" type="Emphasized" press="onCreateClick"/></OverflowToolbar></headerToolbar><columns><Column><Text text="Employee ID"/></Column><Column><Text text="Employee Name"/></Column></columns><items><ColumnListItem><cells><Text text="{EMP_ID}"/><Text text="{EMP_NAME}"/></cells></ColumnListItem></items></Table></content></Page></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
