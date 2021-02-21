package com.fashion.web;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fashion.commons.constants.Constants;
import com.fashion.model.OrderQrVM;
import com.fashion.service.ICommonService;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API common")
public class CommonResource extends BaseResource {

	@Autowired
	private ICommonService commonService;

	private static final String URL = "/qr";

	@PostMapping(URL)
	public ResponseEntity<Map<String, Object>> generateQrCode(@RequestBody final OrderQrVM order) throws Exception {
		return success(commonService.generateLinkQrCode(buildInputOrderQrCode(order)));
	}

	private String buildInputOrderQrCode(final OrderQrVM order) {
		final StringBuilder details = new StringBuilder();
		order.getOrderDetails().stream().forEach(it -> {
			details.append(String.join(Constants.END_LINE, Constants.PRODUCT_NAME + it.getProductName(),
					Constants.QUANTITY + it.getQuantity(), Constants.TOTAL_PRICE + it.getTotalPriceProduct())
					+ Constants.END_LINE);
		});
		return String.join(Constants.END_LINE, Constants.ORDER, Constants.CUSTOMER_NAME + order.getCustomerName(),
				Constants.ADDRESS + order.getAddress(), Constants.PHONE_NUMBER + order.getPhone(),
				Constants.CUSTOMER_EMAIL + order.getEmail(), Constants.TOTAL + order.getTotal(),
				Constants.ORDER_DATE + new SimpleDateFormat(Constants.DATE_FORMAT_YYYYMMDD_HYPHEN)
						.format(Calendar.getInstance().getTime()),
				Constants.STATE + order.getState(), Constants.ORDER_DETAIL, details.toString());
	}
}
