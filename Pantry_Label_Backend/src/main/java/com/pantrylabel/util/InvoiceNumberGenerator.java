package com.pantrylabel.util;
import java.time.LocalDate;
import org.springframework.stereotype.Component;
@Component public class InvoiceNumberGenerator { public String generate(Long orderId) { return "PL-" + LocalDate.now().toString().replace("-", "") + "-" + orderId; } }
