package com.pantrylabel.util;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.pantrylabel.entity.Order;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfGenerator {

    public byte[] invoice(String number, Order order) {

        try {
            ByteArrayOutputStream output = new ByteArrayOutputStream();

            try (PdfWriter writer = new PdfWriter(output);
                 PdfDocument pdf = new PdfDocument(writer);
                 Document document = new Document(pdf)) {

                document.add(new Paragraph("Pantry Label Invoice")
                        .setBold()
                        .setFontSize(20));

                document.add(new Paragraph("Invoice: " + number));
                document.add(new Paragraph("Order: " + order.getId()));
                document.add(new Paragraph("Status: " + order.getStatus()));
                document.add(new Paragraph("Total: INR " + order.getGrandTotal()));
                document.add(new Paragraph("Items:"));

                order.getItems().forEach(item ->
                        document.add(new Paragraph(
                                "• " + item.getProduct().getName()
                                        + " - INR "
                                        + item.getProduct().getPrice()))
                );
            }

            return output.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate invoice PDF", e);
        }
    }
}