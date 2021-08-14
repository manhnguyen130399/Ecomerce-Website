package com.fashion.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fashion.commons.constants.Constants;
import com.fashion.sync.ProductReceiver;
import com.fashion.sync.Receiver;

@Configuration
public class RabbitMQConfig {
	@Bean
	public Queue queue() {
		return new Queue(Constants.QUEUE_PRODUCT_NAME, false);
	}	

	@Bean
	public TopicExchange exchange() {
		return new TopicExchange(Constants.PRODUCT_EXCHANGE_NAME);
	}

	@Bean
	public Queue queueTest() {
		return new Queue(Constants.QUEUE_NAME, false);
	}
	
	@Bean
	public TopicExchange exchangeTest() {
		return new TopicExchange(Constants.EXCHANGE_NAME);
	}
	
	@Bean
	public Binding binding(final Queue queue, final TopicExchange exchange) {
		return BindingBuilder.bind(queue).to(exchange).with(Constants.ROUTE_KEY);
	}

	@Bean
	public SimpleMessageListenerContainer containerTest(final ConnectionFactory connectionFactory,
			final MessageListenerAdapter listenerAdapter) {
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
		container.setConnectionFactory(connectionFactory);
		container.setQueueNames(Constants.QUEUE_NAME);
		container.setMessageListener(listenerAdapter);
		return container;
	}

	@Bean
	public MessageListenerAdapter listenerAdapterTest(final Receiver receiver) {
		return new MessageListenerAdapter(receiver, "receiveMessage");
	}

	@Bean
	public SimpleMessageListenerContainer container(final ConnectionFactory connectionFactory,
			final MessageListenerAdapter listenerAdapter) {
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
		container.setConnectionFactory(connectionFactory);
		container.setQueueNames(Constants.QUEUE_PRODUCT_NAME);
		container.setMessageListener(listenerAdapter);
		return container;
	}

	@Bean
	public MessageListenerAdapter listenerAdapter(final ProductReceiver receiver) {
		return new MessageListenerAdapter(receiver, "receiveMessage");
	}

}
