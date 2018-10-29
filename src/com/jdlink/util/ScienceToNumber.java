package com.jdlink.util;

import java.math.BigDecimal;

/**
 * 科学技术转化为字符串用在长编号中
 */
public class ScienceToNumber {



    public static String getNumber(String s){
        BigDecimal bd = new BigDecimal(s);
        String str = bd.toPlainString();
      return str;
    }
}
