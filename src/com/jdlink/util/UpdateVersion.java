package com.jdlink.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UpdateVersion {
    public String updateVersionID(String versionID){
        String regEx="[^0-9.]";
        Pattern p = Pattern.compile(regEx);//正则表达式
        Matcher m = p.matcher(versionID);
        Double t=Double.parseDouble(m.replaceAll("").trim());
        String newVersionId="V"+String.valueOf(t+0.1);
        return newVersionId;
    }
}
