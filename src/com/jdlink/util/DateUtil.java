package com.jdlink.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by matt on 2018/8/8.
 * DoubleClickTo 666
 * 时间转换工具
 */
public class DateUtil {

    /**
     * 获取时间对象
     * @param dateStr 时间格式字符串 yyyy/MM/dd
     * @return 时间对象
     */
    public static Date getDateFromStr(String dateStr) {
        dateStr = dateStr.trim();
        dateStr = dateStr.replace("\"", "");
        SimpleDateFormat dateFormat;
        Date date = null;
        try {
            if (dateStr.contains("/")) dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            else if (dateStr.contains("-")) dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            else if (dateStr.contains("年")) dateFormat = new SimpleDateFormat("yyyy年MM月dd日");
            else if (dateStr.contains(".")) dateFormat = new SimpleDateFormat("yyyy.MM.dd");
            else throw new Exception("时间格式异常");
            date = dateFormat.parse(dateStr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 获取时间对象
     * @param dataTimeStr 时间格式字符串 yyyy-MM-dd HH:mm:ss
     * @return 时间对象
     */
    public static Date getDateTimeFromStr(String dataTimeStr){
        dataTimeStr = dataTimeStr.trim();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try{
            date = dateFormat.parse(dataTimeStr);
        }catch (ParseException e){
            e.printStackTrace();
        }
        return date;
    }


    /**
     * 通过时间对象获取时间字符串
     * @param date 时间对象
     * @return 时间格式字符串 yyyy-MM-dd
     */
    public static String getDateStr(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String time;
        try {
            time = simpleDateFormat.format(date);
        } catch (Exception e) {
            return "时间错误";
        }
        return time;
    }

    /**
     * 通过时间对象获取时间字符串
     * @param date 时间对象
     * @return 时间格式字符串 yyyy-MM-dd HH:mm
     */
    public static String getTimeStr(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String time;
        try {
            time = simpleDateFormat.format(date);
        } catch (Exception e) {
            return "时间错误";
        }
        return time;
    }

    /**
     * 通过时间对象获取时间字符串
     * @param date 时间对象
     * @return 时间格式字符串 yyyy-MM-dd HH:mm:ss
     */
    public static String getTimeSecondStr(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time;
        try {
            time = simpleDateFormat.format(date);
        } catch (Exception e) {
            return "时间错误";
        }
        return time;
    }

    /**
     * 取得月份天数
     * */
    public static int getDaysOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }



}
