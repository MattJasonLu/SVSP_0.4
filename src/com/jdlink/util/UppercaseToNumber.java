package com.jdlink.util;

import java.util.ArrayList;
import java.util.List;

import static com.jdlink.util.CNNMFilter.cnNumericToArabic;

public class UppercaseToNumber {
    //1大写数字转化数字
    public static void main(String[] args) {
        System.out.println(transformation("伍佰零陆点零陆"));
    }


    public static float conversion(String Number) {
        float number = 0;
        switch (Number) {
            case "壹":
                number = 1;
                break;
            case "贰":
                number = 2;
                break;
            case "叁":
                number = 3;
                break;
            case "肆":
                number = 4;
                break;
            case "伍":
                number = 5;
                break;
            case "陆":
                number = 6;
                break;
            case "柒":
                number = 7;
                break;
            case "捌":
                number = 8;
                break;
            case "玖":
                number = 9;
                break;
            case "拾":
                number = 10;
                break;
            case "佰":
                number = 100;
                break;
            case "仟":
                number = 1000;
                break;
            case "万":
                number = 10000;
                break;
            case "点":
                number = (float) 0.1;
                break;
        }


        return number;

    }

    //讲中文转化为数字
    public static float transformation(String Number) {
        if (Number.indexOf("点") == -1) {
            return cnNumericToArabic(Number, true);
        }
        if (Number.indexOf("点") != -1) {
            int index = Number.indexOf("点");
            String Number1 = Number.substring(0, index);//整数
            String Number2 = Number.substring(index + 1, Number.length());//小数
            float num1 = cnNumericToArabic(Number1, true);
            float num2 = cnNumericToArabic(Number2, true) * ((float) Math.pow(10, -Number2.length()));
//            System.out.println(num1 + "==>" + num2);
            return num1 + num2;

        }
        else {
            return 0;
        }

    }

}






