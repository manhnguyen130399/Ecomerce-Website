package com.fashion.commons.constants;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.regex.Pattern;

public final class Constants {
	public static final String DATE_FORMAT_YYYYMMDDHHMM = "yyyyMMddhhmm";
	public static final String DATE_FORMAT_YYYYMMDDHHMMSS = "yyyyMMddhhmmss";
	public static final String DATE_FORMAT_MMYY = "MMyy";
	public static final String DATE_FORMAT_MMDD = "MM-dd";
	public static final String DATE_FORMAT_YYYYMMDD_HYPHEN = "yyyy-MM-dd";
	public static final String DATE_FORMAT_YYYYMM_HYPHEN = "yyyy-MM";
	public static final String DATE_FORMAT_DDMMYYYY_SLASH = "dd/MM/yyyy";
	public static final String DATE_FORMAT_DDMMYYYY_HYPHEN = "dd-MM-yyyy";
	public static final String DATE_FORMAT_YYYYMMDDHHMMSS_EXTENSION = "yyyy-MM-dd-hh-mm-ss";
	public static final String DATE_FORMAT_YYYYMMDDHHMMSS_HYPHEN = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORMAT_YYYYMMDDHHMM_HYPHEN = "yyyy-MM-dd HH:mm";
	public static final String DATE_FORMAT_DDMMYYYYHHMMSS_HYPHEN = "dd-MM-yyyy HH:mm:ss";
	public static final String DATE_FORMAT_DDMMYYYYHHMM_HYPHEN = "dd/MM/yyyy HH:mm";
	public static final String TIME_DATE_FORMAT = "HH:mm dd/MM/yyyy";
	public static final String ES_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	public static final String TESC_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";
	public static final String GLOBAL_TIMEZONE = "Asia/Ho_Chi_Minh";
	public static final String TIME_FORMAT_HHMM = "HH:mm";
	public static final long NOTI_VALID_AFTER_DELAY = 10000; // ms
	public static final long ONE_MINUTE_MILLISECONDS = 60000;
	public static final long TWO_HOUR = 7200000;
	public static final Locale LOCALE_VI = new Locale("vi");
	public static final BigDecimal BIG_DECIMAL_PERCENTAGE_NUMBER = new BigDecimal(100);
	public static final BigDecimal BIG_DECIMAL_ZERO = new BigDecimal(0);

	public static final DateFormat DATE_FORMATTER = new SimpleDateFormat(
			DATE_FORMAT_DDMMYYYYHHMMSS_HYPHEN);

	public static final DateFormat DATE_FORMAT_YYYYMMDDHHMMSS_FORMATTER = new SimpleDateFormat(
			DATE_FORMAT_YYYYMMDDHHMMSS_EXTENSION);

	public static final DateFormat SIMPLE_DATE_FORMATTER = new SimpleDateFormat(
			DATE_FORMAT_DDMMYYYY_SLASH);

	public static final DateFormat YYYY_MM_DD_DATE_FORMATTER = new SimpleDateFormat(
			DATE_FORMAT_YYYYMMDD_HYPHEN);

	public static final String KEY_LANG_EN = "en";
	public static final String KEY_LANG_VI = "vi";

	public static final String SUBSTITUTOR_PREFIX = "#{";
	public static final String SUBSTITUTOR_SUFFIX = "}";
	public static final String SUFFIX_OFF = "_";
	public static final String SINGLE_QUOTE = "'";
	public static final String ROUND_BRACKET_PREFIX = "(";
	public static final String ROUND_BRACKET_SUFFIX = ")";
	public static final String SPACE = " ";
	public static final String DEVIDE = "/";
	public static final String SHARP = "#";
	
	// Regex for acceptable logins
	public static final String EMAIL_REGEX = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
	public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";
	public static final String SYSTEM_ACCOUNT = "system";
	public static final String ANONYMOUS_USER = "anonymoususer";
	public static final String PHONE_TRIM = "[^a-zA-Z0-9]+";
	public static final String NONE = "";
	public static final String BLANK = " ";
	public static final String REGEX_BLANK = "\\s+";

	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);
	
	//OUTPUT KEY
	public static final String DATA = "data";
	public static final String CODE = "code";
	public static final String MESSAGE = "message";
	public static final String META_DATA ="meta-data";
	
	public static final String URL_VIEW_FILE = "https://drive.google.com/file/d/${file_id}/view";
	public static final String FILE_ID = "file_id";


}
