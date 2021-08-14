package com.fashion.sync.impl;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fashion.commons.constants.Constants;
import com.fashion.model.DataSendMQ;
import com.fashion.modules.product.service.ProductService;
import com.fashion.sync.ProductReceiver;

@Component
public class ProductReceiverImpl implements ProductReceiver {

	@Autowired
	private ProductService productService;

	@Override
	@RabbitListener(queues = Constants.QUEUE_PRODUCT_NAME)
	public void receiveMessage(final DataSendMQ message) {
		try {
			productService.createProducts(message.getProductVMs());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);

		}
		
	}

}
