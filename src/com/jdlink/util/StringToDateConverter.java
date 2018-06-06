package com.jdlink.util;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by matt on 2018/4/25.
 */
public class StringToDateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String source) {
        // TODO Auto-generated method stub
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");

        try {
            // 转成直接返回
            return simpleDateFormat.parse(source);
        } catch (ParseException e) {

            simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            try {
                return simpleDateFormat.parse(source);
            } catch (ParseException e1) {

                System.out.println("日期转换失败->" + this.getClass().getName());
            }
        }
        // 如果参数绑定失败返回null
        return null;
    }

    public String convert(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time;
        try {
            time = simpleDateFormat.format(date);
        } catch (Exception e) {
            return "时间错误";
        }
        return time;
    }
}
