import pdfmake from "pdfmake";
export default {
    methods: {
        async pdfPreview(datatable, data) {
            try {
                if (data.length != 0) {
                    var body = [];
                    var headers = [];
                    const itemsTable = datatable.items
                        .filter((fitem) => fitem.table == true)
                    var il = datatable.items.filter((item) => item.table == true).length;
                    var wperc = il > 0 ? 100 / il : 0;
                    console.log(wperc, il)
                    var width = [];
                    datatable.items
                        .filter((item) => item.table == true)
                        .forEach((item) => {
                            headers.push({
                                text: item.label,
                                style: "tableHeader",
                            });
                            width.push(wperc > 0 ? wperc.toString() + "%" : "auto");
                        });
                    body.push(headers);
                    console.log("Inicio Data")
                    Promise.all(
                        data.map(async(ditem) => {
                            var item = [];
                            itemsTable.map(fitem => {

                                })
                                /*datatable.items
                                    .filter((fitem) => fitem.table == true)
                                    .map(async(fitem) => {
                                        console.log(fitem)
                                        await item.push({
                                            text: fitem.value(ditem),
                                            style: "tableRow",
                                        });
                                    });*/

                            body.push(item);
                        })
                    )
                    console.log("Luego Data")
                        /* var win = window.open("", "_blank");
                         var docDefinition = {
                             pageSize: "LETTER",
                             pageMargins: [20, 20, 20, 20],
                             info: {
                                 title: datatable.title,
                                 author: "MAGNUS SYSTEM",
                             },
                             content: [{
                                     text: "Listado de " + datatable.title,
                                     style: "header",
                                 },
                                 {
                                     table: {
                                         headerRows: 1,
                                         widths: width,
                                         // dontBreakRows: true,
                                         // keepWithHeaderRows: 1,
                                         body: body,
                                     },
                                     layout: {
                                         hLineWidth: function(i, node) {
                                             return 1;
                                         },
                                         vLineWidth: function(i, node) {
                                             return 0;
                                         },
                                         hLineColor: function(i, node) {
                                             return "#DEE2E6";
                                         },
                                     },
                                 },
                             ],
                             styles: {
                                 header: {
                                     fontSize: 18,
                                     bold: true,
                                     alignment: "center",
                                     margin: [0, 0, 0, 10],
                                     color: "#212529",
                                 },
                                 tableHeader: {
                                     bold: true,
                                     fontSize: 10,
                                     color: "#212529",
                                     fillColor: "#E9ECEF",
                                 },
                                 tableRow: {
                                     fontSize: 10,
                                 },
                             },
                         };
                         if (pdfMake.vfs == undefined) {
                             var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                             pdfMake.vfs = pdfFonts.pdfMake.vfs;
                         }
                         pdfMake.createPdf(docDefinition).open({}, win);*/
                } else {
                    this.$toast.add({
                        severity: "info",
                        summary: "Exportar PDF",
                        detail: "No hay registro para mostrar",
                        life: 3000,
                    });
                }
            } catch (err) {
                console.log(err)
            }
        },
    },
};