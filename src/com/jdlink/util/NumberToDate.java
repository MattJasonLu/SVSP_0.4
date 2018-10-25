package com.jdlink.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class NumberToDate {
    public static void main(String args[]){
        System.out.println(double2Date(43242.0));
    }
    public static  Date double2Date(Double d){
        Date t = null;
try {

    Calendar base = Calendar.getInstance();
    SimpleDateFormat outFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    base.set(1899, 11, 30, 0, 0, 0);
    base.add(Calendar.DATE, d.intValue());
    base.add(Calendar.MILLISECOND,(int)((d % 1) * 24 * 60 * 60 * 1000));
    t=(base.getTime());
}
catch (Exception e){


    e.printStackTrace();
}

return t;

    }



}
