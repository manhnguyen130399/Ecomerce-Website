package com.fashion.sync.impl;

import org.springframework.stereotype.Component;

import com.fashion.sync.Receiver;
@Component
public class ReceiverImpl implements Receiver {

	@Override
	public void receiveMessage(final String message) {
		System.out.println("Reciver aaaaaaaaaaaa" + message);
	}

}
