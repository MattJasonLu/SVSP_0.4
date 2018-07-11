package com.jdlink.domain;

public enum Province {
    Jiangsu("江苏省",1),
    Beijing("北京市",2),
    Shanghai("上海市",3),
    TianJing("天津市",4),
    ChongQing("重庆市",5),
    HongKong("香港",6),
    LiaoNing("辽宁",7),
    HeNan("河南省",8),
    ZheJiang("浙江省",9),
    AnHui("安徽省",10);





    private String name;
    private int index;
    Province(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static Province get(int index) {
        for (Province c : Province.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
