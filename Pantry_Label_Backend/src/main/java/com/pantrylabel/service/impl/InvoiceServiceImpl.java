package com.pantrylabel.service.impl;
import com.pantrylabel.entity.Order;
import com.pantrylabel.exception.ResourceNotFoundException;
import com.pantrylabel.repository.OrderRepository;
import com.pantrylabel.service.InvoiceService;
import com.pantrylabel.util.InvoiceNumberGenerator;
import com.pantrylabel.util.PdfGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class InvoiceServiceImpl implements InvoiceService {
    private final OrderRepository orders; private final InvoiceNumberGenerator numbers; private final PdfGenerator pdfGenerator;
    public InvoiceServiceImpl(OrderRepository orders, InvoiceNumberGenerator numbers, PdfGenerator pdfGenerator) { this.orders = orders; this.numbers = numbers; this.pdfGenerator = pdfGenerator; }
    @Override @Transactional(readOnly = true) public byte[] generate(String email, Long orderId) { Order order = orders.findById(orderId).filter(value -> value.getUser().getEmail().equals(email)).orElseThrow(() -> new ResourceNotFoundException("Order not found")); return pdfGenerator.invoice(numbers.generate(orderId), order); }
}
