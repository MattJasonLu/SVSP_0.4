package com.jdlink.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Created by matt on 2018/4/24.
 */
public class RandomUtil {

    /**
     * 生成随机文件名：当前年月日时分秒+五位随机数
     * @return 随机文件名
     */
    public static String getRandomFileName() {
        // 创建日期格式工具
        SimpleDateFormat simpleDateFormat;
        // 日期格式
        simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        // 获取日期
        Date date = new Date();
        // 格式化日期
        String str = simpleDateFormat.format(date);
        // 获取随机对象
        Random random = new Random();
        // 获取随机数
        int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数
        return rannum + str;// 当前时间
    }

    /**
     * 获取八位随机数
     * @return 八位随机数
     */
    public static String getRandomEightNumber() {
        StringBuilder str=new StringBuilder();//定义变长字符串
        Random random=new Random();
        //随机生成数字，并添加到字符串
        for(int i=0;i<8;i++){
            str.append(random.nextInt(10));
        }
        return str.toString();
    }

    /**
     * 产生8位带字母和数字的字符串
     * @return 带字母和数字的字符串
     */
    public static String getRandomEightChar() {
        String val = "";
        Random random = new Random();
        for ( int i = 0; i < 8; i++ ) {
            String str = random.nextInt( 2 ) % 2 == 0 ? "num" : "char";
            if ( "char".equalsIgnoreCase( str ) ) { // 产生字母
                int nextInt = random.nextInt( 2 ) % 2 == 0 ? 65 : 97;
                // System.out.println(nextInt + "!!!!"); 1,0,1,1,1,0,0
                val += (char) ( nextInt + random.nextInt( 26 ) );
            } else if ( "num".equalsIgnoreCase( str ) ) { // 产生数字
                val += String.valueOf( random.nextInt( 10 ) );
            }
        }
        return val;
    }

    /**
     * 根据当前时间及数据库数据数量计算编号
     * @return 编号
     */
    public static String getAppointId(String prefix, String suffix) {
        return prefix + suffix;
    }

    /**
     * 根据预约号获得登记号
     * @param appointId 预约号
     * @return 登记号
     */
    public static String getCheckId(String appointId) {
        return appointId+"R";
    }

    /**
     * 获取百分比
     * @param num1 被除数
     * @param num2 除数
     * @return 百分比
     */
    public static String getPercentage(float num1, float num2) {
        if (num2 == 0) return "0.00";
        // 获取数字实例
        NumberFormat numberFormat = NumberFormat.getInstance();
        // 两位数
        numberFormat.setMaximumFractionDigits(2);
        return numberFormat.format(num1 / num2 * 100);
    }

    /**
     * 除法获取结果
     * @param a 被除数
     * @param b 除数
     * @return 除得结果
     */
    public static float divideTwoNumber(float a, float b) {
        // 如果除数为0直接返回为0
        if (b == 0) return 0;
        DecimalFormat df=new DecimalFormat("0.00");
        // 求商
        String res =  df.format(a / b);
        return Float.parseFloat(res);
    }
}
