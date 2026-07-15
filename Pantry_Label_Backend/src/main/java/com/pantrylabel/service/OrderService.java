package com.pantrylabel.service;
import com.pantrylabel.dto.request.OrderRequest;
import com.pantrylabel.dto.response.OrderDto;
import java.util.List;
public interface OrderService { OrderDto create(String email, OrderRequest request); OrderDto get(String email, Long id); List<OrderDto> getAll(String email); }
