// /**
//  * Created by bnosachenko on 25.11.16.
//  */
// import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
// import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import {GraphModalService} from './graph-modal.service';
//
// declare var cytoscape: any;
//
// @Component({
//     selector: 'flow',
//     template: '<div></div>'
// })
//
// export class TestFlowComponent implements OnInit{
//
//     @Input() createData: any;
//     @Input() templateModal: any;
//     @Input() newEdgeName: string;
//     @Output() newEdgeNameChange = new EventEmitter(false);
//
//     constructor(private modal: NgbModal, private graphModalService: GraphModalService){
//
//     }
//
//     private cy: any;
//     private someText: any;
//     private zoomNumber: number = 1;
//     private selectedNodeIds: Array<any> = [];
//     private backgroundImg: string = <string>require('../../../assets/images/dashboard_icon.svg');
//
//     public createAndSetting (): void {
//         var container = this.createData.container;
//         container.style.height = this.createData.height;
//         container.style.backgroundColor = this.createData.backgroundColor;
//
//         this.cy = cytoscape({
//             container: container,
//             boxSelectionEnabled: false,
//             autounselectify: true,
//
//             layout: {
//                 name: 'breadthfirst',
//                 padding: 100
//             },
//             zoom: this.zoomNumber,
//             style: [
//                 {
//                     selector: 'node',
//                     style: {
//                         'height': 32,
//                         'width': 32,
//                         'font-family': 'open sans',
//                         'content': 'data(id)',
//                         'text-opacity': 0.5,
//                         'background-image': this.backgroundImg
//                         //'background-color': '#11479e'
//                     }
//                 },
//                 {
//                     selector: 'edge',
//                     style: {
//                         'font-family': 'open sans',
//                         'label': 'data(label)',
//                         'width': 1,
//                         'target-arrow-shape': 'triangle',
//                         'line-color': '#9dbaea',
//                         'target-arrow-color': '#9dbaea',
//                         'curve-style': 'bezier',
//                         'text-background-opacity': 1,
//                         'text-background-color': '#ccc',
//                         'text-background-shape': 'roundrectangle',
//                         'text-border-color': '#ccc',
//                         'text-border-width': 5,
//                         'text-border-opacity': 1
//                     }
//                 },
//                 {
//                     selector: '.selected',
//                     style: {
//                         'background-color': '#ff5858',
//                         'line-color': '#ff5858',
//                         'target-arrow-color': '#ff5858',
//                         'transition-property': 'background-color, line-color, target-arrow-color',
//                         'transition-duration': '0.5s',
//                         'border-width': '5',
//                         'border-color': '#61bffc'
//                     }
//                 },
//                 {
//                     selector: '.bottom-center',
//                     style: {
//                         'text-valign': 'bottom',
//                         'text-halign': 'center'
//                     }
//                 },
//                 {
//                     selector: '.autorotate',
//                     style: {
//                         'edge-text-rotation': 'autorotate'
//                     }
//                 }],
//             elements: {
//                 nodes: [
//                     { data: { label: 'first', id: '1' }, classes: 'bottom-center' },
//                     { data: { label: 'second', id: '2' }, classes: 'bottom-center' },
//                 ]
//             }
//
//         });
//
//         // this.cy.panningEnabled(false);
//         // this.cy.zoomingEnabled(true);
//         this.cy.zoomNumber = this.zoomNumber;
//         this.cy.templateModal = this.templateModal;
//         this.cy.graphModalService = this.graphModalService;
//         this.cy.newEdgeNameChange = this.newEdgeNameChange;
//     }
//
//     public onNodeSelect(): void {
//         //Event listener for node highlighting
//         var elements = this.cy.elements();
//         this.cy.on("click", function ($event) {
//             var removed = false,
//                 count = 0;
//
//             if($event.cyTarget.isEdge()){
//                 this.graphModalService.openModal(this.templateModal).then(
//                     (value: any) => {
//                         console.log(value);
//                     },
//                     (errVal: any) => {
//                         console.log(errVal)
//                     }
//                 )
//                 $event.cyTarget[0]._private.data.label = this.newEdgeNameChange;
//             }
//
//             /**
//              * select if target is already selected
//              * **/
//             if ($event.cyTarget.id !== undefined && $event.cyTarget.hasClass('selected')) {
//                 for (let i = 0; i < this.selectedNodeIds; ++i){
//                     if(this.selectedNodeIds[i] === $event.cyTarget.id()){
//                         count = i;
//                         break;
//                     }
//                 }
//
//                 $event.cyTarget.removeClass('selected');
//                 removed = true;
//                 this.selectedNodeIds.splice(count, 1);
//             }
//
//             /**
//              * If we have click on element first time and have less then 2 active elements add this to array.
//              * **/
//             if (this.selectedNodeIds.length < 2 && !removed) {
//                 if($event.cyTarget.id && !$event.cyTarget.hasClass('selected')){
//                     this.selectedNodeIds.push($event.cyTarget.id());
//                     $event.cyTarget.addClass('selected');
//                 }
//
//             }
//
//             /**
//              * If click on non node element we should remove all active class
//              * */
//             if(($event.cyTarget.id === undefined) && !removed) {
//                 for (let i = 0; i < elements.length; ++i) {
//                     elements[i].removeClass('selected');
//                 }
//                 this.selectedNodeIds = [];
//             }
//
//             /**
//              * if checked two node elements create line. After this remove active class from them
//              * **/
//             if (this.selectedNodeIds.length == 2) {
//                 var sourceNodeId = this.selectedNodeIds[0];
//                 var targetNodeId = this.selectedNodeIds[1];
//                 var nodeElements = this.cy.nodes();
//
//                 if (sourceNodeId == targetNodeId) {
//                     let newName = prompt("New name for this node");
//                     $event.cyTarget.data('name', newName);
//                 }
//                 else {
//                     this.addLine(sourceNodeId, targetNodeId);
//                 }
//                 console.log("selectedNodeIds ", this.selectedNodeIds);
//                 this.selectedNodeIds.length = 0;
//                 for (var i = 0; i < nodeElements.length; i++) {
//                     nodeElements[i].removeClass('selected');
//                 }
//             }
//
//         }.bind(this));
//
//         this.cy.on('cxttapstart', function ($event) {
//             $event.cyTarget.remove();
//         }.bind(this));
//
//         // this.cy.on('vmouseup', function ($event) {
//         //     if($event.cyTarget.position){
//         //         this.isKeyPressed = false;
//         //         clearInterval(this.timerId);
//         //     }
//         // });
//         //
//         // this.cy.on('vmousedown', function ($event) {
//         //     if($event.cyTarget.position){
//         //         this.isKeyPressed = true;
//         //         this.timerId = setInterval(function () {
//         //             if(this.isKeyPressed){
//         //                 console.log('positipon: ' + $event.cyTarget.position().y + '\nheight: ' + this.container().offsetHeight);
//         //                 if($event.cyTarget.position().y + this.container().offsetTop > (this.container().offsetHeight)*0.75){
//         //                     //this.container().style.height = this.height() +  15 + 'px';
//         //                     document.body.scrollTop = document.body.offsetHeight;
//         //                 }
//         //             }
//         //         }.bind(this), 100);
//         //     }
//         // });
//     }
//
//     public addLine(sourceNode, targetNode):void {
//         this.cy.add({
//             group: "edges",
//             data: {source: sourceNode, target: targetNode, label: '100 %', classes: 'autorotate'}
//         });
//
//         this.cy.edges()[0].addClass('autorotate');
//     }
//
//
//     ngOnInit(){
//         this.createAndSetting();
//         this.onNodeSelect();
//     }
// }