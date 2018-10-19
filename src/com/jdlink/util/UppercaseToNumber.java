package com.jdlink.util;

import java.util.ArrayList;
import java.util.List;

public class UppercaseToNumber {
    //1大写数字转化数字
    public static void main(String[] args) {

        System.out.println(Splicing("伍拾伍点伍"));

    }

    //讲中文转化为数字
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

    //遍历大写字母 进行数字拼接
    public static float Splicing(String Number) {
        float number = 0;
        List<String> list=new ArrayList<>();
        //遍历获取数组
        for (int i = 0; i < Number.length(); i++) {
            list.add(Number.substring(i,i+1));

        }

        System.out.println(list);
        //从后往前遍历
        for(int i=list.size()-1;i>=0;i--){
            if(list.get(i).equals("点")){
               number+=conversion(list.get(i+1))*0.1;
               list.remove(i);
               list.remove(i);
               continue;
            }
            System.out.println(list);
            if(list.get(i).equals("拾")){
                number+=conversion(list.get(i-1))*10;//
                list.remove(i);
                list.remove(i);
            }
            System.out.println(list);
            if(list.get(i).equals("佰")){
                number+=conversion(list.get(i-1))*100;//
                list.remove(i);
                list.remove(i);
            }
            else {
                number+=conversion(list.get(i));
            }
        }



                return number;
    }

}
