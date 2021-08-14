package com.fashion.sync;

import com.fashion.model.DataSendMQ;

public interface ProductReceiver {

	void receiveMessage(DataSendMQ message);
}
