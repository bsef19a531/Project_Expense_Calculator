import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.text('Expense Calculator Application', 105, 10, null, null, 'center');

    // Add table
    const table = document.getElementById('expense_data_table');
    html2canvas(table).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 20, 190, canvas.height * 190 / canvas.width);

        // Add charts
        const pieChart = document.getElementById('pie_chart_container');
        html2canvas(pieChart).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, 20, 190, canvas.height * 190 / canvas.width);

            const lineChart = document.getElementById('line_chart_container');
            html2canvas(lineChart).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                doc.addPage();
                doc.addImage(imgData, 'PNG', 10, 20, 190, canvas.height * 190 / canvas.width);

                const barChart = document.getElementById('bar_chart_container');
                html2canvas(barChart).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 10, 20, 190, canvas.height * 190 / canvas.width);

                    // Add footer
                    doc.setFontSize(10);
                    doc.text('Generated by Expense Calculator Application', 105, 290, null, null, 'center');

                    doc.save('expense_report.pdf');
                });
            });
        });
    });
};

export default generatePDF;