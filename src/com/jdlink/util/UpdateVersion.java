package com.jdlink.util;

import org.junit.Test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.text.DecimalFormat;

/**
 * 版本更新工具类
 * @return newVersionID 版本号
 */
public class UpdateVersion {
    public static void  main(String[] args){
        System.out.println(UpdateVersion.updateVersionID("1.9"));
    }
    public static String updateVersionID(String versionID){
        String regEx="[^0-9.]";
        Pattern p = Pattern.compile(regEx);//正则表达式
        Matcher m = p.matcher(versionID);
        Double t=Double.parseDouble(m.replaceAll("").trim());
        DecimalFormat df=new DecimalFormat("#.0");
        Double n=Double.parseDouble(df.format(t));
        String newVersionId="V"+df.format(n+0.1);
        return newVersionId;
    }

}
